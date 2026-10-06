import { Hono } from 'hono';
import { auth } from '../../auth/index.js';
import { UserUseCases } from '../../../application/cas-d-utilisation/utilisateur-use-cases.js';
import { UtilisateurRepository } from '../../repositories/utilisateur-repository.js';
import { createSuccessResponse,  HttpStatusCode, createErrorResponse } from '../../../application/dto/api-response.js';
import { type RegisterRequest } from '../../../application/dto/auth-dto.js';


export function createUserRoutes() {
  const router = new Hono();
  const utilisateurRepository = new UtilisateurRepository();
  const userUseCases = new UserUseCases(utilisateurRepository);

  router.post('/login', async (c) => {
    const { email, password } = await c.req.json();
    const { token, user } = await auth.api.signInEmail({ body: { email, password, rememberMe: true } });
    const utilisateur = await userUseCases.findById(user.id);
    switch (typeof utilisateur) {
      case 'string':
        return c.json(createErrorResponse(utilisateur, HttpStatusCode.NOT_FOUND));
      case 'object':
        c.res.headers.set('Authorization', `Bearer ${token}`);
        return c.json(createSuccessResponse(utilisateur, 'Connexion réussie', HttpStatusCode.OK));
      default:
        return c.json(createErrorResponse('Erreur inattendue', HttpStatusCode.INTERNAL_SERVER_ERROR));
    }
  });

  router.get('/:id', async (c) => {
    const { id } = c.req.query();
    const utilisateur = await utilisateurRepository.findById(id);
    switch (typeof utilisateur) {
      case 'string':
        return c.json(createErrorResponse(utilisateur, HttpStatusCode.NOT_FOUND));
      case 'object':
        return c.json(createSuccessResponse(utilisateur));
      default:
        return c.json(createErrorResponse('Erreur inattendue', HttpStatusCode.INTERNAL_SERVER_ERROR));
    }
  });

  router.post('/logout', async (c) => {
    const logout = await auth.api.signOut({ headers: c.req.raw.headers });
    switch ( logout ) {
      case null:
        return c.json(createErrorResponse('Erreur inattendue', HttpStatusCode.INTERNAL_SERVER_ERROR));
      default:
        return c.json(createSuccessResponse(logout));
    }
  });

  router.post('/subscribe', async (c) => {
    const data: RegisterRequest = await c.req.json();
    const register = await auth.api.signUpEmail({ body: data });
    switch (typeof register.token) {
      case null:
        return c.json(createErrorResponse('Erreur inattendue', HttpStatusCode.INTERNAL_SERVER_ERROR));
      case 'string':
        c.res.headers.set('Authorization', `Bearer ${register.token}`);
        return c.json(createSuccessResponse(register.user, 'Inscription réussie', HttpStatusCode.CREATED));
    }
  });

  return router;
}
