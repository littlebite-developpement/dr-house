import { eq } from 'drizzle-orm';
import { db } from '../database/index.js';
import { medecins, utilisateurs } from '../database/schema/index.js';
import type { Medecin } from '../../domaine/entites/medecin.js';
import type { IMedecinRepository } from '../../domaine/repositories/medecin-repository.js';
import type { PaginationParams, PaginatedResult } from '../../domaine/repositories/types.js';
import { Role } from '../../domaine/entites/enums.js';

function toDomain(medecin: typeof medecins.$inferSelect & { utilisateur: typeof utilisateurs.$inferSelect }): Medecin {
  return {
    id: medecin.id,
    specialite: medecin.specialite,
    numOrdre: medecin.numOrdre,
    hopitalId: medecin.hopitalId,
    utilisateur: {
      ...medecin.utilisateur,
      role: medecin.utilisateur.role as Role,
      createdAt: medecin.utilisateur.createdAt ?? new Date(),
      updatedAt: medecin.utilisateur.updatedAt ?? new Date(),
    },
  };
}

export class MedecinRepository implements IMedecinRepository {
  async findById(id: string): Promise<Medecin | string> {
    const result = await db.select({
      medecin: medecins,
      utilisateur: utilisateurs,
    })
      .from(medecins)
      .innerJoin(utilisateurs, eq(medecins.id, utilisateurs.id))
      .where(eq(medecins.id, id))
      .limit(1);

    if (!result[0]) return 'Médecin non trouvé';
    return toDomain({ ...result[0].medecin, utilisateur: result[0].utilisateur });
  }

  async findByNumOrdre(numOrdre: string): Promise<Medecin | string> {
    const result = await db.select({
      medecin: medecins,
      utilisateur: utilisateurs,
    })
      .from(medecins)
      .innerJoin(utilisateurs, eq(medecins.id, utilisateurs.id))
      .where(eq(medecins.numOrdre, numOrdre))
      .limit(1);

    if (!result[0]) return 'Médecin non trouvé';
    return toDomain({ ...result[0].medecin, utilisateur: result[0].utilisateur });
  }

  async findByHopital(hopitalId: string, params?: PaginationParams): Promise<PaginatedResult<Medecin> | string> {
    const page = params?.page ?? 1;
    const limit = params?.limit ?? 10;
    const offset = (page - 1) * limit;

    const [data, countResult] = await Promise.all([
      db.select({
        medecin: medecins,
        utilisateur: utilisateurs,
      })
        .from(medecins)
        .innerJoin(utilisateurs, eq(medecins.id, utilisateurs.id))
        .where(eq(medecins.hopitalId, hopitalId))
        .limit(limit)
        .offset(offset),
      db.select({ count: count() }).from(medecins).where(eq(medecins.hopitalId, hopitalId)),
    ]);

    const total = countResult[0]?.count ?? 0;

    return {
      data: data.map(d => toDomain({ ...d.medecin, utilisateur: d.utilisateur })),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findAll(params?: PaginationParams): Promise<PaginatedResult<Medecin> | string> {
    const page = params?.page ?? 1;
    const limit = params?.limit ?? 10;
    const offset = (page - 1) * limit;

    const [data, countResult] = await Promise.all([
      db.select({
        medecin: medecins,
        utilisateur: utilisateurs,
      })
        .from(medecins)
        .innerJoin(utilisateurs, eq(medecins.id, utilisateurs.id))
        .limit(limit)
        .offset(offset),
      db.select({ count: count() }).from(medecins),
    ]);

    const total = countResult[0]?.count ?? 0;

    return {
      data: data.map(d => toDomain({ ...d.medecin, utilisateur: d.utilisateur })),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async create(medecin: Omit<Medecin, 'id' | 'utilisateur'> & { utilisateur: Omit<import('../../domaine/entites/utilisateur.js').Utilisateur, 'id' | 'createdAt' | 'updatedAt'> }): Promise<Medecin | string> {
    const result = await db.transaction(async (tx) => {
      const [utilisateur] = await tx.insert(utilisateurs).values(medecin.utilisateur).returning();
      const [medecinResult] = await tx.insert(medecins).values({
        id: utilisateur.id,
        specialite: medecin.specialite,
        numOrdre: medecin.numOrdre,
        hopitalId: medecin.hopitalId,
      }).returning();
      return { ...medecinResult, utilisateur };
    });
    return toDomain(result);
  }

  async update(id: string, data: Partial<Omit<Medecin, 'id' | 'utilisateur'>>): Promise<Medecin | string> {
    const result = await db.update(medecins).set(data).where(eq(medecins.id, id)).returning();
    if (!result[0]) return 'Médecin non trouvé';
    return this.findById(id);
  }

  async delete(id: string): Promise<void | string> {
    await db.delete(medecins).where(eq(medecins.id, id));
  }
}

import { count } from 'drizzle-orm';
