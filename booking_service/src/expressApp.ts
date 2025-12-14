import express, { Router } from "express";
import cors from "cors";

export async function createApp(bookingRouter: Router) {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.get("/status", (req, res) => {
    res.json({ status: "ready" });
  });
  app.use("/", bookingRouter);
  return app;
}
