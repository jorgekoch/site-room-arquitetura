import { useEffect, useMemo, useState } from "react";

import { PageHeader } from "../../../components/admin/PageHeader";
import { Loading } from "../../../components/admin/common/Loading";
import { EmptyState } from "../../../components/admin/common/EmptyState";

import { ProposalDetails } from "../../../components/admin/ProposalDetails";
import { ProposalNotes } from "../../../components/admin/ProposalNotes";
import { ProposalPaymentProof } from "../../../components/admin/ProposalPaymentProof";

import { useProposals } from "../../../hooks/useProposals";

import type { ProposalStatus } from "../../../types/proposal";

import { proposalStatusOptions } from "../../../data/admin";

import * as S from "./styles";

export default function AdminPropostas() {
  const {
    proposals,
    selectedProposal,
    loading,
    detailsLoading,
    error,
    loadProposals,
    loadProposal,
    changeStatus,
    saveNotes,
  } = useProposals();

  const [selectedId, setSelectedId] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("");

  const [projectTypeFilter, setProjectTypeFilter] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [statusDraft, setStatusDraft] =
    useState<ProposalStatus | "">("");

  const [message, setMessage] =
    useState("");

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  /**
   * Tipos de projeto disponíveis
   */
  const projectTypeOptions = useMemo(() => {
    return Array.from(
      new Set(
        proposals
          .map(
            (proposal) =>
              proposal.projectType
          )
          .filter(Boolean)
      )
    );
  }, [proposals]);

  /**
   * Carrega propostas quando
   * os filtros mudarem.
   */
  useEffect(() => {
    loadProposals({
      status: statusFilter || undefined,
      projectType:
        projectTypeFilter || undefined,
      search: search || undefined,
    });
  }, [
    statusFilter,
    projectTypeFilter,
    search,
    loadProposals,
  ]);

  /**
   * Seleciona automaticamente
   * a primeira proposta.
   */
  useEffect(() => {
    if (!proposals.length) {
      setSelectedId("");
      return;
    }

    const stillExists = proposals.some(
      (proposal) =>
        proposal.id === selectedId
    );

    if (!selectedId || !stillExists) {
      setSelectedId(
        proposals[0].id
      );
    }
  }, [proposals, selectedId]);

  /**
   * Carrega detalhes da proposta
   * selecionada.
   */
  useEffect(() => {
    if (!selectedId) {
      return;
    }

    loadProposal(selectedId).catch(
      console.error
    );
  }, [
    selectedId,
    loadProposal,
  ]);

  /**
   * Mantém o select de status
   * sincronizado com a proposta.
   */
  useEffect(() => {
    if (selectedProposal) {
      setStatusDraft(
        selectedProposal.status
      );
    } else {
      setStatusDraft("");
    }
  }, [selectedProposal]);

  async function handleSaveStatus() {
    if (
      !selectedProposal ||
      !statusDraft
    ) {
      return;
    }

    try {
      setMessage("");
      setErrorMessage("");

      await changeStatus(
        selectedProposal.id,
        statusDraft
      );

      setMessage(
        "Status atualizado com sucesso."
      );

      await loadProposals({
        status:
          statusFilter || undefined,
        projectType:
          projectTypeFilter || undefined,
        search:
          search || undefined,
      });

      await loadProposal(
        selectedProposal.id
      );
    } catch (error) {
      console.error(error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível atualizar o status."
      );
    }
  }

  return (
    <>
      <PageHeader
        title="Solicitações de proposta"
        description="Acompanhe as solicitações recebidas pelo site, visualize os dados enviados pelos clientes e gerencie cada atendimento."
      />

      <S.Filters>
        <S.Input
          placeholder="Buscar por nome, e-mail ou telefone"
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
        />

        <S.Select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(
              event.target.value
            )
          }
        >
          <option value="">
            Todos os status
          </option>

          {proposalStatusOptions.map(
            (option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            )
          )}
        </S.Select>

        <S.Select
          value={projectTypeFilter}
          onChange={(event) =>
            setProjectTypeFilter(
              event.target.value
            )
          }
        >
          <option value="">
            Todos os tipos
          </option>

          {projectTypeOptions.map(
            (option) => (
              <option
                key={option}
                value={option}
              >
                {option}
              </option>
            )
          )}
        </S.Select>
      </S.Filters>

      {error && (
        <S.Message $error>
          {error}
        </S.Message>
      )}

      {errorMessage && (
        <S.Message $error>
          {errorMessage}
        </S.Message>
      )}

      {message && (
        <S.Message>
          {message}
        </S.Message>
      )}

      {loading ? (
        <Loading />
      ) : proposals.length === 0 ? (
        <EmptyState
          title="Nenhuma proposta encontrada"
          description="Não existem solicitações que correspondam aos filtros selecionados."
        />
      ) : (
        <S.Grid>
          {/* Lista */}
          <S.Panel>
            <S.List>
              {proposals.map(
                (proposal) => (
                  <S.ItemButton
                    key={proposal.id}
                    type="button"
                    $active={
                      proposal.id ===
                      selectedId
                    }
                    onClick={() =>
                      setSelectedId(
                        proposal.id
                      )
                    }
                  >
                    <S.ItemTitle>
                      {proposal.fullName}
                    </S.ItemTitle>

                    <S.ItemMeta>
                      {proposal.email}
                    </S.ItemMeta>

                    <S.ItemMeta>
                      {proposal.projectType}
                      {" • "}
                      {
                        proposalStatusOptions.find(
                          (option) =>
                            option.value ===
                            proposal.status
                        )?.label ??
                          proposal.status
                      }
                    </S.ItemMeta>
                  </S.ItemButton>
                )
              )}
            </S.List>
          </S.Panel>

          {/* Detalhes */}
          <S.Panel>
            {detailsLoading ? (
              <Loading />
            ) : selectedProposal ? (
              <S.Details>
                <S.DetailTitle>
                  {selectedProposal.fullName}
                </S.DetailTitle>

                <S.Actions>
                  <S.StatusSelect
                    value={statusDraft}
                    onChange={(event) =>
                      setStatusDraft(
                        event.target
                          .value as ProposalStatus
                      )
                    }
                  >
                    {proposalStatusOptions.map(
                      (option) => (
                        <option
                          key={option.value}
                          value={
                            option.value
                          }
                        >
                          {option.label}
                        </option>
                      )
                    )}
                  </S.StatusSelect>

                  <S.SaveButton
                    type="button"
                    onClick={
                      handleSaveStatus
                    }
                  >
                    Salvar status
                  </S.SaveButton>
                </S.Actions>

                <ProposalDetails
                  proposal={
                    selectedProposal
                  }
                />

                <S.AdminBlocks>
                  <S.Block>
                    <ProposalNotes
                      proposalId={
                        selectedProposal.id
                      }
                      initialValue={
                        selectedProposal.internalNotes
                      }
                      onSave={saveNotes}
                      onSaved={() =>
                        loadProposal(
                          selectedProposal.id
                        )
                      }
                    />
                  </S.Block>

                  <S.Block>
                    <ProposalPaymentProof
                      proposalId={
                        selectedProposal.id
                      }
                      currentUrl={
                        selectedProposal.paymentProofUrl
                      }
                      onUploaded={() =>
                        loadProposal(
                          selectedProposal.id
                        )
                      }
                    />
                  </S.Block>
                </S.AdminBlocks>
              </S.Details>
            ) : (
              <S.Empty>
                Selecione uma proposta para
                visualizar os detalhes.
              </S.Empty>
            )}
          </S.Panel>
        </S.Grid>
      )}
    </>
  );
}