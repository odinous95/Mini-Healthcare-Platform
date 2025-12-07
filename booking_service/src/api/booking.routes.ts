import express from "express";
import { BookingRepository, MockBookingRepository } from "../repositories";
import { AppointmentUsecase } from "../service";
import { AppointmentController } from "../controllers";
import { Container } from "inversify";
import { INTERFACE_TYPES } from "../utils";
import { IAppointmentCore } from "../interfaces";

const bookingRouter = express.Router();
const container = new Container();

container
  .bind<IAppointmentCore>(INTERFACE_TYPES.BookingRepository)
  .to(BookingRepository);

container
  .bind<IAppointmentCore>(INTERFACE_TYPES.MockBookingRepository)
  .to(MockBookingRepository);

container
  .bind<IAppointmentCore>(INTERFACE_TYPES.AppointmentUsecase)
  .to(AppointmentUsecase);

container.bind(INTERFACE_TYPES.AppointmentController).to(AppointmentController);

const controller = container.get<AppointmentController>(
  INTERFACE_TYPES.AppointmentController
);

bookingRouter.get(
  "/appointments",
  controller.onGetAppointments.bind(controller)
);

bookingRouter.post(
  "/appointment",
  controller.onAppointmentCreate.bind(controller)
);

export default bookingRouter;
