import { pgTable, uuid, varchar, text, timestamp } from 'drizzle-orm/pg-core';

export const hopitaux = pgTable('hopitaux', {
  id: uuid('id').primaryKey().defaultRandom(),
  nom: varchar('nom', { length: 150 }).notNull(),
  adresse: text('adresse').notNull(),
  telephone: varchar('telephone', { length: 20 }),
  ville: varchar('ville', { length: 100 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});
