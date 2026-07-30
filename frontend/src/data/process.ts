export type ProcessData = {
  section: {
    eyebrow: string;
    title: string;
    description: string;
  };
  steps: string[];
};

export const processData: ProcessData = {
  section: {
    eyebrow: "Processo",
    title: "Um processo claro, estruturado e construído junto",
    description:
      "Da primeira conversa até o projeto executivo, cada etapa é pensada para trazer clareza e segurança.",
  },

  steps: [
    "Solicitação de proposta",
    "Conversa inicial",
    "Fechamento de contrato",
    "Levantamento de dados",
    "Reunião de imersão",
    "Estudo Preliminar",
    "Estudo de Viabilidade Financeira",
    "Anteprojeto",
    "Projeto Executivo",
  ],
};