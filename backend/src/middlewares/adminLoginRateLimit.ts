import rateLimit from "express-rate-limit";

export const adminLoginRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,

  limit: 5,

  standardHeaders: "draft-8",

  legacyHeaders: false,

  message: {
    message: "Muitas tentativas de login. Tente novamente em alguns minutos.",
  },
});
