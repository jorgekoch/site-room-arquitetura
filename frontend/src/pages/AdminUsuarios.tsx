import { useEffect, useState } from "react";
import styled from "styled-components";
import { Container } from "../components/ui/Container";
import { apiFetch } from "../lib/api";
import { removeAdminToken } from "../lib/auth";
import { useNavigate } from "react-router-dom";
import type { AdminRole, AdminUserItem } from "../types/admin-users";
import { media } from "../styles/breakpoints";

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

const Actions = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const GhostButton = styled.button`
  min-height: 44px;
  padding: 0.8rem 1rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
`;

const TableWrap = styled.div`
  overflow-x: auto;
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 980px;
`;

const Th = styled.th`
  text-align: left;
  padding: 1rem;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.colors.textMuted};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Td = styled.td`
  padding: 1rem;
  vertical-align: top;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSoft};
`;

const Select = styled.select`
  min-height: 40px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.backgroundSoft};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.6rem 0.8rem;
`;

const RowActions = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const SmallButton = styled.button`
  min-height: 36px;
  padding: 0.55rem 0.8rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.xs};
`;

const Message = styled.p<{ $error?: boolean }>`
  color: ${({ theme, $error }) =>
    $error ? theme.colors.danger : theme.colors.success};
  line-height: 1.6;
  margin-bottom: 1rem;
`;

function roleLabel(role: AdminRole) {
  return role === "OWNER" ? "Owner" : "Admin";
}

function statusLabel(admin: AdminUserItem) {
  if (!admin.approved) return "Pendente";
  if (!admin.isActive) return "Desativado";
  return "Ativo";
}

export default function AdminUsuarios() {
  const navigate = useNavigate();
  const [items, setItems] = useState<AdminUserItem[]>([]);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [roleDrafts, setRoleDrafts] = useState<Record<string, AdminRole>>({});

  function handleUnauthorized() {
    removeAdminToken();
    navigate("/admin/login");
  }

  async function loadAdmins() {
    try {
      setLoading(true);
      setMessage("");
      setErrorMessage("");

      const response = await apiFetch("/admin-users");

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      if (response.status === 403) {
        throw new Error("Apenas o owner pode acessar esta página.");
      }

      if (!response.ok) {
        throw new Error("Não foi possível carregar os admins.");
      }

      const data: AdminUserItem[] = await response.json();
      setItems(data);

      const drafts: Record<string, AdminRole> = {};
      data.forEach((item) => {
        drafts[item.id] = item.role;
      });
      setRoleDrafts(drafts);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Erro ao carregar admins."
      );
    } finally {
      setLoading(false);
    }
  }

  async function callAction(
    path: string,
    init?: RequestInit,
    successMessage?: string
  ) {
    try {
      setMessage("");
      setErrorMessage("");

      const response = await apiFetch(path, init);

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      if (response.status === 403) {
        throw new Error("Apenas o owner pode executar esta ação.");
      }

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.message || "Não foi possível executar a ação.");
      }

      setMessage(successMessage || data?.message || "Ação concluída.");
      await loadAdmins();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Erro ao executar ação."
      );
    }
  }

  useEffect(() => {
    loadAdmins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Section>
      <Container>
        <Header>
          <TopRow>
            <Eyebrow>Gestão de admins</Eyebrow>

            <Actions>
              <GhostButton type="button" onClick={() => navigate("/admin/propostas")}>
                Voltar para propostas
              </GhostButton>

              <GhostButton
                type="button"
                onClick={() => {
                  removeAdminToken();
                  navigate("/admin/login");
                }}
              >
                Sair
              </GhostButton>
            </Actions>
          </TopRow>

          <Title>Usuários administradores</Title>
          <Description>
            Aprove, desative, reative, altere função e remova acessos administrativos do sistema.
          </Description>
        </Header>

        {message && <Message>{message}</Message>}
        {errorMessage && <Message $error>{errorMessage}</Message>}

        <TableWrap>
          <Table>
            <thead>
              <tr>
                <Th>Nome</Th>
                <Th>E-mail</Th>
                <Th>Papel</Th>
                <Th>Status</Th>
                <Th>Criado em</Th>
                <Th>Ações</Th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <Td colSpan={6}>Carregando admins...</Td>
                </tr>
              ) : items.length ? (
                items.map((admin) => (
                  <tr key={admin.id}>
                    <Td>{admin.name}</Td>
                    <Td>{admin.email}</Td>
                    <Td>
                      <Select
                        value={roleDrafts[admin.id] || admin.role}
                        onChange={(event) =>
                          setRoleDrafts((prev) => ({
                            ...prev,
                            [admin.id]: event.target.value as AdminRole,
                          }))
                        }
                      >
                        <option value="OWNER">Owner</option>
                        <option value="ADMIN">Admin</option>
                      </Select>

                      <div style={{ marginTop: 8, fontSize: 12 }}>
                        Atual: {roleLabel(admin.role)}
                      </div>
                    </Td>
                    <Td>{statusLabel(admin)}</Td>
                    <Td>{new Date(admin.createdAt).toLocaleString("pt-BR")}</Td>
                    <Td>
                      <RowActions>
                        {!admin.approved && (
                          <SmallButton
                            type="button"
                            onClick={() =>
                              callAction(
                                `/admin-users/${admin.id}/approve`,
                                { method: "PATCH" },
                                "Admin aprovado com sucesso."
                              )
                            }
                          >
                            Aprovar
                          </SmallButton>
                        )}

                        {admin.approved && !admin.isActive && (
                          <SmallButton
                            type="button"
                            onClick={() =>
                              callAction(
                                `/admin-users/${admin.id}/activate`,
                                { method: "PATCH" },
                                "Admin ativado com sucesso."
                              )
                            }
                          >
                            Ativar
                          </SmallButton>
                        )}

                        {admin.approved && admin.isActive && (
                          <SmallButton
                            type="button"
                            onClick={() =>
                              callAction(
                                `/admin-users/${admin.id}/deactivate`,
                                { method: "PATCH" },
                                "Admin desativado com sucesso."
                              )
                            }
                          >
                            Desativar
                          </SmallButton>
                        )}

                        <SmallButton
                          type="button"
                          onClick={() =>
                            callAction(
                              `/admin-users/${admin.id}/role`,
                              {
                                method: "PATCH",
                                body: JSON.stringify({
                                  role: roleDrafts[admin.id] || admin.role,
                                }),
                              },
                              "Papel atualizado com sucesso."
                            )
                          }
                        >
                          Salvar papel
                        </SmallButton>

                        <SmallButton
                          type="button"
                          onClick={() => {
                            const confirmed = window.confirm(
                              `Tem certeza que deseja remover o admin ${admin.name}?`
                            );

                            if (!confirmed) return;

                            callAction(
                              `/admin-users/${admin.id}`,
                              { method: "DELETE" },
                              "Admin removido com sucesso."
                            );
                          }}
                        >
                          Remover
                        </SmallButton>
                      </RowActions>
                    </Td>
                  </tr>
                ))
              ) : (
                <tr>
                  <Td colSpan={6}>Nenhum admin encontrado.</Td>
                </tr>
              )}
            </tbody>
          </Table>
        </TableWrap>
      </Container>
    </Section>
  );
}
