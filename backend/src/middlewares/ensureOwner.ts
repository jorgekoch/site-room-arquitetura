import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";

export function ensureOwner(
  request: Request,
  _response: Response,
  next: NextFunction
) {
  if (!request.user) {
    throw new AppError("Usuário não autenticado.", 401);
  }

  if (request.user.role !== "OWNER") {
    throw new AppError("Acesso permitido apenas para owner.", 403);
  }

  return next();
}