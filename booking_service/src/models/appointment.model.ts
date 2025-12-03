export class Appointment {
  constructor(
    public readonly id: number,
    public readonly patientName: string,
    public readonly doctorName: string,
    public readonly appointmentDate: Date,
    public readonly reason: string
  ) {}
}
