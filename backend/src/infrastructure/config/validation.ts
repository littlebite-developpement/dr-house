import type { Context } from 'hono';
import { RequeteInvalideError } from '../../domaine/erreurs.js';
import type { PaginationParams } from '../../domaine/repositories/types.js';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const HEURE_RE = /^([01]\d|2[0-3]):([0-5]\d)(?::([0-5]\d))?$/;

export async function lireCorpsJson(c: Context): Promise<Record<string, unknown>> {
  const body = await c.req.json().catch(() => null);
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    throw new RequeteInvalideError('Corps JSON invalide');
  }
  return body as Record<string, unknown>;
}

export function lireUuid(valeur: unknown, champ: string): string {
  if (typeof valeur !== 'string' || !UUID_RE.test(valeur)) {
    throw new RequeteInvalideError(`${champ} invalide (UUID attendu)`);
  }
  return valeur;
}

/** 'YYYY-MM-DD' valide (calendrier réel). */
export function lireDate(valeur: unknown, champ: string): string {
  if (typeof valeur !== 'string' || !DATE_RE.test(valeur)) {
    throw new RequeteInvalideError(`${champ} invalide (format YYYY-MM-DD)`);
  }
  const d = new Date(`${valeur}T00:00:00.000Z`);
  if (Number.isNaN(d.getTime()) || d.toISOString().slice(0, 10) !== valeur) {
    throw new RequeteInvalideError(`${champ} n'est pas une date valide`);
  }
  return valeur;
}

/** 'HH:MM' ou 'HH:MM:SS' → normalisé en 'HH:MM:SS' (format renvoyé par Postgres). */
export function lireHeure(valeur: unknown, champ: string): string {
  const m = typeof valeur === 'string' ? HEURE_RE.exec(valeur) : null;
  if (!m) throw new RequeteInvalideError(`${champ} invalide (format HH:MM)`);
  return `${m[1]}:${m[2]}:${m[3] ?? '00'}`;
}

export function lireTexteOptionnel(valeur: unknown, champ: string, max = 500): string | undefined {
  if (valeur === undefined || valeur === null) return undefined;
  if (typeof valeur !== 'string') throw new RequeteInvalideError(`${champ} invalide`);
  const texte = valeur.trim();
  if (texte.length > max) throw new RequeteInvalideError(`${champ} trop long (${max} caractères max)`);
  return texte || undefined;
}

export function lirePagination(query: Record<string, string>): PaginationParams {
  const page = Math.max(1, parseInt(query.page ?? '1', 10) || 1);
  const limit = Math.min(50, Math.max(1, parseInt(query.limit ?? '10', 10) || 10));
  return { page, limit };
}
