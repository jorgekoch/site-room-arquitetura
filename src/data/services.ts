export type ServiceItem = {
  tag?: string;
  title: string;
  description?: string;
  bullets?: string[];
  cta?: {
    label: string;
    to: string;
    variant?: "primary" | "ghost";
  };
};

export type ServicesData = {
  section: {
    eyebrow: string;
    title: string;
    description: string;
  };
  items: ServiceItem[];
  sectionCta: {
    label: string;
    to: string;
  };
  finalCta: {
    eyebrow: string;
    title: string;
    description: string;
  };
};

export const servicesData: ServicesData = {
  section: {
    eyebrow: "Serviços",
    title: "Soluções pensadas para criar sites mais profissionais e estratégicos",
    description:
      "Uma estrutura adaptável para diferentes objetivos, desde uma landing page enxuta até um site institucional mais completo.",
  },

  items: [
    {
      tag: "Essencial",
      title: "Landing page profissional",
      description:
        "Ideal para apresentar um serviço principal, mostrar diferenciais e facilitar o contato com uma estrutura simples e eficiente.",
      bullets: [
        "Página única com foco em conversão",
        "Visual moderno e responsivo",
        "CTA claro para WhatsApp ou formulário",
      ],
      cta: {
        label: "Quero uma landing page",
        to: "/contato",
        variant: "ghost",
      },
    },
    {
      tag: "Profissional",
      title: "Site institucional",
      description:
        "Uma estrutura com múltiplas páginas para fortalecer posicionamento, explicar serviços com clareza e transmitir mais credibilidade.",
      bullets: [
        "Home, Sobre, Serviços e Contato",
        "Navegação mais completa",
        "Mais autoridade para a marca ou profissional",
      ],
      cta: {
        label: "Quero um site institucional",
        to: "/contato",
      },
    },
    {
      tag: "Premium",
      title: "Refino visual e UX",
      description:
        "Melhorias de interface, hierarquia visual e experiência do usuário para criar uma presença online mais sofisticada e mais eficiente.",
      bullets: [
        "Layout mais elegante",
        "Mais clareza e escaneabilidade",
        "Melhor percepção de valor",
      ],
      cta: {
        label: "Solicitar orçamento",
        to: "/contato",
      },
    },
  ],

  sectionCta: {
    label: "Falar sobre meu projeto",
    to: "/contato",
  },

  finalCta: {
    eyebrow: "Vamos conversar",
    title: "Encontre o formato ideal para o seu projeto",
    description:
      "Entre em contato para entender qual estrutura faz mais sentido para o seu objetivo e como podemos transformar isso em um site mais forte e profissional.",
  },
};