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
      "Arquitetura sustentável com propósito, identidade e sensibilidade.",
  },

  contact: {
    whatsapp: "",
    instagram: "",
    email: "",
  },

  cta: {
    primaryLabel: "Solicitar proposta",
    primaryTo: "/contato",
    secondaryLabel: "Conhecer serviços",
    secondaryTo: "#servicos",
  },

  footer: {
    note: "Projetos arquitetônicos, interiores e consultorias com atendimento personalizado em todo o Brasil.",
  },
};