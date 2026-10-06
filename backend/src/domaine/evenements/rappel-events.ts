import type { DomainEvent } from './event-bus.js';

export class RappelPrisePlanifieEvent implements DomainEvent {
  readonly eventType = 'RAPPEL_PRISE_PLANIFIE';
  readonly occurredOn: Date;

  constructor(
    public readonly rappelId: string,
    public readonly patientId: string,
    public readonly ligneOrdonnanceId: string,
    public readonly heurePrise: string,
    public readonly dateRappel: Date,
  ) {
    this.occurredOn = new Date();
  }
}

export class RappelPrisePrisEvent implements DomainEvent {
  readonly eventType = 'RAPPEL_PRISE_PRIS';
  readonly occurredOn: Date;

  constructor(
    public readonly rappelId: string,
    public readonly patientId: string,
  ) {
    this.occurredOn = new Date();
  }
}
