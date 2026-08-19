import styled from "styled-components";
import { ArrowRight, Eye, Globe, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

import type { AnalyticsOverview as AnalyticsOverviewData } from "../../../types/dashboard";

const Section = styled.section`
  display: grid;
  gap: 1rem;
  margin: 1.5rem 0;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Title = styled.div`
  display: grid;
  gap: 0.25rem;

  h2 {
    margin: 0;
    font-size: 1.15rem;
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.textSoft};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

const Status = styled.span<{ $configured: boolean }>`
  padding: 0.4rem 0.7rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid
    ${({ theme, $configured }) =>
      $configured ? theme.colors.successBorder : theme.colors.border};
  background: ${({ theme, $configured }) =>
    $configured ? theme.colors.successSoft : theme.colors.backgroundSoft};
  color: ${({ theme, $configured }) =>
    $configured ? theme.colors.success : theme.colors.textSoft};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 700;
`;

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const Metric = styled.div`
  display: grid;
  gap: 0.35rem;
  padding: 1.1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
`;

const MetricTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.colors.textSoft};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const MetricValue = styled.strong`
  font-size: 1.75rem;
  line-height: 1.1;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(260px, 0.9fr);
  gap: 1rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Panel = styled.div`
  min-width: 0;
  padding: 1.1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
`;

const PanelTitle = styled.h3`
  margin: 0 0 1rem;
  font-size: 1rem;
`;

const Chart = styled.div<{ $count: number; $compact: boolean }>`
  display: grid;
  grid-template-columns: repeat(${({ $count }) => $count}, minmax(3px, 1fr));
  align-items: end;
  gap: ${({ $compact }) => ($compact ? "8px" : "3px")};
  height: 190px;
  padding: 1rem 0 0;
`;

const Bar = styled.div<{ $height: number; $compact: boolean }>`
  width: ${({ $compact }) => ($compact ? "min(28px, 100%)" : "100%")};
  justify-self: center;
  min-height: 3px;
  height: ${({ $height }) => `${$height}%`};
  border-radius: 4px 4px 0 0;
  background: ${({ theme }) => theme.colors.secondary};
  opacity: 0.85;
`;

const ChartMessage = styled.div`
  display: grid;
  place-items: center;
  height: 190px;
  color: ${({ theme }) => theme.colors.textSoft};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  text-align: center;
`;

const Pages = styled.div`
  display: grid;
  gap: 0.65rem;
`;

const PageRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 1rem;
  align-items: center;

  span:first-child {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: ${({ theme }) => theme.colors.textSoft};
  }
`;

const Empty = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSoft};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.6;
`;

const SummarySection = styled.section`
  display: grid;
  gap: 0.75rem;
  margin: 1.5rem 0;
`;

const SummaryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

const SummaryTitle = styled.div`
  display: grid;
  gap: 0.2rem;

  h2 {
    margin: 0;
    font-size: 1.15rem;
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.textSoft};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

const DetailsLink = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  border: 0;
  padding: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.secondary};
  font: inherit;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 700;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const SummaryMetric = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.1rem 1.25rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
`;

const SummaryMetricLabel = styled.div`
  display: grid;
  gap: 0.2rem;

  span {
    color: ${({ theme }) => theme.colors.textSoft};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }

  strong {
    font-size: 1.8rem;
    line-height: 1.1;
  }
`;

const SummaryMetricIcon = styled.div`
  display: grid;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.secondarySoft};
  color: ${({ theme }) => theme.colors.secondary};
