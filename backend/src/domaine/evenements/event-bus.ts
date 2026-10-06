export interface DomainEvent {
  readonly occurredOn: Date;
  readonly eventType: string;
}

export interface IEventBus {
  publish(event: DomainEvent): Promise<void>;
  subscribe(eventType: string, handler: (event: DomainEvent) => Promise<void>): void;
}
