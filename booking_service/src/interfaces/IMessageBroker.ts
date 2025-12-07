export interface IMessageBroker {
  publish(queue: string, message: any): Promise<void>;
  subscribe(queue: string, onMessage: (message: any) => void): Promise<void>;
}
