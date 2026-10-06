import type { Consultation } from '../entites/consultation.js';
import type { PaginationParams, PaginatedResult } from './types.js';

export interface IConsultationRepository {
  findById(id: string): Promise<Consultation | string>;
  findByPatient(patientId: string, params?: PaginationParams): Promise<PaginatedResult<Consultation> | string>;
  findByMedecin(medecinId: string, params?: PaginationParams): Promise<PaginatedResult<Consultation> | string>;
  findByRdv(rdvId: string): Promise<Consultation | string>;
  create(consultation: Omit<Consultation, 'id' | 'dateConsultation'>): Promise<Consultation | string>;
  update(id: string, data: Partial<Omit<Consultation, 'id' | 'dateConsultation'>>): Promise<Consultation | string>;
  delete(id: string): Promise<void | string>;
}
