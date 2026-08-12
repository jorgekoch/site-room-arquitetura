import { Router } from "express";

import { proposalRoutes } from "../modules/proposal/proposal.routes";
import { authRoutes } from "../modules/auth/auth.routes";
import { adminUsersRoutes } from "../modules/admin-users/admin-users.routes";
import { projectRoutes } from "../modules/project/project.routes";
import { dashboardRoutes } from "../modules/dashboard/dashboard.routes";
import { settingsRoutes } from "../modules/settings/settings.routes";
import { blogRoutes } from "../modules/blog/blog.routes";

const router = Router();

router.get("/health", (_request, response) => {
  return response.json({
    ok: true,
  });
});

router.use("/admin-auth", authRoutes);

router.use("/proposal-requests", proposalRoutes);

router.use("/admin-users", adminUsersRoutes);

router.use("/projects", projectRoutes);

router.use("/dashboard", dashboardRoutes);

router.use("/settings", settingsRoutes);

router.use("/blog", blogRoutes);

export { router };
