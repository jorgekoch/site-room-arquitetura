export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqData = {
  home: FaqItem[];
  services: FaqItem[];
  contact: FaqItem[];
};

export const faqData: FaqData = {
  home: [
    {
      question: "Essa base serve para diferentes tipos de clientes?",
      answer:
        "Sim. Ela foi pensada justamente para ser adaptada a vários nichos, trocando conteúdo, identidade visual e estrutura quando necessário.",
    },
    {
      question: "Preciso usar todas as seções em todos os projetos?",
      answer:
        "Não. Você pode montar páginas mais enxutas ou mais completas, dependendo da necessidade do cliente e do objetivo do site.",
    },
    {
      question: "Posso usar isso também no meu próprio site?",
      answer:
        "Sim. Essa é uma das melhores formas de validar o sistema antes de duplicar para novos projetos.",
    },
    {
      question: "Essa base já está pronta para crescer depois?",
      answer:
        "Sim. Ela foi organizada para permitir refinamentos futuros, novas páginas, novas seções e personalizações com mais controle.",
    },
  ],

  services: [
    {
      question: "Qual é a diferença entre landing page e site institucional?",
      answer:
        "A landing page é mais enxuta e foca em uma ação principal. O site institucional organiza melhor conteúdos, serviços e informações em várias páginas.",
    },
    {
      question: "Esses formatos servem para qualquer nicho?",
      answer:
        "Sim. A estrutura pode ser adaptada para diferentes profissionais e objetivos, com ajustes de conteúdo, identidade visual e organização das seções.",
    },
    {
      question: "É possível começar com algo simples e melhorar depois?",
      answer:
        "Sim. Muitas vezes o melhor caminho é começar com uma base mais objetiva e evoluir o site conforme a necessidade do projeto cresce.",
    },
    {
      question: "O site funciona bem no celular?",
      answer:
        "Sim. A base já é pensada para funcionar de forma responsiva, com boa leitura e navegação em diferentes telas.",
    },
  ],

  contact: [
    {
      question: "Preciso já ter tudo definido antes de entrar em contato?",
      answer:
        "Não. O contato inicial também serve para entender melhor sua necessidade e orientar qual caminho faz mais sentido.",
    },
    {
      question: "Posso tirar dúvidas antes de decidir?",
      answer:
        "Sim. A ideia é justamente tornar esse processo mais leve, direto e sem complicação.",
    },
    {
      question: "O primeiro contato já gera compromisso?",
      answer:
        "Não necessariamente. Ele pode servir apenas para alinhar expectativas e entender melhor a proposta.",
    },
    {
      question: "É possível adaptar a proposta ao meu objetivo?",
      answer:
        "Sim. Em muitos casos é possível ajustar a estrutura, o formato e a abordagem conforme a necessidade do projeto.",
    },
  ],
};