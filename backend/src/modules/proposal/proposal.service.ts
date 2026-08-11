import { Prisma, ProposalRequest } from "@prisma/client";

import { env } from "../../config/env";

import { storage } from "../../services/storage";

import { AppError } from "../../utils/AppError";
import {
  decryptPersonalData,
  encryptPersonalData,
} from "../../utils/dataEncryption";

import {
  sendProposalConfirmationEmail,
  sendProposalNotificationEmail,
  sendProposalStatusChangedEmail,
} from "./proposal.mail";

import {
  CreateProposalInput,
  UpdateProposalNotesInput,
  UpdateProposalStatusInput,
} from "./proposal.schema";

import { ProposalRepository } from "./proposal.repository";
import { createProposalsWorkbook } from "./proposal.export";

export function decryptProposal(proposal: ProposalRequest): ProposalRequest {
  return {
    ...proposal,
    email: decryptPersonalData(proposal.email),
    fullName: decryptPersonalData(proposal.fullName),
    cpf: decryptPersonalData(proposal.cpf),
    address: decryptPersonalData(proposal.address),
    birthDate: decryptPersonalData(proposal.birthDate),
    phone: decryptPersonalData(proposal.phone),
    socialProfile: proposal.socialProfile
      ? decryptPersonalData(proposal.socialProfile)
      : null,
  };
}

export class ProposalService {
  private repository = new ProposalRepository();

  async create(data: CreateProposalInput) {
    const projectDetails =
      data.projectType === "new-construction"
        ? {
            newConstruction: data.newConstruction ?? null,
          }
        : data.projectType === "interiors"
          ? {
              interiors: data.interiors ?? null,
            }
          : data.projectType === "renovation"
            ? {
                renovation: data.renovation ?? null,
              }
            : {
                consulting: data.consulting ?? null,
              };

    const storedProposal = await this.repository.create({
      email: encryptPersonalData(data.email),

      fullName: encryptPersonalData(data.fullName),

      cpf: encryptPersonalData(data.cpf),

      address: encryptPersonalData(data.address),

      birthDate: encryptPersonalData(data.birthDate),

      phone: encryptPersonalData(data.phone),

      socialProfile: data.socialProfile
        ? encryptPersonalData(data.socialProfile)
        : null,

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

      referenceFilesJson: data.referenceFilesJson?.length
        ? data.referenceFilesJson.map(({ url: _url, ...file }) => file)
        : Prisma.JsonNull,

      pixKeySnapshot: data.paymentMethod === "pix" ? env.pixKey || null : null,

      paymentProofUrl: null,

      paymentProofStorageKey: data.paymentProofStorageKey || null,

      paymentProofUploadedAt: data.paymentProofUrl ? new Date() : null,
    });

    const proposal = decryptProposal(storedProposal);

    void sendProposalNotificationEmail(proposal).catch(console.error);

    void sendProposalConfirmationEmail(proposal).catch(console.error);

    return proposal;
  }

  async list(filters?: {
    status?: string;

    projectType?: string;

    search?: string;
  }) {
    const where = {
      ...(filters?.status && {
        status: filters.status as any,
      }),

      ...(filters?.projectType && {
        projectType: filters.projectType,
      }),
    };

    const proposals = (await this.repository.findAll(where)).map(
      decryptProposal,
    );
    const search = filters?.search?.trim().toLocaleLowerCase();

    if (!search) return proposals;

    return proposals.filter((proposal) =>
      [proposal.fullName, proposal.email, proposal.phone].some((value) =>
        value.toLocaleLowerCase().includes(search),
      ),
    );
  }

  async export(filters?: {
    status?: string;
    projectType?: string;
    search?: string;
  }) {
    const proposals = await this.list(filters);

    return createProposalsWorkbook(proposals);
  }

  async findById(id: string) {
    const proposal = await this.repository.findById(id);
    return proposal ? decryptProposal(proposal) : null;
  }

  async updateStatus(id: string, data: UpdateProposalStatusInput) {
    const storedProposal = await this.repository.update(id, {
      status: data.status,
    });
    const proposal = decryptProposal(storedProposal);

    try {
      await sendProposalStatusChangedEmail(proposal);
    } catch (error) {
      console.error(error);
    }

    return proposal;
  }

