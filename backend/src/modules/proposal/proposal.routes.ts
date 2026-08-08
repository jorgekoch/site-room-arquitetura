import { Router } from "express";
import { ProposalController } from "./proposal.controller";
import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";

const proposalRoutes = Router();
const proposalController = new ProposalController();

proposalRoutes.post(
  "/upload-url",
  (request, response) =>
    proposalController.getUploadUrl(request, response)
);

proposalRoutes.post(
  "/",
  (request, response) =>
    proposalController.create(request, response)
);

proposalRoutes.get(
  "/",
  ensureAuthenticated,
  (request, response) =>
    proposalController.list(request, response)
);

proposalRoutes.get(
  "/:id",
  ensureAuthenticated,
  (request, response) =>
    proposalController.show(request, response)
);

proposalRoutes.patch(
  "/:id/status",
  ensureAuthenticated,
  (request, response) =>
    proposalController.updateStatus(request, response)
);

proposalRoutes.patch(
  "/:id/notes",
  ensureAuthenticated,
  (request, response) =>
    proposalController.updateNotes(request, response)
);

proposalRoutes.patch(
  "/:id/payment-proof",
  ensureAuthenticated,
  (request, response) =>
    proposalController.updatePaymentProof(
      request,
      response
    )
);

export { proposalRoutes };