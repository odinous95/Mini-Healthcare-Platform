import { IBookingCore } from "../interfaces/IBookingCore";

export class BookingService {
  private _repository: IBookingCore;

  constructor(repository: IBookingCore) {
    this._repository = repository;
  }
  createAppointment(data: any) {}

  getAppointments(data: any) {}
}
