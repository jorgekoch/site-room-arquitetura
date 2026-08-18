import { useEffect, useState } from "react";
import styled from "styled-components";
import { BarChart3 } from "lucide-react";

import { PageHeader } from "../../components/admin/PageHeader";
import { Loading } from "../../components/admin/common/Loading";
import { EmptyState } from "../../components/admin/common/EmptyState";
import { AnalyticsOverview } from "../../components/admin/dashboard/AnalyticsOverview";
import { getDashboardAnalytics } from "../../lib/dashboard";
import type { AnalyticsOverview as AnalyticsOverviewData } from "../../types/dashboard";

const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin: 1.5rem 0;
  flex-wrap: wrap;
`;

const RangeLabel = styled.span`
  color: ${({ theme }) => theme.colors.textSoft};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const RangeGroup = styled.div`
  display: inline-flex;
  gap: 0.35rem;
  padding: 0.25rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.surface};
`;

const RangeButton = styled.button<{ $active: boolean }>`
  border: 0;
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 0.45rem 0.8rem;
  background: ${({ theme, $active }) =>
    $active ? theme.colors.secondarySoft : "transparent"};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.secondary : theme.colors.textSoft};
  font: inherit;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 700;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Intro = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textSoft};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.6;

  svg {
    flex: 0 0 auto;
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const ErrorBox = styled.div`
  margin-top: 1.5rem;
  padding: 1rem 1.1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
`;

export default function AdminAcessos() {
  const [range, setRange] = useState(30);
  const [analytics, setAnalytics] = useState<AnalyticsOverviewData>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadAnalytics() {
      setLoading(true);
      setError("");

      try {
        const response = await getDashboardAnalytics(range);

        if (!cancelled) {
          setAnalytics(response);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Erro ao carregar acessos:", err);
          setAnalytics(undefined);
          setError(
            err instanceof Error
              ? err.message
              : "Não foi possível carregar os dados de acessos.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadAnalytics();

    return () => {
      cancelled = true;
    };
  }, [range]);

  return (
    <>
      <PageHeader
        title="Acessos"
        description="Acompanhe os acessos e o comportamento dos visitantes no site."
      />

      <Toolbar>
        <RangeLabel>Período analisado</RangeLabel>

        <RangeGroup aria-label="Período dos dados de acesso">
          {[7, 30, 90].map((option) => (
            <RangeButton
              key={option}
              type="button"
              $active={range === option}
              onClick={() => setRange(option)}
            >
              {option} dias
            </RangeButton>
          ))}
        </RangeGroup>
      </Toolbar>

      <Intro>
        <BarChart3 size={20} />
        <span>
          Os dados são coletados pelo Google Analytics e podem apresentar um
          pequeno atraso até serem processados pelo serviço.
        </span>
      </Intro>

      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorBox>{error}</ErrorBox>
      ) : !analytics?.configured ? (
        <EmptyState
          title="Analytics não configurado"
          description="Configure as credenciais da Google Analytics Data API no backend para visualizar os acessos."
        />
      ) : (
        <AnalyticsOverview analytics={analytics} />
      )}
    </>
  );
}
