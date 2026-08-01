import { images } from "../assets/images";

export type PortfolioItem = {
  slug: string;
  title: string;
  location: string;
  areaConstruida: string;
  terreno: string;
  local: string;
  projeto: string;
  year: string;
  description: string;
  cover?: string;
  images: string[];
  videoUrl?: string;
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
    title: "Conheça alguns de nossos projetos",
    description:
      "Espaços pensadas a partir da escuta, do lugar e da identidade de quem vive cada espaço.",
  },

  items: [
    {
      slug: "casa-b-612",
      title: "Casa B-612",
      location: "Adicionar cidade",
      areaConstruida: "160 m²",
      terreno: "8,5m x 24m",
      local: "Rio do Janeiro – RJ",
      projeto: "Emanuela Bilk Lopes",
      year: "2023",
      description: "Projeto Arquitetônico de uma residência para uma família de 7 pessoas, em tijolo ecológico + telha sanduíche + piso em concreto polido + telhado verde em alguns pontos. O lote apresenta algumas pedras e uma árvore de grande porte (que foram todos incorporados no projeto). Além disso, os clientes queriam produzir o seu próprio tijolo e queriam também algumas paredes em outros tipos de bioconstrução, para botarem a mão na massa.",
      cover: images.portfolio.casaB612[0],
      images: images.portfolio.casaB612,
      videoUrl: "https://www.youtube.com/watch?v=6wFmPUPH1bs",
    },
    {
      slug: "casa-bia-leo",
      title: "Casa Bia e Leo",
      location: "Adicionar localidade",
      areaConstruida: "Adicionar informação",
      terreno: "Adicionar informação",
      local: "Adicionar localidade",
      projeto: "Casa Bia e Leo",
      year: "Adicionar ano",
      description: "Adicionar descrição de acordo.",
      cover: images.portfolio.casaBiaLeo[0],
      images: images.portfolio.casaBiaLeo,
    },
    {
      slug: "casa-carol-renner",
      title: "Casa Carol e Renner",
      location: "Adicionar localidade",
      areaConstruida: "Adicionar informação",
      terreno: "Adicionar informação",
      local: "Adicionar localidade",
      projeto: "Casa Carol e Renner",
      year: "Adicionar ano",
      description: "Adicionar descrição de acordo.",
      cover: images.portfolio.casaCarolRenner[0],
      images: images.portfolio.casaCarolRenner,
    },
    {
      slug: "casa-da-jabuticabeira",
      title: "Casa da Jabuticabeira",
      location: "Adicionar localidade",
      areaConstruida: "Adicionar informação",
      terreno: "Adicionar informação",
      local: "Adicionar localidade",
      projeto: "Casa da Jabuticabeira",
      year: "Adicionar ano",
      description: "Adicionar descrição de acordo.",
      cover: images.portfolio.casaDaJabuticabeira[5],
      images: images.portfolio.casaDaJabuticabeira,
    },
    {
      slug: "casa-sara-bernardo",
      title: "Casa Sara e Bernardo",
      location: "Adicionar localidade",
      areaConstruida: "Adicionar informação",
      terreno: "Adicionar informação",
      local: "Adicionar localidade",
      projeto: "Casa Sara e Bernardo",
      year: "Adicionar ano",
      description: "Adicionar descrição de acordo.",
      cover: images.portfolio.casaSaraBernardo[0],
      images: images.portfolio.casaSaraBernardo,
    },
  ],
};