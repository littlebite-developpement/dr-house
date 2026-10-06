import { eq } from 'drizzle-orm';
import { count } from 'drizzle-orm';
import { db } from '../database/index.js';
import { ordonnances, lignesOrdonnance } from '../database/schema/index.js';
import type { Ordonnance, LigneOrdonnance } from '../../domaine/entites/ordonnance.js';
import type { IOrdonnanceRepository } from '../../domaine/repositories/ordonnance-repository.js';
import type { PaginationParams, PaginatedResult } from '../../domaine/repositories/types.js';

function toDomain(ordonnance: typeof ordonnances.$inferSelect & { lignes: (typeof lignesOrdonnance.$inferSelect)[] }): Ordonnance {
  return {
    ...ordonnance,
    dateOrdonnance: ordonnance.dateOrdonnance ?? new Date(),
    lignes: ordonnance.lignes,
  };
}

export class OrdonnanceRepository implements IOrdonnanceRepository {
  async findById(id: string): Promise<Ordonnance | string> {
    const [ordonnance, lignes] = await Promise.all([
      db.select().from(ordonnances).where(eq(ordonnances.id, id)).limit(1),
      db.select().from(lignesOrdonnance).where(eq(lignesOrdonnance.ordonnanceId, id)),
    ]);

    if (!ordonnance[0]) return 'Ordonnance non trouvée';
    return toDomain({ ...ordonnance[0], lignes });
  }

  async findByPatient(patientId: string, params?: PaginationParams): Promise<PaginatedResult<Ordonnance> | string> {
    const page = params?.page ?? 1;
    const limit = params?.limit ?? 10;
    const offset = (page - 1) * limit;

    const [data, countResult] = await Promise.all([
      db.select().from(ordonnances).where(eq(ordonnances.patientId, patientId)).limit(limit).offset(offset),
      db.select({ count: count() }).from(ordonnances).where(eq(ordonnances.patientId, patientId)),
    ]);

    const total = countResult[0]?.count ?? 0;
    const ordonnancesWithLignes = await Promise.all(
      data.map(async (o) => {
        const lignes = await db.select().from(lignesOrdonnance).where(eq(lignesOrdonnance.ordonnanceId, o.id));
        return { ...o, lignes };
      }),
    );

    return {
      data: ordonnancesWithLignes.map(toDomain),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findByMedecin(medecinId: string, params?: PaginationParams): Promise<PaginatedResult<Ordonnance> | string> {
    const page = params?.page ?? 1;
    const limit = params?.limit ?? 10;
    const offset = (page - 1) * limit;

    const [data, countResult] = await Promise.all([
      db.select().from(ordonnances).where(eq(ordonnances.medecinId, medecinId)).limit(limit).offset(offset),
      db.select({ count: count() }).from(ordonnances).where(eq(ordonnances.medecinId, medecinId)),
    ]);

    const total = countResult[0]?.count ?? 0;
    const ordonnancesWithLignes = await Promise.all(
      data.map(async (o) => {
        const lignes = await db.select().from(lignesOrdonnance).where(eq(lignesOrdonnance.ordonnanceId, o.id));
        return { ...o, lignes };
      }),
    );

    return {
      data: ordonnancesWithLignes.map(toDomain),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findByConsultation(consultationId: string): Promise<Ordonnance | string> {
    const result = await db.select().from(ordonnances).where(eq(ordonnances.consultationId, consultationId)).limit(1);
    if (!result[0]) return 'Ordonnance non trouvée';
    const lignes = await db.select().from(lignesOrdonnance).where(eq(lignesOrdonnance.ordonnanceId, result[0].id));
    return toDomain({ ...result[0], lignes });
  }

  async create(ordonnance: Omit<Ordonnance, 'id' | 'dateOrdonnance' | 'lignes'> & { lignes: Array<Omit<LigneOrdonnance, 'id' | 'ordonnanceId'>> }): Promise<Ordonnance | string> {
    const result = await db.transaction(async (tx) => {
      const [ordonnanceResult] = await tx.insert(ordonnances).values({
        consultationId: ordonnance.consultationId,
        patientId: ordonnance.patientId,
        medecinId: ordonnance.medecinId,
        instructions: ordonnance.instructions,
      }).returning();

      const lignes = await tx.insert(lignesOrdonnance).values(
        ordonnance.lignes.map(l => ({
          ordonnanceId: ordonnanceResult.id,
          medicamentId: l.medicamentId,
          posologie: l.posologie,
          dureeJours: l.dureeJours,
          quantite: l.quantite,
        })),
      ).returning();

      return { ...ordonnanceResult, lignes };
    });
    return toDomain(result);
  }

  async update(id: string, data: Partial<Omit<Ordonnance, 'id' | 'dateOrdonnance'>>): Promise<Ordonnance | string> {
    const result = await db.update(ordonnances).set(data).where(eq(ordonnances.id, id)).returning();
    if (!result[0]) return 'Ordonnance non trouvée';
    return this.findById(id);
  }

  async delete(id: string): Promise<void | string> {
    await db.delete(ordonnances).where(eq(ordonnances.id, id));
  }
}
