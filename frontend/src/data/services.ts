export type ServiceItem = {
  tag?: string;
  title: string;
  description?: string;
  bullets?: string[];
  cta?: {
    label: string;
    to: string;
    variant?: "primary" | "ghost";
  };
};

export type ServicesData = {
  section: {
    eyebrow: string;
    title: string;
    description: string;
  };
  items: ServiceItem[];
  sectionCta: {
    label: string;
    to: string;
  };
};

export const servicesData: ServicesData = {
  section: {
    eyebrow: "Como a ROOM projeta",
    title: "Mais do que desenhar uma casa, a ROOM constrói entendimento",
    description:
      "Cada projeto nasce de uma escuta profunda, da leitura do terreno e de decisões que equilibram estética, funcionalidade e sustentabilidade.",
  },

  items: [
    {
      tag: "Escuta",
      title: "Imersão na sua história",
      description:
        "A primeira reunião é um momento de escuta real para entender rotina, desejos, referências e possibilidades.",
      bullets: [
        "Briefing aprofundado",
        "Entendimento da rotina",
        "Referências e repertório pessoal",
      ],
    },
    {
      tag: "Contexto",
      title: "O terreno como guia",
      description:
        "O projeto nasce da leitura do local, considerando clima, sol, vento, topografia e entorno.",
      bullets: [
        "Ventilação natural",
        "Aproveitamento de luz",
        "Leitura do ambiente ao longo do ano",
      ],
    },
    {
      tag: "Estratégia",
      title: "Sustentabilidade aplicada",
      description:
        "A sustentabilidade não é estética, é estratégia de projeto e decisão consciente.",
      bullets: [
        "Uso inteligente de recursos",
        "Valorização de soluções locais",
        "Redução de impacto ambiental",
      ],
    },
    {
      tag: "Processo",
      title: "Clareza em cada etapa",
      description:
        "Você entende exatamente o que está acontecendo em cada fase do projeto.",
      bullets: [
        "Estudo preliminar (2D)",
        "Anteprojeto (3D)",
        "Projeto executivo",
      ],
    },
  ],

  sectionCta: {
    label: "Ver projetos",
    to: "#portfolio",
  },
};