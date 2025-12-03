import { IBookingCore } from "../interfaces/IBookingRepository";

export class BookingService {
  private _repository: IBookingCore;

  constructor(repository: IBookingCore) {
    this._repository = repository;
  }
  createAppointment(data: any) {}

  getAppointments(data: any) {}
}
