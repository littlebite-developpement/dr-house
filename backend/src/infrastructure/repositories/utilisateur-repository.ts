import { eq } from 'drizzle-orm';
import { db } from '../database/index.js';
import { utilisateurs } from '../database/schema/index.js';
import type { Utilisateur } from '../../domaine/entites/utilisateur.js';
import type { IUtilisateurRepository } from '../../domaine/repositories/utilisateur-repository.js';
import type { PaginationParams, PaginatedResult } from '../../domaine/repositories/types.js';
import { Role } from '../../domaine/entites/enums.js';

function toDomain(row: typeof utilisateurs.$inferSelect): Utilisateur {
  return {
    ...row,
    role: row.role as Role,
    createdAt: row.createdAt ?? new Date(),
    updatedAt: row.updatedAt ?? new Date(),
  };
}

export class UtilisateurRepository implements IUtilisateurRepository {
  async findById(id: string): Promise<Utilisateur | string> {
    const result = await db.select().from(utilisateurs).where(eq(utilisateurs.id, id)).limit(1);
    switch (result[0]) {
      case undefined:
        return 'Utilisateur non trouvé';
      default:
        return toDomain(result[0]);
    }
  }

  async findByEmail(email: string): Promise<Utilisateur | string> {
    const result = await db.select().from(utilisateurs).where(eq(utilisateurs.email, email)).limit(1);
    switch (result[0]) {
      case undefined:
        return 'Utilisateur non trouvé';
      default:
        return toDomain(result[0]);
    }
  }

  async findByTelephone(telephone: string): Promise<Utilisateur | null> {
    const result = await db.select().from(utilisateurs).where(eq(utilisateurs.telephone, telephone)).limit(1);
    switch (result[0]) {
      case undefined:
        return null;
      default:
        return toDomain(result[0]);
    }
  }

  async findAll(params?: PaginationParams): Promise<PaginatedResult<Utilisateur> | string> {
    const page = params?.page ?? 1;
    const limit = params?.limit ?? 10;
    const offset = (page - 1) * limit;

    const [data, countResult] = await Promise.all([
      db.select().from(utilisateurs).limit(limit).offset(offset),
      db.select({ count: count() }).from(utilisateurs),
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

  async create(utilisateur: Omit<Utilisateur, 'id' | 'createdAt' | 'updatedAt'>): Promise<Utilisateur | string> {
    const result = await db.insert(utilisateurs).values(utilisateur).returning();
    return toDomain(result[0]);
  }

  async update(id: string, data: Partial<Utilisateur>): Promise<Utilisateur | string> {
    const result = await db.update(utilisateurs).set({ ...data, updatedAt: new Date() }).where(eq(utilisateurs.id, id)).returning();
    if (!result[0]) return 'Utilisateur non trouvé';
    return toDomain(result[0]);
  }

  async delete(id: string): Promise<void | string> {
    await db.delete(utilisateurs).where(eq(utilisateurs.id, id));
  }
}

import { count } from 'drizzle-orm';
