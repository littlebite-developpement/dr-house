import type { Paiement } from '../entites/paiement.js';
import type { PaginationParams, PaginatedResult } from './types.js';

export interface IPaiementRepository {
  findById(id: string): Promise<Paiement | string>;
  findByTransactionRef(ref: string): Promise<Paiement | string>;
  findByPatient(patientId: string, params?: PaginationParams): Promise<PaginatedResult<Paiement> | string>;
  findByRdv(rdvId: string): Promise<Paiement | string>;
  findByConsultation(consultationId: string): Promise<Paiement | string>;
  create(paiement: Omit<Paiement, 'id' | 'datePaiement'>): Promise<Paiement | string>;
  update(id: string, data: Partial<Omit<Paiement, 'id' | 'datePaiement'>>): Promise<Paiement | string>;
  delete(id: string): Promise<void | string>;
}
