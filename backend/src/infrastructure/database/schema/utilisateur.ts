import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';

export const utilisateurs = pgTable('utilisateurs', {
  id: uuid('id').primaryKey().defaultRandom(),
  nom: varchar('nom', { length: 100 }).notNull(),
  prenom: varchar('prenom', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  telephone: varchar('telephone', { length: 20 }).notNull().unique(),
  motDePasse: varchar('mot_de_passe', { length: 255 }).notNull(),
  role: varchar('role', { length: 20 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});
