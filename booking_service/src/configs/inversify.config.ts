import config from "./app.config";
import { Container } from "inversify";
import { INTERFACE_TYPES } from "../utils";
import { IAppointmentCore } from "../interfaces";
import { BookingRepository, MockBookingRepository } from "../repositories";
import { AppointmentUsecase } from "../service";
import { AppointmentController } from "../controllers";

const DIcontainer = new Container();

console.log(
  `Using ${config.USE_MOCK ? "MockBookingRepository" : "BookingRepository"}`
);
DIcontainer.bind<IAppointmentCore>(INTERFACE_TYPES.BookingRepository).to(
  config.USE_MOCK ? MockBookingRepository : BookingRepository
);

DIcontainer.bind<IAppointmentCore>(INTERFACE_TYPES.AppointmentUsecase).to(
  AppointmentUsecase
);

DIcontainer.bind(INTERFACE_TYPES.AppointmentController).to(
  AppointmentController
);

export { DIcontainer };
