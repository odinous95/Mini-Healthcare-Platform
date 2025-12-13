import { Admin } from "kafkajs";
export interface IMessageBroker {
  // --- Admin ---
  connectAdmin(): Promise<Admin>;
  disconnectAdmin(): Promise<void>;
  createTopics(
    topics: { topic: string; numPartitions: number }[]
  ): Promise<boolean>;
  //producer
  connectProducer: <T>() => Promise<T>;
  disconnectProducer: <T>() => Promise<void>;
  publish: (data: unknown) => Promise<boolean>;

  //consumer
  connectConsumer: <T>() => Promise<T>;
  disconnectConsumer: <T>() => Promise<T>;
  subscribe: (messageHandler: Function, topic: string) => Promise<void>;
}
