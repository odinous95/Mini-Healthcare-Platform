import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateAppointmentRequest {
  @IsString()
  @IsNotEmpty()
  patientName!: string;

  @IsString()
  @IsNotEmpty()
  doctorName!: string;

  @Type(() => Date)
  @IsDate()
  appointmentDate!: Date;

  @IsString()
  reason!: string;
}
