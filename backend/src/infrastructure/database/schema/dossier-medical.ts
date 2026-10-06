import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';
import { patients } from './patient.js';

export const dossiersMedicaux = pgTable('dossiers_medicaux', {
  id: uuid('id').primaryKey().defaultRandom(),
  patientId: uuid('patient_id').notNull().unique().references(() => patients.id, { onDelete: 'cascade' }),
  antecedents: text('antecedents'),
  allergies: text('allergies'),
  dateCreation: timestamp('date_creation', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});
