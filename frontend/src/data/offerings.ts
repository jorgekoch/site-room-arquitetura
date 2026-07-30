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
      tag: "Econômico",
      title: "Pacote Econômico, o essencial para construir com segurança e inteligência",
      description:
        "Ideal para quem busca um projeto arquitetônico completo, mas deseja investir apenas no que é indispensável para executar a obra com qualidade. Você recebe todas as definições arquitetônicas necessárias para construir, mantendo o foco em funcionalidade, sustentabilidade e viabilidade econômica, sem incluir recursos voltados à apresentação visual ou detalhamentos mais específicos.",
      bullets: [
        "Definições centrais do projeto",
        "Mais segurança para as primeiras decisões",
        "Estrutura objetiva e funcional",
      ],
    },
    {
      tag: "Padrão",
      title: "Pacote Padrão, a experiência completa de projeto da ROOM.",
      description:
        "Nossa opção mais escolhida. Além de um projeto arquitetônico totalmente desenvolvido, você acompanha cada decisão por meio de imagens realistas, estudos detalhados e soluções pensadas para proporcionar conforto, economia, funcionalidade e uma arquitetura verdadeiramente personalizada. É a melhor escolha para quem deseja visualizar sua futura casa antes mesmo da construção começar e tomar decisões com muito mais segurança.",
      bullets: [
        "Desenvolvimento aprofundado das soluções",
        "Melhor visualização e amadurecimento do projeto",
        "Mais clareza para tomada de decisão",
      ],
    },
    {
      tag: "Completo",
      title: "Pacote Completo, um único lugar para projetar toda a sua obra.",
      description:
        "A solução mais completa para quem deseja iniciar a construção com o máximo de planejamento. Além do Projeto Arquitetônico Completo, inclui os principais projetos complementares, planilha orçamentária e cronograma de obra, garantindo maior integração entre as disciplinas, redução de retrabalhos e mais previsibilidade de custos e prazos. É a opção indicada para quem quer centralizar o desenvolvimento técnico do empreendimento e começar a obra com muito mais tranquilidade.",
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