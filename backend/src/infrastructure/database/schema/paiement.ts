import { pgTable, uuid, numeric, varchar, timestamp } from 'drizzle-orm/pg-core';
import { rendezVous } from './rendez-vous.js';
import { consultations } from './consultation.js';
import { modePaiementEnum, statutPaiementEnum } from './enums.js';

export const paiements = pgTable('paiements', {
  id: uuid('id').primaryKey().defaultRandom(),
  rdvId: uuid('rdv_id').references(() => rendezVous.id, { onDelete: 'set null' }),
  consultationId: uuid('consultation_id').references(() => consultations.id, { onDelete: 'set null' }),
  montant: numeric('montant', { precision: 10, scale: 2 }).notNull(),
  modePaiement: modePaiementEnum('mode_paiement').notNull(),
  statut: statutPaiementEnum('statut').notNull().default('EN_ATTENTE'),
  transactionRef: varchar('transaction_ref', { length: 100 }).unique(),
  datePaiement: timestamp('date_paiement', { withTimezone: true }).defaultNow(),
});
