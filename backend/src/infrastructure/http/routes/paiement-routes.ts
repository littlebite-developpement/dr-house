import { Hono } from 'hono';
import { PaiementUseCases } from '../../../application/cas-d-utilisation/paiement-use-cases.js';
import { createSuccessResponse, createErrorResponse, HttpStatusCode } from '../../../application/dto/api-response.js';
import { PaiementRepository } from '../../repositories/paiement-repository.js';

export function createPaiementRoutes() {
  const router = new Hono();
  const repo = new PaiementRepository();
  const paiementUseCases = new PaiementUseCases(repo);

  router.post('/', async (c) => {
    const body = await c.req.json();
    const result = await paiementUseCases.create(body);
    if (typeof result === 'string') {
      return c.json(
        createErrorResponse(result, HttpStatusCode.BAD_REQUEST, [result], c.req.path),
        HttpStatusCode.BAD_REQUEST,
      );
    }
    return c.json(
      createSuccessResponse(result, 'Paiement créé avec succès', HttpStatusCode.CREATED, c.req.path),
      HttpStatusCode.CREATED,
    );
  });

  router.get('/:id', async (c) => {
    const id = c.req.param('id');
    const result = await paiementUseCases.findById(id);
    if (typeof result === 'string') {
      return c.json(
        createErrorResponse(result, HttpStatusCode.NOT_FOUND, [result], c.req.path),
        HttpStatusCode.NOT_FOUND,
      );
    }
    return c.json(
      createSuccessResponse(result, 'Paiement récupéré avec succès', HttpStatusCode.OK, c.req.path),
      HttpStatusCode.OK,
    );
  });

  router.put('/:id', async (c) => {
    const id = c.req.param('id');
    const body = await c.req.json();
    const result = await paiementUseCases.update(id, body);
    if (typeof result === 'string') {
      return c.json(
        createErrorResponse(result, HttpStatusCode.BAD_REQUEST, [result], c.req.path),
        HttpStatusCode.BAD_REQUEST,
      );
    }
    return c.json(
      createSuccessResponse(result, 'Paiement mis à jour avec succès', HttpStatusCode.OK, c.req.path),
      HttpStatusCode.OK,
    );
  });

  router.delete('/:id', async (c) => {
    const id = c.req.param('id');
    const result = await paiementUseCases.delete(id);
    if (typeof result === 'string') {
      return c.json(
        createErrorResponse(result, HttpStatusCode.BAD_REQUEST, [result], c.req.path),
        HttpStatusCode.BAD_REQUEST,
      );
    }
    return c.json(
      createSuccessResponse(null, 'Paiement supprimé avec succès', HttpStatusCode.OK, c.req.path),
      HttpStatusCode.OK,
    );
  });

  return router;
}
