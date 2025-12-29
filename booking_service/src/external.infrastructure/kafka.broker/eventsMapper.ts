import { AppointmentEvents } from "../../domain/appointment";

export function mapAppointmentEventToKafka(event: AppointmentEvents): string {
  switch (event) {
    case AppointmentEvents.Booked:
      return "booking-appointment"; // actual Kafka event name
    case AppointmentEvents.Cancelled:
      return "cancel-appointment";
  }
}
