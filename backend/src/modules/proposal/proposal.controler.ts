import type { Request, Response } from "express";
import { createProposalSchema } from "./proposal.schema";
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

  async list(_request: Request, response: Response) {
    const proposals = await proposalService.list();

    return response.json(proposals);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const proposal = await proposalService.findById(id);

    if (!proposal) {
      throw new AppError("Proposal request not found", 404);
    }

    return response.json(proposal);
  }
}