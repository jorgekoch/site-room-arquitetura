import { useNavigate } from "react-router-dom";

import {
  Clock3,
  Eye,
  FileText,
  FolderOpen,
} from "lucide-react";

import { ContentGrid } from "../../components/admin/dashboard/ContentGrid";
import { RecentProjects } from "../../components/admin/dashboard/RecentProjects";
import { RecentProposals } from "../../components/admin/dashboard/RecentProposals";

import { PageHeader } from "../../components/admin/PageHeader";
import { Loading } from "../../components/admin/common/Loading";
import { EmptyState } from "../../components/admin/common/EmptyState";

import { StatsGrid } from "../../components/admin/dashboard/StatsGrid";
import { StatsCard } from "../../components/admin/dashboard/StatsCard";

import { useDashboard } from "../../hooks/useDashboard";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const {
    dashboard,
    loading,
    error,
  } = useDashboard();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <EmptyState
        title="Não foi possível carregar o dashboard."
        description={error}
      />
    );
  }

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Visão geral do painel administrativo."
      />

      <StatsGrid>
        <StatsCard
          title="Projetos"
          value={
            dashboard?.stats
              .totalProjects ?? 0
          }
          icon={FolderOpen}
          description="Gerenciar projetos"
          onClick={() =>
            navigate("/admin/projetos")
          }
        />

        <StatsCard
          title="Publicados"
          value={
            dashboard?.stats
              .publishedProjects ?? 0
          }
          icon={Eye}
          description="Projetos publicados"
          onClick={() =>
            navigate("/admin/projetos")
          }
        />

        <StatsCard
          title="Rascunhos"
          value={
            dashboard?.stats
              .draftProjects ?? 0
          }
          icon={Clock3}
          description="Projetos não publicados"
          onClick={() =>
            navigate("/admin/projetos")
          }
        />

        <StatsCard
          title="Propostas"
          value={
            dashboard?.stats
              .totalProposals ?? 0
          }
          icon={FileText}
          description="Gerenciar propostas"
          onClick={() =>
            navigate("/admin/propostas")
          }
        />
      </StatsGrid>

      <ContentGrid>
        <RecentProjects
          projects={
            dashboard?.latestProjects ?? []
          }
        />

        <RecentProposals
          proposals={
            dashboard?.latestProposals ?? []
          }
        />
      </ContentGrid>
    </>
  );
}