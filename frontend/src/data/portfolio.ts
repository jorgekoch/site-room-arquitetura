import { images } from "../assets/images";

export type PortfolioItem = {
  slug: string;
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
      slug: "casa-b-612",
      title: "Casa B-612",
      location: "Adicionar cidade",
      description: "Adicionar descrição de acordo.",
      cover: images.portfolio.casaB612[0],
      images: images.portfolio.casaB612,
    },
    {
      slug: "casa-bia-leo",
      title: "Casa Bia e Leo",
      location: "Adicionar localidade",
      description: "Adicionar descrição de acordo.",
      cover: images.portfolio.casaBiaLeo[0],
      images: images.portfolio.casaBiaLeo,
    },
    {
      slug: "casa-carol-renner",
      title: "Casa Carol e Renner",
      location: "Adicionar localidade",
      description: "Adicionar descrição de acordo.",
      cover: images.portfolio.casaCarolRenner[0],
      images: images.portfolio.casaCarolRenner,
    },
    {
      slug: "casa-da-jabuticabeira",
      title: "Casa da Jabuticabeira",
      location: "Adicionar localidade",
      description: "Adicionar descrição de acordo.",
      cover: images.portfolio.casaDaJabuticabeira[5],
      images: images.portfolio.casaDaJabuticabeira,
    },
    {
      slug: "casa-sara-bernardo",
      title: "Casa Sara e Bernardo",
      location: "Adicionar localidade",
      description: "Adicionar descrição de acordo.",
      cover: images.portfolio.casaSaraBernardo[0],
      images: images.portfolio.casaSaraBernardo,
    },
  ],
};