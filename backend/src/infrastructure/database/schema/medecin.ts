import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { utilisateurs } from './utilisateur.js';
import { hopitaux } from './hopital.js';

export const medecins = pgTable('medecins', {
  id: uuid('id').primaryKey().references(() => utilisateurs.id, { onDelete: 'cascade' }),
  specialite: varchar('specialite', { length: 100 }).notNull(),
  numOrdre: varchar('num_ordre', { length: 50 }).notNull().unique(),
  hopitalId: uuid('hopital_id').references(() => hopitaux.id, { onDelete: 'set null' }),
});
