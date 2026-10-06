export interface CreateRappelRequest {
  patientId: string;
  ligneOrdonnanceId: string;
  heurePrise: string;
  dateRappel: Date;
}

export interface RappelResponse {
  id: string;
  patientId: string;
  ligneOrdonnanceId: string | null;
  heurePrise: string;
  dateRappel: Date;
  pris: boolean;
}
