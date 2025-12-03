import { IBookingRepository } from "../interfaces/IBookingRepository";

export class BookingService {
  private _repository: IBookingRepository;

  constructor(repository: IBookingRepository) {
    this._repository = repository;
  }
  createAppointment(data: any) {}

  getAppointments(data: any) {}
}
