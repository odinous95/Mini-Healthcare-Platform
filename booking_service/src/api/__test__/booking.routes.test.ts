import request from "supertest";
import express from "express";
import { AppointmentFactory } from "../../utils/mockdata/appointment";
import { AppointmentUsecase } from "../../service";
import { MockBookingRepository } from "../../repositories";
import config from "../../configs/app.config";
import { Appointment } from "../../domain/appointment";
import { createBookingRouter } from "../booking.routes";
import { DIcontainer } from "../../configs/inversify.config";
import { AppointmentController } from "../../controllers";
import { INTERFACE_TYPES } from "../../utils";

const app = express();
app.use(express.json());
(config.USE_MOCK === "true" ? describe : describe.skip)(
  "Booking Routes test | integration tests up to the service layer with the mocking repository injected",
  () => {
    describe("appointment", () => {
      // Define appointmentUsecase here to be used in tests
      let appointmentUsecase: AppointmentUsecase;
      let repository: MockBookingRepository;
      let mock_appointment: Appointment = AppointmentFactory.build();
      let broker: any = {};
      beforeEach(() => {
        repository = new MockBookingRepository();
        appointmentUsecase = new AppointmentUsecase(repository, broker);
        const appointmentController = DIcontainer.get<AppointmentController>(
          INTERFACE_TYPES.AppointmentController
        );
        const bookingRouter = createBookingRouter(appointmentController);
        app.use("/", bookingRouter);
      });
      afterEach(() => {
        appointmentUsecase = {} as AppointmentUsecase;
      });
      test("should create an appointment", async () => {
        jest
          .spyOn(appointmentUsecase, "createAppointment")
          .mockImplementationOnce(() => Promise.resolve(mock_appointment));
        const res = await request(app)
          .post("/appointment")
          .send(mock_appointment)
          .set("Accept", "application/json");
        res.body.appointmentDate = new Date(res.body.appointmentDate);
        expect(res.status).toBe(201);
        expect(res.body).toEqual(mock_appointment);
      });
      test("should return a validation error ", async () => {
        const res = await request(app)
          .post("/appointment")
          .send({ ...mock_appointment, patientName: "" })
          .set("Accept", "application/json");
        expect(res.status).toBe(400);
        expect(res.body.errors).toEqual("patientName should not be empty");
      });
      test("should retrieve all appointments", async () => {
        const res = await request(app)
          .get("/appointments")
          .set("Accept", "application/json");
        res.body = res.body.map((appt: any) => ({
          ...appt,
          appointmentDate: new Date(appt.appointmentDate),
        }));
        expect(res.status).toBe(200);
        expect(res.body).toEqual([mock_appointment]);
      });
    });
  }
);
