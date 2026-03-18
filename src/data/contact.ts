export type ContactPageData = {
  section: {
    eyebrow: string;
    title: string;
    description: string;
  };
  direct: {
    title: string;
    text: string;
  };
  social: {
    title: string;
    text: string;
  };
};

export const contactPageData: ContactPageData = {
  section: {
    eyebrow: "Contato",
    title: "Dê o próximo passo e inicie a conversa",
    description:
      "Esta página foi pensada para facilitar o contato, reduzir dúvidas e tornar o início do projeto mais natural.",
  },

  direct: {
    title: "Fale diretamente",
    text:
      "Use este espaço para transformar interesse em conversa. O ideal é deixar o caminho simples, direto e confortável para o cliente.",
  },

  social: {
    title: "Redes e presença online",
    text:
      "Aqui você pode centralizar canais complementares para reforçar sua presença digital e permitir que o visitante conheça melhor o seu trabalho.",
  },
};