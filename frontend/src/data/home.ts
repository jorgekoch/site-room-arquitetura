import { images } from "../assets/images";

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
    slides: string[];
  };
  finalCta: FinalCtaData;
};

export const homeData: HomeData = {
  hero: {
    eyebrow: "ROOM Arquitetura Sustentável",
    title:
      "Projetos com identidade, pensados para a vida que vai acontecer dentro deles",
    description:
      "A ROOM desenvolve projetos com escuta profunda, leitura do terreno e estratégias sustentáveis para criar projetos mais conscientes, funcionais e conectados à vida de cada cliente.",
    slides: images.hero.carousel,
  },

  finalCta: {
    eyebrow: "Próximo passo",
    title:
      "Se o seu projeto precisa refletir quem você é, o processo precisa começar pela escuta",
    description:
      "Preencha o formulário de proposta para iniciar esse processo com clareza, direção e atenção ao que realmente importa para a sua rotina.",
  },
};
