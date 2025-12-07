import request from "supertest";
import express from "express";
import bookingRouter from "../booking.routes";
import { AppointmentFactory } from "../../utils/mockdata/appointment";
import { DIcontainer } from "../../configs/inversify.config";
import { INTERFACE_TYPES } from "../../utils";
import { AppointmentUsecase } from "../../service";

const app = express();
app.use(express.json());
app.use("/", bookingRouter);

// Mocking the AppointmentUsecase from the DI container
// const appointmentUsecase = DIcontainer.get<AppointmentUsecase>(
//   INTERFACE_TYPES.AppointmentUsecase
// );

describe("Booking Routes test | integration tests", () => {
  // Define appointmentUsecase here to be used in tests
  let appointmentUsecase: AppointmentUsecase;

  beforeEach(() => {
    // Setup  before each test
    appointmentUsecase = DIcontainer.get<AppointmentUsecase>(
      INTERFACE_TYPES.BookingRepository
    );
  });

  afterEach(() => {
    appointmentUsecase = {} as AppointmentUsecase;
  });

  describe("POST /appointment", () => {
    test("should create an appointment", async () => {
      const appointment = AppointmentFactory.build();
      jest
        .spyOn(appointmentUsecase, "createAppointment")
        .mockImplementationOnce(() => Promise.resolve(appointment));
      const res = await request(app)
        .post("/appointment")
        .send(appointment)
        .set("Accept", "application/json");
      res.body.appointmentDate = new Date(res.body.appointmentDate);
      expect(res.status).toBe(201);
      expect(res.body).toEqual(appointment);
    });

    test("should return a validation error ", async () => {
      const appointment = AppointmentFactory.build();
      const res = await request(app)
        .post("/appointment")
        .send({ ...appointment, patientName: "" })
        .set("Accept", "application/json");
      expect(res.status).toBe(400);
      expect(res.body.errors).toEqual("patientName should not be empty");
    });
  });
});
