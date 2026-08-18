import {
  LayoutDashboard,
  FolderOpen,
  FileText,
  NotebookText,
  Users,
  Settings,
  Globe,
  LogOut,
  BarChart3,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import { useDashboardNotifications } from "../../../hooks/useDashboardNotifications";
import { useCurrentAdmin } from "../../../hooks/useCurrentAdmin";
import { removeAdminToken } from "../../../lib/auth";

import * as S from "./styles";

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/admin" },
  { label: "Acessos", icon: BarChart3, to: "/admin/acessos" },
  { label: "Projetos", icon: FolderOpen, to: "/admin/projetos" },
  { label: "Propostas", icon: FileText, to: "/admin/propostas", notificationKey: "newProposals" },
  { label: "Blog", icon: NotebookText, to: "/admin/blog" },
  { label: "Usuários", icon: Users, to: "/admin/usuarios", notificationKey: "pendingAdminRequests" },
  { label: "Configurações", icon: Settings, to: "/admin/configuracoes" },
];

export function Sidebar() {
  const { notifications } = useDashboardNotifications();
  const { user } = useCurrentAdmin();

  function logout() {
    removeAdminToken();
    window.location.href = "/admin/login";
  }

  return (
    <S.Container>
      <S.Logo>
        <h2>ROOM</h2>
        <span>Arquitetura Sustentável</span>
      </S.Logo>

      <S.Menu>
        {menuItems
          .filter(
            (item) =>
              item.to !== "/admin/usuarios" ||
              user?.role === "OWNER" ||
              user?.role === "DEV",
          )
          .map((item) => {
            const Icon = item.icon;
            const notificationCount =
              item.notificationKey === "newProposals"
                ? notifications.newProposals
                : item.notificationKey === "pendingAdminRequests"
                  ? notifications.pendingAdminRequests
                  : 0;

            return (
              <S.MenuItem key={item.to} as={NavLink} to={item.to} end={item.to === "/admin"}>
                <Icon size={18} />
                <span>{item.label}</span>
                {notificationCount > 0 && (
                  <S.NotificationBadge>
                    {notificationCount > 99 ? "99+" : notificationCount}
                  </S.NotificationBadge>
                )}
              </S.MenuItem>
            );
          })}
      </S.Menu>

      <S.Footer>
        <S.SiteButton href="/" target="_blank">
          <Globe size={18} />
          <span>Ver Site</span>
        </S.SiteButton>
        <S.LogoutButton onClick={logout}>
          <LogOut size={18} />
          <span>Sair</span>
        </S.LogoutButton>
      </S.Footer>
    </S.Container>
  );
}
