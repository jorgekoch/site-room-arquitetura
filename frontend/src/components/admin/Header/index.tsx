import { Bell, Moon, Sun, Search } from "lucide-react";

import { getProjectCategoryLabel } from "../../../utils/projectCategory";

import { useDashboardNotifications } from "../../../hooks/useDashboardNotifications";

import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as S from "./styles";

import { useCurrentAdmin } from "../../../hooks/useCurrentAdmin";
import { useThemeMode } from "../../../contexts/ThemeModeContext";

import { getProjects } from "../../../lib/projects";
import { getProposals } from "../../../lib/proposals";

import type { Project } from "../../../types/project";
import type { ProposalRequestAdmin } from "../../../types/proposal";

type SearchProject = Project;

type SearchProposal = ProposalRequestAdmin;

export function Header() {
  const { user, loading } = useCurrentAdmin();

  const { mode, toggleTheme } = useThemeMode();

  const { notifications, reload: reloadNotifications } =
    useDashboardNotifications();

  const navigate = useNavigate();

  const [notificationsOpen, setNotificationsOpen] = useState<boolean>(false);

  const [search, setSearch] = useState("");

  const [projects, setProjects] = useState<SearchProject[]>([]);

  const [proposals, setProposals] = useState<SearchProposal[]>([]);

  const [searchLoading, setSearchLoading] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);

  const notificationRef = useRef<HTMLDivElement | null>(null);

  const initials =
    user?.name
      ?.split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((name) => name.charAt(0).toUpperCase())
      .join("") ?? "AD";

  /**
   * Carrega os dados utilizados
   * pela busca.
   *
   * Fazemos isso somente quando
   * o usuário começa a pesquisar.
   */
  useEffect(() => {
    const query = search.trim();

    if (!query) {
      setProjects([]);
      setProposals([]);
      return;
    }

    let cancelled = false;

    const timeout = window.setTimeout(async () => {
      try {
        setSearchLoading(true);

        const [projectData, proposalData] = await Promise.all([
          getProjects(),
          getProposals(),
        ]);

        if (cancelled) {
          return;
        }

        const normalizedQuery = query.toLowerCase();

        const filteredProjects = projectData.filter((project) => {
          const searchableText = [
            project.title,
            project.slug,
            project.category,
            project.city,
            project.state,
            project.description,
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

          return searchableText.includes(normalizedQuery);
        });

        const filteredProposals = proposalData.filter((proposal) => {
          const searchableText = [
            proposal.fullName,
            proposal.email,
            proposal.projectType,
            proposal.phone,
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

          return searchableText.includes(normalizedQuery);
        });

        setProjects(filteredProjects.slice(0, 5));

        setProposals(filteredProposals.slice(0, 5));
      } catch (error) {
        console.error("Erro na busca administrativa:", error);

        if (!cancelled) {
          setProjects([]);
          setProposals([]);
        }
      } finally {
        if (!cancelled) {
          setSearchLoading(false);
        }
      }
    }, 350);

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, [search]);

  /**
   * Fecha o dropdown quando
   * o usuário clica fora dele.
   */
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearch("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      reloadNotifications();
    }, 30000);

    function handleNotificationsUpdated() {
      reloadNotifications();
    }

    window.addEventListener(
      "admin-notifications-updated",
      handleNotificationsUpdated,
    );

    return () => {
      window.clearInterval(interval);

      window.removeEventListener(
        "admin-notifications-updated",
        handleNotificationsUpdated,
      );
    };
  }, [reloadNotifications]);

  useEffect(() => {
    function handleNotificationClickOutside(event: MouseEvent) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setNotificationsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleNotificationClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleNotificationClickOutside);
    };
  }, []);

  const hasSearch = search.trim().length > 0;

  const hasResults = projects.length > 0 || proposals.length > 0;

  const showDropdown = hasSearch && (searchLoading || hasResults);

  const resultCount = useMemo(
    () => projects.length + proposals.length,
    [projects.length, proposals.length],
  );

  function openProject(slug: string) {
    setSearch("");

    navigate(`/projetos/${slug}`);
  }

  function openProposal(id: string) {
    setSearch("");

    navigate(`/admin/propostas?proposal=${id}`);
  }

  function openNotifications() {
    setNotificationsOpen((current) => !current);
  }
  function openNotification(
    type: "PROPOSAL" | "ADMIN_REQUEST",
    referenceId: string,
  ) {
    setNotificationsOpen(false);

    if (type === "PROPOSAL") {
      navigate(`/admin/propostas?proposal=${referenceId}`);

      return;
    }

    if (type === "ADMIN_REQUEST") {
      navigate("/admin/usuarios");
    }
  }

  function roleLabel(role?: string) {
    switch (role) {
      case "OWNER":
        return "Proprietário";

      case "ADMIN":
        return "Administrador";

      case "DEV":
        return "Desenvolvedor";

      default:
        return role ?? "Usuário";
    }
  }

  return (
    <S.Container>
      <S.Left>
        <S.Title>Painel Administrativo</S.Title>
      </S.Left>

      <S.Right>
        <S.SearchWrapper ref={searchRef}>
          <S.Search>
            <Search size={18} />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Pesquisar..."
              aria-label="Pesquisar no painel"
            />
          </S.Search>

          {showDropdown && (
            <S.SearchDropdown>
              {searchLoading && (
                <S.SearchMessage>Pesquisando...</S.SearchMessage>
              )}

              {!searchLoading && resultCount === 0 && (
                <S.SearchMessage>Nenhum resultado encontrado.</S.SearchMessage>
              )}

              {!searchLoading && projects.length > 0 && (
                <S.SearchSection>
                  <S.SearchSectionTitle>Projetos</S.SearchSectionTitle>

                  {projects.map((project) => (
                    <S.SearchResult
                      key={project.id}
                      type="button"
                      onClick={() => openProject(project.slug)}
                    >
                      <S.SearchResultContent>
                        <strong>{project.title}</strong>

                        <span>
                          {project.city && project.state
                            ? `${project.city} / ${project.state}`
                            : (project.city ??
                              project.state ??
                              getProjectCategoryLabel(project.category))}
                        </span>
                      </S.SearchResultContent>
                    </S.SearchResult>
                  ))}
                </S.SearchSection>
              )}

              {!searchLoading && proposals.length > 0 && (
                <S.SearchSection>
                  <S.SearchSectionTitle>Propostas</S.SearchSectionTitle>

                  {proposals.map((proposal) => (
                    <S.SearchResult
                      key={proposal.id}
                      type="button"
                      onClick={() => openProposal(proposal.id)}
                    >
                      <S.SearchResultContent>
                        <strong>{proposal.fullName}</strong>

                        <span>{proposal.email}</span>
                      </S.SearchResultContent>
                    </S.SearchResult>
                  ))}
                </S.SearchSection>
              )}
            </S.SearchDropdown>
          )}
        </S.SearchWrapper>

        <S.NotificationWrapper ref={notificationRef}>
          <S.IconButton
            type="button"
            aria-label="Notificações"
            aria-expanded={notificationsOpen}
            onClick={openNotifications}
          >
            <Bell size={18} />

            {notifications.total > 0 && (
              <S.NotificationBadge>
                {notifications.total > 99 ? "99+" : notifications.total}
              </S.NotificationBadge>
            )}
          </S.IconButton>

          {notificationsOpen && (
            <S.NotificationDropdown>
              <S.NotificationHeader>
                <strong>Notificações</strong>

                {notifications.total > 0 && <span>{notifications.total}</span>}
              </S.NotificationHeader>

              {notifications.total === 0 ? (
                <S.EmptyNotification>
                  <Bell size={20} />

                  <span>Nenhuma nova notificação.</span>
                </S.EmptyNotification>
              ) : (
                <>
                  {notifications.notifications.map((notification) => (
                    <S.NotificationItem
                      key={`${notification.type}-${notification.id}`}
                      type="button"
                      onClick={() =>
                        openNotification(
                          notification.type,
                          notification.referenceId,
                        )
                      }
                    >
                      <S.NotificationIcon>
                        <Bell size={17} />
                      </S.NotificationIcon>

                      <S.NotificationContent>
                        <strong>{notification.title}</strong>

                        <span>{notification.description}</span>

                        <small>
                          {new Date(notification.createdAt).toLocaleString(
                            "pt-BR",
                            {
                              dateStyle: "short",
                              timeStyle: "short",
                            },
                          )}
                        </small>
                      </S.NotificationContent>
                    </S.NotificationItem>
                  ))}
                </>
              )}
            </S.NotificationDropdown>
          )}
        </S.NotificationWrapper>

        <S.IconButton
          type="button"
          onClick={toggleTheme}
          aria-label={
            mode === "dark" ? "Ativar modo claro" : "Ativar modo escuro"
          }
          title={mode === "dark" ? "Ativar modo claro" : "Ativar modo escuro"}
        >
          {mode === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </S.IconButton>

        <S.User>
          <S.Avatar>{initials}</S.Avatar>

          <S.UserInfo>
            <strong>
              {loading ? "Carregando..." : (user?.name ?? "Usuário")}
            </strong>

            <span>{roleLabel(user?.role)}</span>
          </S.UserInfo>
        </S.User>
      </S.Right>
    </S.Container>
  );
}
