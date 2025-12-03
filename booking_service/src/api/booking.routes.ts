import express, { NextFunction } from "express";
import { Request, Response } from "express";

const bookingRouter = express.Router();

// Example booking route
bookingRouter.get(
  "/appointments",
  async (req: Request, res: Response, next: NextFunction) => {
    return res.json({ appointments: [] });
  }
);

bookingRouter.post(
  "/appointment",
  async (req: Request, res: Response, next: NextFunction) => {
    return res.status(201).json({ message: "Appointment created" });
  }
);

export default bookingRouter;
