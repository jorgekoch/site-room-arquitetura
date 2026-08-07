import express from "express";
import cors from "cors";
import path from "path";
import { env } from "./config/env";
import { router } from "./routes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

const allowedOrigins = [
  env.frontendUrl,
  "https://roomarquiteturasustentavel.com.br",
  "https://www.roomarquiteturasustentavel.com.br",
  "https://site-room-arquitetura.vercel.app",
  "https://site-room-arquitetura.onrender.com",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        callback(null, true);
        return;
      }

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(null, false);
    },
    credentials: true,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(
  `/${env.uploadDir}`,
  express.static(path.resolve(process.cwd(), env.uploadDir))
);

app.use("/api", router);

app.use(errorHandler);

export { app };