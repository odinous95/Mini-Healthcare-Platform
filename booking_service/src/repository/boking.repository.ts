import { IAppointmentCore } from "../interfaces";
import { Appointment } from "../models/appointment.model";
import { AppointmentFactory } from "../utils/mockdata/appointment";

export class BookingRepository implements IAppointmentCore {
  async createAppointment(data: Appointment): Promise<Appointment> {
    const appointment = AppointmentFactory.build(data);
    return Promise.resolve(appointment);
  }
  async getAppointments(): Promise<Appointment[] | null> {
    // Implementation here
    throw new Error("Method not implemented.");
  }
}
