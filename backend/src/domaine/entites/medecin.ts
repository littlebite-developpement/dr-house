import type { Utilisateur } from './utilisateur.js';

export interface Medecin {
  id: string;
  specialite: string;
  numOrdre: string;
  hopitalId: string | null;
  utilisateur: Utilisateur;
}
