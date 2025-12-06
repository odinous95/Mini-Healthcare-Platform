import { IsISO8601, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAppointmentRequest {
  @IsString()
  @IsNotEmpty()
  patientName!: string;

  @IsString()
  @IsNotEmpty()
  doctorName!: string;

  @IsISO8601()
  appointmentDate!: Date;

  @IsString()
  reason!: string;
}
