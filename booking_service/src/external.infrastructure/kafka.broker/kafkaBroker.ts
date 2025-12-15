import { Admin, Consumer, Kafka, Producer } from "kafkajs";
import { injectable } from "inversify";
import { IMessagePayload } from "./types";
import { IMessageBroker } from "./IMessageBroker";

@injectable()
export class KafkaBroker implements IMessageBroker {
  private admin?: Admin;
  private producer?: Producer;
  private consumer?: Consumer;

  constructor(private kafka: Kafka) {}

  // ---------- ADMIN ----------
  async connectAdmin(): Promise<Admin> {
    if (!this.admin) {
      this.admin = this.kafka.admin();
      await this.admin.connect();
      console.log("Kafka Admin connected");
    }
    return this.admin;
  }

  async disconnectAdmin(): Promise<void> {
    if (this.admin) {
      await this.admin.disconnect();
      this.admin = undefined;
      console.log("Kafka Admin disconnected");
    }
  }

  async createTopics(
    topics: { topic: string; numPartitions: number }[]
  ): Promise<boolean> {
    if (!this.admin) {
      throw new Error("Admin is not connected");
    }
    console.log("Creating topics:", topics);
    return this.admin.createTopics({ topics });
  }

  // producer
  async connectProducer<T>(): Promise<Producer> {
    if (!this.producer) {
      this.producer = this.kafka.producer();
      await this.producer.connect();
    }
    return this.producer;
  }
  //-=-=-=-=-=
  async disconnectProducer<T>(): Promise<void> {
    await this.producer?.disconnect();
    this.producer = undefined;
  }

  async publish(data: IMessagePayload): Promise<boolean> {
    console.log("Publishing to topic:", data);
    try {
      const producer = await this.connectProducer<Producer>();
      console.log("Booking producer created and connected successfully.");
      const result = await producer.send({
        topic: data.topic,
        messages: [
          {
            headers: data.headers,
            key: data.event,
            value: JSON.stringify(data.message),
          },
        ],
      });
      console.log("publishing result", result);

      console.log("Booking created event published successfully.");
      return result.length > 0;
    } catch (error) {
      console.error("Error creating booking producer:", error);
      throw error;
    } finally {
      await this.disconnectProducer();
    }
  }

  // consumer-=-==-=-=-=-=-=

  connectConsumer<T>(): Promise<T> {
    throw new Error("Method not implemented.");
  }
  disconnectConsumer<T>(): Promise<T> {
    throw new Error("Method not implemented.");
  }
  async subscribe(messageHandler: Function, topic: string): Promise<void> {
    // Implementation for subscribing to a specified queue
    console.log(`Subscribing to queue ${topic}`);
    // Here you would add the actual logic to subscribe to a message broker and call messageHandler when a message is received
  }
}
