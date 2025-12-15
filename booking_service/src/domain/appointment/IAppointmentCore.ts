import { Appointment } from "./appointment.model";

export interface IAppointmentCore {
  createAppointment(data: Appointment): Promise<Appointment>;
  getAppointments(): Promise<Appointment[] | null>;
}
