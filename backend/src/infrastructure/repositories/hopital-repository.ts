import { eq } from 'drizzle-orm';
import { db } from '../database/index.js';
import { hopitaux } from '../database/schema/index.js';
import type { Hopital } from '../../domaine/entites/hopital.js';
import type { IHopitalRepository } from '../../domaine/repositories/hopital-repository.js';
import type { PaginationParams, PaginatedResult } from '../../domaine/repositories/types.js';

function toDomain(row: typeof hopitaux.$inferSelect): Hopital {
  return {
    ...row,
    createdAt: row.createdAt ?? new Date(),
  };
}

export class HopitalRepository implements IHopitalRepository {
  async findById(id: string): Promise<Hopital | string> {
    const result = await db.select().from(hopitaux).where(eq(hopitaux.id, id)).limit(1);
    return result[0] ? toDomain(result[0]) : 'Hôpital non trouvé';
  }

  async findAll(params?: PaginationParams): Promise<PaginatedResult<Hopital> | string> {
    const page = params?.page ?? 1;
    const limit = params?.limit ?? 10;
    const offset = (page - 1) * limit;

    const [data, countResult] = await Promise.all([
      db.select().from(hopitaux).limit(limit).offset(offset),
      db.select({ count: count() }).from(hopitaux),
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

  async create(hopital: Omit<Hopital, 'id' | 'createdAt'>): Promise<Hopital | string> {
    const result = await db.insert(hopitaux).values(hopital).returning();
    return toDomain(result[0]);
  }

  async update(id: string, data: Partial<Omit<Hopital, 'id' | 'createdAt'>>): Promise<Hopital | string> {
    const result = await db.update(hopitaux).set(data).where(eq(hopitaux.id, id)).returning();
    if (!result[0]) return 'Hôpital non trouvé';
    return toDomain(result[0]);
  }

  async delete(id: string): Promise<void | string> {
    await db.delete(hopitaux).where(eq(hopitaux.id, id));
  }
}

import { count } from 'drizzle-orm';
