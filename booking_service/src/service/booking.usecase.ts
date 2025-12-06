import { IBookingCore } from "../interfaces";

export class BookingUsecase {
  private _repository: IBookingCore;

  constructor(repository: IBookingCore) {
    this._repository = repository;
  }
  async createAppointment(appointment: any) {
    const data = await this._repository.create(appointment);
    if (!data.id) {
      throw new Error("Failed to create appointment");
    }
    return data;
  }

  async getAppointments() {
    const data = await this._repository.findAll();
    return data;
  }
}
