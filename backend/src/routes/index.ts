import { Router } from "express";
import { proposalRoutes } from "../modules/proposal/proposal.routes";

const router = Router();

router.get("/health", (_request, response) => {
  return response.json({ ok: true });
});

router.use("/proposal-requests", proposalRoutes);

export { router };