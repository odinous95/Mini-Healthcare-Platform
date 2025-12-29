import { Appointment } from "../../domain/appointment/appointment.model";

export interface IAppointmentRepository {
  createAppointment(data: Appointment): Promise<Appointment>;
  getAppointments(): Promise<Appointment[] | null>;
}
