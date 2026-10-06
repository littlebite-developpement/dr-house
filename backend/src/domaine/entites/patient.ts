import type { Sexe, GroupeSanguin } from './enums.js';
import type { Utilisateur } from './utilisateur.js';

export interface Patient {
  id: string;
  dateNaissance: Date;
  sexe: Sexe;
  poids: number | null;
  taille: number | null;
  groupeSanguin: GroupeSanguin | null;
  utilisateur: Utilisateur;
}
