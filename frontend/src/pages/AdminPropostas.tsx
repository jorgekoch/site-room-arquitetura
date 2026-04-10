import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Container } from "../components/ui/Container";
import type { ProposalRequestAdmin, ProposalStatus } from "../types/admin";
import { proposalStatusOptions } from "../data/admin";
import { media } from "../styles/breakpoints";
import { apiFetch } from "../lib/api";
import { removeAdminToken } from "../lib/auth";
import { useNavigate } from "react-router-dom";
import { ProposalDetails } from "../components/admin/ProposalDetails";
import { ProposalNotes } from "../components/admin/ProposalNotes";
import { ProposalPaymentProof } from "../components/admin/ProposalPaymentProof";
import { Button } from "../components/ui/Button";

const Section = styled.section`
  padding: 2rem 0 5rem;

  @media ${media.laptop} {
    padding: 3rem 0 6rem;
  }
`;

const Header = styled.div`
  display: grid;
  gap: 0.75rem;
  margin-bottom: 2rem;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
`;

const Eyebrow = styled.span`
  display: inline-flex;
  width: fit-content;
  padding: 0.45rem 0.9rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.secondarySoft};
  border: 1px solid ${({ theme }) => theme.colors.secondaryBorder};
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const Title = styled.h1`
  font-size: clamp(2rem, 5vw, 3.4rem);
  line-height: 1.08;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textSoft};
  line-height: 1.75;
  max-width: 860px;
`;

const LogoutButton = styled.button`
  min-height: 44px;
  padding: 0.8rem 1rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
`;

const Filters = styled.div`
  display: grid;
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media ${media.tablet} {
    grid-template-columns: 1.2fr 0.8fr 0.8fr;
  }
`;

const Input = styled.input`
  min-height: 48px;
  width: 100%;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.backgroundSoft};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.9rem 1rem;
`;

const Select = styled.select`
  min-height: 48px;
  width: 100%;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.backgroundSoft};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.9rem 1rem;
`;

const Grid = styled.div`
  display: grid;
  gap: 1rem;

  @media ${media.laptop} {
    grid-template-columns: 0.95fr 1.05fr;
    align-items: start;
  }
`;

const Panel = styled.div`
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  overflow: hidden;
`;

const List = styled.div`
  display: grid;
`;

const ItemButton = styled.button<{ $active: boolean }>`
  border: 0;
  text-align: left;
  background: ${({ theme, $active }) =>
    $active ? theme.colors.surfaceHover : "transparent"};
  color: ${({ theme }) => theme.colors.text};
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
`;

const ItemTitle = styled.strong`
  display: block;
  margin-bottom: 0.25rem;
`;

const ItemMeta = styled.p`
  color: ${({ theme }) => theme.colors.textSoft};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.7;
`;

const Empty = styled.div`
  padding: 1.25rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Details = styled.div`
  padding: 1.25rem;
  display: grid;
  gap: 1rem;
`;

const DetailTitle = styled.h2`
  font-size: 1.2rem;
  line-height: 1.2;
`;

const Actions = styled.div`
  display: grid;
  gap: 0.75rem;

  @media ${media.tablet} {
    grid-template-columns: 1fr auto;
    align-items: center;
  }
`;

const StatusSelect = styled.select`
  min-height: 46px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.backgroundSoft};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.75rem 1rem;
`;

const SaveButton = styled.button`
  min-height: 46px;
  padding: 0.8rem 1.1rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 0;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryContrast};
  font-weight: 600;
  cursor: pointer;
`;

const Message = styled.p<{ $error?: boolean }>`
  color: ${({ theme, $error }) =>
    $error ? theme.colors.danger : theme.colors.success};
  line-height: 1.6;
`;

const AdminBlocks = styled.div`
  display: grid;
  gap: 1rem;
`;

