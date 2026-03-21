import express from "express";
import cors from "cors";
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

app.use("/api", router);

app.use(errorHandler);

export { app };