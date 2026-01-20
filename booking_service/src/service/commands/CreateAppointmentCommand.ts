import { CreateAppointmentDTO } from "../dto/CreateAppointmentDTO";

export class CreateAppointmentCommand {
  constructor(
    public readonly patientId: string,
    public readonly doctorId: string,
    public readonly appointmentDate: Date,
    public readonly reason: string,
    public readonly notes?: string,
  ) {}
}
