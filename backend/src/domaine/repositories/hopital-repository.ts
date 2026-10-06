import type { Hopital } from '../entites/hopital.js';
import type { PaginationParams, PaginatedResult } from './types.js';

export interface IHopitalRepository {
  findById(id: string): Promise<Hopital | string>;
  findAll(params?: PaginationParams): Promise<PaginatedResult<Hopital> | string>;
  create(hopital: Omit<Hopital, 'id' | 'createdAt'>): Promise<Hopital | string>;
  update(id: string, data: Partial<Omit<Hopital, 'id' | 'createdAt'>>): Promise<Hopital | string>;
  delete(id: string): Promise<void | string>;
}
