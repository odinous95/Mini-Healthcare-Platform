export class Appointment {
  constructor(
    public readonly patientName: string,
    public readonly doctorName: string,
    public readonly appointmentDate: Date,
    public readonly reason: string,
    public readonly id?: number
  ) {}
}
