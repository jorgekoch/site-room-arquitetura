export const contactMethodOptions = [
  { value: "telefone", label: "Telefone" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "telegram", label: "Telegram" },
  { value: "instagram", label: "Instagram" },
  { value: "outro", label: "Outro" },
] as const;

export const referralSourceOptions = [
  { value: "instagram", label: "Instagram" },
  { value: "youtube", label: "YouTube" },
  { value: "google", label: "Google" },
  { value: "indicacao", label: "Indicação" },
  {
    value: "grupo-construtores-inteligentes",
    label: "Grupo Construtores Inteligentes",
  },
  { value: "lista-green", label: "Lista Green" },
  { value: "amanda-e-fernando-cbcs", label: "Amanda e Fernando - CBCS" },
  { value: "outro", label: "Outro" },
] as const;

export const projectTypeOptions = [
  {
    value: "new-construction",
    label: "Projeto Arquitetônico - construção nova",
  },
  { value: "interiors", label: "Projeto de Interiores" },
  {
    value: "renovation",
    label: "Projeto Arquitetônico - reforma e/ou ampliação",
  },
  { value: "consulting", label: "Consultoria" },
  { value: "other", label: "Outro" },
] as const;

export const terrainSlopeOptions = [
  { value: "plano", label: "Plano" },
  { value: "levemente-inclinado", label: "Levemente inclinado" },
  { value: "bastante-inclinado", label: "Bastante inclinado" },
  { value: "outro", label: "Outro" },
] as const;

export const terrainZoneOptions = [
  { value: "rural", label: "Rural" },
  { value: "urbano", label: "Urbano" },
  { value: "outro", label: "Outro" },
] as const;

export const floorsOptions = [
  { value: "terrea", label: "Térrea" },
  { value: "2-pavimentos", label: "2 pavimentos" },
  { value: "3-ou-mais", label: "3 ou mais pavimentos" },
  {
    value: "gostaria-que-o-projeto-sugerisse",
    label: "Gostaria que o projeto sugerisse",
  },
  { value: "outro", label: "Outro" },
] as const;

export const interiorsScopeOptions = [
  { value: "moveis-planejados", label: "Móveis planejados" },
  { value: "moveis-soltos", label: "Móveis soltos" },
  { value: "iluminacao", label: "Iluminação" },
  { value: "forro", label: "Forro" },
  { value: "pinturas-e-revestimentos", label: "Pinturas e revestimentos" },
  { value: "decor", label: "Decor" },
  { value: "outro", label: "Outro" },
] as const;

export const projectModeOptions = [
  {
    value: "presencial",
    label: "Presencial (Rio do Sul e Florianópolis - SC)",
  },
  { value: "online", label: "Online" },
] as const;

export const paymentMethodOptions = [
  {
    value: "pix",
    label: "PIX - deve ser feito logo antes ou depois do preenchimento",
  },
  {
    value: "boleto",
    label: "Boleto - será enviado para você (acréscimo de R$3,99)",
  },
  { value: "outro", label: "Outro" },
] as const;