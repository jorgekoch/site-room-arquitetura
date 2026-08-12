import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import { prisma } from "../../database/prisma";
import { env } from "../../config/env";

import type {
  LoginInput,
  RegisterAdminRequestInput,
  UpdateAdminProfileInput,
  ChangeAdminPasswordInput,
  ForgotPasswordInput,
  ResetPasswordInput,
} from "./auth.schema";

import { AppError } from "../../utils/AppError";

import {
  sendAdminApprovalRequestEmail,
  sendAdminApprovedEmail,
  sendAdminPasswordResetEmail,
  sendAdminPasswordResetConfirmationEmail,
} from "./auth.mail";

function hashResetToken(token: string) {
  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
}

function hashApprovalToken(token: string) {
  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
}

export class AuthService {
  async registerRequest(data: RegisterAdminRequestInput) {
    const email = data.email.trim().toLowerCase();

    const existing = await prisma.adminUser.findUnique({
      where: { email },
    });

    const passwordHash = await bcrypt.hash(data.password, 10);

    const rawApprovalToken = crypto.randomBytes(32).toString("hex");
    const approvalToken = hashApprovalToken(rawApprovalToken);

    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 48);

    let admin;

    if (existing) {
      if (existing.approved && existing.isActive) {
        throw new AppError(
          "Já existe um admin ativo com este e-mail.",
          409,
        );
      }

      admin = await prisma.adminUser.update({
        where: { email },
        data: {
          name: data.name,
          passwordHash,
          approved: false,
          isActive: false,
          approvalToken,
          approvalTokenExpiresAt: expiresAt,
        },
      });
    } else {
      admin = await prisma.adminUser.create({
        data: {
          name: data.name,
          email,
          passwordHash,
          approved: false,
          isActive: false,
          approvalToken,
          approvalTokenExpiresAt: expiresAt,
        },
      });
    }

    try {
      await sendAdminApprovalRequestEmail(admin, rawApprovalToken);
    } catch (error) {
      console.error("Erro ao enviar e-mail de aprovação admin:", error);
    }

