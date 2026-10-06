import type { Pharmacie } from '../entites/pharmacie.js';
import type { PaginationParams, PaginatedResult } from './types.js';

export interface IPharmacieRepository {
  findById(id: string): Promise<Pharmacie | string>;
  findAll(params?: PaginationParams): Promise<PaginatedResult<Pharmacie> | string>;
  findDeGarde(): Promise<Pharmacie[] | string>;
  create(pharmacie: Omit<Pharmacie, 'id'>): Promise<Pharmacie | string>;
  update(id: string, data: Partial<Omit<Pharmacie, 'id'>>): Promise<Pharmacie | string>;
  delete(id: string): Promise<void | string>;
}
