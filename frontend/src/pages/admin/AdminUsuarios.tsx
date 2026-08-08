import { useEffect, useState } from "react";
import styled from "styled-components";
import { Container } from "../../components/ui/Container";
import {
  getAdminUsers,
  approveAdmin,
  activateAdmin,
  deactivateAdmin,
  updateAdminRole,
  removeAdmin,
} from "../../lib/users";
import { removeAdminToken } from "../../lib/auth";
import { useNavigate } from "react-router-dom";
import type { AdminRole, AdminUserItem } from "../../types/admin-users";
import { media } from "../../styles/breakpoints";
import { useCurrentAdmin } from "../../hooks/useCurrentAdmin";

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

const Filters = styled.div`
  display: grid;

  grid-template-columns:
    minmax(240px, 1fr)
    auto;

  gap: 1rem;

  margin-bottom: 1.5rem;

  @media ${media.tablet} {
    grid-template-columns: 1fr;
  }
`;

const SearchInput = styled.input`
  width: 100%;

  min-height: 46px;

  padding: 0 1rem;

  border-radius:
    ${({ theme }) =>
      theme.radius.md};

  border: 1px solid
    ${({ theme }) =>
      theme.colors.border};

  background:
    ${({ theme }) =>
      theme.colors.backgroundSoft};

  color:
    ${({ theme }) =>
      theme.colors.text};

  font-family: inherit;

  outline: none;

  &:focus {
    border-color:
      ${({ theme }) =>
        theme.colors.primary};

    box-shadow:
      0 0 0 3px
      ${({ theme }) =>
        theme.colors.primaryRing};
  }

  &::placeholder {
    color:
      ${({ theme }) =>
        theme.colors.textMuted};
  }
`;

const FilterGroup = styled.div`
  display: flex;

  gap: 0.5rem;

  flex-wrap: wrap;
`;

const FilterButton = styled.button<{
  $active: boolean;
}>`
  min-height: 42px;

  padding: 0.65rem 0.9rem;

  border-radius:
    ${({ theme }) =>
      theme.radius.pill};

  border: 1px solid
    ${({ theme, $active }) =>
      $active
        ? theme.colors.primary
        : theme.colors.border};

  background:
    ${({ theme, $active }) =>
      $active
        ? theme.colors.primary
        : "transparent"};

  color:
    ${({ theme, $active }) =>
      $active
        ? theme.colors.primaryContrast
        : theme.colors.text};

  cursor: pointer;

  font-family: inherit;

  font-size:
    ${({ theme }) =>
      theme.fontSizes.xs};

  font-weight: 600;

  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    border-color:
      ${({ theme }) =>
        theme.colors.primary};
  }
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

const Badge = styled.span<{
  $variant:
    | "success"
    | "warning"
    | "neutral"
    | "primary";
}>`
  display: inline-flex;

  align-items: center;

  width: fit-content;

  padding: 0.4rem 0.7rem;

  border-radius:
    ${({ theme }) =>
      theme.radius.pill};

  font-size:
    ${({ theme }) =>
      theme.fontSizes.xs};

  font-weight: 600;

  background:
    ${({ theme, $variant }) => {
      if ($variant === "success") {
        return theme.colors.successSoft;
      }

      if ($variant === "warning") {
        return theme.colors.secondarySoft;
      }

      if ($variant === "primary") {
        return theme.colors.primarySoft;
      }

      return theme.colors.backgroundSoft;
    }};

  color:
    ${({ theme, $variant }) => {
      if ($variant === "success") {
        return theme.colors.success;
      }

      if ($variant === "warning") {
        return theme.colors.secondary;
      }

      if ($variant === "primary") {
        return theme.colors.primary;
      }

      return theme.colors.textSoft;
    }};

  border: 1px solid
    ${({ theme, $variant }) => {
      if ($variant === "success") {
        return theme.colors.successBorder;
      }

      if ($variant === "warning") {
        return theme.colors.secondaryBorder;
      }

      if ($variant === "primary") {
        return theme.colors.primaryBorder;
      }

      return theme.colors.border;
    }};
`;

const Message = styled.p<{ $error?: boolean }>`
  color: ${({ theme, $error }) =>
    $error ? theme.colors.danger : theme.colors.success};
  line-height: 1.6;
  margin-bottom: 1rem;