    return {
      message:
        "Solicitação enviada com sucesso. Aguarde a aprovação da responsável.",
    };
  }

  async approveByToken(token: string) {
    const hashedToken = hashApprovalToken(token);

    const admin = await prisma.adminUser.findFirst({
      where: { approvalToken: hashedToken },
    });

    if (!admin) {
      throw new AppError("Token de aprovação inválido.", 400);
    }

    if (
      !admin.approvalTokenExpiresAt ||
      admin.approvalTokenExpiresAt < new Date()
    ) {
      throw new AppError("Token de aprovação expirado.", 400);
    }

    const approvedAdmin = await prisma.adminUser.update({
      where: { id: admin.id },
      data: {
        approved: true,
        isActive: true,
        approvalToken: null,
        approvalTokenExpiresAt: null,
      },
    });

    try {
      await sendAdminApprovedEmail(approvedAdmin);
    } catch (error) {
      console.error(
        "Erro ao enviar e-mail de confirmação do admin:",
        error,
      );
    }

    return approvedAdmin;
  }

  async login(data: LoginInput) {
    const normalizedEmail = data.email.trim().toLowerCase();

    const admin = await prisma.adminUser.findUnique({
      where: { email: normalizedEmail },
    });

    if (!admin) {
      throw new AppError("Credenciais inválidas.", 401);
    }

    if (!admin.approved || !admin.isActive) {
      throw new AppError(
        "Seu acesso ainda não foi aprovado.",
        403,
      );
    }

    const passwordMatches = await bcrypt.compare(
      data.password,
      admin.passwordHash,
    );

    if (!passwordMatches) {
      throw new AppError("Credenciais inválidas.", 401);
    }

    const token = jwt.sign(
      {
        sub: admin.email,
        role: admin.role,
        adminId: admin.id,
        email: admin.email,
        tokenVersion: admin.tokenVersion,
      },
      env.jwtSecret,
      {
        expiresIn: "7d",
      },
    );

    return {
      token,
      user: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    };
  }

  async me(adminId: string) {
    const admin = await prisma.adminUser.findUnique({
      where: { id: adminId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        approved: true,
        isActive: true,
      },
    });

    if (!admin) {
      throw new AppError("Admin não encontrado.", 404);
    }

    return admin;
  }

  async updateProfile(adminId: string, data: UpdateAdminProfileInput) {
    const admin = await prisma.adminUser.findUnique({
      where: { id: adminId },
    });

    if (!admin) {
      throw new AppError("Admin não encontrado.", 404);
    }

    const email = data.email.trim().toLowerCase();

    const existing = await prisma.adminUser.findFirst({
      where: {
        email,
        NOT: { id: adminId },
      },
    });

    if (existing) {
      throw new AppError(
        "Já existe um administrador com este e-mail.",
        409,
      );
    }

    return prisma.adminUser.update({
      where: { id: adminId },
      data: {
        name: data.name.trim(),
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        approved: true,
        isActive: true,
      },
    });
  }

  async changePassword(
    adminId: string,
    data: ChangeAdminPasswordInput,
  ) {
    const admin = await prisma.adminUser.findUnique({
      where: { id: adminId },
    });

    if (!admin) {
      throw new AppError("Admin não encontrado.", 404);
    }

    const passwordMatches = await bcrypt.compare(
      data.currentPassword,
      admin.passwordHash,
    );

    if (!passwordMatches) {
      throw new AppError("Senha atual inválida.", 400);
    }

    const passwordHash = await bcrypt.hash(data.newPassword, 10);

    await prisma.adminUser.update({
      where: { id: adminId },
      data: {
        passwordHash,
        tokenVersion: {
          increment: 1,
        },
      },
    });
  }

  async forgotPassword(data: ForgotPasswordInput) {
    const email = data.email.trim().toLowerCase();

    const genericResponse = {
      message:
        "Se existir uma conta com este e-mail, enviaremos instruções para redefinir a senha.",
    };

    const admin = await prisma.adminUser.findUnique({
      where: { email },
    });

    if (!admin || !admin.approved || !admin.isActive) {
      return genericResponse;
    }

    const rawToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = hashResetToken(rawToken);
    const expiresAt = new Date(Date.now() + 1000 * 60 * 30);

    await prisma.adminUser.update({
      where: { id: admin.id },
      data: {
        passwordResetToken: tokenHash,
        passwordResetExpiresAt: expiresAt,
      },
    });

    try {
      await sendAdminPasswordResetEmail(admin, rawToken);
    } catch (error) {
      console.error("Erro ao enviar e-mail de reset:", error);
    }

    return genericResponse;
  }

  async resetPassword(data: ResetPasswordInput) {
    const tokenHash = hashResetToken(data.token);

    const admin = await prisma.adminUser.findFirst({
      where: {
        passwordResetToken: tokenHash,
      },
    });

    if (!admin) {
      throw new AppError("Token inválido ou expirado.", 400);
    }

    if (
      !admin.passwordResetExpiresAt ||
      admin.passwordResetExpiresAt < new Date()
    ) {
      throw new AppError("Token inválido ou expirado.", 400);
    }

    const passwordHash = await bcrypt.hash(data.newPassword, 10);

    const updatedAdmin = await prisma.adminUser.update({
      where: { id: admin.id },
      data: {
        passwordHash,
        passwordResetToken: null,
        passwordResetExpiresAt: null,
        tokenVersion: {
          increment: 1,
        },
      },
    });

    try {
      await sendAdminPasswordResetConfirmationEmail(updatedAdmin);
    } catch (error) {
      console.error(
        "Erro ao enviar confirmação de reset:",
        error,
      );
    }

    return {
      message:
        "Senha redefinida com sucesso. Faça login novamente.",
    };
  }
}
