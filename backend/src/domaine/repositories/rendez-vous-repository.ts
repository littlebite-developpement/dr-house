import type { RendezVous } from '../entites/rendez-vous.js';
import type { PaginationParams, PaginatedResult } from './types.js';

export interface IRendezVousRepository {
  findById(id: string): Promise<RendezVous | string>;
  findByPatient(patientId: string, params?: PaginationParams): Promise<PaginatedResult<RendezVous> | string>;
  findByMedecin(medecinId: string, params?: PaginationParams): Promise<PaginatedResult<RendezVous> | string>;
  findByDate(date: Date, params?: PaginationParams): Promise<PaginatedResult<RendezVous> | string>;
  findUpcoming(patientId: string): Promise<RendezVous[] | string>;
  create(rdv: Omit<RendezVous, 'id' | 'createdAt' | 'updatedAt'>): Promise<RendezVous | string>;
  update(id: string, data: Partial<Omit<RendezVous, 'id' | 'createdAt'>>): Promise<RendezVous | string>;
  delete(id: string): Promise<void | string>;
}
