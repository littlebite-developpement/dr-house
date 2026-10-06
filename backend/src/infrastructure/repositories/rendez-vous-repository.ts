import { eq, and, gte, asc } from 'drizzle-orm';
import { db } from '../database/index.js';
import { rendezVous } from '../database/schema/index.js';
import type { RendezVous } from '../../domaine/entites/rendez-vous.js';
import type { IRendezVousRepository } from '../../domaine/repositories/rendez-vous-repository.js';
import type { PaginationParams, PaginatedResult } from '../../domaine/repositories/types.js';
import { StatutRendezVous } from '../../domaine/entites/enums.js';
import { count } from 'drizzle-orm';

function toDomain(row: typeof rendezVous.$inferSelect): RendezVous {
  return {
    ...row,
    dateRdv: new Date(row.dateRdv),
    statut: row.statut as StatutRendezVous,
    createdAt: row.createdAt ?? new Date(),
    updatedAt: row.updatedAt ?? new Date(),
  };
}

export class RendezVousRepository implements IRendezVousRepository {
  async findById(id: string): Promise<RendezVous | string> {
    const result = await db.select().from(rendezVous).where(eq(rendezVous.id, id)).limit(1);
    return result[0] ? toDomain(result[0]) : "rdv no trouve";
  }

  async findByPatient(patientId: string, params?: PaginationParams): Promise<PaginatedResult<RendezVous> | string> {
    const page = params?.page ?? 1;
    const limit = params?.limit ?? 10;
    const offset = (page - 1) * limit;

    try {
      const [data, countResult] = await Promise.all([
        db.select().from(rendezVous).where(eq(rendezVous.patientId, patientId)).limit(limit).offset(offset),
        db.select({ count: count() }).from(rendezVous).where(eq(rendezVous.patientId, patientId)),
      ]);
    const total = countResult[0]?.count ?? 0;

    return {
      data: data.map((d) => toDomain(d)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
    } catch (e) {
      return 'erreur de recuperation des rdv'
    }
  }

  async findByMedecin(medecinId: string, params?: PaginationParams): Promise<PaginatedResult<RendezVous> | string> {
    try {
      const page = params?.page ?? 1;
      const limit = params?.limit ?? 10;
      const offset = (page - 1) * limit;

      const [data, countResult] = await Promise.all([
        db.select().from(rendezVous).where(eq(rendezVous.medecinId, medecinId)).limit(limit).offset(offset),
        db.select({ count: count() }).from(rendezVous).where(eq(rendezVous.medecinId, medecinId)),
      ]);

      const total = countResult[0]?.count ?? 0;

      return {
        data: data.map(toDomain),
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    } catch (e) {
      return 'erreur de recuperation des rdv'
    }
  }

  async findByDate(date: Date, params?: PaginationParams): Promise<PaginatedResult<RendezVous> | string> {
    try {
      const page = params?.page ?? 1;
      const limit = params?.limit ?? 10;
      const offset = (page - 1) * limit;
      const dateStr = date.toISOString().split('T')[0];

      const [data, countResult] = await Promise.all([
        db.select().from(rendezVous).where(eq(rendezVous.dateRdv, dateStr)).limit(limit).offset(offset),
        db.select({ count: count() }).from(rendezVous).where(eq(rendezVous.dateRdv, dateStr)),
      ]);

      const total = countResult[0]?.count ?? 0;

      return {
        data: data.map(toDomain),
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    } catch (e) {
      return 'erreur de recuperation des rdv'
    }
  }

  async findUpcoming(patientId: string): Promise<RendezVous[] | string> {
    const today = new Date().toISOString().split('T')[0];
    const result = await db.select().from(rendezVous)
      .where(and(eq(rendezVous.patientId, patientId), gte(rendezVous.dateRdv, today)))
      .orderBy(asc(rendezVous.dateRdv));
    return result.map(toDomain) || "erreur";
  }

  async create(rdv: Omit<RendezVous, 'id' | 'createdAt' | 'updatedAt'>): Promise<RendezVous | string> {
    const result = await db.insert(rendezVous).values({
      ...rdv,
      dateRdv: rdv.dateRdv.toISOString().split('T')[0],
    }).returning();
    return toDomain(result[0]);
  }

  async update(id: string, data: Partial<Omit<RendezVous, 'id' | 'createdAt'>>): Promise<RendezVous | string> {
    const result = await db.update(rendezVous).set({
      ...data,
      dateRdv: data.dateRdv?.toISOString().split('T')[0],
      updatedAt: new Date(),
    }).where(eq(rendezVous.id, id)).returning();
    if (!result[0]) throw new Error('Rendez-vous non trouvé');
    return toDomain(result[0]);
  }

  async delete(id: string): Promise<void> {
    await db.delete(rendezVous).where(eq(rendezVous.id, id));
  }
}
