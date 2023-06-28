interface ICallback<Payload> {
  (payload: Payload): void;
}

interface IListener<Payload> {
  eventName: string;
  callbacks: ICallback<Payload>[];
}

interface IEventBus<Payload> {
  listeners: IListener<Payload>[];
  subscribe(eventName: string, callback: ICallback<Payload>): void;
  unsubscribe(eventName: string, callback: ICallback<Payload>): void;
  publish(eventName: string, payload: Payload): void;
}
