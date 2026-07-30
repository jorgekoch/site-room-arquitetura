export type AudienceData = {
  section: {
    eyebrow: string;
    title: string;
    description: string;
  };
  items: {
    title: string;
    description: string;
  }[];
};

export const audienceData: AudienceData = {
  section: {
    eyebrow: "Para quem é",
    title: "A ROOM faz sentido para quem quer construir, reformar, ampliar ou decorar com mais identidade, economia, clareza e pertencimento",
    description:
      "A proposta da ROOM conversa principalmente com pessoas que estão planejando a primeira casa e desejam um projeto mais consciente, funcional e conectado à própria forma de viver.",
  },

  items: [
    {
      title: "Casais e famílias em uma nova fase",
      description:
        "que vão construir ou reformar e desejam uma casa pensada para durar muitos anos, com conforto térmico, iluminação natural, funcionalidade e menores custos de operação ao longo do tempo.",
    },
    {
      title: "Pessoas que valorizam a sustentabilidade de forma prática",
      description:
        "buscando reduzir desperdícios, consumo de energia e impactos ambientais sem abrir mão da estética.",
    },
    {
      title: "Clientes que querem um projeto personalizado",
      description:
        "desenvolvido a partir da forma como vivem, e não baseado em soluções prontas ou tendências passageiras.",
    },
    {
      title: "Empreendedores que entendem que o ambiente influencia diretamente a experiência do cliente",
      description:
        "a eficiência da equipe e os resultados do negócio. A própria atuação da ROOM contempla projetos comerciais e institucionais com esse enfoque.",
    },
        {
      title: "Quem busca um processo claro e atendimento próximo e colaborativo",
      description:
        "participando das decisões do projeto em vez de apenas aprovar desenhos",
    },
        {
      title: "Pessoas que se identificam com negócios de impacto",
      description:
        "preferindo contratar empresas cujos valores estejam alinhados à responsabilidade social e ambiental.",
    },
  ],
};