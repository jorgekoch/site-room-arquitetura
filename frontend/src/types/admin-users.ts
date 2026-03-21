export type AdminRole = "OWNER" | "ADMIN";

export type AdminUserItem = {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  approved: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};