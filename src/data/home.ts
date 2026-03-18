export type HighlightItem = {
  title: string;
  text: string;
};

export type FinalCtaData = {
  eyebrow: string;
  title: string;
  description: string;
};

export type HomeData = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    highlights: HighlightItem[];
  };
  finalCta: FinalCtaData;
};

export const homeData: HomeData = {
  hero: {
    eyebrow: "Serviço profissional",
    title: "Título principal do site",
    description:
      "Uma descrição clara e estratégica explicando o que você faz e como ajuda seu público.",
    highlights: [
      {
        title: "Diferencial 1",
        text: "Explicação curta sobre esse diferencial.",
      },
      {
        title: "Diferencial 2",
        text: "Explicação curta sobre esse diferencial.",
      },
      {
        title: "Diferencial 3",
        text: "Explicação curta sobre esse diferencial.",
      },
    ],
  },

  finalCta: {
    eyebrow: "Próximo passo",
    title: "Use essa base para tirar projetos do papel com mais rapidez e consistência",
    description:
      "Agora que a estrutura central está pronta, você pode começar a personalizar o starter kit para o seu próprio site e, depois, para os próximos clientes.",
  },
};