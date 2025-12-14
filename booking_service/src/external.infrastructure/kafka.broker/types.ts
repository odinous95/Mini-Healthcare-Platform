export type TOPIC_TYPE = "appointments";

export enum BookingEvents {
  book_appointment = "book_appointment",
  cancel_appointment = "cancel_appointment",
}

export interface IMessagePayload {
  headers?: Record<string, any>;
  event: BookingEvents;
  topic: TOPIC_TYPE;
  messages: Record<string, any>;
}
