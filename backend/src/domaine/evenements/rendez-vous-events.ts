import type { DomainEvent } from './event-bus.js';

export class RendezVousPlanifieEvent implements DomainEvent {
  readonly eventType = 'RENDEZ_VOUS_PLANIFIE';
  readonly occurredOn: Date;

  constructor(
    public readonly rendezVousId: string,
    public readonly patientId: string,
    public readonly medecinId: string,
    public readonly dateRdv: Date,
    public readonly heureRdv: string,
  ) {
    this.occurredOn = new Date();
  }
}

export class RendezVousConfirmeEvent implements DomainEvent {
  readonly eventType = 'RENDEZ_VOUS_CONFIRME';
  readonly occurredOn: Date;

  constructor(
    public readonly rendezVousId: string,
    public readonly patientId: string,
    public readonly medecinId: string,
  ) {
    this.occurredOn = new Date();
  }
}

export class RendezVousAnnuleEvent implements DomainEvent {
  readonly eventType = 'RENDEZ_VOUS_ANNULE';
  readonly occurredOn: Date;

  constructor(
    public readonly rendezVousId: string,
    public readonly patientId: string,
    public readonly medecinId: string,
    public readonly raison?: string,
  ) {
    this.occurredOn = new Date();
  }
}

export class RendezVousTermineEvent implements DomainEvent {
  readonly eventType = 'RENDEZ_VOUS_TERMINE';
  readonly occurredOn: Date;

  constructor(
    public readonly rendezVousId: string,
    public readonly patientId: string,
    public readonly medecinId: string,
  ) {
    this.occurredOn = new Date();
  }
}