const Block = styled.div`
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export default function AdminPropostas() {
  const navigate = useNavigate();
  const [items, setItems] = useState<ProposalRequestAdmin[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState("");
  const [projectTypeFilter, setProjectTypeFilter] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [selected, setSelected] = useState<ProposalRequestAdmin | null>(null);
  const [statusDraft, setStatusDraft] = useState<ProposalStatus | "">("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleUnauthorized() {
    removeAdminToken();
    navigate("/admin/login");
  }

  async function loadItems() {
    try {
      setLoading(true);
      setErrorMessage("");

      const params = new URLSearchParams();

      if (statusFilter) params.set("status", statusFilter);
      if (projectTypeFilter) params.set("projectType", projectTypeFilter);
      if (search) params.set("search", search);

      const response = await apiFetch(`/proposal-requests?${params.toString()}`);

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      if (!response.ok) {
        throw new Error("Não foi possível carregar as solicitações.");
      }

      const data: ProposalRequestAdmin[] = await response.json();

      setItems(data);

      if (data.length && !selectedId) {
        setSelectedId(data[0].id);
      }

      if (!data.length) {
        setSelected(null);
        setSelectedId("");
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Erro ao carregar solicitações."
      );
    } finally {
      setLoading(false);
    }
  }

  async function loadDetails(id: string) {
    try {
      setDetailsLoading(true);
      setMessage("");
      setErrorMessage("");

      const response = await apiFetch(`/proposal-requests/${id}`);

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      if (!response.ok) {
        throw new Error("Não foi possível carregar os detalhes.");
      }

      const data: ProposalRequestAdmin = await response.json();

      setSelected(data);
      setStatusDraft(data.status as ProposalStatus);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Erro ao carregar detalhes."
      );
    } finally {
      setDetailsLoading(false);
    }
  }

  async function handleSaveStatus() {
    if (!selected || !statusDraft) return;

    try {
      setMessage("");
      setErrorMessage("");

      const response = await apiFetch(
        `/proposal-requests/${selected.id}/status`,
        {
          method: "PATCH",
          body: JSON.stringify({ status: statusDraft }),
        }
      );

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      if (!response.ok) {
        throw new Error("Não foi possível atualizar o status.");
      }

      setMessage("Status atualizado com sucesso.");

      await loadItems();
      await loadDetails(selected.id);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Erro ao atualizar status."
      );
    }
  }

  function handleLogout() {
    removeAdminToken();
    navigate("/admin/login");
  }

  useEffect(() => {
    loadItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, projectTypeFilter, search]);

  useEffect(() => {
    if (selectedId) {
      loadDetails(selectedId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  const projectTypeOptions = useMemo(() => {
    const unique = Array.from(new Set(items.map((item) => item.projectType))).filter(Boolean);
    return unique;
  }, [items]);

  return (
    <Section>
      <Container>
        <Header>
          <TopRow>
            <Eyebrow>Painel admin</Eyebrow>

            <Actions>
              <Button
                variant="ghost"
                onClick={() => navigate("/admin/usuarios")}
              >
                Gerenciar admins
              </Button>

              <LogoutButton type="button" onClick={handleLogout}>
                Sair
              </LogoutButton>
            </Actions>
          </TopRow>

          <Title>Solicitações de proposta</Title>

          <Description>
            Acompanhe todas as solicitações recebidas pelo site, visualize os dados enviados pelos clientes
            e gerencie cada atendimento com mais clareza, controle e organização.
          </Description>
        </Header>
        <Filters>
          <Input
            placeholder="Buscar por nome, e-mail ou telefone"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <Select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="">Todos os status</option>
            {proposalStatusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>

          <Select
            value={projectTypeFilter}
            onChange={(event) => setProjectTypeFilter(event.target.value)}
          >
            <option value="">Todos os tipos</option>
            {projectTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </Filters>

        {errorMessage && <Message $error>{errorMessage}</Message>}

        <Grid>
          <Panel>
            {loading ? (
              <Empty>Carregando solicitações...</Empty>
            ) : items.length ? (
              <List>
                {items.map((item) => (
                  <ItemButton
                    key={item.id}
                    type="button"
                    $active={item.id === selectedId}
                    onClick={() => setSelectedId(item.id)}
                  >
                    <ItemTitle>{item.fullName}</ItemTitle>
                    <ItemMeta>{item.email}</ItemMeta>
                    <ItemMeta>
                      {item.projectType} • {item.status}
                    </ItemMeta>
                  </ItemButton>
                ))}
              </List>
            ) : (
              <Empty>Nenhuma solicitação encontrada.</Empty>
            )}
          </Panel>

          <Panel>
            {detailsLoading ? (
              <Empty>Carregando detalhes...</Empty>
            ) : selected ? (
              <Details>
                <DetailTitle>{selected.fullName}</DetailTitle>

                <Actions>
                  <StatusSelect
                    value={statusDraft}
                    onChange={(event) =>
                      setStatusDraft(event.target.value as ProposalStatus)
                    }
                  >
                    {proposalStatusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </StatusSelect>

                  <SaveButton type="button" onClick={handleSaveStatus}>
                    Salvar status
                  </SaveButton>
                </Actions>

                {message && <Message>{message}</Message>}

                <ProposalDetails proposal={selected} />

                <AdminBlocks>
                  <Block>
                    <ProposalNotes
                      proposalId={selected.id}
                      initialValue={selected.internalNotes}
                      onSaved={() => loadDetails(selected.id)}
                      onUnauthorized={handleUnauthorized}
                    />
                  </Block>

                  <Block>
                    <ProposalPaymentProof
                      proposalId={selected.id}
                      currentUrl={selected.paymentProofUrl}
                      onUploaded={() => loadDetails(selected.id)}
                      onUnauthorized={handleUnauthorized}
                    />
                  </Block>
                </AdminBlocks>
              </Details>
            ) : (
              <Empty>Selecione uma solicitação para ver os detalhes.</Empty>
            )}
          </Panel>
        </Grid>
      </Container>
    </Section>
  );
}
