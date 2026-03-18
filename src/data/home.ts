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
    eyebrow: "ROOM Arquitetura Sustentável",
    title: "Projetos com identidade, sensibilidade e propósito",
    description:
      "A ROOM Arquitetura Sustentável desenvolve projetos arquitetônicos, interiores e consultorias para quem busca espaços mais conscientes, funcionais e alinhados à própria essência.",
    highlights: [
      {
        title: "Atendimento personalizado",
        text: "Cada projeto é conduzido com proximidade, atenção aos detalhes e foco nas necessidades reais do cliente.",
      },
      {
        title: "Escuta sensível",
        text: "O processo parte da compreensão da rotina, dos desejos e da identidade de quem vai viver o espaço.",
      },
      {
        title: "Atendimento em todo o Brasil",
        text: "Com base em Rio do Sul/SC, a ROOM atende clientes de diferentes regiões do país.",
      },
    ],
  },

  finalCta: {
    eyebrow: "Próximo passo",
    title: "Vamos conversar sobre o seu projeto?",
    description:
      "Preencha o formulário para solicitar sua proposta e dar o primeiro passo para um projeto pensado com identidade, funcionalidade e sensibilidade.",
  },
};