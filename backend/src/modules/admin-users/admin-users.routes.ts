import { Router } from "express";
import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";
import { ensureOwner } from "../../middlewares/ensureOwner";
import { AdminUsersController } from "./admin-users.controller";

const adminUsersRoutes = Router();
const adminUsersController = new AdminUsersController();

adminUsersRoutes.use(ensureAuthenticated, ensureOwner);

adminUsersRoutes.get("/", (request, response) =>
  adminUsersController.list(request, response)
);

adminUsersRoutes.patch("/:id/approve", (request, response) =>
  adminUsersController.approve(request, response)
);

adminUsersRoutes.patch("/:id/activate", (request, response) =>
  adminUsersController.activate(request, response)
);

adminUsersRoutes.patch("/:id/deactivate", (request, response) =>
  adminUsersController.deactivate(request, response)
);

adminUsersRoutes.patch("/:id/role", (request, response) =>
  adminUsersController.updateRole(request, response)
);

adminUsersRoutes.delete("/:id", (request, response) =>
  adminUsersController.remove(request, response)
);

export { adminUsersRoutes };