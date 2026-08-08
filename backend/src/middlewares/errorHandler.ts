import type {
  NextFunction,
  Request,
  Response,
} from "express";

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
  /**
   * ZOD
   */
  if (error instanceof ZodError) {
    console.error("Erro de validação", {
      method: request.method,
      path: request.originalUrl,
      issues: error.flatten(),
    });

    return response.status(400).json({
      message: "Erro de validação.",
      issues: error.flatten(),
    });
  }

  /**
   * APP ERROR
   */
  if (error instanceof AppError) {
    console.error("Erro da aplicação", {
      method: request.method,
      path: request.originalUrl,
      status: error.statusCode,
      message: error.message,
    });

    return response.status(error.statusCode).json({
      message: error.message,
    });
  }

  /**
   * PRISMA - ERROS CONHECIDOS
   */
  if (
    error instanceof
    Prisma.PrismaClientKnownRequestError
  ) {
    console.error("Erro conhecido do Prisma", {
      method: request.method,
      path: request.originalUrl,
      code: error.code,
      meta: error.meta,
      message: error.message,
    });

    /**
     * Registro duplicado
     */
    if (error.code === "P2002") {
      return response.status(409).json({
        message:
          "Já existe um registro com estes dados.",
      });
    }

    /**
     * Registro não encontrado
     */
    if (error.code === "P2025") {
      return response.status(404).json({
        message:
          "Registro não encontrado.",
      });
    }

    /**
     * Tabela não existe
     */
    if (error.code === "P2021") {
      return response.status(500).json({
        message:
          "A estrutura do banco de dados está desatualizada.",
        code: error.code,
      });
    }

    /**
     * Coluna não existe
     */
    if (error.code === "P2022") {
      return response.status(500).json({
        message:
          "A estrutura do banco de dados está incompatível com a aplicação.",
        code: error.code,
      });
    }

    /**
     * Erro genérico conhecido do Prisma
     */
    return response.status(500).json({
      message:
        "Erro ao acessar o banco de dados.",
      code: error.code,
    });
  }

  /**
   * PRISMA - ERROS DE VALIDAÇÃO
   */
  if (
    error instanceof
    Prisma.PrismaClientValidationError
  ) {
    console.error(
      "Erro de validação do Prisma",
      {
        method: request.method,
        path: request.originalUrl,
        message: error.message,
      }
    );

    return response.status(500).json({
      message:
        "Erro de validação da consulta ao banco de dados.",
    });
  }

  /**
   * PRISMA - ERRO DE INICIALIZAÇÃO / CONEXÃO
   */
  if (
    error instanceof
    Prisma.PrismaClientInitializationError
  ) {
    console.error(
      "Erro de inicialização do Prisma",
      {
        method: request.method,
        path: request.originalUrl,
        message: error.message,
      }
    );

    return response.status(500).json({
      message:
        "Não foi possível conectar ao banco de dados.",
    });
  }

  /**
   * ERROS HTTP / EXPRESS / OUTROS
   */
  const httpError =
    error as HttpError;

  console.error(
    "Erro inesperado na API",
    {
      method: request.method,
      path: request.originalUrl,
      name: error.name,
      message: error.message,
      code: httpError.code,
      status:
        httpError.status ??
        httpError.statusCode,
      type: httpError.type,
      stack: error.stack,
    }
  );

  /**
   * Payload muito grande
   */
  if (
    httpError.status === 413 ||
    httpError.statusCode === 413
  ) {
    return response.status(413).json({
      message:
        "A solicitação é muito grande.",
    });
  }

  return response.status(500).json({
    message:
      "Erro interno do servidor.",
  });
}