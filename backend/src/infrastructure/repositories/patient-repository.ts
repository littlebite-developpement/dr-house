import { eq } from 'drizzle-orm';
import { db } from '../database/index.js';
import { patients, utilisateurs } from '../database/schema/index.js';
import type { Patient } from '../../domaine/entites/patient.js';
import type { IPatientRepository } from '../../domaine/repositories/patient-repository.js';
import type { PaginationParams, PaginatedResult } from '../../domaine/repositories/types.js';
import { Role, Sexe, GroupeSanguin } from '../../domaine/entites/enums.js';

function toDomain(patient: typeof patients.$inferSelect & { utilisateur: typeof utilisateurs.$inferSelect }): Patient {
  return {
    id: patient.id,
    dateNaissance: new Date(patient.dateNaissance),
    sexe: patient.sexe as Sexe,
    poids: patient.poids ? parseFloat(patient.poids) : null,
    taille: patient.taille ? parseFloat(patient.taille) : null,
    groupeSanguin: patient.groupeSanguin as GroupeSanguin | null,
    utilisateur: {
      ...patient.utilisateur,
      role: patient.utilisateur.role as Role,
      createdAt: patient.utilisateur.createdAt ?? new Date(),
      updatedAt: patient.utilisateur.updatedAt ?? new Date(),
    },
  };
}

export class PatientRepository implements IPatientRepository {
  async findById(id: string): Promise<Patient | string> {
    const result = await db.select({
      patient: patients,
      utilisateur: utilisateurs,
    })
      .from(patients)
      .innerJoin(utilisateurs, eq(patients.id, utilisateurs.id))
      .where(eq(patients.id, id))
      .limit(1);

    if (!result[0]) return "patient non trouvee";
    return toDomain({ ...result[0].patient, utilisateur: result[0].utilisateur });
  }

  async findAll(params?: PaginationParams): Promise<PaginatedResult<Patient>| string> {
    const page = params?.page ?? 1;
    const limit = params?.limit ?? 10;
    const offset = (page - 1) * limit;

    const [data, countResult] = await Promise.all([
      db.select({
        patient: patients,
        utilisateur: utilisateurs,
      })
        .from(patients)
        .innerJoin(utilisateurs, eq(patients.id, utilisateurs.id))
        .limit(limit)
        .offset(offset),
      db.select({ count: count() }).from(patients),
    ]);

    const total = countResult[0]?.count ?? 0;

    return {
      data: data.map(d => toDomain({ ...d.patient, utilisateur: d.utilisateur })),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async create(patient: Omit<Patient, 'id' | 'utilisateur'> & { utilisateur: Omit<import('../../domaine/entites/utilisateur.js').Utilisateur, 'id' | 'createdAt' | 'updatedAt'> }): Promise<Patient | string> {
    const result = await db.transaction(async (tx) => {
      const [utilisateur] = await tx.insert(utilisateurs).values(patient.utilisateur).returning();
      const [patientResult] = await tx.insert(patients).values({
        id: utilisateur.id,
        dateNaissance: patient.dateNaissance.toISOString().split('T')[0],
        sexe: patient.sexe,
        poids: patient.poids?.toString() ?? null,
        taille: patient.taille?.toString() ?? null,
        groupeSanguin: patient.groupeSanguin,
      }).returning();
      return { ...patientResult, utilisateur };
    });
    return toDomain(result);
  }

  async update(id: string, data: Partial<Omit<Patient, 'id' | 'utilisateur'>>): Promise<Patient | string> {
    const result = await db.update(patients).set({
      poids: data.poids?.toString(),
      taille: data.taille?.toString(),
      groupeSanguin: data.groupeSanguin,
    }).where(eq(patients.id, id)).returning();
    if (!result[0]) return 'Patient non trouvé';
    return this.findById(id);
  }

  async delete(id: string): Promise<void | string> {
    await db.delete(patients).where(eq(patients.id, id));
  }
}

import { count } from 'drizzle-orm';
