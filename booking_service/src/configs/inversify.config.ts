import config from "./app.config";
import { Container } from "inversify";
import { INTERFACE_TYPES } from "../utils";
import { IMessageBroker } from "../external.infrastructure/interfaces";
import { BookingRepository, MockBookingRepository } from "../repositories";
import { AppointmentUsecase } from "../service/usecases";
import { IAppointmentCore } from "../domain/appointment";
import { AppointmentController } from "../api/controllers";

const DIcontainer = new Container();

export function registerBaseBindings() {
  DIcontainer.bind<IAppointmentCore>(INTERFACE_TYPES.BookingRepository).to(
    config.USE_MOCK === "true" ? MockBookingRepository : BookingRepository
  );

  DIcontainer.bind<IAppointmentCore>(INTERFACE_TYPES.AppointmentUsecase).to(
    AppointmentUsecase
  );

  DIcontainer.bind(INTERFACE_TYPES.AppointmentController).to(
    AppointmentController
  );
}

export function bindKafka(broker: IMessageBroker) {
  DIcontainer.bind<IMessageBroker>(
    INTERFACE_TYPES.MessageBroker
  ).toConstantValue(broker);
}
export { DIcontainer };
