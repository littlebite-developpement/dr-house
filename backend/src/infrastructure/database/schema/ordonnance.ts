import { pgTable, uuid, varchar, text, timestamp, integer, index } from 'drizzle-orm/pg-core';
import { consultations } from './consultation.js';
import { patients } from './patient.js';
import { medecins } from './medecin.js';
import { medicaments } from './medicament.js';

export const ordonnances = pgTable('ordonnances', {
  id: uuid('id').primaryKey().defaultRandom(),
  consultationId: uuid('consultation_id').references(() => consultations.id, { onDelete: 'cascade' }),
  patientId: uuid('patient_id').notNull().references(() => patients.id, { onDelete: 'cascade' }),
  medecinId: uuid('medecin_id').notNull().references(() => medecins.id, { onDelete: 'cascade' }),
  dateOrdonnance: timestamp('date_ordonnance', { withTimezone: true }).defaultNow(),
  instructions: text('instructions'),
}, (table) => ({
  idxOrdonnancePatient: index('idx_ordonnance_patient').on(table.patientId),
}));

export const lignesOrdonnance = pgTable('lignes_ordonnance', {
  id: uuid('id').primaryKey().defaultRandom(),
  ordonnanceId: uuid('ordonnance_id').notNull().references(() => ordonnances.id, { onDelete: 'cascade' }),
  medicamentId: uuid('medicament_id').notNull().references(() => medicaments.id, { onDelete: 'restrict' }),
  posologie: varchar('posologie', { length: 100 }).notNull(),
  dureeJours: integer('duree_jours').notNull(),
  quantite: integer('quantite').notNull(),
});
