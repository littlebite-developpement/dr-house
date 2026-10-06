import type { RappelPrise } from '../entites/rappel-prise.js';
import type { PaginationParams, PaginatedResult } from './types.js';

export interface IRappelPriseRepository {
  findById(id: string): Promise<RappelPrise | string>;
  findByPatient(patientId: string, params?: PaginationParams): Promise<PaginatedResult<RappelPrise> | string>;
  findByDate(date: Date, patientId: string): Promise<RappelPrise[] | string>;
  findPending(patientId: string): Promise<RappelPrise[] | string>;
  create(rappel: Omit<RappelPrise, 'id'>): Promise<RappelPrise | string>;
  update(id: string, data: Partial<Omit<RappelPrise, 'id'>>): Promise<RappelPrise | string>;
  markAsPris(id: string): Promise<RappelPrise | string>;
  delete(id: string): Promise<void | string>;
}
