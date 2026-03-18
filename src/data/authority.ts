export type AuthorityItem = {
  value: string;
  title: string;
  text: string;
};

export type AuthorityData = {
  home: AuthorityItem[];
  about: AuthorityItem[];
};

export const authorityData: AuthorityData = {
  home: [
    {
      value: "Visual premium",
      title: "Mais profissionalismo",
      text: "Uma apresentação mais forte, limpa e alinhada com produtos digitais modernos.",
    },
    {
      value: "Componentes reutilizáveis",
      title: "Mais agilidade",
      text: "Uma estrutura pronta para criar projetos com consistência e rapidez.",
    },
    {
      value: "Layout responsivo",
      title: "Melhor experiência",
      text: "Funciona bem no desktop, tablet e celular desde a base.",
    },
    {
      value: "Foco estratégico",
      title: "Mais clareza na jornada",
      text: "As seções são organizadas para conduzir o visitante até a ação principal.",
    },
  ],

  about: [
    {
      value: "Mais clareza",
      title: "Comunicação mais organizada",
      text: "Ajuda a explicar melhor o que a pessoa faz e o que a torna diferente.",
    },
    {
      value: "Mais autoridade",
      title: "Presença profissional",
      text: "Fortalece a imagem de quem quer transmitir confiança desde o primeiro contato.",
    },
    {
      value: "Mais conexão",
      title: "Apresentação mais humana",
      text: "Permite criar aproximação sem perder objetividade e elegância.",
    },
    {
      value: "Mais consistência",
      title: "Alinhamento com o restante do site",
      text: "Mantém a experiência visual e a narrativa coesas ao longo das páginas.",
    },
  ],
};