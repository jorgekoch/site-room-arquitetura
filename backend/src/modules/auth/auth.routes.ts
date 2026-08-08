import { Router } from "express";
import { AuthController } from "./auth.controller";
import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post("/register-request", (request, response) =>
  authController.registerRequest(request, response)
);

authRoutes.get("/approve", (request, response) =>
  authController.approve(request, response)
);

authRoutes.post("/login", (request, response) =>
  authController.login(request, response)
);

authRoutes.get("/me", ensureAuthenticated, (request, response) =>
  authController.me(request, response)
);

authRoutes.patch(
  "/me",
  ensureAuthenticated,
  (request, response) =>
    authController.updateProfile(
      request,
      response
    )
);

authRoutes.patch(
  "/password",
  ensureAuthenticated,
  (request, response) =>
    authController.changePassword(
      request,
      response
    )
);

export { authRoutes };