`;

function formatNumber(value: number) {
  return new Intl.NumberFormat("pt-BR").format(value);
}

function getLatestDay(analytics?: AnalyticsOverviewData) {
  const daily = analytics?.daily ?? [];
  return daily[daily.length - 1];
}

function formatDay(date?: string) {
  if (!date || date.length !== 8) {
    return "último dia registrado";
  }

  const formatted = `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`;
  return new Intl.DateTimeFormat("pt-BR").format(new Date(`${formatted}T12:00:00`));
}

function formatChannel(channel: string) {
  const labels: Record<string, string> = {
    Direct: "Acesso direto",
    "Organic Search": "Pesquisa orgânica",
    "Organic Social": "Redes sociais",
    Referral: "Referências",
    "Paid Search": "Pesquisa paga",
    "Paid Social": "Redes sociais pagas",
    "Paid Video": "Vídeo pago",
    "Organic Video": "Vídeo orgânico",
    Email: "E-mail",
    Affiliates: "Afiliados",
    Display: "Display",
    Unassigned: "Origem não identificada",
  };

  return labels[channel] ?? channel;
}

function formatSourceMedium(source: string, medium: string) {
  if (source === "(direct)" && (medium === "(none)" || medium === "direct")) {
    return "Acesso direto";
  }

  if (source === "(not set)" || medium === "(not set)") {
    return "Origem não identificada";
  }

  return `${source} / ${medium}`;
}

export function AnalyticsOverview({
  analytics,
  compact = false,
}: {
  analytics?: AnalyticsOverviewData;
  compact?: boolean;
}) {
  const navigate = useNavigate();
  const configured = analytics?.configured ?? false;
  const daily = analytics?.daily ?? [];
  const pages = analytics?.topPages ?? [];
  const channels = analytics?.channels ?? [];
  const sources = analytics?.sources ?? [];
  const maxViews = Math.max(...daily.map((item) => item.views), 1);
  const totalChannelSessions = channels.reduce(
    (total, item) => total + item.sessions,
    0,
  );
  const latestDay = getLatestDay(analytics);
  const isSingleDay = daily.length === 1;

  if (compact) {
    return (
      <SummarySection>
        <SummaryHeader>
          <SummaryTitle>
            <h2>Acessos</h2>
            <p>Resumo diário do site.</p>
          </SummaryTitle>

          <DetailsLink type="button" onClick={() => navigate("/admin/acessos")}>
            Ver detalhes
            <ArrowRight size={16} />
          </DetailsLink>
        </SummaryHeader>

        <SummaryMetric>
          <SummaryMetricLabel>
            <span>Visualizações — {formatDay(latestDay?.date)}</span>
            <strong>{formatNumber(latestDay?.views ?? 0)}</strong>
          </SummaryMetricLabel>

          <SummaryMetricIcon aria-hidden="true">
            <Eye size={20} />
          </SummaryMetricIcon>
        </SummaryMetric>
      </SummarySection>
    );
  }

  return (
    <Section>
      <Header>
        <Title>
          <h2>Acessos ao site</h2>
          <p>Dados do Google Analytics nos últimos {analytics?.range ?? 30} dias.</p>
        </Title>
        <Status $configured={configured}>
          {configured ? "Analytics conectado" : "Analytics não configurado"}
        </Status>
      </Header>

      <Cards>
        <Metric>
          <MetricTop>
            <span>Visitantes</span>
            <Users size={17} />
          </MetricTop>
          <MetricValue>{formatNumber(analytics?.totals.users ?? 0)}</MetricValue>
        </Metric>

        <Metric>
          <MetricTop>
            <span>Sessões</span>
            <Globe size={17} />
          </MetricTop>
          <MetricValue>{formatNumber(analytics?.totals.sessions ?? 0)}</MetricValue>
        </Metric>

        <Metric>
          <MetricTop>
            <span>Visualizações</span>
            <Eye size={17} />
          </MetricTop>
          <MetricValue>{formatNumber(analytics?.totals.views ?? 0)}</MetricValue>
        </Metric>
      </Cards>

      <Content>
        <Panel>
          <PanelTitle>Visualizações por dia</PanelTitle>
          {!configured ? (
            <Empty>
              Configure as credenciais da Google Analytics Data API no backend para
              exibir os dados aqui.
            </Empty>
          ) : daily.length === 0 ? (
            <ChartMessage>Ainda não há dados suficientes para exibir o gráfico.</ChartMessage>
          ) : (
            <Chart $count={daily.length} $compact={isSingleDay} aria-label="Visualizações por dia">
              {daily.map((item) => (
                <Bar
                  key={item.date}
                  $height={(item.views / maxViews) * 100}
                  $compact={isSingleDay}
                  title={`${formatDay(item.date)}: ${formatNumber(item.views)} visualizações`}
                />
              ))}
            </Chart>
          )}
        </Panel>

        <Panel>
          <PanelTitle>Páginas mais acessadas</PanelTitle>
          {!configured || pages.length === 0 ? (
            <Empty>Nenhum dado de páginas disponível ainda.</Empty>
          ) : (
            <Pages>
              {pages.map((page) => (
                <PageRow key={page.path}>
                  <span>{page.path}</span>
                  <strong>{formatNumber(page.views)}</strong>
                </PageRow>
              ))}
            </Pages>
          )}
        </Panel>
      </Content>

      <Content>
        <Panel>
          <PanelTitle>Origem do tráfego</PanelTitle>
          {!configured || channels.length === 0 ? (
            <Empty>Nenhum dado de origem disponível ainda.</Empty>
          ) : (
            <Pages>
              {channels.map((item) => {
                const percentage = totalChannelSessions
                  ? Math.round((item.sessions / totalChannelSessions) * 100)
                  : 0;

                return (
                  <PageRow key={item.channel}>
                    <span>{formatChannel(item.channel)}</span>
                    <strong>
                      {percentage}% &nbsp; {formatNumber(item.sessions)}
                    </strong>
                  </PageRow>
                );
              })}
            </Pages>
          )}
        </Panel>

        <Panel>
          <PanelTitle>Principais origens</PanelTitle>
          {!configured || sources.length === 0 ? (
            <Empty>Nenhuma origem disponível ainda.</Empty>
          ) : (
            <Pages>
              {sources.map((item) => (
                <PageRow key={`${item.source}-${item.medium}`}>
                  <span>{formatSourceMedium(item.source, item.medium)}</span>
                  <strong>{formatNumber(item.sessions)}</strong>
                </PageRow>
              ))}
            </Pages>
          )}
        </Panel>
      </Content>
    </Section>
  );
}
