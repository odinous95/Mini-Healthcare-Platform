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
    const newAppointment = new Appointment(
      data.patientName,
      data.doctorName,
      data.appointmentDate,
      data.reason,
      this.appointments.length + 1
    );
    this.appointments.push(newAppointment);
    return Promise.resolve(newAppointment);
  }

  async getAppointments(): Promise<Appointment[] | null> {
    return Promise.resolve(this.appointments);
  }
}
