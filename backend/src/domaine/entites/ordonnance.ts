export interface LigneOrdonnance {
  id: string;
  ordonnanceId: string;
  medicamentId: string;
  posologie: string;
  dureeJours: number;
  quantite: number;
}

export interface Ordonnance {
  id: string;
  consultationId: string | null;
  patientId: string;
  medecinId: string;
  dateOrdonnance: Date;
  instructions: string | null;
  lignes: LigneOrdonnance[];
}
