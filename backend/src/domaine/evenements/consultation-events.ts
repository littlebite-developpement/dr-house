import type { DomainEvent } from './event-bus.js';

export class ConsultationTermineeEvent implements DomainEvent {
  readonly eventType = 'CONSULTATION_TERMINEE';
  readonly occurredOn: Date;

  constructor(
    public readonly consultationId: string,
    public readonly patientId: string,
    public readonly medecinId: string,
    public readonly diagnostic: string,
  ) {
    this.occurredOn = new Date();
  }
}
