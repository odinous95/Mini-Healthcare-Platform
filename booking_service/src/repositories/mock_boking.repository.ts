import { Appointment, IAppointmentCore } from "../domain/appointment";
import { injectable } from "inversify";

@injectable()
export class MockBookingRepository implements IAppointmentCore {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  async createAppointment(data: Appointment): Promise<Appointment> {
    const appointment = {
      id: Math.floor(Math.random() * 10000),
      patientName: data.patientName,
      doctorName: data.doctorName,
      appointmentDate: data.appointmentDate,
      reason: data.reason,
    };
    this.appointments.push(appointment);
    return Promise.resolve(appointment);
  }

  async getAppointments(): Promise<Appointment[] | null> {
    return Promise.resolve(this.appointments);
  }
}
