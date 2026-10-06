import { eq } from 'drizzle-orm';
import { db } from '../database/index.js';
import { consultations } from '../database/schema/index.js';
import type { Consultation } from '../../domaine/entites/consultation.js';
import type { IConsultationRepository } from '../../domaine/repositories/consultation-repository.js';
import type { PaginationParams, PaginatedResult } from '../../domaine/repositories/types.js';

function toDomain(row: typeof consultations.$inferSelect): Consultation {
  return {
    ...row,
    dateConsultation: row.dateConsultation ?? new Date(),
  };
}

export class ConsultationRepository implements IConsultationRepository {
  async findById(id: string): Promise<Consultation | string> {
    const result = await db.select().from(consultations).where(eq(consultations.id, id)).limit(1);
    return result[0] ? toDomain(result[0]) : 'Consultation non trouvée';
  }

  async findByPatient(patientId: string, params?: PaginationParams): Promise<PaginatedResult<Consultation> | string> {
    const page = params?.page ?? 1;
    const limit = params?.limit ?? 10;
    const offset = (page - 1) * limit;

    const [data, countResult] = await Promise.all([
      db.select().from(consultations).where(eq(consultations.patientId, patientId)).limit(limit).offset(offset),
      db.select({ count: count() }).from(consultations).where(eq(consultations.patientId, patientId)),
    ]);

    const total = countResult[0]?.count ?? 0;

    return {
      data: data.map(toDomain),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findByMedecin(medecinId: string, params?: PaginationParams): Promise<PaginatedResult<Consultation> | string> {
    const page = params?.page ?? 1;
    const limit = params?.limit ?? 10;
    const offset = (page - 1) * limit;

    const [data, countResult] = await Promise.all([
      db.select().from(consultations).where(eq(consultations.medecinId, medecinId)).limit(limit).offset(offset),
      db.select({ count: count() }).from(consultations).where(eq(consultations.medecinId, medecinId)),
    ]);

    const total = countResult[0]?.count ?? 0;

    return {
      data: data.map(toDomain),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findByRdv(rdvId: string): Promise<Consultation | string> {
    const result = await db.select().from(consultations).where(eq(consultations.rdvId, rdvId)).limit(1);
    return result[0] ? toDomain(result[0]) : 'Consultation non trouvée';
  }

  async create(consultation: Omit<Consultation, 'id' | 'dateConsultation'>): Promise<Consultation | string> {
    const result = await db.insert(consultations).values(consultation).returning();
    return toDomain(result[0]);
  }

  async update(id: string, data: Partial<Omit<Consultation, 'id' | 'dateConsultation'>>): Promise<Consultation | string> {
    const result = await db.update(consultations).set(data).where(eq(consultations.id, id)).returning();
    if (!result[0]) return 'Consultation non trouvée';
    return toDomain(result[0]);
  }

  async delete(id: string): Promise<void | string> {
    await db.delete(consultations).where(eq(consultations.id, id));
  }
}

import { count } from 'drizzle-orm';
