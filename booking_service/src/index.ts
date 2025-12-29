import "reflect-metadata";
import { createApp } from "./expressApp";
import { createKafkaBroker } from "./external.infrastructure/kafka.broker";
import {
  bindKafka,
  DIcontainer,
  registerBaseBindings,
} from "./configs/inversify.config";
import { INTERFACE_TYPES } from "./utils";
import { createBookingRouter } from "./api/booking.routes";
import { AppointmentController } from "./api/controllers";


const PORT = process.env.PORT || 3000;

export const StartServer = async () => {
  // 1. Register base bindings
  // (repositories, services, controllers)
  registerBaseBindings();

  // 2. Initialize Kafka
  // instance and create broker
  // THEN connect admin and create topics
  const kafkaBroker = await createKafkaBroker();

  // 3. Bind Kafka BEFORE resolution
  bindKafka(kafkaBroker);

  // 4. Resolve controller instances only in the start up phase
  const appointmentController = DIcontainer.get<AppointmentController>(
    INTERFACE_TYPES.AppointmentController
  );

  // 5. Build router
  const bookingRouter = createBookingRouter(appointmentController);
  // 6. Create and start Express app with the router that uses the controllers bound to Kafka
  (await createApp(bookingRouter)).listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
  });

  process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
    process.exit(1);
  });
};

StartServer()
  .then(() => {
    console.log("Application started successfully.");
  })
  .catch((error) => {
    console.error("Failed to start application:", error);
  });
