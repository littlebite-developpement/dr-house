import type { DomainEvent } from './event-bus.js';

export class OrdonnanceCreeeEvent implements DomainEvent {
  readonly eventType = 'ORDONNANCE_CREEE';
  readonly occurredOn: Date;

  constructor(
    public readonly ordonnanceId: string,
    public readonly patientId: string,
    public readonly medecinId: string,
    public readonly consultationId: string | null,
  ) {
    this.occurredOn = new Date();
  }
}
