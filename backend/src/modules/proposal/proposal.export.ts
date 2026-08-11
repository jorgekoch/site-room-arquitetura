import ExcelJS from "exceljs";
import type { ProposalRequest } from "@prisma/client";

/**
 * Tradução dos nomes internos dos campos
 * utilizados nos detalhes da proposta.
 */
const fieldLabels: Record<string, string> = {
  projectMode: "Modo do projeto",
  observations: "Observações",
  locationAddress: "Localização",
  referencesLinks: "Links de referência",
  projectDescription: "Descrição do projeto",

  includedItems: "Itens incluídos",
  rooms: "Ambientes",
  style: "Estilo",
  budget: "Orçamento",

  landSize: "Tamanho do terreno",
  constructionArea: "Área de construção",
  numberOfFloors: "Número de pavimentos",
  numberOfRooms: "Número de quartos",
  numberOfBathrooms: "Número de banheiros",

  existingArea: "Área existente",
  renovationArea: "Área da reforma",

  consultingType: "Tipo de consultoria",
  consultingDescription: "Descrição da consultoria",

  name: "Nome",
  description: "Descrição",
  type: "Tipo",
  value: "Valor",
  quantity: "Quantidade",
  area: "Área",
  address: "Endereço",
  city: "Cidade",
  state: "Estado",
  other: "Outro",
};

/**
 * Tradução de valores internos utilizados
 * pelo sistema.
 */
const valueLabels: Record<string, string> = {
  online: "Online",
  presencial: "Presencial",
  hybrid: "Híbrido",

  "new-construction": "Nova construção",
  interiors: "Interiores",
  renovation: "Reforma",
  consulting: "Consultoria",

  pix: "PIX",
  credit: "Cartão de crédito",
  debit: "Cartão de débito",
  boleto: "Boleto",

  NEW: "Nova",
  REVIEWING: "Em análise",
  AWAITING_PAYMENT: "Aguardando pagamento",
  PAID: "Pago",
  SCHEDULED: "Agendada",
  CLOSED: "Encerrada",
  CANCELED: "Cancelada",
};

/**
 * Converte uma chave técnica/camelCase
 * em um nome amigável.
 */
function getFieldLabel(key: string): string {
  if (fieldLabels[key]) {
    return fieldLabels[key];
  }

  return key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

/**
 * Converte valores técnicos conhecidos
 * para valores amigáveis.
 */
function getValueLabel(value: string): string {
  return valueLabels[value] ?? value;
}

/**
 * Formata valores complexos armazenados
 * nos detalhes da proposta.
 */
function formatJson(value: unknown, level = 0): string {
  if (value === null || value === undefined || value === "") {
    return "";
  }

  if (typeof value === "string") {
    return getValueLabel(value);
  }

  if (typeof value === "number") {
    return String(value);
  }

  if (typeof value === "boolean") {
    return value ? "Sim" : "Não";
  }

  const indentation = "  ".repeat(level);

  /**
   * Arrays
   */
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        const formatted = formatJson(item, level + 1);

        if (!formatted) {
          return "";
        }

        return `${indentation}• ${formatted}`;
      })
      .filter(Boolean)
      .join("\n");
  }

  /**
   * Objetos
   */
  if (typeof value === "object") {
    return Object.entries(value as Record<string, unknown>)
      .map(([key, item]) => {
        if (item === null || item === undefined || item === "") {
          return "";
        }

        const label = getFieldLabel(key);

        /**
         * Se for um objeto ou array,
         * formata seus campos internos.
         */
        if (typeof item === "object") {
          const formatted = formatJson(item, level + 1);

          if (!formatted) {
            return "";
          }

          return `${indentation}${label}:\n${formatted}`;
        }

        let displayValue = String(item);

        if (typeof item === "boolean") {
          displayValue = item ? "Sim" : "Não";
        } else if (typeof item === "string") {
          displayValue = getValueLabel(item);
        }

        return `${indentation}${label}: ${displayValue}`;
      })
      .filter(Boolean)
      .join("\n\n");
  }

  return String(value);
}

/**
 * Formata os detalhes específicos
 * do tipo de projeto.
 *
 * O banco armazena algo como:
 *
 * {
 *   renovation: {
 *     projectMode: "...",
 *     observations: "...",
 *     ...
 *   }
 * }
 *
 * Como o tipo do projeto já possui uma
 * coluna própria na planilha, removemos
 * "renovation", "interiors", etc. do
 * conteúdo exportado.
 */
function formatProjectDetails(value: unknown): string {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return formatJson(value);
  }

  const details = value as Record<string, unknown>;

  const projectTypes = [
    "newConstruction",
    "interiors",
    "renovation",
    "consulting",
  ];

  for (const projectType of projectTypes) {
    if (details[projectType] !== undefined) {
      return formatJson(details[projectType]);
    }
  }

  return formatJson(value);
}

