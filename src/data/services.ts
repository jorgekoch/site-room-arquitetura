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
  finalCta: {
    eyebrow: string;
    title: string;
    description: string;
  };
};

export const servicesData: ServicesData = {
  section: {
    eyebrow: "Serviços",
    title: "Soluções pensadas para criar espaços com mais propósito",
    description:
      "Projetos e consultorias que unem estética, funcionalidade e sensibilidade para transformar ambientes de forma consciente e personalizada.",
  },

  items: [
    {
      tag: "01",
      title: "Projeto Arquitetônico",
      description:
        "Desenvolvimento de projetos que equilibram beleza, funcionalidade e propósito, respeitando as necessidades do cliente e a identidade de cada espaço.",
      bullets: [
        "Soluções personalizadas para cada projeto",
        "Ambientes funcionais, conscientes e bem planejados",
        "Arquitetura com identidade e intenção",
      ],
      cta: {
        label: "Solicitar proposta",
        to: "/contato",
        variant: "ghost",
      },
    },
    {
      tag: "02",
      title: "Projeto de Interiores",
      description:
        "Ambientes internos pensados para traduzir estilo, conforto e praticidade, valorizando a experiência de quem vive o espaço no dia a dia.",
      bullets: [
        "Estética alinhada à personalidade do cliente",
        "Mais aconchego, fluidez e funcionalidade",
        "Aproveitamento inteligente dos ambientes",
      ],
      cta: {
        label: "Solicitar proposta",
        to: "/contato",
      },
    },
    {
      tag: "03",
      title: "Consultorias",
      description:
        "Orientação profissional para apoiar decisões com mais clareza e segurança em reformas, composição de ambientes e direcionamento de projeto.",
      bullets: [
        "Direcionamento especializado",
        "Mais segurança nas decisões do projeto",
        "Apoio sensível e estratégico em cada etapa",
      ],
      cta: {
        label: "Solicitar proposta",
        to: "/contato",
      },
    },
  ],

  sectionCta: {
    label: "Solicitar proposta",
    to: "/contato",
  },

  finalCta: {
    eyebrow: "Atendimento personalizado",
    title: "Escolha o caminho ideal para começar seu projeto",
    description:
      "A ROOM oferece um atendimento cuidadoso para entender seu momento, suas necessidades e a melhor forma de transformar sua ideia em um espaço com identidade.",
  },
};