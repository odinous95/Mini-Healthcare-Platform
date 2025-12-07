import { Factory } from "rosie";
import { Appointment } from "../../models/appointment.model";
import { randFirstName, randNumber } from "@ngneat/falso";

export const AppointmentFactory = new Factory<Appointment>()
  .attr("id", +1)
  .attr("patientName", () => randFirstName())
  .attr("doctorName", () => randFirstName())
  .attr("appointmentDate", () => new Date("2024-06-15T09:00:00Z"))
  .attr("reason", "Consultation");
