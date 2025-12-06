import { IAppointmentCore } from "../interfaces/IAppointmentCore";
import { Appointment } from "../models/appointment.model";

export class MockBookingRepository implements IAppointmentCore {
  async createAppointment(data: Appointment): Promise<Appointment> {
    return Promise.resolve(data);
  }

  async getAppointments(): Promise<Appointment[] | null> {
    // return an empty array for the mock repository
    const appointments: Appointment[] = [];
    return Promise.resolve(appointments);
  }
}
