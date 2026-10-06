import type { Medecin } from '../entites/medecin.js';
import type { Utilisateur } from '../entites/utilisateur.js';
import type { PaginationParams, PaginatedResult } from './types.js';

export interface IMedecinRepository {
  findById(id: string): Promise<Medecin | string>;
  findByNumOrdre(numOrdre: string): Promise<Medecin | string>;
  findByHopital(hopitalId: string, params?: PaginationParams): Promise<PaginatedResult<Medecin> | string>;
  findAll(params?: PaginationParams): Promise<PaginatedResult<Medecin> | string>;
  create(medecin: Omit<Medecin, 'id' | 'utilisateur'> & { utilisateur: Omit<Utilisateur, 'id' | 'createdAt' | 'updatedAt'> }): Promise<Medecin | string>;
  update(id: string, data: Partial<Omit<Medecin, 'id' | 'utilisateur'>>): Promise<Medecin | string>;
  delete(id: string): Promise<void | string>;
}
