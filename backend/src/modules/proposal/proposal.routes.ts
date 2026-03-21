import { Router } from "express";
import { ProposalController } from "./proposal.controller";

const proposalRoutes = Router();
const proposalController = new ProposalController();

proposalRoutes.post("/", (request, response) =>
  proposalController.create(request, response)
);

proposalRoutes.get("/", (request, response) =>
  proposalController.list(request, response)
);

proposalRoutes.get("/:id", (request, response) =>
  proposalController.show(request, response)
);

export { proposalRoutes };