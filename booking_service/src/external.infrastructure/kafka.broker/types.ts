export enum BookingEvent {
  book_appointment = "book_appointment",
  cancel_appointment = "cancel_appointment",
}

export type TOPIC_TYPE = "BookingEvents";

export interface IMessagePayload {
  headers?: Record<string, any>;
  event: BookingEvent;
  data: Record<string, any>;
}
