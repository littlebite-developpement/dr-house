import type { Role } from './enums.js';

export interface Utilisateur {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  motDePasse: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}
