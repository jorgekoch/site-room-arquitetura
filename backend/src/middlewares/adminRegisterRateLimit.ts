import rateLimit from "express-rate-limit";

export const adminRegisterRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,

  limit: 3,

  standardHeaders: "draft-8",

  legacyHeaders: false,

  message: {
    message:
      "Muitas solicitações de cadastro. Tente novamente em alguns minutos.",
  },
});
