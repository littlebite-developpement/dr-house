import type { DossierMedical } from '../entites/dossier-medical.js';

export interface IDossierMedicalRepository {
  findById(id: string): Promise<DossierMedical | string>;
  findByPatientId(patientId: string): Promise<DossierMedical | string>;
  create(dossier: Omit<DossierMedical, 'id' | 'dateCreation' | 'updatedAt'>): Promise<DossierMedical | string>;
  update(id: string, data: Partial<Omit<DossierMedical, 'id' | 'patientId' | 'dateCreation'>>): Promise<DossierMedical | string>;
  delete(id: string): Promise<void | string>;
}
