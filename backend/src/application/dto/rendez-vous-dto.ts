import type { StatutRendezVous } from '../../domaine/entites/enums.js';

export interface CreateRendezVousRequest {
  patientId: string;
  medecinId: string;
  dateRdv: Date;
  heureRdv: string;
  motif?: string;
}

export interface UpdateRendezVousRequest {
  dateRdv?: Date;
  heureRdv?: string;
  motif?: string;
  statut?: StatutRendezVous;
}

export interface RendezVousResponse {
  id: string;
  patientId: string;
  medecinId: string;
  dateRdv: Date;
  heureRdv: string;
  statut: StatutRendezVous;
  motif: string | null;
  createdAt: Date;
}
