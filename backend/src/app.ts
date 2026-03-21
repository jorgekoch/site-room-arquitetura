import express from "express";
import cors from "cors";
import path from "path";
import { env } from "./config/env";
import { router } from "./routes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(
  cors({
    origin: env.frontendUrl,
    credentials: true,
  })
);

app.use(express.json());

app.use(`/${env.uploadDir}`, express.static(path.resolve(process.cwd(), env.uploadDir)));

app.use("/api", router);

app.use(errorHandler);

export { app };