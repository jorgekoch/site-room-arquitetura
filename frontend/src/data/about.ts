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

export type AboutPageData = {
  title: string;
  introduction: {
    image: string;
    imageAlt: string;
    paragraphs: string[];
  };
  architects: {
    profiles: Array<{
      name: string;
      text: string;
      image?: string;
      imageAlt: string;
    }>;
  };
};

export const aboutPageData: AboutPageData = {
  title: "Arquitetura que nasce da relação entre pessoas, lugar e modo de viver",
  introduction: {
    image: images.about.room,
    imageAlt: "Ambiente da ROOM Arquitetura",
    paragraphs: [
      "A ROOM nasceu no início de 2021, com a missão de espalhar uma arquitetura que fizesse parte da vida das pessoas, indo além da estética.",
      "Acreditamos que cada projeto tem o poder de melhorar a qualidade de vida de quem o utiliza e de gerar impactos positivos para a sociedade e para o planeta. Por isso, criamos soluções que equilibram estética, funcionalidade, conforto e responsabilidade ambiental, sempre respeitando o orçamento e os sonhos de cada cliente.",
      "Sustentabilidade: Ambiental + Social + Econômica.",
    ],
  },
  architects: {
    profiles: [
      {
        name: "Emanuela Bilk Lopes, a Manu",
        image: images.about.manu,
        text: "Formada em Design de Interiores desde 2013, em Arquitetura e Urbanismo desde 2021 e especialista em Sustentabilidade na Construção Civil. Amante de todas as artes e sempre ativa socialmente, canto, danço, atuo, milito e me aventuro! Tenho 3 gatinhos e muitas plantas, sou fã de Senhor dos Anéis e de Amélie, e uma eterna otimista! Para mim, arquitetura é uma forma de cuidar das pessoas. Inspirada pela natureza e pelo desejo de tornar a arquitetura mais democrática, acredito que cada espaço deve refletir a identidade de quem o ocupa, proporcionando conforto, pertencimento e bem-estar sem abrir mão da sustentabilidade e da viabilidade econômica, afinal moradia é um direito de todos ♥",
        imageAlt: "Foto de Emanuela Bilk Lopes, Manu",
      },
      {
        name: "Eduarda Frandoloso, a Duda",
        image: images.about.duda,
        text: "Formada em Arquitetura e Urbanismo pela UFFS desde 2023, e integrante da ROOM desde 2022. Atualmente sou coordenadora da equipe, acompanhando o desenvolvimento dos projetos, a gestão dos processos e o alinhamento entre criação, técnica e execução. Pessoalmente, sou uma mulher apaixonada pela vida. Aspirante a surfista, mãe de pet e movida pela coragem, acredito que estar presente com atenção em cada detalhe do cotidiano é nossa maior fonte de inspiração. A arquitetura é o lugar que encontrei para depositar essa inspiração de quem vive os dias emocionada, e me realizo em cada emoção sentida pelos clientes ao ver seu lar dos sonhos se tornando realidade ❤️",
        imageAlt: "Foto de Eduarda Frandoloso, Duda",
      },
    ],
  },
};

export const aboutData: AboutPageData = aboutPageData;


