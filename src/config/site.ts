export type SiteConfig = {
  brand: {
    name: string;
    initials: string;
    tagline: string;
  };
  contact: {
    whatsapp: string;
    instagram: string;
    email: string;
  };
  cta: {
    primaryLabel: string;
    primaryTo: string;
    secondaryLabel: string;
    secondaryTo: string;
  };
  footer: {
    note: string;
  };
};

export const siteConfig: SiteConfig = {
  brand: {
    name: "Seu Nome ou Marca",
    initials: "SN",
    tagline: "Uma frase curta explicando o que você faz de forma profissional.",
  },

  contact: {
    whatsapp: "https://wa.me/5541999999999",
    instagram: "https://instagram.com/seuperfil",
    email: "contato@seudominio.com",
  },

  cta: {
    primaryLabel: "Entrar em contato",
    primaryTo: "/contato",
    secondaryLabel: "Ver serviços",
    secondaryTo: "/servicos",
  },

  footer: {
    note: "Estrutura moderna, visual profissional e foco total em clareza e conversão.",
  },
};