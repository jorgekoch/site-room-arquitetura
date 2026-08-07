import { Router } from "express";
import { proposalRoutes } from "../modules/proposal/proposal.routes";
import { authRoutes } from "../modules/auth/auth.routes";
import { adminUsersRoutes } from "../modules/admin-users/admin-users.routes";
import { projectRoutes } from "../modules/project/project.routes";

const router = Router();

router.get("/health", (_request, response) => {
  return response.json({ ok: true });
});

router.use("/admin-auth", authRoutes);
router.use("/proposal-requests", proposalRoutes);
router.use("/admin-users", adminUsersRoutes);

router.use("/projects", projectRoutes);

export { router };