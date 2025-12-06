import { IsISO8601, IsNotEmpty, IsString } from "class-validator";

export class CreateAppointmentRequest {
  @IsString()
  @IsNotEmpty()
  patientName!: string;

  @IsString()
  @IsNotEmpty()
  doctorName!: string;

  @IsISO8601()
  appointmentDate!: string;

  @IsString()
  reason!: string;
}
