import { eq } from 'drizzle-orm';
import { db } from '../database/index.js';
import { pharmacies } from '../database/schema/index.js';
import type { Pharmacie } from '../../domaine/entites/pharmacie.js';
import type { IPharmacieRepository } from '../../domaine/repositories/pharmacie-repository.js';
import type { PaginationParams, PaginatedResult } from '../../domaine/repositories/types.js';

function toDomain(row: typeof pharmacies.$inferSelect): Pharmacie {
  return {
    ...row,
    estDeGarde: row.estDeGarde ?? false,
  };
}

export class PharmacieRepository implements IPharmacieRepository {
  async findById(id: string): Promise<Pharmacie | string> {
    const result = await db.select().from(pharmacies).where(eq(pharmacies.id, id)).limit(1);
    return result[0] ? toDomain(result[0]) : 'Pharmacie non trouvée';
  }

  async findAll(params?: PaginationParams): Promise<PaginatedResult<Pharmacie> | string> {
    const page = params?.page ?? 1;
    const limit = params?.limit ?? 10;
    const offset = (page - 1) * limit;

    const [data, countResult] = await Promise.all([
      db.select().from(pharmacies).limit(limit).offset(offset),
      db.select({ count: count() }).from(pharmacies),
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

  async findDeGarde(): Promise<Pharmacie[] | string> {
    const result = await db.select().from(pharmacies).where(eq(pharmacies.estDeGarde, true));
    return result.map(toDomain);
  }

  async create(pharmacie: Omit<Pharmacie, 'id'>): Promise<Pharmacie | string> {
    const result = await db.insert(pharmacies).values(pharmacie).returning();
    return toDomain(result[0]);
  }

  async update(id: string, data: Partial<Omit<Pharmacie, 'id'>>): Promise<Pharmacie | string> {
    const result = await db.update(pharmacies).set(data).where(eq(pharmacies.id, id)).returning();
    if (!result[0]) return 'Pharmacie non trouvée';
    return toDomain(result[0]);
  }

  async delete(id: string): Promise<void | string> {
    await db.delete(pharmacies).where(eq(pharmacies.id, id));
  }
}

import { count } from 'drizzle-orm';
