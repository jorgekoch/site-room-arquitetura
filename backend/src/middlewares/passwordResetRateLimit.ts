import rateLimit from "express-rate-limit";

export const passwordResetRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,

  limit: 5,

  standardHeaders: "draft-8",

  legacyHeaders: false,

  message: {
    message:
      "Muitas solicitações de recuperação. Tente novamente em alguns minutos.",
  },
});
