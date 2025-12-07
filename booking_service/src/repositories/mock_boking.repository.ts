import { IAppointmentCore } from "../interfaces/IAppointmentCore";
import { Appointment } from "../models/appointment.model";
import { injectable } from "inversify";

@injectable()
export class MockBookingRepository implements IAppointmentCore {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [
      {
        patientName: "John Doe",
        doctorName: "Dr. Smith",
        appointmentDate: new Date("2023-10-01T10:00:00Z"),
        reason: "Regular Checkup",
        id: 1,
      },
      {
        patientName: "fsdf Doe",
        doctorName: "Dr. fasd",
        appointmentDate: new Date("2023-10-01T10:00:00Z"),
        reason: "fasdf Checkup",
        id: 2,
      },
    ];
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
