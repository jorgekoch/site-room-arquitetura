import styled from "styled-components";
import type { ProposalRequestAdmin } from "../../types/admin";
import { CopyButton } from "./CopyButton";

const Wrapper = styled.div`
  display: grid;
  gap: 1.25rem;
`;

const Section = styled.section`
  display: grid;
  gap: 0.9rem;
  padding: 1rem;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const SectionTitle = styled.h3`
  font-size: 1rem;
  line-height: 1.3;
  color: ${({ theme }) => theme.colors.text};
`;

const Grid = styled.div`
  display: grid;
  gap: 0.9rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const FullWidth = styled.div`
  grid-column: 1 / -1;
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

const LinkView = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const LinksList = styled.div`
  display: grid;
  gap: 0.45rem;
`;

const Empty = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  width: fit-content;
  min-height: 32px;
  padding: 0.35rem 0.75rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.backgroundSoft};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
`;

const labelsMap: Record<string, string> = {
  terrainSize: "Tamanho do terreno",
  terrainSlope: "Inclinação do terreno",
  terrainSlopeOther: "Outra inclinação",
  terrainZone: "Zona do terreno",
  terrainZoneOther: "Outra zona",
  terrainAddress: "Endereço do terreno",
  scopeDescription: "Escopo do projeto",
  floors: "Pavimentos",
  floorsOther: "Outro número de pavimentos",
  desiredArea: "Metragem desejada",
  definedBudget: "Orçamento definido",
  wantsEngineeringPartnership: "Parceria de engenharia",
  referencesLinks: "Links de fotos e referências",
  observations: "Observações",
  projectMode: "Modalidade",

  includedItems: "Itens incluídos",
  includedItemsOther: "Outro item",
  environments: "Ambientes",

  projectDescription: "Descrição do projeto",
  locationAddress: "Endereço do local",

  requestDescription: "Solicitação",
};

const valueMap: Record<string, string> = {
  NEW: "Nova",
  REVIEWING: "Em análise",
  AWAITING_PAYMENT: "Aguardando pagamento",
  PAID: "Pago",
  SCHEDULED: "Agendado",
  CLOSED: "Encerrado",
  CANCELED: "Cancelado",

  "new-construction": "Construção nova",
  interiors: "Projeto de interiores",
  renovation: "Reforma / ampliação",
  consulting: "Consultoria",
  other: "Outro",

  presencial: "Presencial",
  online: "Online",

  sim: "Sim",
  nao: "Não",
  pix: "PIX",
  cartao: "Cartão",
  boleto: "Boleto",
  outro: "Outro",

  whatsapp: "WhatsApp",
  instagram: "Instagram",
  site: "Site",
  indicacao: "Indicação",
  google: "Google",

  terrea: "Térrea",
  sobrado: "Sobrado",
  outro_pavimento: "Outro",

  plano: "Plano",
  inclinado: "Inclinado",

  urbano: "Urbano",
  rural: "Rural",
};

function translateLabel(key: string) {
  return labelsMap[key] || key;
}

function translateValue(value: string) {
  return valueMap[value] || value;
}

function formatValue(value: unknown): string {
  if (value === null || value === undefined || value === "") return "-";

  if (typeof value === "boolean") {
    return value ? "Sim" : "Não";
  }

  if (Array.isArray(value)) {
    return value.length ? value.map((item) => translateValue(String(item))).join(", ") : "-";
  }

  return translateValue(String(value));
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
        <Label>{translateLabel(key)}</Label>
        <Value>{formatValue(value)}</Value>
      </Row>
    ));
}

