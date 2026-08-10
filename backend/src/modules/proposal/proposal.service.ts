import { Prisma } from "@prisma/client";

import { env } from "../../config/env";

import { storage } from "../../services/storage";

import { AppError } from "../../utils/AppError";

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

export class ProposalService {
  private repository = new ProposalRepository();

  async create(data: CreateProposalInput) {
    const projectDetails =
      data.projectType === "new-construction"
        ? {
            newConstruction:
              data.newConstruction ?? null,
          }
        : data.projectType === "interiors"
        ? {
            interiors:
              data.interiors ?? null,
          }
        : data.projectType === "renovation"
        ? {
            renovation:
              data.renovation ?? null,
          }
        : {
            consulting:
              data.consulting ?? null,
          };

    const proposal =
      await this.repository.create({
        email: data.email,

        fullName: data.fullName,

        cpf: data.cpf,

        address: data.address,

        birthDate: data.birthDate,

        phone: data.phone,

        socialProfile:
          data.socialProfile || null,

        preferredContactMethod:
          data.preferredContactMethod,

        preferredContactMethodOther:
          data.preferredContactMethodOther ||
          null,

        referralSource:
          data.referralSource,

        referralSourceOther:
          data.referralSourceOther || null,

        desiredWorkStart:
          data.desiredWorkStart,

        projectType:
          data.projectType,

        projectTypeOther:
          data.projectTypeOther || null,

        taxAgreement:
          data.taxAgreement,

        paymentMethod:
          data.paymentMethod,

        paymentMethodOther:
          data.paymentMethodOther || null,

        projectDetailsJson:
          projectDetails,

        referenceFilesJson: data.referenceFilesJson?.length
          ? data.referenceFilesJson.map(({ url: _url, ...file }) => file)
          : Prisma.JsonNull,

        pixKeySnapshot:
          data.paymentMethod === "pix"
            ? env.pixKey || null
            : null,

        paymentProofUrl: null,

        paymentProofStorageKey:
          data.paymentProofStorageKey ||
          null,

        paymentProofUploadedAt:
          data.paymentProofUrl
            ? new Date()
            : null,
      });

    void sendProposalNotificationEmail(
      proposal
    ).catch(console.error);

    void sendProposalConfirmationEmail(
      proposal
    ).catch(console.error);

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
        projectType:
          filters.projectType,
      }),

      ...(filters?.search && {
        OR: [
          {
            fullName: {
              contains:
                filters.search,
              mode:
                "insensitive" as const,
            },
          },
          {
            email: {
              contains:
                filters.search,
              mode:
                "insensitive" as const,
            },
          },
          {
            phone: {
              contains:
                filters.search,
              mode:
                "insensitive" as const,
            },
          },
        ],
      }),
    };

    return this.repository.findAll(where);
  }

  async findById(id: string) {
    return this.repository.findById(id);
  }

  async updateStatus(
    id: string,
    data: UpdateProposalStatusInput
  ) {
    const proposal =
      await this.repository.update(id, {
        status: data.status,
      });

    try {
      await sendProposalStatusChangedEmail(
        proposal
      );
    } catch (error) {
      console.error(error);
    }

    return proposal;
  }

  async updateNotes(
    id: string,
    data: UpdateProposalNotesInput
  ) {
    return this.repository.update(id, {
      internalNotes:
        data.internalNotes || "",
    });
  }

  async generateUploadUrl(
    fileName: string,
    fileType: string,
    folder:
      | "payment-proofs"
      | "references"
  ) {
    return storage.generatePrivateSignedUploadUrl({
      folder: `proposals/${folder}`,

      fileName,

      fileType,
    });
  }

  async updatePaymentProof(
    id: string,
    storageKey: string
  ) {
    const proposal =
      await this.repository.findById(id);

    if (!proposal) {
      throw new AppError(
        "Solicitação não encontrada.",
        404
      );
    }

    await storage.validatePrivateObject(storageKey, {
      maxSize: 10 * 1024 * 1024,
      allowedContentTypes: ["application/pdf", "image/jpeg", "image/png", "image/webp"],
    });

    return this.repository.update(id, {
      paymentProofStorageKey:
        storageKey,

      paymentProofUrl: null,

      paymentProofUploadedAt:
        new Date(),
    });
  }

  async validateUploadedFiles(data: CreateProposalInput) {
    if (data.paymentProofStorageKey) {
      await storage.validatePrivateObject(data.paymentProofStorageKey, {
        maxSize: 10 * 1024 * 1024,
        allowedContentTypes: ["application/pdf", "image/jpeg", "image/png", "image/webp"],
      });
    }

    await Promise.all(data.referenceFilesJson.map((file) =>
      storage.validatePrivateObject(file.storageKey, {
        maxSize: 15 * 1024 * 1024,
        allowedContentTypes: ["application/pdf", "image/jpeg", "image/png", "image/webp"],
      })
    ));
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

    if (!file || typeof file !== "object" || !("storageKey" in file) || typeof file.storageKey !== "string") {
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
    return this.repository.countByStatus(
      "NEW"
    );
  }

  async latest(limit = 5) {
    return this.repository.findLatest(
      limit
    );
  }
}
