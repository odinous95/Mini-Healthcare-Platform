import { IBookingCore } from "../interfaces/IBookingCore";
import { Appointment } from "../models/appointment.model";

export class MockBookingRepository implements IBookingCore {
  async create(data: Appointment): Promise<Appointment> {
    const { id: _ignored, ...rest } = data;
    const mockAppointment = {
      id: Math.floor(Math.random() * 1000),
      ...rest,
    } as Appointment;
    return Promise.resolve(mockAppointment);
  }

  async findAll(): Promise<Appointment[] | null> {
    // return an empty array for the mock repository
    const appointments: Appointment[] = [];
    return Promise.resolve(appointments);
  }
}
