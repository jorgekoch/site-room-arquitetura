import { z } from "zod";

export const updateAdminRoleSchema = z.object({
  role: z.enum(["OWNER", "ADMIN", "DEV"]),
});

export type UpdateAdminRoleInput = z.infer<typeof updateAdminRoleSchema>;
