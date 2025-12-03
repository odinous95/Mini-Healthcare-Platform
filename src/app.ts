import express, { Router } from "express";

export function createApp() {
  const app = express();

  app.use(express.json());

  app.get("/status", (req, res) => {
    res.json({ status: "ready" });
  });

  const v1Router = Router();

  const apiRouter = Router();
  apiRouter.use("/api/v1", v1Router);

  app.use("/", apiRouter);
  return app;
}
