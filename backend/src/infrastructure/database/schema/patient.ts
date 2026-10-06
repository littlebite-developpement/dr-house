import { pgTable, uuid, date, numeric } from 'drizzle-orm/pg-core';
import { utilisateurs } from './utilisateur.js';
import { sexeEnum, groupeSanguinEnum } from './enums.js';

export const patients = pgTable('patients', {
  id: uuid('id').primaryKey().references(() => utilisateurs.id, { onDelete: 'cascade' }),
  dateNaissance: date('date_naissance').notNull(),
  sexe: sexeEnum('sexe').notNull(),
  poids: numeric('poids', { precision: 5, scale: 2 }),
  taille: numeric('taille', { precision: 5, scale: 2 }),
  groupeSanguin: groupeSanguinEnum('groupe_sanguin'),
});
