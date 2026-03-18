export type AboutData = {
  section: {
    eyebrow: string;
    title: string;
    description: string;
  };
  content: {
    mainTag: string;
    mainTitle: string;
    paragraphs: string[];
    bullets: string[];
    sideTag: string;
    sideTitle: string;
    sideItems: string[];
  };
  finalCta: {
    eyebrow: string;
    title: string;
    description: string;
  };
};

export const aboutData: AboutData = {
  section: {
    eyebrow: "Sobre",
    title: "Arquitetura sustentável com propósito e sentimento",
    description:
      "Uma abordagem que une escuta, identidade e sensibilidade para criar espaços mais humanos, funcionais e conscientes.",
  },

  content: {
    mainTag: "Sobre a ROOM",
    mainTitle: "Projetos que nascem da escuta e ganham forma com intenção",
    paragraphs: [
      "A ROOM Arquitetura Sustentável, liderada por Emanuela Bilk Lopes, nasce do desejo de criar espaços que façam sentido para quem os vive. Cada projeto começa com uma escuta sensível, respeitando necessidades, desejos e estilo de vida.",
      "Mais do que uma busca estética, a proposta é desenvolver ambientes com identidade, funcionalidade e propósito, traduzindo sentimentos e intenções em soluções arquitetônicas que acolhem, inspiram e conectam.",
    ],
    bullets: [
      "Atendimento personalizado em cada etapa",
      "Escuta sensível das necessidades do cliente",
      "Projetos com identidade e propósito",
      "Atendimento em todo o Brasil, com base em Rio do Sul/SC",
    ],
    sideTag: "Diferenciais",
    sideTitle: "O que orienta cada projeto",
    sideItems: [
      "Atendimento próximo e personalizado, com foco na realidade de cada cliente",
      "Escuta sensível para compreender rotina, desejos e expectativas",
      "Projetos com identidade, pensados para refletir quem vive o espaço",
      "Arquitetura sustentável com olhar funcional, humano e consciente",
    ],
  },

  finalCta: {
    eyebrow: "Próximo passo",
    title: "Dê forma a um projeto alinhado à sua essência",
    description:
      "Com um processo cuidadoso e personalizado, a ROOM transforma necessidades e sentimentos em espaços com identidade, beleza e propósito.",
  },
};