import { pgEnum } from 'drizzle-orm/pg-core';

export const sexeEnum = pgEnum('sexe_enum', ['M', 'F']);

export const groupeSanguinEnum = pgEnum('groupe_sanguin_enum', [
  'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-',
]);

export const statutRdvEnum = pgEnum('statut_rdv_enum', [
  'PLANIFIE', 'CONFIRME', 'ANNULE', 'TERMINE',
]);

export const modePaiementEnum = pgEnum('mode_paiement_enum', [
  'WAVE', 'ORANGE_MONEY', 'CARTE_BANCAIRE', 'ESPECES',
]);

export const statutPaiementEnum = pgEnum('statut_paiement_enum', [
  'EN_ATTENTE', 'PAYE', 'ECHOUE', 'REMBOURSE',
]);
