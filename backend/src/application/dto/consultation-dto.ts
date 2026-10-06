export interface CreateConsultationRequest {
  rdvId?: string;
  patientId: string;
  medecinId: string;
  motif: string;
  diagnostic: string;
  observations?: string;
}

export interface UpdateConsultationRequest {
  motif?: string;
  diagnostic?: string;
  observations?: string;
}

export interface ConsultationResponse {
  id: string;
  rdvId: string | null;
  patientId: string;
  medecinId: string;
  dateConsultation: Date;
  motif: string;
  diagnostic: string;
  observations: string | null;
}
