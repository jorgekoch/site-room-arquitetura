export type PortfolioItem = {
  title: string;
  location: string;
  description: string;
  cover?: string;
  images: string[];
};

export type PortfolioData = {
  section: {
    eyebrow: string;
    title: string;
    description: string;
  };
  items: PortfolioItem[];
};

export const portfolioData: PortfolioData = {
  section: {
    eyebrow: "Projetos",
    title: "Projetos selecionados",
    description:
      "Casas pensadas a partir da escuta, do lugar e da identidade de quem vive cada espaço.",
  },

  items: [
    {
      title: "Casa Aurora",
      location: "Rio do Sul/SC",
      description: "Casa em terreno inclinado com foco em iluminação natural.",
      cover: "",
      images: [],
    },
    {
      title: "Casa Horizonte",
      location: "Santa Catarina",
      description: "Integração com natureza e ventilação cruzada.",
      cover: "",
      images: [],
    },
    {
      title: "Casa Brisa",
      location: "Litoral",
      description: "Casa leve, com linguagem mais praiana.",
      cover: "",
      images: [],
    },
    {
      title: "Casa Raiz",
      location: "Interior",
      description: "Uso de materiais locais e conexão com o entorno.",
      cover: "",
      images: [],
    },
    {
      title: "Casa Essência",
      location: "Brasil",
      description: "Projeto centrado na identidade da família.",
      cover: "",
      images: [],
    },
  ],
};