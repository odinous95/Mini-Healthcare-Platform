import request from "supertest";
import express from "express";
import bookingRouter, { appointmentService } from "../booking.routes";
import { randFirstName } from "@ngneat/falso";
import { AppointmentFactory } from "../../utils/mockdata/appointment";

const app = express();
app.use(express.json());
app.use("/", bookingRouter);

const mockAppointmentRequset = () => {
  return {
    patientName: randFirstName(),
    doctorName: randFirstName(),
    appointmentDate: new Date("2024-12-01T10:00:00Z"),
    reason: "Consultation",
  };
};

describe("Booking Routes", () => {
  describe("POST /appointment", () => {
    test("should create an appointment", async () => {
      const mockReqPayload = mockAppointmentRequset();
      const appointment = AppointmentFactory.build();
      jest
        .spyOn(appointmentService, "createAppointment")
        .mockImplementationOnce(() => Promise.resolve(appointment));

      const res = await request(app)
        .post("/appointment")
        .send(mockReqPayload)
        .set("Accept", "application/json");
      res.body.appointmentDate = new Date(res.body.appointmentDate);
      expect(res.status).toBe(201);
      expect(res.body).toEqual(appointment);
    });

    test("should return a validation error ", async () => {
      const mockReqPayload = mockAppointmentRequset();
      const res = await request(app)
        .post("/appointment")
        .send({ ...mockReqPayload, patientName: "" })
        .set("Accept", "application/json");
      expect(res.status).toBe(400);
      expect(res.body.errors).toEqual("patientName should not be empty");
    });

    test("should response with internal error", async () => {
      const mockReqPayload = mockAppointmentRequset();
      jest
        .spyOn(bookingUsecase, "createAppointment")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("Internal Server Error"))
        );

      const res = await request(app)
        .post("/appointment")
        .send(mockReqPayload)
        .set("Accept", "application/json");
      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: "Internal Server Error" });
    });
  });
});
