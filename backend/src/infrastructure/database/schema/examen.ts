import { pgTable, uuid, varchar, text, date } from 'drizzle-orm/pg-core';
import { consultations } from './consultation.js';
import { dossiersMedicaux } from './dossier-medical.js';

export const examens = pgTable('examens', {
  id: uuid('id').primaryKey().defaultRandom(),
  consultationId: uuid('consultation_id').references(() => consultations.id, { onDelete: 'cascade' }),
  dossierMedicalId: uuid('dossier_medical_id').references(() => dossiersMedicaux.id, { onDelete: 'cascade' }),
  typeExamen: varchar('type_examen', { length: 100 }).notNull(),
  description: text('description'),
  resultat: text('resultat'),
  dateExamen: date('date_examen'),
});
