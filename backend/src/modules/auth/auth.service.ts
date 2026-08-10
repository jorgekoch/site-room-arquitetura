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

export class AuthService {
  async registerRequest(
    data: RegisterAdminRequestInput
  ) {
    const email =
      data.email.trim().toLowerCase();

    const existing =
      await prisma.adminUser.findUnique({
        where: { email },
      });

    const passwordHash =
      await bcrypt.hash(
        data.password,
        10
      );

    const approvalToken =
      crypto
        .randomBytes(32)
        .toString("hex");

    const expiresAt =
      new Date(
        Date.now() +
          1000 *
            60 *
            60 *
            48
      );

    let admin;

    if (existing) {
      if (
        existing.approved &&
        existing.isActive
      ) {
        throw new AppError(
          "Já existe um admin ativo com este e-mail.",
          409
        );
      }

      admin =
        await prisma.adminUser.update({
          where: { email },

          data: {
            name: data.name,
            passwordHash,
            approved: false,
            isActive: false,
            approvalToken,
            approvalTokenExpiresAt:
              expiresAt,
          },
        });
    } else {
      admin =
        await prisma.adminUser.create({
          data: {
            name: data.name,
            email,
            passwordHash,
            approved: false,
            isActive: false,
            approvalToken,
            approvalTokenExpiresAt:
              expiresAt,
          },
        });
    }

    try {
      await sendAdminApprovalRequestEmail(
        admin,
        approvalToken
      );
    } catch (error) {
      console.error(
        "Erro ao enviar e-mail de aprovação admin:",
        error
      );
    }

    return {
      message:
        "Solicitação enviada com sucesso. Aguarde a aprovação da responsável.",
    };
  }

  async approveByToken(token: string) {
    const admin =
      await prisma.adminUser.findFirst({
        where: {
          approvalToken: token,
        },
      });

    if (!admin) {
      throw new AppError(
        "Token de aprovação inválido.",
        400
      );
    }

    if (
      !admin.approvalTokenExpiresAt ||
      admin.approvalTokenExpiresAt <
        new Date()
    ) {
      throw new AppError(
        "Token de aprovação expirado.",
        400
      );
    }

    const approvedAdmin =
      await prisma.adminUser.update({
        where: {
          id: admin.id,
        },

        data: {
          approved: true,
          isActive: true,
          approvalToken: null,
          approvalTokenExpiresAt:
            null,
        },
      });

    try {
      await sendAdminApprovedEmail(
        approvedAdmin
      );
    } catch (error) {
      console.error(
        "Erro ao enviar e-mail de confirmação do admin:",
        error
      );
    }

    return approvedAdmin;
  }

