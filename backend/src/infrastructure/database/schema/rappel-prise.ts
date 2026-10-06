import { pgTable, uuid, time, date, boolean } from 'drizzle-orm/pg-core';
import { patients } from './patient.js';
import { lignesOrdonnance } from './ordonnance.js';

export const rappelsPrise = pgTable('rappels_prise', {
  id: uuid('id').primaryKey().defaultRandom(),
  patientId: uuid('patient_id').notNull().references(() => patients.id, { onDelete: 'cascade' }),
  ligneOrdonnanceId: uuid('ligne_ordonnance_id').references(() => lignesOrdonnance.id, { onDelete: 'cascade' }),
  heurePrise: time('heure_prise').notNull(),
  dateRappel: date('date_rappel').notNull(),
  pris: boolean('pris').default(false),
});
