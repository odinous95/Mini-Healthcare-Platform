import { Kafka, logLevel } from "kafkajs";
import { KafkaBroker } from "./kafkaBroker";

// configuration properties
const CLIENT_ID = process.env.CLIENT_ID || "booking-service";
const GROUP_ID = process.env.GROUP_ID || "booking-service-group";
const BROKERS = [process.env.BROKER_1 || "localhost:9092"];

export const kafka = new Kafka({
  clientId: CLIENT_ID,
  brokers: BROKERS,
  logLevel: logLevel.INFO,
});
export const kafkaBroker = new KafkaBroker(kafka);
async function setupKafka() {
  try {
    await kafkaBroker.connectAdmin();

    await kafkaBroker.createTopics([
      { topic: "booking-events", numPartitions: 3 },
    ]);
  } catch (error) {
    console.error("Error connecting Kafka Admin from index:", error);
  } finally {
    await kafkaBroker.disconnectAdmin();
  }
}

setupKafka();
