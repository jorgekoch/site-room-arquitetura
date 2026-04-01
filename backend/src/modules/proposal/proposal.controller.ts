import type { Request, Response } from "express";
import {
  createProposalSchema,
  updateProposalNotesSchema,
  updateProposalStatusSchema,
} from "./proposal.schema";
import { ProposalService } from "./proposal.service";
import { AppError } from "../../utils/AppError";

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
  async create(request: Request, response: Response) {
    const body = {
      ...request.body,
      taxAgreement: request.body.taxAgreement === "true",
      reviewConfirmed: request.body.reviewConfirmed === "true",
      newConstruction: parseJsonField(request.body.newConstruction, {}),
      interiors: parseJsonField(request.body.interiors, { includedItems: [] }),
      renovation: parseJsonField(request.body.renovation, {}),
      consulting: parseJsonField(request.body.consulting, {}),
    };

    const data = createProposalSchema.parse(body);

    const uploadedFiles =
      (request.files as
        | {
            [fieldname: string]: Express.Multer.File[];
          }
        | undefined) ?? {};

    const referenceFiles = uploadedFiles.referenceFiles ?? [];
    const paymentProofFile = uploadedFiles.paymentProof?.[0] ?? null;

    const proposal = await proposalService.create(
      data,
      referenceFiles,
      paymentProofFile?.filename ?? null
    );

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