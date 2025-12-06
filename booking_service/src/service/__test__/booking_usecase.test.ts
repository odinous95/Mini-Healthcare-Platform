import { IBookingCore } from "../../interfaces";
import { Appointment } from "../../models";
import { MockBookingRepository } from "../../repository";
import { BookingUsecase } from "../booking.usecase";
import { randFirstName } from "@ngneat/falso";

const mockAppointmentData = () => {
  return {
    patientName: randFirstName(),
    doctorName: randFirstName(),
    appointmentDate: new Date("2024-06-15T09:00:00Z"),
    reason: "Consultation",
  };
};

describe("Appointment Usecase status", () => {
  test("Sample Test working", () => {
    expect(true).toBe(true);
  });
});

describe("Appointment Usecase Tests", () => {
  // Mock repository implementing IBookingCore
  let repository: IBookingCore;

  beforeEach(() => {
    // Setup  before each test
    repository = new MockBookingRepository();
  });

  afterEach(() => {
    repository = {} as MockBookingRepository;
  });

  //-=-=-=-=-= Tests for creating and retrieving appointments -=-=-=-=-=//
  describe("Create Appointment", () => {
    test("should create an appointment successfully", async () => {
      const usecase = new BookingUsecase(repository);
      const mockReqPayload = mockAppointmentData();
      const result = await usecase.createAppointment(mockReqPayload);
      expect(result).toMatchObject({
        id: expect.any(Number),
        patientName: expect.any(String),
        doctorName: expect.any(String),
        appointmentDate: expect.any(Date),
        reason: expect.any(String),
      });
    });
    test("should fail to create an appointment | at the service layer", async () => {
      const usecase = new BookingUsecase(repository);
      const mockReqPayload = mockAppointmentData();
      // First creation should succeed
      await usecase.createAppointment(mockReqPayload);
      // Second creation with same data should fail
      jest
        .spyOn(repository, "create")
        .mockImplementation(() => Promise.resolve({} as Appointment));
      await expect(usecase.createAppointment(mockReqPayload)).rejects.toThrow(
        "Failed to create appointment"
      );
    });

    test("should fail to create an appointment already exist | at the repository layer", async () => {
      const usecase = new BookingUsecase(repository);
      const mockReqPayload = mockAppointmentData();
      // First creation should succeed
      await usecase.createAppointment(mockReqPayload);
      // Second creation with same data should fail
      jest
        .spyOn(repository, "create")
        .mockImplementation(() =>
          Promise.reject(new Error("Appointment already exists"))
        );
      await expect(usecase.createAppointment(mockReqPayload)).rejects.toThrow(
        "Appointment already exists"
      );
    });
  });

  describe("Get Appointments", () => {
    test("should retrieve empty appointments list | 0 case ", async () => {
      const usecase = new BookingUsecase(repository);
      const result = await usecase.getAppointments();
      expect(result).toEqual([]);
    });
    test("should retrieve appointments successfully", async () => {
      const usecase = new BookingUsecase(repository);
      const result = await usecase.getAppointments();
      expect(Array.isArray(result)).toBe(true);
    });
  });
});
