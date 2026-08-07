import {
  Clock3,
  Eye,
  FileText,
  FolderOpen,
} from "lucide-react";

import { PageHeader } from "../../components/admin/PageHeader";
import { Loading } from "../../components/admin/common/Loading";
import { EmptyState } from "../../components/admin/common/EmptyState";

import { StatsGrid } from "../../components/admin/dashboard/StatsGrid";
import { StatsCard } from "../../components/admin/dashboard/StatsCard";

import { useDashboard } from "../../hooks/useDashboard";

import { RecentProjects } from "../../components/admin/dashboard/RecentProjects";

export default function AdminDashboard() {
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
        title="Erro"
        description={error}
      />
    );
  }

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Visão geral da plataforma."
      />

      <StatsGrid>
        <StatsCard
          title="Projetos"
          value={
            dashboard?.stats
              .totalProjects ?? 0
          }
          icon={FolderOpen}
        />

        <StatsCard
          title="Publicados"
          value={
            dashboard?.stats
              .publishedProjects ?? 0
          }
          icon={Eye}
        />

        <StatsCard
          title="Rascunhos"
          value={
            dashboard?.stats
              .draftProjects ?? 0
          }
          icon={Clock3}
        />

        <StatsCard
          title="Propostas"
          value={
            dashboard?.stats
              .totalProposals ?? 0
          }
          icon={FileText}
        />
      </StatsGrid>
      <RecentProjects
  projects={
    dashboard?.latestProjects ?? []
  }
/>
    </>
  );
}