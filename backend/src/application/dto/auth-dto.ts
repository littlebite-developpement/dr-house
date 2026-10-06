import type { Utilisateur } from "../../domaine/entites/utilisateur";

export interface LoginRequest {
  email: string;
  motDePasse: string;
}

export interface LoginResponse {
  token: string;
  utilisateur: Utilisateur;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  telephone: string;
  image?: string;
  rememberMe?: boolean;
  role: 'PATIENT' | 'MEDECIN' | 'ADMIN';
}
