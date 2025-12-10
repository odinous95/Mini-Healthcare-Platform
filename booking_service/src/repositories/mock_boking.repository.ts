import { IAppointmentCore } from "../interfaces/IAppointmentCore";
import { Appointment } from "../models/appointment.model";
import { injectable } from "inversify";

@injectable()
export class MockBookingRepository implements IAppointmentCore {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  async createAppointment(data: Appointment): Promise<Appointment> {
    this.appointments.push(data);
    return data;
  }

  async getAppointments(): Promise<Appointment[] | null> {
    return Promise.resolve(this.appointments);
  }
}
