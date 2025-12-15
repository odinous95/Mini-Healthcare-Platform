import { Appointment } from "../../domain/appointment";
import { MockBookingRepository } from "../../repositories";
import { AppointmentFactory } from "../../utils/mockdata/appointment";
import { AppointmentUsecase } from "../appointment.usecase";

describe("Appointment Usecase | Unit tests ", () => {
  // Mock repository implementing IAppointmentCore
  let repository: MockBookingRepository;
  let broker: any;

  beforeEach(() => {
    // Setup  before each test
    repository = new MockBookingRepository();
    broker = {};
  });

  afterEach(() => {
    repository = {} as MockBookingRepository;
  });

  //-=-=-=-=-= Tests for creating and retrieving appointments -=-=-=-=-=//
  describe("Create Appointment ", () => {
    test("should create an appointment successfully", async () => {
      const usecase = new AppointmentUsecase(repository, broker);
      const appointment = AppointmentFactory.build();
      const result = await usecase.createAppointment(appointment);
      expect(result).toMatchObject({
        id: expect.any(Number),
        patientName: expect.any(String),
        doctorName: expect.any(String),
        appointmentDate: expect.any(Date),
        reason: expect.any(String),
      });
    });
    test("should fail to create an appointment | at the service layer", async () => {
      const usecase = new AppointmentUsecase(repository, broker);
      const appointment = AppointmentFactory.build();
      await usecase.createAppointment(appointment);
      // Second creation with same data should fail
      jest
        .spyOn(repository, "createAppointment")
        .mockImplementation(() => Promise.resolve({} as Appointment));
      await expect(usecase.createAppointment(appointment)).rejects.toThrow(
        "Internal Server Error"
      );
    });
    test("should fail to create an appointment already exist | at the repository layer", async () => {
      const usecase = new AppointmentUsecase(repository, broker);
      const appointment = AppointmentFactory.build();
      // First creation should succeed
      await usecase.createAppointment(appointment);
      // Second creation with same data should fail
      jest
        .spyOn(repository, "createAppointment")
        .mockImplementation(() =>
          Promise.reject(new Error("Appointment already exists"))
        );
      await expect(usecase.createAppointment(appointment)).rejects.toThrow(
        "Appointment already exists"
      );
    });
  });

  describe("Get Appointments", () => {
    test("should retrieve appointments successfully", async () => {
      const usecase = new AppointmentUsecase(repository, broker);
      const result = await usecase.getAppointments();
      expect(Array.isArray(result)).toBe(true);
    });
  });
});
