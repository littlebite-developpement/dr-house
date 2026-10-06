import type { Medicament } from '../entites/medicament.js';
import type { PaginationParams, PaginatedResult } from './types.js';

export interface IMedicamentRepository {
  findById(id: string): Promise<Medicament | string>;
  findByNom(nom: string): Promise<Medicament | string>;
  findAll(params?: PaginationParams): Promise<PaginatedResult<Medicament> | string>;
  create(medicament: Omit<Medicament, 'id'>): Promise<Medicament | string>;
  update(id: string, data: Partial<Omit<Medicament, 'id'>>): Promise<Medicament | string>;
  delete(id: string): Promise<void | string>;
}
