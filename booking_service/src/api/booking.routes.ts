import express, { NextFunction } from "express";
import { Request, Response } from "express";
import { BookingRepository } from "../repository";
import { BookingUsecase } from "../usecases";

const bookingRouter = express.Router();
export const bookingUsecase = new BookingUsecase(new BookingRepository());

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
    const data = await bookingUsecase.createAppointment(req.body);
    return res.status(201).json(data);
  }
);

export default bookingRouter;
