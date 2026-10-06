export interface Examen {
  id: string;
  consultationId: string | null;
  dossierMedicalId: string | null;
  typeExamen: string;
  description: string | null;
  resultat: string | null;
  dateExamen: Date | null;
}
