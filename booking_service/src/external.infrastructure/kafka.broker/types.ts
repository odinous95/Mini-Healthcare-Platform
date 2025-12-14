import { AppointmentEvents } from "../../domain/events";

export type TOPIC_TYPE = "appointments";

export interface IMessagePayload {
  headers?: Record<string, any>;
  event: AppointmentEvents;
  topic: TOPIC_TYPE;
  message: Record<string, any>;
}
