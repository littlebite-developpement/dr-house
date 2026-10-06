export interface CreateExamenRequest {
  consultationId?: string;
  dossierMedicalId?: string;
  typeExamen: string;
  description?: string;
  resultat?: string;
  dateExamen?: Date;
}

export interface UpdateExamenRequest {
  typeExamen?: string;
  description?: string;
  resultat?: string;
  dateExamen?: Date;
}

export interface ExamenResponse {
  id: string;
  consultationId: string | null;
  dossierMedicalId: string | null;
  typeExamen: string;
  description: string | null;
  resultat: string | null;
  dateExamen: Date | null;
}
