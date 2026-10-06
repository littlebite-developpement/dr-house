import { eq } from 'drizzle-orm';
import { db } from '../database/index.js';
import { medicaments } from '../database/schema/index.js';
import type { Medicament } from '../../domaine/entites/medicament.js';
import type { IMedicamentRepository } from '../../domaine/repositories/medicament-repository.js';
import type { PaginationParams, PaginatedResult } from '../../domaine/repositories/types.js';

export class MedicamentRepository implements IMedicamentRepository {
  async findById(id: string): Promise<Medicament | string> {
    const result = await db.select().from(medicaments).where(eq(medicaments.id, id)).limit(1);
    return result[0] ?? 'Médicament non trouvé';
  }

  async findByNom(nom: string): Promise<Medicament | string> {
    const result = await db.select().from(medicaments).where(eq(medicaments.nom, nom)).limit(1);
    return result[0] ?? 'Médicament non trouvé';
  }

  async findAll(params?: PaginationParams): Promise<PaginatedResult<Medicament> | string> {
    const page = params?.page ?? 1;
    const limit = params?.limit ?? 10;
    const offset = (page - 1) * limit;

    const [data, countResult] = await Promise.all([
      db.select().from(medicaments).limit(limit).offset(offset),
      db.select({ count: count() }).from(medicaments),
    ]);

    const total = countResult[0]?.count ?? 0;

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async create(medicament: Omit<Medicament, 'id'>): Promise<Medicament | string> {
    const result = await db.insert(medicaments).values(medicament).returning();
    return result[0];
  }

  async update(id: string, data: Partial<Omit<Medicament, 'id'>>): Promise<Medicament | string> {
    const result = await db.update(medicaments).set(data).where(eq(medicaments.id, id)).returning();
    if (!result[0]) return 'Médicament non trouvé';
    return result[0];
  }

  async delete(id: string): Promise<void | string> {
    await db.delete(medicaments).where(eq(medicaments.id, id));
  }
}

import { count } from 'drizzle-orm';
