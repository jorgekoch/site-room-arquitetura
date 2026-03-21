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
    name: "ROOM Arquitetura Sustentável",
    initials: "RM",
    tagline:
      "Casas com identidade, guiadas pelo terreno e pela história de quem vai viver nelas.",
  },

  contact: {
    whatsapp: "",
    instagram: "",
    email: "",
  },

  cta: {
    primaryLabel: "Solicitar proposta",
    primaryTo: "/contato",
    secondaryLabel: "Falar no WhatsApp",
    secondaryTo: "https://wa.me/5547997711663",
  },

  footer: {
    note: "Arquitetura residencial autoral com escuta profunda, clareza de processo e estratégias sustentáveis.",
  },
};