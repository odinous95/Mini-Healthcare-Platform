import { IBookingCore } from "../interfaces/IBookingCore";

export class BookingUsecase {
  private _repository: IBookingCore;

  constructor(repository: IBookingCore) {
    this._repository = repository;
  }
  async createAppointment(appointment: any) {
    const data = await this._repository.create(appointment);
    return data;
  }

  getAppointments(data: any) {}
}
