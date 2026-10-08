import { PgArray, pgTable, text, uuid, varchar } from 'drizzle-orm/pg-core';

export const medicaments = pgTable('medicaments', {
  id: uuid('id').primaryKey().defaultRandom(),
  nom: varchar('nom', { length: 150 }).notNull(),
  images: varchar('images', { length: 255 }).array(),
  description: varchar('description', { length: 255 }),
  indications: varchar('indications', { length: 255 }),
  contreIndications: varchar('contre_indications', { length: 255 }),
  forme: varchar('forme', { length: 50 })
});
