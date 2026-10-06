import { relations } from 'drizzle-orm';
import { utilisateurs } from './utilisateur.js';
import { medecins } from './medecin.js';
import { patients } from './patient.js';
import { hopitaux } from './hopital.js';
import { dossiersMedicaux } from './dossier-medical.js';
import { rendezVous } from './rendez-vous.js';
import { consultations } from './consultation.js';
import { medicaments } from './medicament.js';
import { ordonnances, lignesOrdonnance } from './ordonnance.js';
import { examens } from './examen.js';
import { pharmacies } from './pharmacie.js';
import { rappelsPrise } from './rappel-prise.js';
import { paiements } from './paiement.js';

export const utilisateursRelations = relations(utilisateurs, ({ one }) => ({
  medecin: one(medecins, {
    fields: [utilisateurs.id],
    references: [medecins.id],
  }),
  patient: one(patients, {
    fields: [utilisateurs.id],
    references: [patients.id],
  }),
}));

export const medecinsRelations = relations(medecins, ({ one, many }) => ({
  utilisateur: one(utilisateurs, {
    fields: [medecins.id],
    references: [utilisateurs.id],
  }),
  hopital: one(hopitaux, {
    fields: [medecins.hopitalId],
    references: [hopitaux.id],
  }),
  rendezVous: many(rendezVous),
  consultations: many(consultations),
  ordonnances: many(ordonnances),
}));

export const patientsRelations = relations(patients, ({ one, many }) => ({
  utilisateur: one(utilisateurs, {
    fields: [patients.id],
    references: [utilisateurs.id],
  }),
  dossierMedical: one(dossiersMedicaux, {
    fields: [patients.id],
    references: [dossiersMedicaux.patientId],
  }),
  rendezVous: many(rendezVous),
  consultations: many(consultations),
  ordonnances: many(ordonnances),
  rappelsPrise: many(rappelsPrise),
}));

export const hopitauxRelations = relations(hopitaux, ({ many }) => ({
  medecins: many(medecins),
}));

export const dossiersMedicauxRelations = relations(dossiersMedicaux, ({ one, many }) => ({
  patient: one(patients, {
    fields: [dossiersMedicaux.patientId],
    references: [patients.id],
  }),
  examens: many(examens),
}));

export const rendezVousRelations = relations(rendezVous, ({ one, many }) => ({
  patient: one(patients, {
    fields: [rendezVous.patientId],
    references: [patients.id],
  }),
  medecin: one(medecins, {
    fields: [rendezVous.medecinId],
    references: [medecins.id],
  }),
  consultation: one(consultations, {
    fields: [rendezVous.id],
    references: [consultations.rdvId],
  }),
  paiement: one(paiements, {
    fields: [rendezVous.id],
    references: [paiements.rdvId],
  }),
}));

export const consultationsRelations = relations(consultations, ({ one, many }) => ({
  rendezVous: one(rendezVous, {
    fields: [consultations.rdvId],
    references: [rendezVous.id],
  }),
  patient: one(patients, {
    fields: [consultations.patientId],
    references: [patients.id],
  }),
  medecin: one(medecins, {
    fields: [consultations.medecinId],
    references: [medecins.id],
  }),
  ordonnance: one(ordonnances, {
    fields: [consultations.id],
    references: [ordonnances.consultationId],
  }),
  examens: many(examens),
  paiement: one(paiements, {
    fields: [consultations.id],
    references: [paiements.consultationId],
  }),
}));

export const medicamentsRelations = relations(medicaments, ({ many }) => ({
  lignesOrdonnance: many(lignesOrdonnance),
}));

export const ordonnancesRelations = relations(ordonnances, ({ one, many }) => ({
  consultation: one(consultations, {
    fields: [ordonnances.consultationId],
    references: [consultations.id],
  }),
  patient: one(patients, {
    fields: [ordonnances.patientId],
    references: [patients.id],
  }),
  medecin: one(medecins, {
    fields: [ordonnances.medecinId],
    references: [medecins.id],
  }),
  lignes: many(lignesOrdonnance),
}));

export const lignesOrdonnanceRelations = relations(lignesOrdonnance, ({ one, many }) => ({
  ordonnance: one(ordonnances, {
    fields: [lignesOrdonnance.ordonnanceId],
    references: [ordonnances.id],
  }),
  medicament: one(medicaments, {
    fields: [lignesOrdonnance.medicamentId],
    references: [medicaments.id],
  }),
  rappelsPrise: many(rappelsPrise),
}));

export const examensRelations = relations(examens, ({ one }) => ({
  consultation: one(consultations, {
    fields: [examens.consultationId],
    references: [consultations.id],
  }),
  dossierMedical: one(dossiersMedicaux, {
    fields: [examens.dossierMedicalId],
    references: [dossiersMedicaux.id],
  }),
}));

export const pharmaciesRelations = relations(pharmacies, () => ({}));

export const rappelsPriseRelations = relations(rappelsPrise, ({ one }) => ({
  patient: one(patients, {
    fields: [rappelsPrise.patientId],
    references: [patients.id],
  }),
  ligneOrdonnance: one(lignesOrdonnance, {
    fields: [rappelsPrise.ligneOrdonnanceId],
    references: [lignesOrdonnance.id],
  }),
}));

export const paiementsRelations = relations(paiements, ({ one }) => ({
  rendezVous: one(rendezVous, {
    fields: [paiements.rdvId],
    references: [rendezVous.id],
  }),
  consultation: one(consultations, {
    fields: [paiements.consultationId],
    references: [consultations.id],
  }),
}));
