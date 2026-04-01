import { prisma } from "../../database/prisma";
import { env } from "../../config/env";
import type {
  CreateProposalInput,
  UpdateProposalNotesInput,
  UpdateProposalStatusInput,
} from "./proposal.schema";
import {
  sendProposalConfirmationEmail,
  sendProposalNotificationEmail,
  sendProposalStatusChangedEmail,
} from "./proposal.mail";
import { AppError } from "../../utils/AppError";
import { Prisma } from "@prisma/client";

export class ProposalService {
  async create(
    data: CreateProposalInput,
    files: Express.Multer.File[] = [],
    paymentProofFileName: string | null = null
  ) {
    const projectDetails = {
      newConstruction: data.newConstruction ?? null,
      interiors: data.interiors ?? null,
      renovation: data.renovation ?? null,
      consulting: data.consulting ?? null,
    };

    const referenceFiles = files.map((file) => ({
      originalName: file.originalname,
      fileName: file.filename,
      mimeType: file.mimetype,
      size: file.size,
      url: `${env.backendUrl}/${env.uploadDir}/${file.filename}`,
    }));

    const proposal = await prisma.proposalRequest.create({
      data: {
        email: data.email,
        fullName: data.fullName,
        cpf: data.cpf,
        address: data.address,
        birthDate: data.birthDate,
        phone: data.phone,
        socialProfile: data.socialProfile || null,

        preferredContactMethod: data.preferredContactMethod,
        preferredContactMethodOther: data.preferredContactMethodOther || null,

        referralSource: data.referralSource,
        referralSourceOther: data.referralSourceOther || null,

        desiredWorkStart: data.desiredWorkStart,

        projectType: data.projectType,
        projectTypeOther: data.projectTypeOther || null,

        taxAgreement: data.taxAgreement,
        paymentMethod: data.paymentMethod,
        paymentMethodOther: data.paymentMethodOther || null,

        projectDetailsJson: projectDetails,
        referenceFilesJson: referenceFiles.length ? referenceFiles : Prisma.JsonNull,
        pixKeySnapshot: data.paymentMethod === "pix" ? env.pixKey : null,

        paymentProofUrl: paymentProofFileName
          ? `${env.backendUrl}/${env.uploadDir}/${paymentProofFileName}`
          : null,
        paymentProofUploadedAt: paymentProofFileName ? new Date() : null,
      },
    });

    void sendProposalNotificationEmail(proposal).catch((error) => {
      console.error("Erro ao enviar e-mail interno da ROOM:", error);
    });

    void sendProposalConfirmationEmail(proposal).catch((error) => {
      console.error("Erro ao enviar e-mail de confirmação ao cliente:", error);
    });

    return proposal;
  }

  async list(filters?: { status?: string; projectType?: string; search?: string }) {
    const where = {
      ...(filters?.status ? { status: filters.status as any } : {}),
      ...(filters?.projectType ? { projectType: filters.projectType } : {}),
      ...(filters?.search
        ? {
            OR: [
              {
                fullName: {
                  contains: filters.search,
                  mode: "insensitive" as const,
                },
              },
              {
                email: {
                  contains: filters.search,
                  mode: "insensitive" as const,
                },
              },
              {
                phone: {
                  contains: filters.search,
                  mode: "insensitive" as const,
                },
              },
            ],
          }
        : {}),
    };

    return prisma.proposalRequest.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: string) {
    return prisma.proposalRequest.findUnique({
      where: { id },
    });
  }

  async updateStatus(id: string, data: UpdateProposalStatusInput) {
    const proposal = await prisma.proposalRequest.update({
      where: { id },
      data: {
        status: data.status,
      },
    });

    try {
      await sendProposalStatusChangedEmail(proposal);
    } catch (error) {
      console.error("Erro ao enviar e-mail de mudança de status:", error);
    }

    return proposal;
  }

  async updateNotes(id: string, data: UpdateProposalNotesInput) {
    return prisma.proposalRequest.update({
      where: { id },
      data: {
        internalNotes: data.internalNotes || "",
      },
    });
  }

  async uploadPaymentProof(id: string, fileName: string) {
    const proposal = await prisma.proposalRequest.findUnique({
      where: { id },
    });

    if (!proposal) {
      throw new AppError("Solicitação não encontrada", 404);
    }

    const fileUrl = `${env.backendUrl}/${env.uploadDir}/${fileName}`;

    return prisma.proposalRequest.update({
      where: { id },
      data: {
        paymentProofUrl: fileUrl,
        paymentProofUploadedAt: new Date(),
      },
    });
  }
}