import request from "supertest";
import express from "express";
import { AppointmentFactory } from "../../utils/mockdata/appointment";
import { DIcontainer } from "../../configs/inversify.config";
import { INTERFACE_TYPES } from "../../utils";
import { AppointmentUsecase } from "../../service";
import { BookingRepository } from "../../repositories";
import config from "../../configs/app.config";
import { createBookingRouter } from "../booking.routes";
import { AppointmentController } from "../../controllers";

const app = express();
app.use(express.json());

// importnat needs to toggle the USE_MOCK to false in inversify.config.ts to use real repository and rund these tests

(config.USE_MOCK === "false" ? describe : describe.skip)(
  "Booking Routes test | integration tests E2E from controller => servicelayer => db",
  () => {
    let appointmentUsecase: AppointmentUsecase;
    let repository: BookingRepository;

    beforeEach(() => {
      repository = DIcontainer.get<BookingRepository>(
        INTERFACE_TYPES.BookingRepository
      );
      appointmentUsecase = DIcontainer.get<AppointmentUsecase>(
        INTERFACE_TYPES.AppointmentUsecase
      );

      const appointmentController = DIcontainer.get<AppointmentController>(
        INTERFACE_TYPES.AppointmentController
      );
      const bookingRouter = createBookingRouter(appointmentController);
      app.use("/", bookingRouter);
    });

    describe("POST /appointment", () => {
      test("should create an appointment", async () => {
        const appointment = AppointmentFactory.build();
        const res = await request(app)
          .post("/appointment")
          .send(appointment)
          .set("Accept", "application/json");
        res.body.appointmentDate = new Date(res.body.appointmentDate);
        // remove timestamps added by the DB so the response matches the factory object
        delete res.body.createdAt;
        delete res.body.updatedAt;
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

    describe("GET /appointments", () => {
      test("should retrieve last inserted appointment with time removed", async () => {
        const appointments = AppointmentFactory.buildList(1);
        await request(app)
          .post("/appointment")
          .send(appointments[0])
          .set("Accept", "application/json");

        const res = await request(app)
          .get("/appointments")
          .set("Accept", "application/json");

        expect(res.status).toBe(200);

        const last: any = res.body[res.body.length - 1];
        last.appointmentDate = new Date(last.appointmentDate);
        last.appointmentDate.setHours(0, 0, 0, 0);
        delete last.createdAt;
        delete last.updatedAt;

        const expected = { ...appointments[0] } as any;
        expected.appointmentDate = new Date(expected.appointmentDate);
        expected.appointmentDate.setHours(0, 0, 0, 0);

        expect(last).toEqual(expected);
      });
    });
  }
);
