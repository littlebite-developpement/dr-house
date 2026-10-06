export interface Consultation {
  id: string;
  rdvId: string | null;
  patientId: string;
  medecinId: string;
  dateConsultation: Date;
  motif: string;
  diagnostic: string;
  observations: string | null;
}
