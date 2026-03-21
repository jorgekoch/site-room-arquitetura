import { prisma } from "../../database/prisma";
import type { UpdateAdminRoleInput } from "./admin-users.schema";
import { AppError } from "../../utils/AppError";

export class AdminUsersService {
  async list() {
    return prisma.adminUser.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        approved: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async approve(id: string) {
    const admin = await prisma.adminUser.findUnique({
      where: { id },
    });

    if (!admin) {
      throw new AppError("Admin não encontrado.", 404);
    }

    return prisma.adminUser.update({
      where: { id },
      data: {
        approved: true,
        isActive: true,
        approvalToken: null,
        approvalTokenExpiresAt: null,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        approved: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async activate(id: string) {
    const admin = await prisma.adminUser.findUnique({
      where: { id },
    });

    if (!admin) {
      throw new AppError("Admin não encontrado.", 404);
    }

    return prisma.adminUser.update({
      where: { id },
      data: {
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        approved: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async deactivate(id: string, currentAdminId: string) {
    if (id === currentAdminId) {
      throw new AppError("Você não pode desativar seu próprio acesso.", 400);
    }

    const admin = await prisma.adminUser.findUnique({
      where: { id },
    });

    if (!admin) {
      throw new AppError("Admin não encontrado.", 404);
    }

    return prisma.adminUser.update({
      where: { id },
      data: {
        isActive: false,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        approved: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async updateRole(id: string, data: UpdateAdminRoleInput, currentAdminId: string) {
    if (id === currentAdminId) {
      throw new AppError("Você não pode alterar seu próprio papel.", 400);
    }

    const admin = await prisma.adminUser.findUnique({
      where: { id },
    });

    if (!admin) {
      throw new AppError("Admin não encontrado.", 404);
    }

    return prisma.adminUser.update({
      where: { id },
      data: {
        role: data.role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        approved: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async remove(id: string, currentAdminId: string) {
    if (id === currentAdminId) {
      throw new AppError("Você não pode excluir seu próprio acesso.", 400);
    }

    const admin = await prisma.adminUser.findUnique({
      where: { id },
    });

    if (!admin) {
      throw new AppError("Admin não encontrado.", 404);
    }

    await prisma.adminUser.delete({
      where: { id },
    });

    return { success: true };
  }
}