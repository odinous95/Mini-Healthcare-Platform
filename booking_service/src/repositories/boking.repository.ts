import { injectable } from "inversify";
import { Appointment } from "../domain/appointment";
import { appointments } from "../external.infrastructure/postgres.database/schema";
import { DB } from "../external.infrastructure/postgres.database/db.connection";
import { IAppointmentRepository } from "../service/interfaces";

@injectable()
export class BookingRepository implements IAppointmentRepository {
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
    try {
      const results = await DB.select().from(appointments);
      return results;
    } catch (error) {
      console.error("Failed to retrieve appointments:", error);
      throw new Error("Could not retrieve appointments");
    }
  }
}
