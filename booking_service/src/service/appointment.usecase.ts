import { IAppointmentCore } from "../interfaces";

export class AppointmentUsecase implements IAppointmentCore {
  private _repository: IAppointmentCore;

  constructor(repository: IAppointmentCore) {
    this._repository = repository;
  }
  async createAppointment(appointment: any) {
    const data = await this._repository.createAppointment(appointment);
    if (!data.id) {
      throw new Error("Failed to create appointment");
    }
    return data;
  }

  async getAppointments() {
    const data = await this._repository.getAppointments();
    return data;
  }
}
