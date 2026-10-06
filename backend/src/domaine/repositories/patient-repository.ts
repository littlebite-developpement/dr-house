import type { Patient } from '../entites/patient.js';
import type { Utilisateur } from '../entites/utilisateur.js';
import type { PaginationParams, PaginatedResult } from './types.js';

export interface IPatientRepository {
  findById(id: string): Promise<Patient | string>;
  findAll(params?: PaginationParams): Promise<PaginatedResult<Patient> | string>;
  create(patient: Omit<Patient, 'id' | 'utilisateur'> & { utilisateur: Omit<Utilisateur, 'id' | 'createdAt' | 'updatedAt'> }): Promise<Patient | string>;
  update(id: string, data: Partial<Omit<Patient, 'id' | 'utilisateur'>>): Promise<Patient | string>;
  delete(id: string): Promise<void | string>;
}
