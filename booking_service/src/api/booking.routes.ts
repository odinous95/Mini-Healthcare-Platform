import express from "express";

import { AppointmentController } from "../controllers";
import { INTERFACE_TYPES } from "../utils";
import { DIcontainer } from "../configs/inversify.config";

const bookingRouter = express.Router();

const controller = DIcontainer.get<AppointmentController>(
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
