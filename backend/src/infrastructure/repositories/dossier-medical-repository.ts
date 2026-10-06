import { eq } from 'drizzle-orm';
import { db } from '../database/index.js';
import { dossiersMedicaux } from '../database/schema/index.js';
import type { DossierMedical } from '../../domaine/entites/dossier-medical.js';
import type { IDossierMedicalRepository } from '../../domaine/repositories/dossier-medical-repository.js';

function toDomain(row: typeof dossiersMedicaux.$inferSelect): DossierMedical {
  return {
    ...row,
    dateCreation: row.dateCreation ?? new Date(),
    updatedAt: row.updatedAt ?? new Date(),
  };
}

export class DossierMedicalRepository implements IDossierMedicalRepository {
  async findById(id: string): Promise<DossierMedical | string> {
    const result = await db.select().from(dossiersMedicaux).where(eq(dossiersMedicaux.id, id)).limit(1);
    return result[0] ? toDomain(result[0]) : 'Dossier médical non trouvé';
  }

  async findByPatientId(patientId: string): Promise<DossierMedical | string> {
    const result = await db.select().from(dossiersMedicaux).where(eq(dossiersMedicaux.patientId, patientId)).limit(1);
    return result[0] ? toDomain(result[0]) : 'Dossier médical non trouvé';
  }

  async create(dossier: Omit<DossierMedical, 'id' | 'dateCreation' | 'updatedAt'>): Promise<DossierMedical | string> {
    const result = await db.insert(dossiersMedicaux).values(dossier).returning();
    return toDomain(result[0]);
  }

  async update(id: string, data: Partial<Omit<DossierMedical, 'id' | 'patientId' | 'dateCreation'>>): Promise<DossierMedical | string> {
    const result = await db.update(dossiersMedicaux).set({ ...data, updatedAt: new Date() }).where(eq(dossiersMedicaux.id, id)).returning();
    if (!result[0]) return 'Dossier médical non trouvé';
    return toDomain(result[0]);
  }

  async delete(id: string): Promise<void | string> {
    await db.delete(dossiersMedicaux).where(eq(dossiersMedicaux.id, id));
  }
}
