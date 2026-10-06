export interface CreatePharmacieRequest {
  nom: string;
  adresse: string;
  telephone?: string;
  estDeGarde?: boolean;
}

export interface UpdatePharmacieRequest {
  nom?: string;
  adresse?: string;
  telephone?: string;
  estDeGarde?: boolean;
}

export interface PharmacieResponse {
  id: string;
  nom: string;
  adresse: string;
  telephone: string | null;
  estDeGarde: boolean;
}
