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
};

export const aboutData: AboutData = {
  section: {
    eyebrow: "Sobre",
    title:
      "Arquitetura que nasce da relação entre pessoas, lugar e modo de viver",
    description:
      "A ROOM desenvolve projetos residenciais a partir de uma escuta sensível, conectando a vida das pessoas ao potencial do lugar.",
  },

  content: {
    mainTag: "Filosofia",
    mainTitle: "Cada casa é pensada para fazer sentido para quem vive nela",
    paragraphs: [
      "A ROOM, conduzida por Emanuela Bilk Lopes, desenvolve projetos residenciais a partir de uma escuta profunda e de uma leitura cuidadosa do terreno e do contexto.",
      "A sustentabilidade é tratada como estratégia: decisões que envolvem conforto, impacto ambiental, economia de recursos e qualidade de vida.",
      "O resultado são casas práticas, afetivas e alinhadas à realidade de quem vai viver nelas.",
    ],
    bullets: [
      "Projetos com identidade real",
      "Conexão com o ambiente e o terreno",
      "Foco na vida de quem habita o espaço",
    ],
    sideTag: "Abordagem",
    sideTitle: "O que guia cada projeto",
    sideItems: [
      "Escuta profunda do cliente",
      "Leitura estratégica do terreno",
      "Clareza em todo o processo",
      "Soluções sustentáveis reais",
    ],
  },
};