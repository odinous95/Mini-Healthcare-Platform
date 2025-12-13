import { Admin, Consumer, Kafka, Producer } from "kafkajs";
import { IMessageBroker } from "../../interfaces";

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
  async connectProducer<T>(): Promise<T> {
    if (!this.producer) {
      this.producer = this.kafka.producer();
      await this.producer.connect();
    }
    return this.producer as unknown as Promise<T>;
  }
  async disconnectProducer<T>(): Promise<void> {
    await this.producer?.disconnect();
    this.producer = undefined;
  }
  async publish(data: unknown): Promise<boolean> {
    // Implementation for publishing a message to the specified queue
    console.log(`Publishing message:`, data);
    // Here you would add the actual logic to publish to a message broker like RabbitMQ, Kafka, etc.
    return true;
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
