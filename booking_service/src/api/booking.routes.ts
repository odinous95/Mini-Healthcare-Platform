import express from "express";
import { AppointmentController } from "./controllers";

export function createBookingRouter(controller: AppointmentController) {
  const bookingRouter = express.Router();

  bookingRouter.get(
    "/appointments",
    controller.onGetAppointments.bind(controller)
  );

  bookingRouter.post(
    "/appointment",
    controller.onAppointmentCreate.bind(controller)
  );

  return bookingRouter;
}
