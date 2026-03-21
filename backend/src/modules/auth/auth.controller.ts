import type { Request, Response } from "express";
import {
  loginSchema,
  registerAdminRequestSchema,
} from "./auth.schema";
import { AuthService } from "./auth.service";
import { AppError } from "../../utils/AppError";

const authService = new AuthService();

export class AuthController {
  async registerRequest(request: Request, response: Response) {
    const data = registerAdminRequestSchema.parse(request.body);

    const result = await authService.registerRequest(data);

    return response.status(201).json(result);
  }

  async approve(request: Request, response: Response) {
    const token = request.query.token;

    if (!token || typeof token !== "string") {
      throw new AppError("Token de aprovação inválido.", 400);
    }

    await authService.approveByToken(token);

    return response.send(`
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Acesso aprovado</title>
        </head>
        <body style="font-family: Arial, Helvetica, sans-serif; padding: 32px; color: #111827;">
          <h1>Acesso aprovado com sucesso ✅</h1>
          <p>O novo admin já pode acessar o painel.</p>
        </body>
      </html>
    `);
  }

  async login(request: Request, response: Response) {
    const data = loginSchema.parse(request.body);

    const result = await authService.login(data);

    return response.json(result);
  }

  async me(request: Request, response: Response) {
    if (!request.user?.adminId) {
      throw new AppError("Usuário não autenticado.", 401);
    }

    const admin = await authService.me(request.user.adminId);

    return response.json({
      user: admin,
    });
  }
}