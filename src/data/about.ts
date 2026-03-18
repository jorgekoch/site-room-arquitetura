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
    title: "Uma estrutura para apresentar trajetória, proposta e diferenciais",
    description:
      "Esta página ajuda a construir confiança, transmitir autoridade e explicar melhor quem está por trás do projeto.",
  },

  content: {
    mainTag: "Apresentação",
    mainTitle: "Uma narrativa clara, profissional e fácil de adaptar",
    paragraphs: [
      "A seção sobre é uma das partes mais importantes para gerar confiança. É aqui que o visitante entende melhor quem é o profissional, qual é sua trajetória e por que vale a pena continuar nessa jornada.",
      "Em vez de transformar isso em um bloco pesado de texto, a proposta é organizar a apresentação de forma elegante, escaneável e alinhada com a experiência geral do site.",
    ],
    bullets: [
      "Ajuda a reforçar autoridade",
      "Melhora a percepção de profissionalismo",
      "Cria uma conexão mais clara com o visitante",
    ],
    sideTag: "Destaques",
    sideTitle: "Pontos que podem entrar aqui",
    sideItems: [
      "Formação, experiência ou trajetória",
      "Diferenciais de atendimento ou serviço",
      "Áreas de atuação ou especialidades",
      "Valores, visão ou abordagem de trabalho",
    ],
  },

  finalCta: {
    eyebrow: "Próximo passo",
    title: "Apresente melhor sua trajetória e fortaleça seu posicionamento",
    description:
      "Uma boa página sobre ajuda a transformar curiosidade em confiança e prepara melhor o visitante para entrar em contato.",
  },
};