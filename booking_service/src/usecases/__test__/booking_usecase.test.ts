import { IBookingCore } from "../../interfaces/IBookingCore";
import { MockBookingRepository } from "../../repository";
import { BookingUsecase } from "../booking.usecase";

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
      const mockReqPayload = {
        patientName: "John Doe",
        doctorName: "Dr. Smith",
        appointmentDate: new Date("2024-07-01T10:00:00Z"),
        reason: "Regular Checkup",
      };
      const result = await usecase.createAppointment(mockReqPayload);
      expect(result).toMatchObject({
        id: expect.any(Number),
        patientName: expect.any(String),
        doctorName: expect.any(String),
        appointmentDate: expect.any(Date),
        reason: expect.any(String),
      });
    });
  });

  describe("Get Appointments", () => {
    test("should retrieve an appointment successfully", () => {
      // Test implementation for retrieving an appointment
    });
  });
});
