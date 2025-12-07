import "reflect-metadata";
import { createApp } from "./expressApp";

const PORT = process.env.PORT || 3000;

export const StartServer = async () => {
  createApp().listen(PORT, () => {
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
