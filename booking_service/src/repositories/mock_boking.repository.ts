import { DB } from "../external.infrastructure/pg.db/db.connection";
import { appointments } from "../external.infrastructure/pg.db/schema";
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
    try {
      const [result] = await DB.insert(appointments)
        .values({
          id: data.id,
          patientName: data.patientName,
          doctorName: data.doctorName,
          appointmentDate: data.appointmentDate,
          reason: data.reason,
        })
        .returning();
      return result;
    } catch (error) {
      console.error("Failed to create appointment:", error);
      throw new Error("Could not create appointment");
    }
  }

  async getAppointments(): Promise<Appointment[] | null> {
    return Promise.resolve(this.appointments);
  }
}
