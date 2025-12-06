import express, { NextFunction } from "express";
import { Request, Response } from "express";
import { MockBookingRepository } from "../repositories";
import { AppointmentUsecase } from "../service";
import { AppointmentController } from "../controllers/appointment.contorller";

const bookingRouter = express.Router();
const repository = new MockBookingRepository();
// the export her for testing purpose
export const appointmentService = new AppointmentUsecase(repository);
const controller = new AppointmentController(appointmentService);

// Example booking route
bookingRouter.get(
  "/appointments",
  controller.onGetAppointments.bind(controller)
);

bookingRouter.post(
  "/appointment",
  controller.onAppointmentCreate.bind(controller)
);

export default bookingRouter;
