import { pgTable, uuid, date, time, text, timestamp, index, uniqueIndex } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { patients } from './patient.js';
import { medecins } from './medecin.js';
import { statutRdvEnum } from './enums.js';

export const rendezVous = pgTable('rendez_vous', {
  id: uuid('id').primaryKey().defaultRandom(),
  patientId: uuid('patient_id').notNull().references(() => patients.id, { onDelete: 'cascade' }),
  medecinId: uuid('medecin_id').notNull().references(() => medecins.id, { onDelete: 'cascade' }),
  dateRdv: date('date_rdv').notNull(),
  heureRdv: time('heure_rdv').notNull(),
  statut: statutRdvEnum('statut').notNull().default('PLANIFIE'),
  motif: text('motif'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
}, (table) => ({
  idxRdvPatient: index('idx_rdv_patient').on(table.patientId),
  idxRdvMedecin: index('idx_rdv_medecin').on(table.medecinId),
  // Garde-fou anti double-réservation (course entre deux requêtes) : un seul rdv non annulé par médecin/créneau
  uniqCreneauActif: uniqueIndex('uniq_rdv_creneau_actif')
    .on(table.medecinId, table.dateRdv, table.heureRdv)
    .where(sql`${table.statut} <> 'ANNULE'`),
}));
