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
      "Casas com identidade, pensadas a partir de quem vai viver nelas",
    description:
      "A ROOM desenvolve projetos residenciais com escuta profunda, leitura do terreno e estratégias sustentáveis para criar casas mais conscientes, funcionais e conectadas à vida de cada família.",
    slides: images.hero.carousel,
  },

  finalCta: {
    eyebrow: "Próximo passo",
    title:
      "Se a sua casa precisa refletir quem você é, o projeto precisa começar pela escuta",
    description:
      "Preencha o formulário de proposta para iniciar esse processo com clareza, direção e atenção ao que realmente importa para a sua rotina.",
  },
};