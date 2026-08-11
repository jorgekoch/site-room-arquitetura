import { Router } from "express";
import { ProposalController } from "./proposal.controller";
import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";
import { ensureOwnerOrDev } from "../../middlewares/ensureOwnerOrDev";
import {
  proposalSubmissionRateLimit,
  proposalUploadRateLimit,
} from "../../middlewares/proposalRateLimit";

const proposalRoutes = Router();
const proposalController = new ProposalController();

proposalRoutes.post(
  "/upload-url",
  proposalUploadRateLimit,
  (request, response) => proposalController.getUploadUrl(request, response),
);

proposalRoutes.post("/", proposalSubmissionRateLimit, (request, response) =>
  proposalController.create(request, response),
);

proposalRoutes.get(
  "/:id/payment-proof/download",
  ensureAuthenticated,
  (request, response) =>
    proposalController.getPaymentProofDownload(request, response),
);

proposalRoutes.get(
  "/:id/reference-files/:index/download",
  ensureAuthenticated,
  (request, response) =>
    proposalController.getReferenceFileDownload(request, response),
);

proposalRoutes.get("/", ensureAuthenticated, (request, response) =>
  proposalController.list(request, response),
);

proposalRoutes.get("/export", ensureAuthenticated, (request, response) =>
  proposalController.export(request, response),
);

proposalRoutes.get("/:id", ensureAuthenticated, (request, response) =>
  proposalController.show(request, response),
);

proposalRoutes.patch("/:id/status", ensureAuthenticated, (request, response) =>
  proposalController.updateStatus(request, response),
);

proposalRoutes.patch("/:id/notes", ensureAuthenticated, (request, response) =>
  proposalController.updateNotes(request, response),
);

proposalRoutes.patch(
  "/:id/payment-proof",
  ensureAuthenticated,
  (request, response) =>
    proposalController.updatePaymentProof(request, response),
);

proposalRoutes.delete(
  "/:id",
  ensureAuthenticated,
  ensureOwnerOrDev,
  (request, response) => proposalController.remove(request, response),
);

export { proposalRoutes };
