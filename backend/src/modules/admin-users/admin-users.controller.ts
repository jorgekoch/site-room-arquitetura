import type { Request, Response } from "express";
import { AppError } from "../../utils/AppError";
import { AdminUsersService } from "./admin-users.service";
import { updateAdminRoleSchema } from "./admin-users.schema";

const adminUsersService = new AdminUsersService();

export class AdminUsersController {
  async list(_request: Request, response: Response) {
    const admins = await adminUsersService.list();

    return response.json(admins);
  }

  async approve(request: Request, response: Response) {
    const { id } = request.params;

    if (!id || Array.isArray(id)) {
      throw new AppError("ID inválido.", 400);
    }

    const admin = await adminUsersService.approve(id);

    return response.json({
      message: "Admin aprovado com sucesso.",
      admin,
    });
  }

  async activate(request: Request, response: Response) {
    const { id } = request.params;

    if (!id || Array.isArray(id)) {
      throw new AppError("ID inválido.", 400);
    }

    const admin = await adminUsersService.activate(id);

    return response.json({
      message: "Admin ativado com sucesso.",
      admin,
    });
  }

  async deactivate(request: Request, response: Response) {
    const { id } = request.params;

    if (!id || Array.isArray(id)) {
      throw new AppError("ID inválido.", 400);
    }

    if (!request.user?.adminId) {
      throw new AppError("Usuário não autenticado.", 401);
    }

    const admin = await adminUsersService.deactivate(id, request.user.adminId);

    return response.json({
      message: "Admin desativado com sucesso.",
      admin,
    });
  }

  async updateRole(request: Request, response: Response) {
    const { id } = request.params;

    if (!id || Array.isArray(id)) {
      throw new AppError("ID inválido.", 400);
    }

    if (!request.user?.adminId) {
      throw new AppError("Usuário não autenticado.", 401);
    }

    const data = updateAdminRoleSchema.parse(request.body);

    const admin = await adminUsersService.updateRole(
      id,
      data,
      request.user.adminId
    );

    return response.json({
      message: "Papel atualizado com sucesso.",
      admin,
    });
  }

  async remove(request: Request, response: Response) {
    const { id } = request.params;

    if (!id || Array.isArray(id)) {
      throw new AppError("ID inválido.", 400);
    }

    if (!request.user?.adminId) {
      throw new AppError("Usuário não autenticado.", 401);
    }

    await adminUsersService.remove(id, request.user.adminId);

    return response.json({
      message: "Admin removido com sucesso.",
    });
  }
}