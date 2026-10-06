export interface CreateDossierMedicalRequest {
  patientId: string;
  antecedents?: string;
  allergies?: string;
}

export interface UpdateDossierMedicalRequest {
  antecedents?: string;
  allergies?: string;
}

export interface DossierMedicalResponse {
  id: string;
  patientId: string;
  antecedents: string | null;
  allergies: string | null;
  dateCreation: Date;
  updatedAt: Date;
}
