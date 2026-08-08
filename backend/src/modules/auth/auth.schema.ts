import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export const registerAdminRequestSchema = z.object({
  name: z.string().min(3, "Informe o nome completo."),
  email: z.string().email("Informe um e-mail válido."),
  password: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres."),
});

export const updateAdminProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Informe o nome completo."),

  email: z
    .string()
    .trim()
    .email("Informe um e-mail válido."),
});

export const changeAdminPasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, "Informe sua senha atual."),

    newPassword: z
      .string()
      .min(
        6,
        "A nova senha deve ter pelo menos 6 caracteres."
      ),

    confirmPassword: z
      .string()
      .min(
        6,
        "Confirme sua nova senha."
      ),
  })
  .refine(
    (data) =>
      data.newPassword ===
      data.confirmPassword,
    {
      message:
        "As senhas não coincidem.",
      path: ["confirmPassword"],
    }
  );

export type LoginInput =
  z.infer<typeof loginSchema>;

export type RegisterAdminRequestInput =
  z.infer<
    typeof registerAdminRequestSchema
  >;

export type UpdateAdminProfileInput =
  z.infer<
    typeof updateAdminProfileSchema
  >;

export type ChangeAdminPasswordInput =
  z.infer<
    typeof changeAdminPasswordSchema
  >;

export const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(
      1,
      "Informe sua senha atual."
    ),

  newPassword: z
    .string()
    .min(
      6,
      "A nova senha deve ter pelo menos 6 caracteres."
    ),

  confirmPassword: z
    .string()
    .min(
      1,
      "Confirme sua nova senha."
    ),
}).refine(
  (data) =>
    data.newPassword ===
    data.confirmPassword,
  {
    message:
      "As senhas não coincidem.",
    path: ["confirmPassword"],
  }
);

export type ChangePasswordInput =
  z.infer<
    typeof changePasswordSchema
  >;