/**
 * Formata datas para o padrão brasileiro.
 */
function formatDate(value: Date | string | null | undefined): string {
  if (!value) {
    return "";
  }

  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleString("pt-BR");
}

/**
 * Cria o arquivo Excel das propostas.
 *
 * Importante:
 * - Não exporta arquivos do R2.
 * - Não exporta storageKey.
 * - Não exporta URLs privadas.
 * - Os dados pessoais já chegam
 *   descriptografados pelo ProposalService.
 */
export async function createProposalsWorkbook(proposals: ProposalRequest[]) {
  const workbook = new ExcelJS.Workbook();

  workbook.creator = "ROOM Arquitetura Sustentável";

  workbook.created = new Date();

  const worksheet = workbook.addWorksheet("Propostas", {
    views: [
      {
        state: "frozen",
        ySplit: 1,
      },
    ],
  });

  worksheet.columns = [
    {
      header: "ID",
      key: "id",
      width: 28,
    },

    {
      header: "Data da solicitação",
      key: "createdAt",
      width: 22,
    },

    {
      header: "Última atualização",
      key: "updatedAt",
      width: 22,
    },

    {
      header: "Nome completo",
      key: "fullName",
      width: 30,
    },

    {
      header: "E-mail",
      key: "email",
      width: 32,
    },

    {
      header: "CPF",
      key: "cpf",
      width: 18,
    },

    {
      header: "Endereço",
      key: "address",
      width: 40,
    },

    {
      header: "Data de nascimento",
      key: "birthDate",
      width: 20,
    },

    {
      header: "Telefone",
      key: "phone",
      width: 20,
    },

    {
      header: "Perfil social",
      key: "socialProfile",
      width: 30,
    },

    {
      header: "Forma de contato",
      key: "preferredContactMethod",
      width: 24,
    },

    {
      header: "Outra forma de contato",
      key: "preferredContactMethodOther",
      width: 30,
    },

    {
      header: "Como conheceu a ROOM",
      key: "referralSource",
      width: 28,
    },

    {
      header: "Outra origem",
      key: "referralSourceOther",
      width: 30,
    },

    {
      header: "Início desejado",
      key: "desiredWorkStart",
      width: 24,
    },

    {
      header: "Tipo de projeto",
      key: "projectType",
      width: 24,
    },

    {
      header: "Outro tipo de projeto",
      key: "projectTypeOther",
      width: 30,
    },

    {
      header: "Detalhes do projeto",
      key: "projectDetails",
      width: 70,
    },

    {
      header: "Aceite dos termos",
      key: "taxAgreement",
      width: 18,
    },

    {
      header: "Forma de pagamento",
      key: "paymentMethod",
      width: 24,
    },

    {
      header: "Outra forma de pagamento",
      key: "paymentMethodOther",
      width: 30,
    },

    {
      header: "Status",
      key: "status",
      width: 20,
    },

    {
      header: "Observações internas",
      key: "internalNotes",
      width: 50,
    },
  ];

  for (const proposal of proposals) {
    worksheet.addRow({
      id: proposal.id,

      createdAt: formatDate(proposal.createdAt),

      updatedAt: formatDate(proposal.updatedAt),

      fullName: proposal.fullName,

      email: proposal.email,

      cpf: proposal.cpf,

      address: proposal.address,

      birthDate: proposal.birthDate,

      phone: proposal.phone,

      socialProfile: proposal.socialProfile ?? "",

      preferredContactMethod: getValueLabel(proposal.preferredContactMethod),

      preferredContactMethodOther: proposal.preferredContactMethodOther ?? "",

      referralSource: getValueLabel(proposal.referralSource),

      referralSourceOther: proposal.referralSourceOther ?? "",

      desiredWorkStart: getValueLabel(proposal.desiredWorkStart),

      projectType: getValueLabel(proposal.projectType),

      projectTypeOther: proposal.projectTypeOther ?? "",

      projectDetails: formatProjectDetails(proposal.projectDetailsJson),

      taxAgreement: proposal.taxAgreement ? "Sim" : "Não",

      paymentMethod: getValueLabel(proposal.paymentMethod),

      paymentMethodOther: proposal.paymentMethodOther ?? "",

      status: getValueLabel(proposal.status),

      internalNotes: proposal.internalNotes ?? "",
    });
  }

  /**
   * Cabeçalho
   */
  worksheet.getRow(1).font = {
    bold: true,
  };

  worksheet.getRow(1).alignment = {
    vertical: "middle",
    wrapText: true,
  };

  /**
   * Corpo da planilha
   */
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) {
      return;
    }

    row.alignment = {
      vertical: "top",
      wrapText: true,
    };
  });

  return workbook.xlsx.writeBuffer();
}
