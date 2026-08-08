import {
  Bell,
  Moon,
  Sun,
  Search,
} from "lucide-react";

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
  const {
    user,
    loading,
  } = useCurrentAdmin();

  const {
    mode,
    toggleTheme,
  } = useThemeMode();

  const navigate = useNavigate();

  const [search, setSearch] =
    useState("");

  const [projects, setProjects] =
    useState<SearchProject[]>([]);

  const [proposals, setProposals] =
    useState<SearchProposal[]>([]);

  const [searchLoading, setSearchLoading] =
    useState(false);

  const searchRef =
    useRef<HTMLDivElement>(null);

  const initials =
    user?.name
      ?.split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map(
        (name) =>
          name.charAt(0).toUpperCase()
      )
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

    const timeout = window.setTimeout(
      async () => {
        try {
          setSearchLoading(true);

          const [
            projectData,
            proposalData,
          ] = await Promise.all([
            getProjects(),
            getProposals(),
          ]);

          if (cancelled) {
            return;
          }

          const normalizedQuery =
            query.toLowerCase();

          const filteredProjects =
            projectData.filter((project) => {
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

              return searchableText.includes(
                normalizedQuery
              );
            });

          const filteredProposals =
            proposalData.filter((proposal) => {
              const searchableText = [
                proposal.fullName,
                proposal.email,
                proposal.projectType,
                proposal.phone,
              ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();

              return searchableText.includes(
                normalizedQuery
              );
            });

          setProjects(
            filteredProjects.slice(0, 5)
          );

          setProposals(
            filteredProposals.slice(0, 5)
          );
        } catch (error) {
          console.error(
            "Erro na busca administrativa:",
            error
          );

          if (!cancelled) {
            setProjects([]);
            setProposals([]);
          }
        } finally {
          if (!cancelled) {
            setSearchLoading(false);
          }
        }
      },
      350
    );

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
    function handleClickOutside(
      event: MouseEvent
    ) {
      if (
        searchRef.current &&
        !searchRef.current.contains(
          event.target as Node
        )
      ) {
        setSearch("");
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const hasSearch =
    search.trim().length > 0;

  const hasResults =
    projects.length > 0 ||
    proposals.length > 0;

  const showDropdown =
    hasSearch && (
      searchLoading ||
      hasResults
    );

  const resultCount = useMemo(
    () =>
      projects.length +
      proposals.length,
    [projects.length, proposals.length]
  );

  function openProject(
    slug: string
  ) {
    setSearch("");

    navigate(
      `/projetos/${slug}`
    );
  }

  function openProposal() {
  setSearch("");

  navigate("/admin/propostas");
}

  return (
    <S.Container>
      <S.Left>
        <S.Title>
          Painel Administrativo
        </S.Title>
      </S.Left>

      <S.Right>
        <S.SearchWrapper ref={searchRef}>
          <S.Search>
            <Search size={18} />

            <input
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Pesquisar..."
              aria-label="Pesquisar no painel"
            />
          </S.Search>

          {showDropdown && (
            <S.SearchDropdown>
              {searchLoading && (
                <S.SearchMessage>
                  Pesquisando...
                </S.SearchMessage>
              )}

              {!searchLoading &&
                resultCount === 0 && (
                  <S.SearchMessage>
                    Nenhum resultado encontrado.
                  </S.SearchMessage>
                )}

              {!searchLoading &&
                projects.length > 0 && (
                  <S.SearchSection>
                    <S.SearchSectionTitle>
                      Projetos
                    </S.SearchSectionTitle>

                    {projects.map(
                      (project) => (
                        <S.SearchResult
                          key={project.id}
                          type="button"
                          onClick={() =>
                            openProject(
                              project.slug
                            )
                          }
                        >
                          <S.SearchResultContent>
                            <strong>
                              {project.title}
                            </strong>

                            <span>
                              {project.city &&
                              project.state
                                ? `${project.city} / ${project.state}`
                                : project.city ??
                                  project.state ??
                                  project.category}
                            </span>
                          </S.SearchResultContent>
                        </S.SearchResult>
                      )
                    )}
                  </S.SearchSection>
                )}

              {!searchLoading &&
                proposals.length > 0 && (
                  <S.SearchSection>
                    <S.SearchSectionTitle>
                      Propostas
                    </S.SearchSectionTitle>

                    {proposals.map(
                      (proposal) => (
                        <S.SearchResult
                          key={proposal.id}
                          type="button"
                          onClick={openProposal}
                        >
                          <S.SearchResultContent>
                            <strong>
                              {proposal.fullName}
                            </strong>

                            <span>
                              {proposal.email}
                            </span>
                          </S.SearchResultContent>
                        </S.SearchResult>
                      )
                    )}
                  </S.SearchSection>
                )}
            </S.SearchDropdown>
          )}
        </S.SearchWrapper>

        <S.IconButton
          type="button"
          aria-label="Notificações"
        >
          <Bell size={18} />
        </S.IconButton>

        <S.IconButton
          type="button"
          onClick={toggleTheme}
          aria-label={
            mode === "dark"
              ? "Ativar modo claro"
              : "Ativar modo escuro"
          }
          title={
            mode === "dark"
              ? "Ativar modo claro"
              : "Ativar modo escuro"
          }
        >
          {mode === "dark" ? (
            <Sun size={18} />
          ) : (
            <Moon size={18} />
          )}
        </S.IconButton>

        <S.User>
          <S.Avatar>
            {initials}
          </S.Avatar>

          <S.UserInfo>
            <strong>
              {loading
                ? "Carregando..."
                : user?.name ?? "Usuário"}
            </strong>

            <span>
              {user?.role === "SUPER_ADMIN"
                ? "Administrador"
                : "Equipe"}
            </span>
          </S.UserInfo>
        </S.User>
      </S.Right>
    </S.Container>
  );
}