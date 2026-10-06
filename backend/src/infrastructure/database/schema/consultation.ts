import { pgTable, uuid, text, timestamp, index } from 'drizzle-orm/pg-core';
import { rendezVous } from './rendez-vous.js';
import { patients } from './patient.js';
import { medecins } from './medecin.js';

export const consultations = pgTable('consultations', {
  id: uuid('id').primaryKey().defaultRandom(),
  rdvId: uuid('rdv_id').unique().references(() => rendezVous.id, { onDelete: 'set null' }),
  patientId: uuid('patient_id').notNull().references(() => patients.id, { onDelete: 'cascade' }),
  medecinId: uuid('medecin_id').notNull().references(() => medecins.id, { onDelete: 'cascade' }),
  dateConsultation: timestamp('date_consultation', { withTimezone: true }).defaultNow(),
  motif: text('motif').notNull(),
  diagnostic: text('diagnostic').notNull(),
  observations: text('observations'),
}, (table) => ({
  idxConsultationPatient: index('idx_consultation_patient').on(table.patientId),
}));
