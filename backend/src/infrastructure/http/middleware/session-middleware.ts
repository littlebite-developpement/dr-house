import type { MiddlewareHandler } from 'hono';
import { auth } from '../../auth/index.js';
import type { IUtilisateurRepository } from '../../../domaine/repositories/utilisateur-repository.js';
import type { Role } from '../../../domaine/entites/enums.js';
import { createErrorResponse, HttpStatusCode } from '../../../application/dto/api-response.js';

export type AuthVariables = { userId: string; userRole: Role };

/**
 * Authentifie via la session better-auth, puis charge le rôle depuis la table utilisateurs.
 * Hypothèse : l'id better-auth (session.user.id) == utilisateurs.id.
 */
export function sessionMiddleware(
  utilisateurRepository: IUtilisateurRepository,
): MiddlewareHandler<{ Variables: AuthVariables }> {
  return async (c, next) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });
    if (!session) {
      return c.json(createErrorResponse('Non authentifié', HttpStatusCode.UNAUTHORIZED), 401);
    }

    const utilisateur = await utilisateurRepository.findById(session.user.id);
    if (typeof utilisateur === 'string') {
      return c.json(createErrorResponse('Utilisateur introuvable', HttpStatusCode.UNAUTHORIZED), 401);
    }

    c.set('userId', utilisateur.id);
    c.set('userRole', utilisateur.role);
    await next();
  };
}
