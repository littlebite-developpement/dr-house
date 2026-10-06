import { eq } from 'drizzle-orm';
import { db } from '../database/index.js';
import { paiements, rendezVous, consultations } from '../database/schema/index.js';
import type { Paiement } from '../../domaine/entites/paiement.js';
import type { IPaiementRepository } from '../../domaine/repositories/paiement-repository.js';
import type { PaginationParams, PaginatedResult } from '../../domaine/repositories/types.js';
import { ModePaiement, StatutPaiement } from '../../domaine/entites/enums.js';

function toDomain(row: typeof paiements.$inferSelect): Paiement {
  return {
    ...row,
    montant: parseFloat(row.montant),
    modePaiement: row.modePaiement as ModePaiement,
    statut: row.statut as StatutPaiement,
    datePaiement: row.datePaiement ?? new Date(),
  };
}

export class PaiementRepository implements IPaiementRepository {
  async findById(id: string): Promise<Paiement | string> {
    const result = await db.select().from(paiements).where(eq(paiements.id, id)).limit(1);
    return result[0] ? toDomain(result[0]) : 'Paiement non trouvé';
  }

  async findByTransactionRef(ref: string): Promise<Paiement | string> {
    const result = await db.select().from(paiements).where(eq(paiements.transactionRef, ref)).limit(1);
    return result[0] ? toDomain(result[0]) : 'Paiement non trouvé';
  }

  async findByPatient(patientId: string, params?: PaginationParams): Promise<PaginatedResult<Paiement> | string> {
    const page = params?.page ?? 1;
    const limit = params?.limit ?? 10;
    const offset = (page - 1) * limit;

    const [data, countResult] = await Promise.all([
      db.select({
        paiement: paiements,
        rdv: rendezVous,
        consultation: consultations,
      })
        .from(paiements)
        .leftJoin(rendezVous, eq(paiements.rdvId, rendezVous.id))
        .leftJoin(consultations, eq(paiements.consultationId, consultations.id))
        .where(eq(consultations.patientId, patientId))
        .limit(limit)
        .offset(offset),
      db.select({ count: count() })
        .from(paiements)
        .leftJoin(consultations, eq(paiements.consultationId, consultations.id))
        .where(eq(consultations.patientId, patientId)),
    ]);

    const total = countResult[0]?.count ?? 0;

    return {
      data: data.map(d => toDomain(d.paiement)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findByRdv(rdvId: string): Promise<Paiement | string> {
    const result = await db.select().from(paiements).where(eq(paiements.rdvId, rdvId)).limit(1);
    return result[0] ? toDomain(result[0]) : 'Paiement non trouvé';
  }

  async findByConsultation(consultationId: string): Promise<Paiement | string> {
    const result = await db.select().from(paiements).where(eq(paiements.consultationId, consultationId)).limit(1);
    return result[0] ? toDomain(result[0]) : 'Paiement non trouvé';
  }

  async create(paiement: Omit<Paiement, 'id' | 'datePaiement'>): Promise<Paiement | string> {
    const result = await db.insert(paiements).values({
      ...paiement,
      montant: paiement.montant.toString(),
    }).returning();
    return toDomain(result[0]);
  }

  async update(id: string, data: Partial<Omit<Paiement, 'id' | 'datePaiement'>>): Promise<Paiement | string> {
    const updateData: Record<string, unknown> = { ...data };
    if (data.montant !== undefined) {
      updateData.montant = data.montant.toString();
    }
    const result = await db.update(paiements).set(updateData).where(eq(paiements.id, id)).returning();
    if (!result[0]) return 'Paiement non trouvé';
    return toDomain(result[0]);
  }

  async delete(id: string): Promise<void | string> {
    await db.delete(paiements).where(eq(paiements.id, id));
  }
}

import { count } from 'drizzle-orm'
