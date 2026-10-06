export interface CreateMedecinRequest {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  motDePasse: string;
  specialite: string;
  numOrdre: string;
  hopitalId?: string;
}

export interface UpdateMedecinRequest {
  nom?: string;
  prenom?: string;
  telephone?: string;
  specialite?: string;
  hopitalId?: string;
}

export interface MedecinResponse {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  specialite: string;
  numOrdre: string;
  hopitalId: string | null;
}
