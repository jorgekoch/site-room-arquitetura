import { images } from "../assets/images";

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
    slides: string[];
  };
  finalCta: FinalCtaData;
};

export const homeData: HomeData = {
  hero: {
    eyebrow: "ROOM Arquitetura Sustentável",
    title:
      "Casas com identidade, guiadas pela história de quem vai viver nelas",
    description:
      "A ROOM desenvolve projetos residenciais a partir de uma escuta profunda, da leitura do terreno e de estratégias sustentáveis que tornam cada casa mais consciente, funcional e conectada com a vida de quem habita.",
    highlights: [
      {
        title: "Escuta profunda",
        text: "Uma imersão real para entender sua rotina, história e o que você deseja viver na casa.",
      },
      {
        title: "Projeto com identidade",
        text: "Cada casa nasce única, alinhada ao terreno e à forma de viver de cada família.",
      },
      {
        title: "Clareza no processo",
        text: "Etapas bem definidas para você construir com segurança e sem surpresas.",
      },
    ],
    slides: images.hero.carousel,
  },

  finalCta: {
    eyebrow: "Próximo passo",
    title:
      "Se a sua casa precisa nascer de quem você é, o projeto precisa começar pela escuta",
    description:
      "Preencha o formulário de proposta para dar o primeiro passo. Você receberá as orientações iniciais e entenderá como funciona o processo da ROOM.",
  },
};