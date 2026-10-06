import { eq } from 'drizzle-orm';
import { db } from '../database/index.js';
import { examens, consultations, dossiersMedicaux } from '../database/schema/index.js';
import type { Examen } from '../../domaine/entites/examen.js';
import type { IExamenRepository } from '../../domaine/repositories/examen-repository.js';
import type { PaginationParams, PaginatedResult } from '../../domaine/repositories/types.js';

function toDomain(row: typeof examens.$inferSelect): Examen {
  return {
    ...row,
    dateExamen: row.dateExamen ? new Date(row.dateExamen) : null,
  };
}

export class ExamenRepository implements IExamenRepository {
  async findById(id: string): Promise<Examen | string> {
    const result = await db.select().from(examens).where(eq(examens.id, id)).limit(1);
    return result[0] ? toDomain(result[0]) : 'Examen non trouvé';
  }

  async findByPatient(patientId: string, params?: PaginationParams): Promise<PaginatedResult<Examen> | string> {
    const page = params?.page ?? 1;
    const limit = params?.limit ?? 10;
    const offset = (page - 1) * limit;

    const [data, countResult] = await Promise.all([
      db.select({
        examen: examens,
        consultation: consultations,
        dossierMedical: dossiersMedicaux,
      })
        .from(examens)
        .leftJoin(consultations, eq(examens.consultationId, consultations.id))
        .leftJoin(dossiersMedicaux, eq(examens.dossierMedicalId, dossiersMedicaux.id))
        .where(eq(consultations.patientId, patientId))
        .limit(limit)
        .offset(offset),
      db.select({ count: count() })
        .from(examens)
        .leftJoin(consultations, eq(examens.consultationId, consultations.id))
        .where(eq(consultations.patientId, patientId)),
    ]);

    const total = countResult[0]?.count ?? 0;

    return {
      data: data.map(d => toDomain(d.examen)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findByConsultation(consultationId: string, params?: PaginationParams): Promise<PaginatedResult<Examen> | string> {
    const page = params?.page ?? 1;
    const limit = params?.limit ?? 10;
    const offset = (page - 1) * limit;

    const [data, countResult] = await Promise.all([
      db.select().from(examens).where(eq(examens.consultationId, consultationId)).limit(limit).offset(offset),
      db.select({ count: count() }).from(examens).where(eq(examens.consultationId, consultationId)),
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

  async findByDossierMedical(dossierMedicalId: string, params?: PaginationParams): Promise<PaginatedResult<Examen> | string> {
    const page = params?.page ?? 1;
    const limit = params?.limit ?? 10;
    const offset = (page - 1) * limit;

    const [data, countResult] = await Promise.all([
      db.select().from(examens).where(eq(examens.dossierMedicalId, dossierMedicalId)).limit(limit).offset(offset),
      db.select({ count: count() }).from(examens).where(eq(examens.dossierMedicalId, dossierMedicalId)),
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

  async create(examen: Omit<Examen, 'id'>): Promise<Examen | string> {
    const result = await db.insert(examens).values({
      ...examen,
      dateExamen: examen.dateExamen?.toISOString().split('T')[0] ?? null,
    }).returning();
    return toDomain(result[0]);
  }

  async update(id: string, data: Partial<Omit<Examen, 'id'>>): Promise<Examen | string> {
    const result = await db.update(examens).set({
      ...data,
      dateExamen: data.dateExamen?.toISOString().split('T')[0],
    }).where(eq(examens.id, id)).returning();
    if (!result[0]) return 'Examen non trouvé';
    return toDomain(result[0]);
  }

  async delete(id: string): Promise<void | string> {
    await db.delete(examens).where(eq(examens.id, id));
  }
}

import { count } from 'drizzle-orm';
