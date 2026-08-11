import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { PageHeader } from "../../../components/admin/PageHeader";
import { Loading } from "../../../components/admin/common/Loading";
import { EmptyState } from "../../../components/admin/common/EmptyState";
import { ConfirmModal } from "../../../components/admin/common/ConfirmModal";

import { ProposalDetails } from "../../../components/admin/ProposalDetails";
import { ProposalNotes } from "../../../components/admin/ProposalNotes";
import { ProposalPaymentProof } from "../../../components/admin/ProposalPaymentProof";

import { useProposals } from "../../../hooks/useProposals";
import { useAdmin } from "../../../contexts/AdminContext";

import type { ProposalStatus } from "../../../types/proposal";

import { proposalStatusOptions } from "../../../data/admin";

import * as S from "./styles";
import { getProposalProjectTypeLabel } from "../../../utils/proposalLabels";
import { exportProposals } from "../../../lib/proposals";

export default function AdminPropostas() {
  const [searchParams] = useSearchParams();

  const proposalIdFromUrl = searchParams.get("proposal");

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
    removeProposal,
  } = useProposals();

  const { user } = useAdmin();

  const [selectedId, setSelectedId] = useState("");

  const [statusFilter, setStatusFilter] = useState("");

  const [projectTypeFilter, setProjectTypeFilter] = useState("");

  const [search, setSearch] = useState("");

  const [statusDraft, setStatusDraft] = useState<ProposalStatus | "">("");

  const [message, setMessage] = useState("");

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  const [deleting, setDeleting] = useState(false);

  const [exporting, setExporting] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  /**
   * Tipos de projeto disponíveis
   */
  const projectTypeOptions = useMemo(() => {
    return Array.from(
      new Set(
        proposals.map((proposal) => proposal.projectType).filter(Boolean),
      ),
    );
  }, [proposals]);

  /**
   * Carrega propostas quando
   * os filtros mudarem.
   */
  useEffect(() => {
    loadProposals({
      status: statusFilter || undefined,
      projectType: projectTypeFilter || undefined,
      search: search || undefined,
    });
  }, [statusFilter, projectTypeFilter, search, loadProposals]);

  /**
   * Seleciona automaticamente
   * a primeira proposta.
   */
  useEffect(() => {
    if (!proposals.length) {
      setSelectedId("");
      return;
    }

    // Se a página foi aberta através
    // da busca do Header, prioriza
    // exatamente a proposta solicitada.
    if (proposalIdFromUrl) {
      const proposalFromUrl = proposals.find(
        (proposal) => proposal.id === proposalIdFromUrl,
      );

      if (proposalFromUrl) {
        setSelectedId(proposalFromUrl.id);

        return;
      }
    }

    const stillExists = proposals.some(
      (proposal) => proposal.id === selectedId,
    );

    if (!selectedId || !stillExists) {
      setSelectedId(proposals[0].id);
    }
  }, [proposals, selectedId, proposalIdFromUrl]);

  /**
   * Carrega detalhes da proposta
   * selecionada.
   */
  useEffect(() => {
    if (!selectedId) {
      return;
    }

    loadProposal(selectedId).catch(console.error);
  }, [selectedId, loadProposal]);

  /**
   * Mantém o select de status
   * sincronizado com a proposta.
   */
  useEffect(() => {
    if (selectedProposal) {
      setStatusDraft(selectedProposal.status);
    } else {
      setStatusDraft("");
    }
  }, [selectedProposal]);

  async function handleSaveStatus() {
    if (!selectedProposal || !statusDraft) {
      return;
    }

    try {
      setMessage("");
      setErrorMessage("");

      await changeStatus(selectedProposal.id, statusDraft);

      setMessage("Status atualizado com sucesso.");

      window.dispatchEvent(new Event("admin-notifications-updated"));

      await loadProposals({
        status: statusFilter || undefined,
        projectType: projectTypeFilter || undefined,
        search: search || undefined,
      });

      await loadProposal(selectedProposal.id);
    } catch (error) {
      console.error(error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível atualizar o status.",
      );
    }
  }

  async function handleDeleteProposal() {
    if (!selectedProposal || deleteConfirmation !== "excluir") {
      return;
    }

    try {
      setDeleting(true);
      setErrorMessage("");
      setMessage("");

      await removeProposal(selectedProposal.id);

      setDeleteModalOpen(false);
      setDeleteConfirmation("");
      setMessage("Proposta excluída com sucesso.");

      window.dispatchEvent(new Event("admin-notifications-updated"));
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível excluir a proposta.",
      );
    } finally {
      setDeleting(false);
    }
  }

  async function handleExportProposals() {
    try {
      setExporting(true);
      setErrorMessage("");
      setMessage("");

      await exportProposals({
        status: statusFilter || undefined,

        projectType: projectTypeFilter || undefined,

        search: search || undefined,
      });

      setMessage("Propostas exportadas com sucesso.");
    } catch (error) {
      console.error(error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível exportar as propostas.",
      );
    } finally {
      setExporting(false);
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
          onChange={(event) => setSearch(event.target.value)}
        />

        <S.Select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option value="">Todos os status</option>

          {proposalStatusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </S.Select>

        <S.Select
          value={projectTypeFilter}
          onChange={(event) => setProjectTypeFilter(event.target.value)}
        >
          <option value="">Todos os tipos</option>

          {projectTypeOptions.map((option) => (
            <option key={option} value={option}>
              {getProposalProjectTypeLabel(option)}
            </option>
          ))}
        </S.Select>
      </S.Filters>

      {error && <S.Message $error>{error}</S.Message>}

      {errorMessage && <S.Message $error>{errorMessage}</S.Message>}

      {message && <S.Message>{message}</S.Message>}

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
              {proposals.map((proposal) => (
                <S.ItemButton
                  key={proposal.id}
                  type="button"
                  $active={proposal.id === selectedId}
                  onClick={() => setSelectedId(proposal.id)}
                >
                  <S.ItemTitle>{proposal.fullName}</S.ItemTitle>

                  <S.ItemMeta>{proposal.email}</S.ItemMeta>

                  <S.ItemMeta>
                    {getProposalProjectTypeLabel(proposal.projectType)}

                    {" • "}

                    {proposalStatusOptions.find(
                      (option) => option.value === proposal.status,
                    )?.label ?? proposal.status}
                  </S.ItemMeta>
                </S.ItemButton>
              ))}
            </S.List>
          </S.Panel>

          {/* Detalhes */}
          <S.Panel>
            {detailsLoading ? (
              <Loading />
            ) : selectedProposal ? (
              <S.Details>
                <S.DetailTitle>{selectedProposal.fullName}</S.DetailTitle>

                <S.Actions>
                  <S.StatusSelect
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
                  </S.StatusSelect>

                  <S.SaveButton type="button" onClick={handleSaveStatus}>
                    Salvar status
                  </S.SaveButton>
                </S.Actions>

                <ProposalDetails proposal={selectedProposal} />

                <S.AdminBlocks>
                  <S.Block>
                    <ProposalNotes
                      proposalId={selectedProposal.id}
                      initialValue={selectedProposal.internalNotes}
                      onSave={saveNotes}
                      onSaved={() => loadProposal(selectedProposal.id)}
                    />
                  </S.Block>

                  <S.Block>
                    <ProposalPaymentProof
                      proposalId={selectedProposal.id}
                      hasCurrentProof={Boolean(
                        selectedProposal.paymentProofStorageKey,
                      )}
                      onUploaded={() => loadProposal(selectedProposal.id)}
                    />
                  </S.Block>
                </S.AdminBlocks>

                {user?.role === "OWNER" && (
                  <S.DangerZone>
                    <S.DeleteButton
                      type="button"
                      onClick={() => {
                        setDeleteConfirmation("");
                        setDeleteModalOpen(true);
                      }}
                    >
                      Excluir proposta
                    </S.DeleteButton>
                  </S.DangerZone>
                )}
              </S.Details>
            ) : (
              <S.Empty>
                Selecione uma proposta para visualizar os detalhes.
              </S.Empty>
            )}
          </S.Panel>
        </S.Grid>
      )}

      {/* Exportação */}
      <S.ExportSection>
        <S.ExportButton
          type="button"
          onClick={handleExportProposals}
          disabled={exporting || proposals.length === 0}
        >
          {exporting ? (
            "Exportando..."
          ) : (
            <>
              <span aria-hidden="true">↓</span>
              Exportar propostas em Excel
            </>
          )}
        </S.ExportButton>

        <S.ExportDescription>
          Exporta os dados das propostas de acordo com os filtros atualmente
          aplicados.
        </S.ExportDescription>
      </S.ExportSection>

      <ConfirmModal
        open={deleteModalOpen}
        title="Excluir proposta"
        message={<>Esta ação é permanente. Digite "excluir" para confirmar.</>}
        confirmLabel="Excluir proposta"
        loading={deleting}
        confirmation={{
          value: deleteConfirmation,
          onChange: setDeleteConfirmation,
        }}
        onConfirm={handleDeleteProposal}
        onCancel={() => {
          setDeleteModalOpen(false);
          setDeleteConfirmation("");
        }}
      />
    </>
  );
}
