export interface CreateHopitalRequest {
  nom: string;
  adresse: string;
  telephone?: string;
  ville: string;
}

export interface UpdateHopitalRequest {
  nom?: string;
  adresse?: string;
  telephone?: string;
  ville?: string;
}

export interface HopitalResponse {
  id: string;
  nom: string;
  adresse: string;
  telephone: string | null;
  ville: string;
}
