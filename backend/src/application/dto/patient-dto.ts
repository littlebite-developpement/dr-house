import type { Sexe, GroupeSanguin } from '../../domaine/entites/enums.js';

export interface CreatePatientRequest {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  motDePasse: string;
  dateNaissance: Date;
  sexe: Sexe;
  poids?: number;
  taille?: number;
  groupeSanguin?: GroupeSanguin;
}

export interface UpdatePatientRequest {
  nom?: string;
  prenom?: string;
  telephone?: string;
  poids?: number;
  taille?: number;
  groupeSanguin?: GroupeSanguin;
}

export interface PatientResponse {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  dateNaissance: Date;
  sexe: Sexe;
  poids: number | null;
  taille: number | null;
  groupeSanguin: GroupeSanguin | null;
  age: number;
}
