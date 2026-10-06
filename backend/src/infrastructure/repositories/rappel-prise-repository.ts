import { eq, and } from 'drizzle-orm';
import { db } from '../database/index.js';
import { rappelsPrise } from '../database/schema/index.js';
import type { RappelPrise } from '../../domaine/entites/rappel-prise.js';
import type { IRappelPriseRepository } from '../../domaine/repositories/rappel-prise-repository.js';
import type { PaginationParams, PaginatedResult } from '../../domaine/repositories/types.js';

function toDomain(row: typeof rappelsPrise.$inferSelect): RappelPrise {
  return {
    ...row,
    dateRappel: new Date(row.dateRappel),
    pris: row.pris ?? false,
  };
}

export class RappelPriseRepository implements IRappelPriseRepository {
  async findById(id: string): Promise<RappelPrise | string> {
    try {
       const result = await db.select().from(rappelsPrise).where(eq(rappelsPrise.id, id)).limit(1);
       return result[0] ? toDomain(result[0]) : 'Rappel non trouvé';
    } catch (error) {
      return ' Erreur lors de la récupération du rappel';
    }
  }

  async findByPatient(patientId: string, params?: PaginationParams): Promise<PaginatedResult<RappelPrise> | string> {
    try {
      const page = params?.page ?? 1;
     const limit = params?.limit ?? 10;
     const offset = (page - 1) * limit;

     const [data, countResult] = await Promise.all([
      db.select().from(rappelsPrise).where(eq(rappelsPrise.patientId, patientId)).limit(limit).offset(offset),
      db.select({ count: count() }).from(rappelsPrise).where(eq(rappelsPrise.patientId, patientId)),
     ]);

     const total = countResult[0]?.count ?? 0;

     return {
      data: data.map(toDomain),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      }
    
    } catch (error) {
      return 'Erreur lors de la récupération des rappels du patient';
    }
  }

  async findByDate(date: Date, patientId: string): Promise<RappelPrise[] | string> {
    try {
      const dateStr = date.toISOString().split('T')[0];
     const result = await db.select().from(rappelsPrise)
      .where(and(eq(rappelsPrise.dateRappel, dateStr), eq(rappelsPrise.patientId, patientId)));
     return result.map(toDomain);
    } catch (error){
      return 'Erreur lors de la récupération des rappels pour cette date';
    }
  }

  async findPending(patientId: string): Promise<RappelPrise[] | string> {
    try {
      const result = await db.select().from(rappelsPrise)
      .where(and(eq(rappelsPrise.patientId, patientId), eq(rappelsPrise.pris, false)));
     return result.map(toDomain);
    } catch (error) { 
      return 'Erreur lors de la récupération des rappels en attente';
    }
  }

  async create(rappel: Omit<RappelPrise, 'id'>): Promise<RappelPrise | string> {
    try {
      const result = await db.insert(rappelsPrise).values({
      ...rappel,
      dateRappel: rappel.dateRappel.toISOString().split('T')[0],
      }).returning();
      return toDomain(result[0]);
    } catch (error) {
      return 'Erreur lors de la création du rappel';
    }
  } 

  async update(id: string, data: Partial<Omit<RappelPrise, 'id'>>): Promise<RappelPrise | string> {
    try {
      const updateData: Record<string, unknown> = { ...data };
     if (data.dateRappel !== undefined) {
      updateData.dateRappel = data.dateRappel.toISOString().split('T')[0];
     }
     const result = await db.update(rappelsPrise).set(updateData).where(eq(rappelsPrise.id, id)).returning();
     if (!result[0]) return 'Rappel non trouvé';
      return toDomain(result[0]);
    } catch (error) {
      return 'Erreur lors de la modification du rappel';
    }
  }

  async markAsPris(id: string): Promise<RappelPrise | string> {
    try {
      const result = await db.update(rappelsPrise).set({ pris: true }).where(eq(rappelsPrise.id, id)).returning();
     if (!result[0]) return 'Rappel non trouvé';
     return toDomain(result[0]);
    } catch (error) {
      return 'Erreur lors du marquage du rappel comme pris';
    }
  }

  async delete(id: string): Promise<void | string> {
    try {
      await db.delete(rappelsPrise).where(eq(rappelsPrise.id, id));
    } catch (error) {
      return 'Erreur lors de la suppresion du rappel';
    }
  }
}

import { count } from 'drizzle-orm'
