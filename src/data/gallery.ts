export type GalleryItem = {
  tag?: string;
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  link?: {
    label: string;
    href: string;
    target?: string;
    rel?: string;
  };
};

export type GalleryData = {
  section: {
    eyebrow: string;
    title: string;
    description: string;
  };
  items: GalleryItem[];
};

export const galleryData: GalleryData = {
  section: {
    eyebrow: "Galeria",
    title: "Um espaço para mostrar trabalhos, imagens e projetos",
    description:
      "Essa seção pode ser usada para apresentar portfólio, registros visuais, fotos profissionais ou qualquer conteúdo que fortaleça a sua presença online.",
  },

  items: [
    {
      tag: "Projeto",
      title: "Trabalho de exemplo 1",
      description:
        "Use este espaço para explicar brevemente o que está sendo exibido e por que isso é relevante.",
    },
    {
      tag: "Portfólio",
      title: "Trabalho de exemplo 2",
      description:
        "Essa estrutura funciona para imagens institucionais, projetos criativos ou registros profissionais.",
    },
    {
      tag: "Destaque",
      title: "Trabalho de exemplo 3",
      description:
        "Aqui você pode mostrar mais um item importante da galeria ou do portfólio.",
    },
  ],
};