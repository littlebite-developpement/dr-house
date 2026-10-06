import type { Examen } from '../entites/examen.js';
import type { PaginationParams, PaginatedResult } from './types.js';

export interface IExamenRepository {
  findById(id: string): Promise<Examen | string>;
  findByPatient(patientId: string, params?: PaginationParams): Promise<PaginatedResult<Examen> | string>;
  findByConsultation(consultationId: string, params?: PaginationParams): Promise<PaginatedResult<Examen> | string>;
  findByDossierMedical(dossierMedicalId: string, params?: PaginationParams): Promise<PaginatedResult<Examen> | string>;
  create(examen: Omit<Examen, 'id'>): Promise<Examen | string>;
  update(id: string, data: Partial<Omit<Examen, 'id'>>): Promise<Examen | string>;
  delete(id: string): Promise<void | string>;
}
