import { images } from "../assets/images";

export type AboutProfileItem = {
  tag: string;
  title: string;
  text: string;
};

export type AboutData = {
  section: {
    eyebrow: string;
    title: string;
    description: string;
  };
  content: {
    image: string;
    mainTag: string;
    mainTitle: string;
    paragraphs: string[];
    bullets: string[];
    sideTag: string;
    sideTitle: string;
    sideItems: string[];
    profiles: AboutProfileItem[];
  };
};

export const aboutData: AboutData = {
  section: {
    eyebrow: "Sobre",
    title:
      "Arquitetura que nasce da relação entre pessoas, lugar e modo de viver",
    description:
      "A ROOM é formada por profissionais com visões complementares e o propósito em comum de levar a arquitetura para a vida das pessoas, com sensibilidade, clareza e impacto positivo.",
  },

  content: {
    image: images.about.main,
    mainTag: "Filosofia",
    mainTitle:
      "Uma dupla com trajetórias diferentes, unidas pelo mesmo propósito",
    paragraphs: [
      "A ROOM é conduzida por uma dupla dinâmica de arquitetos com visões distintas que se complementam e compartilham o sonho de levar a arquitetura para a vida das pessoas — sem distinção.",
      "A arquitetura é entendida como uma forma concreta de transformar a vida cotidiana, criando espaços com mais sentido, identidade, conforto e conexão com a realidade de quem vai habitar.",
      "A sustentabilidade entra como estratégia de projeto, aliando técnica, sensibilidade, responsabilidade social e leitura cuidadosa do contexto.",
    ],
    bullets: [
      "Arquitetura com escuta, propósito e impacto real",
      "Integração entre projeto arquitetônico e interiores",
      "Olhar sensível para rotina, identidade e pertencimento",
    ],
    sideTag: "Abordagem",
    sideTitle: "O que guia cada projeto",
    sideItems: [
      "Escuta profunda das pessoas e da sua história",
      "Leitura cuidadosa do terreno e do contexto",
      "Sustentabilidade como estratégia de projeto",
      "Clareza no processo e nas etapas de desenvolvimento",
      "Compromisso social com uma arquitetura mais acessível e transformadora",
    ],
    profiles: [
      {
        tag: "A Arquiteta",
        title: "Emanuela Bilk Lopes",
        text: "Formada em Arquitetura e Urbanismo pela UNIDAVI em 2021, com formação anterior em Design de Interiores em 2012. Atua nas duas áreas desde então, trazendo para os projetos uma leitura que une arquitetura, interiores e experiência de habitar. Atualmente, está em pós-graduação em Sustentabilidade na Construção Civil e aprofundando sua atuação em bioconstrução.",
      },
      {
        tag: "O Arquiteto",
        title: "Daniel Lenzi",
        text: "Formado em Arquitetura e Urbanismo pela UNIDAVI em 2020. Desde cedo se envolveu com construção civil e carpintaria através da família, desenvolvendo uma relação próxima com o fazer construtivo. Junto com Emanuela, também participa de projetos sociais voltados à qualidade de vida de pessoas de baixa renda por meio da arquitetura.",
      },
    ],
  },
};