import { Appointment } from "../models/appointment.model";

export interface IBookingCore {
  create(data: Appointment): Promise<Appointment>;
  findAll(id: number): Promise<Appointment | null>;
}
