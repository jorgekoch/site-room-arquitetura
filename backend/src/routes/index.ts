import { Router } from "express";

import { prisma } from "../database/prisma";
import { proposalRoutes } from "../modules/proposal/proposal.routes";
import { authRoutes } from "../modules/auth/auth.routes";
import { adminUsersRoutes } from "../modules/admin-users/admin-users.routes";
import { projectRoutes } from "../modules/project/project.routes";
import { dashboardRoutes } from "../modules/dashboard/dashboard.routes";
import { settingsRoutes } from "../modules/settings/settings.routes";
import { blogRoutes } from "../modules/blog/blog.routes";

const router = Router();

router.get("/health", async (_request, response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    return response.status(200).json({
      status: "ok",
      database: "ok",
    });
  } catch (error) {
    console.error("Health check do banco falhou", error);

    return response.status(503).json({
      status: "degraded",
      database: "unavailable",
    });
  }
});

router.use("/admin-auth", authRoutes);

router.use("/proposal-requests", proposalRoutes);

router.use("/admin-users", adminUsersRoutes);

router.use("/projects", projectRoutes);

router.use("/dashboard", dashboardRoutes);

router.use("/settings", settingsRoutes);

router.use("/blog", blogRoutes);

export { router };
