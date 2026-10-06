import type { StatutRendezVous } from './enums.js';

export interface RendezVous {
  id: string;
  patientId: string;
  medecinId: string;
  dateRdv: Date;
  heureRdv: string;
  statut: StatutRendezVous;
  motif?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
