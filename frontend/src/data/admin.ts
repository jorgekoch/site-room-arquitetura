export const proposalStatusOptions = [
  { value: "NEW", label: "Nova" },
  { value: "REVIEWING", label: "Em análise" },
  { value: "AWAITING_PAYMENT", label: "Aguardando pagamento" },
  { value: "PAID", label: "Pago" },
  { value: "SCHEDULED", label: "Agendado" },
  { value: "CLOSED", label: "Encerrado" },
  { value: "CANCELED", label: "Cancelado" },
] as const;