import express, { NextFunction } from "express";
import { Request, Response } from "express";
import { BookingRepository } from "../repository";
import { AppointmentUsecase } from "../service";
import { AppointmentController } from "../controllers/appointment.contorller";

const bookingRouter = express.Router();
const repository = new BookingRepository();
// the export her for testing purpose
export const appointmentService = new AppointmentUsecase(repository);
const controller = new AppointmentController(appointmentService);

// Example booking route
bookingRouter.get(
  "/appointments",
  async (req: Request, res: Response, next: NextFunction) => {
    return res.json({ appointments: [] });
  }
);

bookingRouter.post(
  "/appointment",
  controller.onAppointmentCreate.bind(controller)
);

export default bookingRouter;
