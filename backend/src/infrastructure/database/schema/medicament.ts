import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const medicaments = pgTable('medicaments', {
  id: uuid('id').primaryKey().defaultRandom(),
  nom: varchar('nom', { length: 150 }).notNull(),
  forme: varchar('forme', { length: 50 }),
  dosage: varchar('dosage', { length: 50 }),
});
