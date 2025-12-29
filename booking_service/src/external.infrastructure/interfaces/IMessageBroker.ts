import { Admin, Producer } from "kafkajs";
import { IMessagePayload } from "../kafka.broker/types";

export interface IMessageBroker {
  // --- Admin ---
  connectAdmin(): Promise<Admin>;
  disconnectAdmin(): Promise<void>;
  createTopics(
    topics: { topic: string; numPartitions: number }[]
  ): Promise<boolean>;
  //producer
  connectProducer: <T>() => Promise<Producer>;
  disconnectProducer: <T>() => Promise<void>;
  publish: (data: IMessagePayload) => Promise<boolean>;

  //consumer
  connectConsumer: <T>() => Promise<T>;
  disconnectConsumer: <T>() => Promise<T>;
  subscribe: (messageHandler: Function, topic: string) => Promise<void>;
}
