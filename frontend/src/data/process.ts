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
    "Orientação inicial",
    "Reunião de imersão",
    "Levantamento de dados",
    "Estudo preliminar",
    "Anteprojeto",
    "Projeto executivo",
  ],
};