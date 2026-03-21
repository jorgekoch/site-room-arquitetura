export type OfferingItem = {
  tag: string;
  title: string;
  description: string;
  bullets: string[];
};

export type OfferingsData = {
  section: {
    eyebrow: string;
    title: string;
    description: string;
  };
  items: OfferingItem[];
  note: string;
};

export const offeringsData: OfferingsData = {
  section: {
    eyebrow: "Formatos de atendimento",
    title: "Diferentes formas de conduzir o projeto, conforme a profundidade que sua casa precisa",
    description:
      "A ROOM estrutura o atendimento de forma personalizada, mas pode trabalhar com diferentes níveis de aprofundamento conforme o momento, a complexidade e o tipo de entrega ideal para cada cliente.",
  },

  items: [
    {
      tag: "Essencial",
      title: "Base clara para começar com segurança",
      description:
        "Ideal para quem precisa organizar as decisões principais do projeto com clareza, identidade e direcionamento técnico consistente.",
      bullets: [
        "Definições centrais do projeto",
        "Mais segurança para as primeiras decisões",
        "Estrutura objetiva e funcional",
      ],
    },
    {
      tag: "Completo",
      title: "O formato mais equilibrado para desenvolver a casa com profundidade",
      description:
        "Uma experiência mais completa para clientes que desejam maturar melhor o projeto, visualizar os espaços com mais clareza e avançar com segurança.",
      bullets: [
        "Desenvolvimento aprofundado das soluções",
        "Melhor visualização e amadurecimento do projeto",
        "Mais clareza para tomada de decisão",
      ],
    },
    {
      tag: "Premium",
      title: "Experiência mais imersiva, estratégica e personalizada",
      description:
        "Pensado para projetos que pedem maior aprofundamento, mais acompanhamento e uma construção ainda mais cuidadosa entre história, terreno e modo de viver.",
      bullets: [
        "Processo mais imersivo",
        "Maior personalização e refinamento",
        "Experiência mais completa ao longo do projeto",
      ],
    },
  ],

  note:
    "O formato ideal é definido a partir do contexto de cada projeto, do terreno, das necessidades da família e do nível de aprofundamento necessário.",
};