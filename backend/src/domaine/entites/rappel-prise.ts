export interface RappelPrise {
  id: string;
  patientId: string;
  ligneOrdonnanceId: string | null;
  heurePrise: string;
  dateRappel: Date;
  pris: boolean;
}
