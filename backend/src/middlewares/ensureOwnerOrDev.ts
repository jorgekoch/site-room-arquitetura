import type { NextFunction, Request, Response } from "express";

import { AppError } from "../utils/AppError";

export function ensureOwnerOrDev(
  request: Request,
  _response: Response,
  next: NextFunction,
) {
  if (!request.user) {
    throw new AppError("Usuário não autenticado.", 401);
  }

  if (request.user.role !== "OWNER" && request.user.role !== "DEV") {
    throw new AppError("Acesso restrito.", 403);
  }

  return next();
}
