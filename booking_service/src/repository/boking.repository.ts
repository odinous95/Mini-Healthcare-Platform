import { IBookingCore } from "../interfaces/IBookingCore";
import { Appointment } from "../models/appointment.model";

export class BookingRepository implements IBookingCore {
  async create(data: Appointment): Promise<Appointment> {
    // Implementation here
    throw new Error("Method not implemented.");
  }

  async findAll(): Promise<Appointment | null> {
    // Implementation here
    throw new Error("Method not implemented.");
  }
}
