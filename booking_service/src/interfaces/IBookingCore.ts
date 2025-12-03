import { Appointment } from "../models/appointment.model";

export interface IBookingCore {
  create(data: Appointment): Promise<Appointment>;
  findAll(): Promise<Appointment[] | null>;
}
