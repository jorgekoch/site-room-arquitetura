import type { ProposalStatus } from "../types/proposal";

const proposalStatusLabels: Record<
    ProposalStatus,
    string
> = {
    NEW: "Nova",
    REVIEWING: "Em análise",
    AWAITING_PAYMENT: "Aguardando pagamento",
    PAID: "Pagamento realizado",
    SCHEDULED: "Agendada",
    CLOSED: "Encerrada",
    CANCELED: "Cancelada",
};

const proposalProjectTypeLabels: Record<
    string,
    string
> = {
    "new-construction": "Construção nova",
    interiors: "Projeto de interiores",
    renovation: "Reforma / ampliação",
    consulting: "Consultoria",
    other: "Outro",
};

export function getProposalStatusLabel(
    status: string
) {
    return (
        proposalStatusLabels[
        status as ProposalStatus
        ] ?? status
    );
}

export function getProposalProjectTypeLabel(
    projectType: string
) {
    return (
        proposalProjectTypeLabels[projectType] ??
        projectType
    );
}