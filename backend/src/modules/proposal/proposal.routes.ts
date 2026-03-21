import { Router } from "express";
import { ProposalController } from "./proposal.controller";
import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";
import { upload } from "../../config/upload";

const proposalRoutes = Router();
const proposalController = new ProposalController();

proposalRoutes.post("/", (request, response) =>
  proposalController.create(request, response)
);

proposalRoutes.get("/", ensureAuthenticated, (request, response) =>
  proposalController.list(request, response)
);

proposalRoutes.get("/:id", ensureAuthenticated, (request, response) =>
  proposalController.show(request, response)
);

proposalRoutes.patch("/:id/status", ensureAuthenticated, (request, response) =>
  proposalController.updateStatus(request, response)
);

proposalRoutes.patch("/:id/notes", ensureAuthenticated, (request, response) =>
  proposalController.updateNotes(request, response)
);

proposalRoutes.post(
  "/:id/payment-proof",
  ensureAuthenticated,
  upload.single("file"),
  (request, response) => proposalController.uploadPaymentProof(request, response)
);

export { proposalRoutes };