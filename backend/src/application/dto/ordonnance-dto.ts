export interface LigneOrdonnanceRequest {
  medicamentId: string;
  posologie: string;
  dureeJours: number;
  quantite: number;
}

export interface CreateOrdonnanceRequest {
  consultationId?: string;
  patientId: string;
  medecinId: string;
  instructions?: string;
  lignes: LigneOrdonnanceRequest[];
}

export interface OrdonnanceResponse {
  id: string;
  consultationId: string | null;
  patientId: string;
  medecinId: string;
  dateOrdonnance: Date;
  instructions: string | null;
  lignes: {
    id: string;
    medicamentId: string;
    posologie: string;
    dureeJours: number;
    quantite: number;
  }[];
}
