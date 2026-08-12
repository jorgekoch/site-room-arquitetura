import express from "express";
import cors from "cors";
import path from "path";
import { randomUUID } from "crypto";

import { env } from "./config/env";
import { router } from "./routes";
import { errorHandler } from "./middlewares/errorHandler";
import { dashboardRoutes } from "./modules/dashboard/dashboard.routes";
import { AppError } from "./utils/AppError";

const app = express();

/**
 * Render encaminha as requisições por proxy reverso. Confiar em apenas um
 * salto permite que req.ip use o IP do visitante nos rate limits, sem confiar
 * em uma cadeia arbitrária de proxies.
 */
if (env.nodeEnv === "production" || process.env.RENDER) {
  app.set("trust proxy", 1);
}

const allowedOrigins = [
  env.frontendUrl,

  "http://localhost:5173",

  "http://127.0.0.1:5173",

  "https://roomarquiteturasustentavel.com.br",

  "https://www.roomarquiteturasustentavel.com.br",

  "https://site-room-arquitetura.vercel.app",

  "https://site-room-arquitetura.onrender.com",
].filter(Boolean);

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      callback(null, true);
      return;
    }

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    console.warn(
      `CORS bloqueou a origem: ${origin}`
    );

    callback(new AppError("Origem não permitida pelo CORS.", 403));
  },

  credentials: true,

  methods: [
    "GET",
    "HEAD",
    "PUT",
    "PATCH",
    "POST",
    "DELETE",
    "OPTIONS",
  ],

  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Request-ID",
  ],
};

app.use(cors(corsOptions));

/**
 * Identificador de correlação para cada requisição.
 *
 * O cliente pode enviar X-Request-ID; quando não envia, geramos um UUID.
 * O mesmo identificador é devolvido na resposta e fica disponível em
 * response.locals para os middlewares de erro e logs futuros.
 */
app.use((request, response, next) => {
  const incomingRequestId = request.header("X-Request-ID")?.trim();
  const requestId = incomingRequestId || randomUUID();

  response.locals.requestId = requestId;
  response.setHeader("X-Request-ID", requestId);

  next();
});

/**
 * Headers básicos de segurança para respostas da API.
 *
 * Não aplicamos CSP aqui porque o frontend é servido separadamente.
 */
app.use((_request, response, next) => {
  response.setHeader("X-Content-Type-Options", "nosniff");
  response.setHeader("X-Frame-Options", "DENY");
  response.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");

  if (env.nodeEnv === "production" || process.env.RENDER) {
    response.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
  }

  next();
});

app.use(
  express.json({
    limit: "1mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "1mb",
  })
);

app.use(
  `/${env.uploadDir}`,
  express.static(
    path.resolve(
      process.cwd(),
      env.uploadDir
    )
  )
);

/**
 * Dashboard administrativo
 */
app.use(
  "/api/dashboard",
  dashboardRoutes
);

/**
 * Demais rotas da API
 */
app.use(
  "/api",
  router
);

/**
 * Tratamento centralizado de erros
 */
app.use(errorHandler);

export { app };
