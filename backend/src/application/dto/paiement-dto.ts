import type { ModePaiement, StatutPaiement } from '../../domaine/entites/enums.js';

export interface CreatePaiementRequest {
  rdvId?: string;
  consultationId?: string;
  montant: number;
  modePaiement: ModePaiement;
}

export interface UpdatePaiementRequest {
  statut: StatutPaiement;
  transactionRef?: string;
}

export interface PaiementResponse {
  id: string;
  rdvId: string | null;
  consultationId: string | null;
  montant: number;
  modePaiement: ModePaiement;
  statut: StatutPaiement;
  transactionRef: string | null;
  datePaiement: Date;
}
