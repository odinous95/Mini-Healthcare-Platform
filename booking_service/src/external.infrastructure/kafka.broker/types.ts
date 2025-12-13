export type TOPIC_TYPE = "BookingEvent";

export enum BookingEvent {
  book_appointment = "book_appointment",
  cancel_appointment = "cancel_appointment",
}

export interface IMessagePayload {
  headers?: Record<string, any>;
  event: BookingEvent;
  data: Record<string, any>;
}
