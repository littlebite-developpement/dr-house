export interface DossierMedical {
  id: string;
  patientId: string;
  antecedents: string | null;
  allergies: string | null;
  dateCreation: Date;
  updatedAt: Date;
}
