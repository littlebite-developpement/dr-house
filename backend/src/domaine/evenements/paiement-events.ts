import type { DomainEvent } from './event-bus.js';

export class PaiementRecuEvent implements DomainEvent {
  readonly eventType = 'PAIEMENT_RECU';
  readonly occurredOn: Date;

  constructor(
    public readonly paiementId: string,
    public readonly montant: number,
    public readonly modePaiement: string,
    public readonly rdvId: string | null,
    public readonly consultationId: string | null,
  ) {
    this.occurredOn = new Date();
  }
}

export class PaiementEchoueEvent implements DomainEvent {
  readonly eventType = 'PAIEMENT_ECHOUE';
  readonly occurredOn: Date;

  constructor(
    public readonly paiementId: string,
    public readonly montant: number,
    public readonly raison?: string,
  ) {
    this.occurredOn = new Date();
  }
}