  async updateNotes(id: string, data: UpdateProposalNotesInput) {
    const proposal = await this.repository.update(id, {
      internalNotes: data.internalNotes || "",
    });
    return decryptProposal(proposal);
  }

  async remove(id: string) {
    const proposal = await this.repository.findById(id);

    if (!proposal) {
      throw new AppError("Solicitação não encontrada.", 404);
    }

    const referenceStorageKeys = Array.isArray(proposal.referenceFilesJson)
      ? proposal.referenceFilesJson.flatMap((file) =>
          file &&
          typeof file === "object" &&
          "storageKey" in file &&
          typeof file.storageKey === "string"
            ? [file.storageKey]
            : [],
        )
      : [];

    const storageKeys = [
      proposal.paymentProofStorageKey,
      ...referenceStorageKeys,
    ].filter((key): key is string => Boolean(key?.trim()));

    await this.repository.delete(id);

    try {
      await storage.deleteMany(storageKeys);
    } catch (error) {
      console.error(
        "[ProposalService] Falha ao remover arquivos da proposta. Possíveis arquivos órfãos:",
        { id, storageKeys, error },
      );
    }
  }

  async generateUploadUrl(
    fileName: string,
    fileType: string,
    folder: "payment-proofs" | "references",
  ) {
    return storage.generatePrivateSignedUploadUrl({
      folder: `proposals/${folder}`,

      fileName,

      fileType,
    });
  }

  async updatePaymentProof(id: string, storageKey: string) {
    const proposal = await this.repository.findById(id);

    if (!proposal) {
      throw new AppError("Solicitação não encontrada.", 404);
    }

    await storage.validatePrivateObject(storageKey, {
      maxSize: 10 * 1024 * 1024,
      allowedContentTypes: [
        "application/pdf",
        "image/jpeg",
        "image/png",
        "image/webp",
      ],
    });

    const updatedProposal = await this.repository.update(id, {
      paymentProofStorageKey: storageKey,

      paymentProofUrl: null,

      paymentProofUploadedAt: new Date(),
    });
    return decryptProposal(updatedProposal);
  }

  async validateUploadedFiles(data: CreateProposalInput) {
    if (data.paymentProofStorageKey) {
      await storage.validatePrivateObject(data.paymentProofStorageKey, {
        maxSize: 10 * 1024 * 1024,
        allowedContentTypes: [
          "application/pdf",
          "image/jpeg",
          "image/png",
          "image/webp",
        ],
      });
    }

    await Promise.all(
      data.referenceFilesJson.map((file) =>
        storage.validatePrivateObject(file.storageKey, {
          maxSize: 15 * 1024 * 1024,
          allowedContentTypes: [
            "application/pdf",
            "image/jpeg",
            "image/png",
            "image/webp",
          ],
        }),
      ),
    );
  }

  async getPaymentProofDownloadUrl(id: string) {
    const proposal = await this.findById(id);
    if (!proposal?.paymentProofStorageKey) {
      throw new AppError("Comprovante não encontrado.", 404);
    }

    return storage.getPrivateDownloadUrl(proposal.paymentProofStorageKey);
  }

  async getReferenceFileDownloadUrl(id: string, index: number) {
    const proposal = await this.findById(id);
    const files = Array.isArray(proposal?.referenceFilesJson)
      ? proposal.referenceFilesJson
      : [];
    const file = files[index];

    if (
      !file ||
      typeof file !== "object" ||
      !("storageKey" in file) ||
      typeof file.storageKey !== "string"
    ) {
      throw new AppError("Arquivo de referência não encontrado.", 404);
    }

    return storage.getPrivateDownloadUrl(file.storageKey);
  }

  /*
   |--------------------------------------------------------------------------
   | Dashboard
   |--------------------------------------------------------------------------
   */

  async count() {
    return this.repository.count();
  }

  async countNew() {
    return this.repository.countByStatus("NEW");
  }

  async latest(limit = 5) {
    return (await this.repository.findLatest(limit)).map(decryptProposal);
  }
}
