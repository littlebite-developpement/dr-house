import { pgTable, uuid, varchar, text, boolean } from 'drizzle-orm/pg-core';

export const pharmacies = pgTable('pharmacies', {
  id: uuid('id').primaryKey().defaultRandom(),
  nom: varchar('nom', { length: 150 }).notNull(),
  adresse: text('adresse').notNull(),
  telephone: varchar('telephone', { length: 20 }),
  estDeGarde: boolean('est_de_garde').default(false),
});
