import express from "express";
import cors from "cors";
import path from "path";

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
  ],
};

app.use(cors(corsOptions));

app.use(
  express.json({
    limit: "10mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
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
