import request from "supertest";
import express from "express";
import bookingRouter, { bookingUsecase } from "../booking.routes";
import { randFirstName } from "@ngneat/falso";
import { AppointmentFactory } from "../../utils/mockdata/appointment";

const app = express();
app.use(express.json());
app.use("/", bookingRouter);

const mockAppointmentRequset = () => {
  return {
    patientName: randFirstName(),
    doctorName: randFirstName(),
    appointmentDate: new Date("2024-06-15T09:00:00Z"),
    reason: "Consultation",
  };
};

describe("Booking Routes", () => {
  describe("POST /appointment", () => {
    test("should create an appointment", async () => {
      const mockReqPayload = mockAppointmentRequset();
      const appointment = AppointmentFactory.build();
      jest
        .spyOn(bookingUsecase, "createAppointment")
        .mockImplementationOnce(() => Promise.resolve(appointment));

      const res = await request(app)
        .post("/appointment")
        .send(mockReqPayload)
        .set("Accept", "application/json");
      // Adjust for date serialization
      res.body.appointmentDate = new Date(res.body.appointmentDate);
      expect(res.status).toBe(201);
      expect(res.body).toEqual(appointment);
    });
  });
});
