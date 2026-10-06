import type { Utilisateur } from '../entites/utilisateur.js';
import type { PaginationParams, PaginatedResult } from './types.js';

export interface IUtilisateurRepository {
  findById(id: string): Promise<Utilisateur | string>;
  findByEmail(email: string): Promise<Utilisateur | string>;
  findByTelephone(telephone: string): Promise<Utilisateur | null>;
  findAll(params?: PaginationParams): Promise<PaginatedResult<Utilisateur> | string>;
  create(utilisateur: Omit<Utilisateur, 'id' | 'createdAt' | 'updatedAt'>): Promise<Utilisateur | string>;
  update(id: string, data: Partial<Utilisateur>): Promise<Utilisateur | string>;
  delete(id: string): Promise<void | string>;
}
