export enum Sexe {
  MASCULIN = 'M',
  FEMININ = 'F',
}

export enum GroupeSanguin {
  A_POSITIF = 'A+',
  A_NEGATIF = 'A-',
  B_POSITIF = 'B+',
  B_NEGATIF = 'B-',
  AB_POSITIF = 'AB+',
  AB_NEGATIF = 'AB-',
  O_POSITIF = 'O+',
  O_NEGATIF = 'O-',
}

export enum Role {
  PATIENT = 'PATIENT',
  MEDECIN = 'MEDECIN',
  ADMIN = 'ADMIN',
}

export enum StatutRendezVous {
  PLANIFIE = 'PLANIFIE',
  CONFIRME = 'CONFIRME',
  ANNULE = 'ANNULE',
  TERMINE = 'TERMINE',
}

export enum ModePaiement {
  WAVE = 'WAVE',
  ORANGE_MONEY = 'ORANGE_MONEY',
  CARTE_BANCAIRE = 'CARTE_BANCAIRE',
  ESPECES = 'ESPECES',
}

export enum StatutPaiement {
  EN_ATTENTE = 'EN_ATTENTE',
  PAYE = 'PAYE',
  ECHOUE = 'ECHOUE',
  REMBOURSE = 'REMBOURSE',
}
