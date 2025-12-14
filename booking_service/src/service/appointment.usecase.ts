import { IAppointmentCore, IMessageBroker } from "../interfaces";
import { inject, injectable } from "inversify";
import { INTERFACE_TYPES } from "../utils";
import { Appointment } from "../models";
import { AppointmentEvents } from "../domain/events";

@injectable()
export class AppointmentUsecase implements IAppointmentCore {
  private _repository: IAppointmentCore;
  private readonly _broker: IMessageBroker;
  constructor(
    @inject(INTERFACE_TYPES.BookingRepository) repository: IAppointmentCore,
    @inject(INTERFACE_TYPES.MessageBroker) broker: IMessageBroker
  ) {
    this._repository = repository;
    this._broker = broker;
  }
  async createAppointment(appointment: Appointment) {
    const data = await this._repository.createAppointment(appointment);
    console.log("Appointment created:", data);
    if (!data.id) {
      throw new Error("Internal Server Error");
    }
    await this._broker.publish({
      topic: "appointments",
      event: AppointmentEvents.Booked,
      headers: {},
      message: data,
    });

    return data;
  }

  async getAppointments() {
    const data = await this._repository.getAppointments();
    if (!data) {
      throw new Error("Internal Server Error");
    }
    return data;
  }
}
