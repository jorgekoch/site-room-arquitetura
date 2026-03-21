import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { AppError } from "../utils/AppError";

type TokenPayload = {
  sub: string;
  role: string;
  adminId: string;
  email: string;
};

export function ensureAuthenticated(
  request: Request,
  _response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Missing authorization token", 401);
  }

  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    throw new AppError("Invalid authorization header", 401);
  }

  try {
    const decoded = jwt.verify(token, env.jwtSecret) as TokenPayload;

    request.user = {
      sub: decoded.sub,
      role: decoded.role,
      adminId: decoded.adminId,
      email: decoded.email,
    };

    return next();
  } catch {
    throw new AppError("Invalid or expired token", 401);
  }
}