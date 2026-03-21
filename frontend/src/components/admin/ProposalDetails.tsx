import styled from "styled-components";
import type { ProposalRequestAdmin } from "../../types/admin";
import { CopyButton } from "./CopyButton";

const Group = styled.div`
  display: grid;
  gap: 0.85rem;
`;

const SectionTitle = styled.h3`
  font-size: 1rem;
  line-height: 1.3;
`;

const Row = styled.div`
  display: grid;
  gap: 0.3rem;
`;

const RowTop = styled.div`
  display: flex;
  gap: 0.6rem;
  align-items: center;
  flex-wrap: wrap;
`;

const Label = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Value = styled.div`
  color: ${({ theme }) => theme.colors.textSoft};
  line-height: 1.75;
  word-break: break-word;
`;

const Divider = styled.hr`
  border: 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin: 0.2rem 0;
`;

const LinkView = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
`;

function show(value: unknown) {
  if (value === null || value === undefined || value === "") return "-";
  if (Array.isArray(value)) return value.length ? value.join(", ") : "-";
  return String(value);
}

function renderDetailRows(details: Record<string, unknown> | null | undefined) {
  if (!details) return null;

  return Object.entries(details)
    .filter(([, value]) => {
      if (value === null || value === undefined) return false;
      if (typeof value === "string" && !value.trim()) return false;
      if (Array.isArray(value) && !value.length) return false;
      return true;
    })
    .map(([key, value]) => (
      <Row key={key}>
        <Label>{key}</Label>
        <Value>{show(value)}</Value>
      </Row>
    ));
}

export function ProposalDetails({ proposal }: { proposal: ProposalRequestAdmin }) {
  const details = proposal.projectDetailsJson || {};

  const newConstruction =
    "newConstruction" in details
      ? (details.newConstruction as Record<string, unknown> | null)
      : null;

  const interiors =
    "interiors" in details
      ? (details.interiors as Record<string, unknown> | null)
      : null;

  const renovation =
    "renovation" in details
      ? (details.renovation as Record<string, unknown> | null)
      : null;

  const consulting =
    "consulting" in details
      ? (details.consulting as Record<string, unknown> | null)
      : null;

  return (
    <Group>
      <SectionTitle>Dados principais</SectionTitle>

      <Row><Label>ID</Label><Value>{proposal.id}</Value></Row>
      <Row>
        <Label>Criado em</Label>
        <Value>{new Date(proposal.createdAt).toLocaleString("pt-BR")}</Value>
      </Row>
      <Row><Label>Status</Label><Value>{proposal.status}</Value></Row>
      <Row><Label>Nome</Label><Value>{proposal.fullName}</Value></Row>

      <Row>
        <RowTop>
          <Label>E-mail</Label>
          <CopyButton label="Copiar e-mail" value={proposal.email} />
        </RowTop>
        <Value>{proposal.email}</Value>
      </Row>

      <Row>
        <RowTop>
          <Label>Telefone</Label>
          <CopyButton label="Copiar telefone" value={proposal.phone} />
        </RowTop>
        <Value>{proposal.phone}</Value>
      </Row>

      <Row><Label>CPF</Label><Value>{proposal.cpf}</Value></Row>
      <Row><Label>Endereço</Label><Value>{proposal.address}</Value></Row>
      <Row><Label>Data de nascimento</Label><Value>{proposal.birthDate}</Value></Row>
      <Row><Label>Rede social</Label><Value>{show(proposal.socialProfile)}</Value></Row>

      <Row>
        <Label>Contato preferido</Label>
        <Value>
          {proposal.preferredContactMethod}
          {proposal.preferredContactMethodOther
            ? ` — ${proposal.preferredContactMethodOther}`
            : ""}
        </Value>
      </Row>

      <Row>
        <Label>Como conheceu a ROOM</Label>
        <Value>
          {proposal.referralSource}
          {proposal.referralSourceOther ? ` — ${proposal.referralSourceOther}` : ""}
        </Value>
      </Row>

      <Row><Label>Prazo desejado</Label><Value>{proposal.desiredWorkStart}</Value></Row>

      <Row>
        <Label>Tipo de projeto</Label>
        <Value>
          {proposal.projectType}
          {proposal.projectTypeOther ? ` — ${proposal.projectTypeOther}` : ""}
        </Value>
      </Row>

      <Row>
        <Label>Forma de pagamento</Label>
        <Value>
          {proposal.paymentMethod}
          {proposal.paymentMethodOther ? ` — ${proposal.paymentMethodOther}` : ""}
        </Value>
      </Row>

      <Row>
        <Label>Comprovante</Label>
        <Value>
          {proposal.paymentProofUrl ? (
            <LinkView href={proposal.paymentProofUrl} target="_blank" rel="noreferrer">
              Ver comprovante
            </LinkView>
          ) : (
            "-"
          )}
        </Value>
      </Row>

      <Divider />

      {newConstruction && (
        <>
          <SectionTitle>Construção nova</SectionTitle>
          {renderDetailRows(newConstruction)}
          <Divider />
        </>
      )}

      {interiors && (
        <>
          <SectionTitle>Interiores</SectionTitle>
          {renderDetailRows(interiors)}
          <Divider />
        </>
      )}

      {renovation && (
        <>
          <SectionTitle>Reforma / ampliação</SectionTitle>
          {renderDetailRows(renovation)}
          <Divider />
        </>
      )}

      {consulting && (
        <>
          <SectionTitle>Consultoria / outros</SectionTitle>
          {renderDetailRows(consulting)}
        </>
      )}
    </Group>
  );
}