  async login(data: LoginInput) {
    const normalizedEmail =
      data.email.trim().toLowerCase();

    const admin =
      await prisma.adminUser.findUnique({
        where: {
          email: normalizedEmail,
        },
      });

    if (!admin) {
      throw new AppError(
        "Credenciais inválidas.",
        401
      );
    }

    if (
      !admin.approved ||
      !admin.isActive
    ) {
      throw new AppError(
        "Seu acesso ainda não foi aprovado.",
        403
      );
    }

    const passwordMatches =
      await bcrypt.compare(
        data.password,
        admin.passwordHash
      );

    if (!passwordMatches) {
      throw new AppError(
        "Credenciais inválidas.",
        401
      );
    }

    const token = jwt.sign(
      {
        sub: admin.email,
        role: admin.role,
        adminId: admin.id,
        email: admin.email,
        tokenVersion:
          admin.tokenVersion,
      },
      env.jwtSecret,
      {
        expiresIn: "7d",
      }
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
    const admin =
      await prisma.adminUser.findUnique({
        where: {
          id: adminId,
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

    if (!admin) {
      throw new AppError(
        "Admin não encontrado.",
        404
      );
    }

    return admin;
  }

  async updateProfile(
    adminId: string,
    data: UpdateAdminProfileInput
  ) {
    const admin =
      await prisma.adminUser.findUnique({
        where: {
          id: adminId,
        },
      });

    if (!admin) {
      throw new AppError(
        "Admin não encontrado.",
        404
      );
    }

    const email =
      data.email.trim().toLowerCase();

    const existing =
      await prisma.adminUser.findFirst({
        where: {
          email,

          NOT: {
            id: adminId,
          },
        },
      });

    if (existing) {
      throw new AppError(
        "Já existe um administrador com este e-mail.",
        409
      );
    }

    return prisma.adminUser.update({
      where: {
        id: adminId,
      },

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
    data: ChangeAdminPasswordInput
  ) {
    const admin =
      await prisma.adminUser.findUnique({
        where: {
          id: adminId,
        },
      });

    if (!admin) {
      throw new AppError(
        "Admin não encontrado.",
        404
      );
    }

    const passwordMatches =
      await bcrypt.compare(
        data.currentPassword,
        admin.passwordHash
      );

    if (!passwordMatches) {
      throw new AppError(
        "A senha atual está incorreta.",
        400
      );
    }

    if (
      data.currentPassword ===
      data.newPassword
    ) {
      throw new AppError(
        "A nova senha deve ser diferente da senha atual.",
        400
      );
    }

    const newPasswordHash =
      await bcrypt.hash(
        data.newPassword,
        10
      );

    await prisma.adminUser.update({
      where: {
        id: adminId,
      },

      data: {
        passwordHash:
          newPasswordHash,
      },
    });

    return {
      success: true,
    };
  }

  /**
   * Solicita a recuperação de senha.
   *
   * A resposta é propositalmente genérica,
   * independentemente de o e-mail existir.
   */
  async forgotPassword(
    data: ForgotPasswordInput
  ) {
    const email =
      data.email.trim().toLowerCase();

    const genericResponse = {
      message:
        "Se o e-mail estiver cadastrado, você receberá um link para redefinir sua senha.",
    };

    const admin =
      await prisma.adminUser.findUnique({
        where: {
          email,
        },
      });

    if (
      !admin ||
      !admin.approved ||
      !admin.isActive
    ) {
      return genericResponse;
    }

    const rawToken =
      crypto
        .randomBytes(32)
        .toString("hex");

    const tokenHash =
      hashResetToken(rawToken);

    const expiresAt =
      new Date(
        Date.now() +
          30 * 60 * 1000
      );

    await prisma.adminUser.update({
      where: {
        id: admin.id,
      },

      data: {
        passwordResetTokenHash:
          tokenHash,

        passwordResetTokenExpiresAt:
          expiresAt,
      },
    });

    try {
      await sendAdminPasswordResetEmail(
        admin,
        rawToken
      );
    } catch (error) {
      console.error(
        "Erro ao enviar e-mail de recuperação de senha:",
        error
      );
    }

    return genericResponse;
  }

  /**
   * Redefine a senha utilizando o token
   * enviado por e-mail.
   */
  async resetPassword(
    data: ResetPasswordInput
  ) {
    const tokenHash =
      hashResetToken(data.token);

    const admin =
      await prisma.adminUser.findFirst({
        where: {
          passwordResetTokenHash:
            tokenHash,
        },
      });

    if (!admin) {
      throw new AppError(
        "Token de recuperação inválido ou expirado.",
        400
      );
    }

    if (
      !admin.passwordResetTokenExpiresAt ||
      admin.passwordResetTokenExpiresAt <
        new Date()
    ) {
      throw new AppError(
        "Token de recuperação inválido ou expirado.",
        400
      );
    }

    if (
      !admin.approved ||
      !admin.isActive
    ) {
      throw new AppError(
        "Não foi possível redefinir a senha deste acesso.",
        403
      );
    }

    const newPasswordHash =
      await bcrypt.hash(
        data.newPassword,
        10
      );

    const updatedAdmin =
      await prisma.adminUser.update({
        where: {
          id: admin.id,
        },

        data: {
          passwordHash:
            newPasswordHash,

          passwordResetTokenHash:
            null,

          passwordResetTokenExpiresAt:
            null,

          tokenVersion: {
            increment: 1,
          },
        },
      });

    try {
      await sendAdminPasswordResetConfirmationEmail(
        updatedAdmin
      );
    } catch (error) {
      console.error(
        "Erro ao enviar e-mail de confirmação de alteração de senha:",
        error
      );
    }

    return {
      success: true,

      message:
        "Senha redefinida com sucesso. Faça login novamente.",
    };
  }
}