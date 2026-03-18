export type NavigationItem = {
  label: string;
  path: string;
};

export const navigationItems: NavigationItem[] = [
  { label: "Início", path: "/" },
  { label: "Sobre", path: "/sobre" },
  { label: "Serviços", path: "/servicos" },
  { label: "Galeria", path: "/galeria" },
  { label: "Contato", path: "/contato" },
];