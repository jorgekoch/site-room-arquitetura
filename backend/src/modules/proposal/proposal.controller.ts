import type { Request, Response } from "express";
import {
  createProposalSchema,
  updateProposalNotesSchema,
  updateProposalStatusSchema,
} from "./proposal.schema";
import { ProposalService } from "./proposal.service";
import { AppError } from "../../utils/AppError";

const proposalService = new ProposalService();

export class ProposalController {
  async create(request: Request, response: Response) {
    const data = createProposalSchema.parse(request.body);

    const proposal = await proposalService.create(data);

    return response.status(201).json({
      message: "Proposal request created successfully",
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
      throw new AppError("Invalid proposal request id", 400);
    }

    const proposal = await proposalService.findById(id);

    if (!proposal) {
      throw new AppError("Proposal request not found", 404);
    }

    return response.json(proposal);
  }

  async updateStatus(request: Request, response: Response) {
    const { id } = request.params;

    if (!id || Array.isArray(id)) {
      throw new AppError("Invalid proposal request id", 400);
    }

    const data = updateProposalStatusSchema.parse(request.body);

    const proposal = await proposalService.updateStatus(id, data);

    return response.json({
      message: "Proposal status updated successfully",
      proposal,
    });
  }

  async updateNotes(request: Request, response: Response) {
    const { id } = request.params;

    if (!id || Array.isArray(id)) {
      throw new AppError("Invalid proposal request id", 400);
    }

    const data = updateProposalNotesSchema.parse(request.body);

    const proposal = await proposalService.updateNotes(id, data);

    return response.json({
      message: "Proposal notes updated successfully",
      proposal,
    });
  }

  async uploadPaymentProof(request: Request, response: Response) {
    const { id } = request.params;

    if (!id || Array.isArray(id)) {
      throw new AppError("Invalid proposal request id", 400);
    }

    if (!request.file) {
      throw new AppError("File not provided", 400);
    }

    const proposal = await proposalService.uploadPaymentProof(
      id,
      request.file.filename
    );

    return response.json({
      message: "Payment proof uploaded successfully",
      proposal,
    });
  }
}