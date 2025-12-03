import { Appointment } from "../models/appointment.model";

export interface IBookingRepository {
  create(data: Appointment): Promise<Appointment>;
  findAll(id: number): Promise<Appointment | null>;
}
