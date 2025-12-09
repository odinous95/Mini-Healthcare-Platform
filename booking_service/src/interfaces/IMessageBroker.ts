export interface IMessageBroker {
  //producer
  connectProducer: <T>() => Promise<T>;
  disconnectProducer: <T>() => Promise<T>;
  publish(data: unknown): Promise<boolean>;

  //consumer
  connectConsumer: <T>() => Promise<T>;
  disconnectConsumer: <T>() => Promise<T>;
  subscribe: (messageHandler: Function, topic: string) => Promise<void>;
}
