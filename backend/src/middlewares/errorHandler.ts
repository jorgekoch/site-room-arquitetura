import type { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { AppError } from "../utils/AppError";

type HttpError = Error & {
  code?: string;
  status?: number;
  statusCode?: number;
  type?: string;
};

export function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  _next: NextFunction
) {
  if (error instanceof ZodError) {
    return response.status(400).json({
      message: "Validation error",
      issues: error.flatten(),
    });
  }

  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      message: error.message,
    });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const status = error.code === "P2002" ? 409 : error.code === "P2025" ? 404 : 500;

    console.error("Erro conhecido do Prisma", {
      method: request.method,
      path: request.originalUrl,
      code: error.code,
      meta: error.meta,
    });

    return response.status(status).json({
      message:
        status === 409
          ? "Já existe um registro com estes dados."
          : status === 404
          ? "Registro não encontrado."
          : "Não foi possível salvar a solicitação.",
    });
  }

  const httpError = error as HttpError;

  console.error("Erro inesperado na API", {
    method: request.method,
    path: request.originalUrl,
    name: error.name,
    message: error.message,
    code: httpError.code,
    status: httpError.status ?? httpError.statusCode,
    type: httpError.type,
    stack: error.stack,
  });

  if (httpError.status === 413 || httpError.statusCode === 413) {
    return response.status(413).json({
      message: "A solicitação é muito grande.",
    });
  }

  return response.status(500).json({
    message: "Internal server error",
  });
}
