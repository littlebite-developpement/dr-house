export interface CreateMedicamentRequest {
  nom: string;
  forme?: string;
  dosage?: string;
}

export interface UpdateMedicamentRequest {
  nom?: string;
  forme?: string;
  dosage?: string;
}

export interface MedicamentResponse {
  id: string;
  nom: string;
  forme: string | null;
  dosage: string | null;
}
