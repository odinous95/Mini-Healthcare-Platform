import { IAppointmentCore } from "../interfaces";
import { inject, injectable } from "inversify";
import { INTERFACE_TYPES } from "../utils";
import { Appointment } from "../models";

@injectable()
export class AppointmentUsecase implements IAppointmentCore {
  private _repository: IAppointmentCore;

  constructor(
    @inject(INTERFACE_TYPES.BookingRepository) repository: IAppointmentCore
  ) {
    this._repository = repository;
  }
  async createAppointment(appointment: Appointment) {
    const data = await this._repository.createAppointment(appointment);
    if (!data.id) {
      throw new Error("Internal Server Error");
    }
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