export function ProposalDetails({ proposal }: { proposal: ProposalRequestAdmin }) {
  const details =
    proposal.projectDetailsJson &&
    typeof proposal.projectDetailsJson === "object" &&
    !Array.isArray(proposal.projectDetailsJson)
      ? (proposal.projectDetailsJson as Record<string, unknown>)
      : {};

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

  const referenceFiles = Array.isArray(proposal.referenceFilesJson)
    ? (proposal.referenceFilesJson as Array<{
        originalName: string;
        url: string;
      }>)
    : [];

  return (
    <Wrapper>
      <Section>
        <SectionTitle>Resumo da solicitação</SectionTitle>

        <Grid>
          <Row>
            <Label>Status</Label>
            <Badge>{formatValue(proposal.status)}</Badge>
          </Row>

          <Row>
            <Label>Tipo de projeto</Label>
            <Value>
              {formatValue(proposal.projectType)}
              {proposal.projectTypeOther ? ` — ${proposal.projectTypeOther}` : ""}
            </Value>
          </Row>

          <Row>
            <Label>Criado em</Label>
            <Value>{new Date(proposal.createdAt).toLocaleString("pt-BR")}</Value>
          </Row>

          <Row>
            <Label>ID da solicitação</Label>
            <Value>{proposal.id}</Value>
          </Row>
        </Grid>
      </Section>

      <Section>
        <SectionTitle>Dados do cliente</SectionTitle>

        <Grid>
          <Row>
            <Label>Nome</Label>
            <Value>{proposal.fullName}</Value>
          </Row>

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

          <Row>
            <Label>CPF</Label>
            <Value>{proposal.cpf}</Value>
          </Row>

          <Row className="full">
            <Label>Endereço</Label>
            <Value>{proposal.address}</Value>
          </Row>

          <Row>
            <Label>Data de nascimento</Label>
            <Value>{proposal.birthDate}</Value>
          </Row>

          <Row>
            <Label>Rede social</Label>
            <Value>{formatValue(proposal.socialProfile)}</Value>
          </Row>

          <Row>
            <Label>Contato preferido</Label>
            <Value>
              {formatValue(proposal.preferredContactMethod)}
              {proposal.preferredContactMethodOther
                ? ` — ${proposal.preferredContactMethodOther}`
                : ""}
            </Value>
          </Row>

          <Row>
            <Label>Como conheceu a ROOM</Label>
            <Value>
              {formatValue(proposal.referralSource)}
              {proposal.referralSourceOther
                ? ` — ${proposal.referralSourceOther}`
                : ""}
            </Value>
          </Row>
        </Grid>
      </Section>

      <Section>
        <SectionTitle>Pagamento e envio</SectionTitle>

        <Grid>
          <Row>
            <Label>Prazo desejado</Label>
            <Value>{proposal.desiredWorkStart}</Value>
          </Row>

          <Row>
            <Label>Forma de pagamento</Label>
            <Value>
              {formatValue(proposal.paymentMethod)}
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
                <Empty>Nenhum comprovante enviado.</Empty>
              )}
            </Value>
          </Row>

          <FullWidth>
            <Row>
              <Label>Arquivos de referência enviados</Label>
              <Value>
                {referenceFiles.length ? (
                  <LinksList>
                    {referenceFiles.map((file) => (
                      <LinkView
                        key={`${file.url}-${file.originalName}`}
                        href={file.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {file.originalName}
                      </LinkView>
                    ))}
                  </LinksList>
                ) : (
                  <Empty>Nenhum arquivo enviado.</Empty>
                )}
              </Value>
            </Row>
          </FullWidth>
        </Grid>
      </Section>

      {newConstruction && (
        <Section>
          <SectionTitle>Detalhes — construção nova</SectionTitle>
          <Grid>{renderDetailRows(newConstruction)}</Grid>
        </Section>
      )}

      {interiors && (
        <Section>
          <SectionTitle>Detalhes — projeto de interiores</SectionTitle>
          <Grid>{renderDetailRows(interiors)}</Grid>
        </Section>
      )}

      {renovation && (
        <Section>
          <SectionTitle>Detalhes — reforma / ampliação</SectionTitle>
          <Grid>{renderDetailRows(renovation)}</Grid>
        </Section>
      )}

      {consulting && (
        <Section>
          <SectionTitle>Detalhes — consultoria / outros</SectionTitle>
          <Grid>{renderDetailRows(consulting)}</Grid>
        </Section>
      )}
    </Wrapper>
  );
}