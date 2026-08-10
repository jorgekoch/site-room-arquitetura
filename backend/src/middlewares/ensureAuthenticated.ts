import type {
  NextFunction,
  Request,
  Response,
} from "express";

import jwt from "jsonwebtoken";

import { prisma } from "../database/prisma";
import { env } from "../config/env";
import { AppError } from "../utils/AppError";

type TokenPayload = {
  sub: string;
  role: string;
  adminId: string;
  email: string;
  tokenVersion?: number;
};

export async function ensureAuthenticated(
  request: Request,
  _response: Response,
  next: NextFunction
) {
  const authHeader =
    request.headers.authorization;

  if (!authHeader) {
    throw new AppError(
      "Missing authorization token",
      401
    );
  }

  const [scheme, token] =
    authHeader.split(" ");

  if (
    scheme !== "Bearer" ||
    !token
  ) {
    throw new AppError(
      "Invalid authorization header",
      401
    );
  }

  try {
    const decoded =
      jwt.verify(
        token,
        env.jwtSecret
      ) as TokenPayload;

    if (!decoded.adminId) {
      throw new AppError(
        "Invalid authentication token",
        401
      );
    }

    const admin =
      await prisma.adminUser.findUnique({
        where: {
          id: decoded.adminId,
        },

        select: {
          id: true,
          role: true,
          approved: true,
          isActive: true,
          tokenVersion: true,
        },
      });

    if (!admin) {
      throw new AppError(
        "Usuário não encontrado.",
        401
      );
    }

    if (
      !admin.approved ||
      !admin.isActive
    ) {
      throw new AppError(
        "Usuário não autorizado.",
        401
      );
    }

    /**
     * Tokens antigos ficam inválidos
     * quando tokenVersion é incrementado.
     */
    if (
      decoded.tokenVersion !==
      admin.tokenVersion
    ) {
      throw new AppError(
        "Sessão inválida. Faça login novamente.",
        401
      );
    }

    request.user = {
      sub: decoded.sub,
      role: decoded.role,
      adminId: decoded.adminId,
      email: decoded.email,
    };

    return next();
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      "Invalid or expired token",
      401
    );
  }
}