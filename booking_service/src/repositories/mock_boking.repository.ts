import { Appointment } from "../domain/appointment";
import { injectable } from "inversify";
import { IAppointmentRepository } from "../service/interfaces";

@injectable()
export class MockBookingRepository implements IAppointmentRepository {
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
