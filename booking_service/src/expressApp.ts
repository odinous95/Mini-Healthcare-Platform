import express from "express";
import bookingRouter from "./api/booking.routes";

export function createApp() {
  const app = express();

  app.use(express.json());

  app.get("/status", (req, res) => {
    res.json({ status: "ready" });
  });

  app.use("/", bookingRouter);

  return app;
}
