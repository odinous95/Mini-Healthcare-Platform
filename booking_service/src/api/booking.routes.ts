import express, { NextFunction } from "express";
import { Request, Response } from "express";
import { BookingRepository } from "../repository";
import { BookingUsecase } from "../usecases";
import { CreateAppointmentRequest } from "../DTO";
import { RequestValidator } from "./validations/requestValidator";

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
    try {
      const { errors, input } = await RequestValidator(
        CreateAppointmentRequest,
        req.body
      );
      if (errors) {
        return res.status(400).json({ errors });
      }
      const data = await bookingUsecase.createAppointment(input);
      return res.status(201).json(data);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }
);

export default bookingRouter;
