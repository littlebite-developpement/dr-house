import type { Context, Next } from 'hono';
import type { IAuthPort } from '../../../application/ports/auth-port.js';

export function authMiddleware(authPort: IAuthPort) {
  return async (c: Context, next: Next) => {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'Token manquant' }, 401);
    }

    const token = authHeader.substring(7);
    const payload = authPort.verifyToken(token);
    if (!payload) {
      return c.json({ error: 'Token invalide ou expiré' }, 401);
    }

    c.set('userId', payload.userId);
    c.set('userRole', payload.role);
    await next();
  };
}

export function requireRole(...roles: string[]) {
  return async (c: Context, next: Next) => {
    const userRole = c.get('userRole') as string;
    if (!userRole || !roles.includes(userRole)) {
      return c.json({ error: 'Accès non autorisé' }, 403);
    }
    await next();
  };
}
