export type AudienceData = {
  section: {
    eyebrow: string;
    title: string;
    description: string;
  };
  items: {
    title: string;
    description: string;
  }[];
};

export const audienceData: AudienceData = {
  section: {
    eyebrow: "Para quem é",
    title: "A ROOM faz sentido para quem quer construir com mais identidade, clareza e pertencimento",
    description:
      "A proposta da ROOM conversa principalmente com pessoas que estão planejando a primeira casa e desejam um projeto mais consciente, funcional e conectado à própria forma de viver.",
  },

  items: [
    {
      title: "Casais e famílias em uma nova fase",
      description:
        "Pessoas que estão planejando a primeira casa e querem que esse espaço represente de verdade quem são e como vivem.",
    },
    {
      title: "Quem busca conforto com sentido",
      description:
        "Clientes que valorizam bem-estar, praticidade, acolhimento e uma casa pensada para a vida real, não só para ficar bonita.",
    },
    {
      title: "Quem quer construir com mais consciência",
      description:
        "Pessoas atentas ao terreno, ao contexto, ao uso inteligente de recursos e ao impacto das escolhas ao longo do tempo.",
    },
    {
      title: "Quem valoriza um processo claro",
      description:
        "Clientes que querem entender bem cada etapa, tomar decisões com segurança e se sentir acompanhados durante todo o projeto.",
    },
  ],
};