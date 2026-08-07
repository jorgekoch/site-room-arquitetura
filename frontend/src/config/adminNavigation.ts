import {
  LayoutDashboard,
  FolderOpen,
  FileText,
  Users,
  Settings,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

export interface AdminNavigationItem {
  label: string;
  path: string;
  icon: LucideIcon;
}

export const adminNavigation: AdminNavigationItem[] = [
  {
    label: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Projetos",
    path: "/admin/projetos",
    icon: FolderOpen,
  },
  {
    label: "Propostas",
    path: "/admin/propostas",
    icon: FileText,
  },
  {
    label: "Usuários",
    path: "/admin/usuarios",
    icon: Users,
  },
  {
    label: "Configurações",
    path: "/admin/configuracoes",
    icon: Settings,
  },
];