import type { ModePaiement, StatutPaiement } from './enums.js';

export interface Paiement {
  id: string;
  rdvId: string | null;
  consultationId: string | null;
  montant: number;
  modePaiement: ModePaiement;
  statut: StatutPaiement;
  transactionRef: string | null;
  datePaiement: Date;
}
