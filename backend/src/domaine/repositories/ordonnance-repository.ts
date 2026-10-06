import type { Ordonnance, LigneOrdonnance } from '../entites/ordonnance.js';
import type { PaginationParams, PaginatedResult } from './types.js';

export interface IOrdonnanceRepository {
  findById(id: string): Promise<Ordonnance | string>;
  findByPatient(patientId: string, params?: PaginationParams): Promise<PaginatedResult<Ordonnance> | string>;
  findByMedecin(medecinId: string, params?: PaginationParams): Promise<PaginatedResult<Ordonnance> | string>;
  findByConsultation(consultationId: string): Promise<Ordonnance | string>;
  create(ordonnance: Omit<Ordonnance, 'id' | 'dateOrdonnance' | 'lignes'> & { lignes: Array<Omit<LigneOrdonnance, 'id' | 'ordonnanceId'>> }): Promise<Ordonnance | string>;
  update(id: string, data: Partial<Omit<Ordonnance, 'id' | 'dateOrdonnance'>>): Promise<Ordonnance | string>;
  delete(id: string): Promise<void | string>;
}
