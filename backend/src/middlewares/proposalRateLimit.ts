import rateLimit from "express-rate-limit";

export const proposalUploadRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Muitas solicitações de upload. Tente novamente mais tarde." },
});

export const proposalSubmissionRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Muitas solicitações enviadas. Tente novamente mais tarde." },
});
