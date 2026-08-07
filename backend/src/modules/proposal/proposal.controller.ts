import type { Request, Response } from "express";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
  createProposalSchema,
  uploadUrlSchema,
  updateProposalNotesSchema,
  updateProposalStatusSchema,
} from "./proposal.schema";
import { ProposalService } from "./proposal.service";
import { AppError } from "../../utils/AppError";
import { r2 } from "../../config/r2";
import { env } from "../../config/env";

const proposalService = new ProposalService();

function parseJsonField<T>(value: unknown, fallback: T): T {
  if (!value || typeof value !== "string") return fallback;

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function getPublicFileUrl(storageKey: string) {
  return `${env.r2PublicUrl.replace(/\/$/, "")}/${storageKey}`;
}

function ensureStoredFilesBelongToR2(
  data: ReturnType<typeof createProposalSchema.parse>
) {
  if (data.paymentProofUrl || data.paymentProofStorageKey) {
    const isValidPaymentProof =
      Boolean(data.paymentProofUrl) &&
      Boolean(data.paymentProofStorageKey) &&
      data.paymentProofStorageKey!.startsWith("proposals/payment-proofs/") &&
      data.paymentProofUrl === getPublicFileUrl(data.paymentProofStorageKey!);

    if (!isValidPaymentProof) {
      throw new AppError("Comprovante de pagamento inválido.", 400);
    }
  }

  const hasInvalidReference = data.referenceFilesJson.some(
    (file) =>
      !file.storageKey.startsWith("proposals/references/") ||
      file.url !== getPublicFileUrl(file.storageKey)
  );

  if (hasInvalidReference) {
    throw new AppError("Arquivo de referência inválido.", 400);
  }
}

export class ProposalController {
  async getUploadUrl(
    request: Request,
    response: Response
  ) {
    const {
      fileName,
      fileType,
      kind,
    } = uploadUrlSchema.parse(request.body);

    const folder =
      kind === "payment-proof"
        ? "payment-proofs"
        : "references";

    const upload =
      await proposalService.generateUploadUrl(
        fileName,
        fileType,
        folder
      );

    return response.json(upload);
  }

  async create(request: Request, response: Response) {
    const body = {
      ...request.body,
      taxAgreement: request.body.taxAgreement === true || request.body.taxAgreement === "true",
      reviewConfirmed:
        request.body.reviewConfirmed === true ||
        request.body.reviewConfirmed === "true",
      newConstruction:
        typeof request.body.newConstruction === "string"
          ? parseJsonField(request.body.newConstruction, {})
          : request.body.newConstruction ?? {},
      interiors:
        typeof request.body.interiors === "string"
          ? parseJsonField(request.body.interiors, { includedItems: [] })
          : request.body.interiors ?? { includedItems: [] },
      renovation:
        typeof request.body.renovation === "string"
          ? parseJsonField(request.body.renovation, {})
          : request.body.renovation ?? {},
      consulting:
        typeof request.body.consulting === "string"
          ? parseJsonField(request.body.consulting, {})
          : request.body.consulting ?? {},
      referenceFilesJson:
        typeof request.body.referenceFilesJson === "string"
          ? parseJsonField(request.body.referenceFilesJson, [])
          : request.body.referenceFilesJson ?? [],
    };

    const data = createProposalSchema.parse(body);
    ensureStoredFilesBelongToR2(data);

    const proposal = await proposalService.create(data);

    return response.status(201).json({
      message: "Solicitação enviada com sucesso",
      proposal,
    });
  }

  async list(request: Request, response: Response) {
    const { status, projectType, search } = request.query;

    const proposals = await proposalService.list({
      status: typeof status === "string" ? status : undefined,
      projectType: typeof projectType === "string" ? projectType : undefined,
      search: typeof search === "string" ? search : undefined,
    });

    return response.json(proposals);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    if (!id || Array.isArray(id)) {
      throw new AppError("ID de solicitação inválido", 400);
    }

    const proposal = await proposalService.findById(id);

    if (!proposal) {
      throw new AppError("Solicitação não encontrada", 404);
    }

    return response.json(proposal);
  }

  async updateStatus(request: Request, response: Response) {
    const { id } = request.params;

    if (!id || Array.isArray(id)) {
      throw new AppError("ID de solicitação inválido", 400);
    }

    const data = updateProposalStatusSchema.parse(request.body);

    const proposal = await proposalService.updateStatus(id, data);

    return response.json({
      message: "Status atualizado com sucesso",
      proposal,
    });
  }

  async updateNotes(request: Request, response: Response) {
    const { id } = request.params;

    if (!id || Array.isArray(id)) {
      throw new AppError("ID de solicitação inválido", 400);
    }

    const data = updateProposalNotesSchema.parse(request.body);

    const proposal = await proposalService.updateNotes(id, data);

    return response.json({
      message: "Observações atualizadas com sucesso",
      proposal,
    });
  }

}
