import type { Request, Response } from "express";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
  createProposalSchema,
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

export class ProposalController {
  async getUploadUrl(request: Request, response: Response) {
    const { fileName, fileType, kind } = request.body;

    if (!fileName || !fileType) {
      throw new AppError("Dados do arquivo não enviados.", 400);
    }

    const safeFileName = String(fileName)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9._-]/g, "");

    const folder = kind === "payment-proof" ? "payment-proofs" : "references";
    const storageKey = `proposals/${folder}/${Date.now()}-${safeFileName}`;

    const command = new PutObjectCommand({
      Bucket: env.r2Bucket,
      Key: storageKey,
      ContentType: fileType,
    });

    const uploadUrl = await getSignedUrl(r2, command, { expiresIn: 60 });

    return response.json({
      uploadUrl,
      storageKey,
      fileName: `${Date.now()}-${safeFileName}`,
      fileUrl: `${env.r2PublicUrl}/${storageKey}`,
    });
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

  async uploadPaymentProofPublic(request: Request, response: Response) {
    const { id } = request.params;

    if (!id || Array.isArray(id)) {
      throw new AppError("ID de solicitação inválido", 400);
    }

    if (!request.file) {
      throw new AppError("Comprovante não enviado", 400);
    }

    const proposal = await proposalService.uploadPaymentProof(
      id,
      request.file.filename
    );

    return response.json({
      message: "Comprovante enviado com sucesso",
      proposal,
    });
  }

  async uploadPaymentProofAdmin(request: Request, response: Response) {
    const { id } = request.params;

    if (!id || Array.isArray(id)) {
      throw new AppError("ID de solicitação inválido", 400);
    }

    if (!request.file) {
      throw new AppError("Comprovante não enviado", 400);
    }

    const proposal = await proposalService.uploadPaymentProof(
      id,
      request.file.filename
    );

    return response.json({
      message: "Comprovante enviado com sucesso",
      proposal,
    });
  }
}