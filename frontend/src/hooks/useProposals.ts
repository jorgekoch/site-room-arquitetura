import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getProposals,
  getProposalById,
  updateProposalStatus,
  updateProposalNotes,
  deleteProposal,
} from "../lib/proposals";

import type {
  ProposalRequestAdmin,
  ProposalStatus,
} from "../types/proposal";

export function useProposals() {
  const [proposals, setProposals] =
    useState<ProposalRequestAdmin[]>([]);

  const [
    selectedProposal,
    setSelectedProposal,
  ] = useState<ProposalRequestAdmin | null>(
    null
  );

  const [loading, setLoading] =
    useState(true);

  const [
    detailsLoading,
    setDetailsLoading,
  ] = useState(false);

  const [error, setError] =
    useState("");

  const loadProposals = useCallback(
    async (params?: {
      status?: string;
      projectType?: string;
      search?: string;
    }) => {
      try {
        setLoading(true);
        setError("");

        const data =
          await getProposals(params);

        setProposals(data);
      } catch (error) {
        console.error(error);

        setError(
          "Não foi possível carregar as propostas."
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const loadProposal = useCallback(
    async (id: string) => {
      try {
        setDetailsLoading(true);
        setError("");

        const data =
          await getProposalById(id);

        setSelectedProposal(data);

        return data;
      } catch (error) {
        console.error(error);

        setError(
          "Não foi possível carregar a proposta."
        );

        throw error;
      } finally {
        setDetailsLoading(false);
      }
    },
    []
  );

  const changeStatus = useCallback(
    async (
      id: string,
      status: ProposalStatus
    ) => {
      const updated =
        await updateProposalStatus(
          id,
          status
        );

      setSelectedProposal(updated);

      setProposals((current) =>
        current.map((proposal) =>
          proposal.id === id
            ? {
                ...proposal,
                status,
              }
            : proposal
        )
      );

      return updated;
    },
    []
  );

  const saveNotes = useCallback(
    async (
      id: string,
      internalNotes: string
    ) => {
      const updated =
        await updateProposalNotes(
          id,
          internalNotes
        );

      setSelectedProposal(updated);

      setProposals((current) =>
        current.map((proposal) =>
          proposal.id === id
            ? {
                ...proposal,
                internalNotes,
              }
            : proposal
        )
      );

      return updated;
    },
    []
  );

  const removeProposal = useCallback(
    async (id: string) => {
      await deleteProposal(id);

      setProposals((current) =>
        current.filter((proposal) => proposal.id !== id)
      );

      setSelectedProposal((current) =>
        current?.id === id ? null : current
      );
    },
    []
  );

  useEffect(() => {
    loadProposals();
  }, [loadProposals]);

  return {
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

    setSelectedProposal,
  };
}