`;

function statusLabel(admin: AdminUserItem) {
  if (!admin.approved) return "Pendente";
  if (!admin.isActive) return "Desativado";
  return "Ativo";
}

function statusVariant(
  admin: AdminUserItem
) {
  if (!admin.approved) {
    return "warning" as const;
  }

  if (!admin.isActive) {
    return "neutral" as const;
  }

  return "success" as const;
}


export default function AdminUsuarios() {
  const navigate = useNavigate();
  const { user: currentAdmin } = useCurrentAdmin();
  const [items, setItems] = useState<AdminUserItem[]>([]);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [roleDrafts, setRoleDrafts] = useState<Record<string, AdminRole>>({});
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<
      "ALL" | "PENDING" | "ACTIVE" | "INACTIVE"
    >("ALL");

  async function loadAdmins() {
    try {
      setLoading(true);
      setMessage("");
      setErrorMessage("");

      const data =
        await getAdminUsers();

      setItems(data);

      const drafts: Record<
        string,
        AdminRole
      > = {};

      data.forEach((item) => {
        drafts[item.id] = item.role;
      });

      setRoleDrafts(drafts);
    } catch (error) {
      console.error(error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Erro ao carregar admins."
      );
    } finally {
      setLoading(false);
    }
  }

  async function executeAction(
    action: () => Promise<unknown>,
    successMessage: string
  ) {
    try {
      setMessage("");
      setErrorMessage("");

      await action();

      setMessage(
        successMessage
      );

      await loadAdmins();
    } catch (error) {
      console.error(error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Erro ao executar ação."
      );
    }
  }

  useEffect(() => {
    loadAdmins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredItems =
    items.filter((admin) => {
      const query =
        search.trim().toLowerCase();

      const matchesSearch =
        !query ||
        admin.name
          .toLowerCase()
          .includes(query) ||
        admin.email
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter === "ALL" ||
        (statusFilter === "PENDING" &&
          !admin.approved) ||
        (statusFilter === "ACTIVE" &&
          admin.approved &&
          admin.isActive) ||
        (statusFilter === "INACTIVE" &&
          admin.approved &&
          !admin.isActive);

      return (
        matchesSearch &&
        matchesStatus
      );
    });

  const isOwner = (admin: AdminUserItem) =>
  admin.email.toLowerCase() ===
  "manulopes.arq@gmail.com";

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
          <Filters>
            <SearchInput
              type="search"
              placeholder="Pesquisar por nome ou e-mail..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              aria-label="Pesquisar administradores"
            />

            <FilterGroup>
              <FilterButton
                type="button"
                $active={
                  statusFilter === "ALL"
                }
                onClick={() =>
                  setStatusFilter("ALL")
                }
              >
                Todos
              </FilterButton>

              <FilterButton
                type="button"
                $active={
                  statusFilter === "PENDING"
                }
                onClick={() =>
                  setStatusFilter("PENDING")
                }
              >
                Pendentes
              </FilterButton>

              <FilterButton
                type="button"
                $active={
                  statusFilter === "ACTIVE"
                }
                onClick={() =>
                  setStatusFilter("ACTIVE")
                }
              >
                Ativos
              </FilterButton>

              <FilterButton
                type="button"
                $active={
                  statusFilter === "INACTIVE"
                }
                onClick={() =>
                  setStatusFilter("INACTIVE")
                }
              >
                Inativos
              </FilterButton>
            </FilterGroup>
          </Filters>
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
              ) : filteredItems.length ? (
                filteredItems.map((admin) => (
                  <tr key={admin.id}>
                    <Td>{admin.name}</Td>
                    <Td>{admin.email}</Td>
                    <Td>
                      {isOwner(admin) ? (
                        <Badge $variant="primary">
                          Owner
                        </Badge>
                      ) : (
                        <Select
                          value={
                            roleDrafts[admin.id] ||
                            admin.role
                          }
                          onChange={(event) =>
                            setRoleDrafts((prev) => ({
                              ...prev,
                              [admin.id]:
                                event.target
                                  .value as AdminRole,
                            }))
                          }
                        >
                          <option value="OWNER">
                            Owner
                          </option>

                          <option value="ADMIN">
                            Admin
                          </option>
                        </Select>
                      )}
                    </Td>
                    <Td>
                      <Badge
                        $variant={statusVariant(
                          admin
                        )}
                      >
                        {statusLabel(admin)}
                      </Badge>
                    </Td>
                    <Td>{new Date(admin.createdAt).toLocaleString("pt-BR")}</Td>
                    <Td>
                      <RowActions>
                        {currentAdmin?.id !== admin.id && (
                          <>
                            {!admin.approved && (
                              <SmallButton
                                type="button"
                                onClick={() =>
                                  executeAction(
                                    () =>
                                      approveAdmin(
                                        admin.id
                                      ),
                                    "Admin aprovado com sucesso."
                                  )
                                }
                              >
                                Aprovar
                              </SmallButton>
                            )}

                            {admin.approved &&
                              !admin.isActive && (
                                <SmallButton
                                  type="button"
                                  onClick={() =>
                                    executeAction(
                                      () =>
                                        activateAdmin(
                                          admin.id
                                        ),
                                      "Admin ativado com sucesso."
                                    )
                                  }
                                >
                                  Ativar
                                </SmallButton>
                              )}

                            {admin.approved &&
                              admin.isActive && (
                                <SmallButton
                                  type="button"
                                  onClick={() =>
                                    executeAction(
                                      () =>
                                        deactivateAdmin(
                                          admin.id
                                        ),
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
                                executeAction(
                                  () =>
                                    updateAdminRole(
                                      admin.id,
                                      roleDrafts[
                                        admin.id
                                      ] || admin.role
                                    ),
                                  "Papel atualizado com sucesso."
                                )
                              }
                            >
                              Salvar papel
                            </SmallButton>

                            <SmallButton
                              type="button"
                              onClick={() => {
                                const confirmed =
                                  window.confirm(
                                    `Tem certeza que deseja remover o admin ${admin.name}?`
                                  );

                                if (!confirmed) {
                                  return;
                                }

                                executeAction(
                                  () =>
                                    removeAdmin(
                                      admin.id
                                    ),
                                  "Admin removido com sucesso."
                                );
                              }}
                            >
                              Remover
                            </SmallButton>
                          </>
                        )}

                        {currentAdmin?.id === admin.id && (
                          <span
                            style={{
                              fontSize: 12,
                              color:
                                "inherit",
                              opacity: 0.65,
                            }}
                          >
                            Usuário atual
                          </span>
                        )}
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
