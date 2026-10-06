import type { Context, Next } from 'hono';

export async function errorHandler(c: Context, next: Next) {
  try {
    await next();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur interne du serveur';
    const status = (error as { status?: number }).status ?? 500;
    return c.json({ error: message }, status as 500);
  }
}
