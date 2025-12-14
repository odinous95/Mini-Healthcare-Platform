import { Kafka, logLevel } from "kafkajs";
import { KafkaBroker } from "./kafkaBroker";

// configuration properties
const CLIENT_ID = process.env.CLIENT_ID || "booking-service";
const BROKERS = [process.env.BROKER_1 || "localhost:9092"];
const GROUP_ID = process.env.GROUP_ID || "booking-service-group";

export async function createKafkaBroker(): Promise<KafkaBroker> {
  const kafkaInstance = new Kafka({
    clientId: CLIENT_ID,
    brokers: BROKERS,
    logLevel: logLevel.INFO,
  });
  const kafkaBroker = new KafkaBroker(kafkaInstance);
  try {
    const admin = await kafkaBroker.connectAdmin();
    const existingTopics = await admin.listTopics();

    if (!existingTopics.includes("appointments")) {
      console.log("Creating Kafka topics...");
      await kafkaBroker.createTopics([
        { topic: "appointments", numPartitions: 3 },
      ]);
    }
  } catch (error) {
    console.error("Error creating Kafka topics:", error);
  } finally {
    await kafkaBroker.disconnectAdmin();
  }
  return kafkaBroker;
}
