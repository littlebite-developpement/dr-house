import { Hono } from 'hono';
import { PharmacieUseCases } from '../../../application/cas-d-utilisation/pharmacie-use-cases.js';
import { createSuccessResponse, createErrorResponse, HttpStatusCode } from '../../../application/dto/api-response.js';
import { PharmacieService } from '../../../domaine/services/pharmacie-service.js';
import { PharmacieRepository } from '../../repositories/pharmacie-repository.js';

export function createPharmacieRoutes() {
  const router = new Hono();
  const repo = new PharmacieRepository();
  const service = new PharmacieService(repo);
  const pharmacieUseCases = new PharmacieUseCases(repo, service);

  router.get('/', async (c) => {
    const result = await pharmacieUseCases.findAll();
    if (typeof result === 'string') {
      return c.json(
        createErrorResponse(result, HttpStatusCode.INTERNAL_SERVER_ERROR, [result], c.req.path),
        HttpStatusCode.INTERNAL_SERVER_ERROR,
      );
    }
    return c.json(
      createSuccessResponse(result, 'Pharmacies récupérées avec succès', HttpStatusCode.OK, c.req.path),
      HttpStatusCode.OK,
    );
  });

  router.get('/de-garde', async (c) => {
    const result = await pharmacieUseCases.getPharmaciesDeGarde();
    if (typeof result === 'string') {
      return c.json(
        createErrorResponse(result, HttpStatusCode.INTERNAL_SERVER_ERROR, [result], c.req.path),
        HttpStatusCode.INTERNAL_SERVER_ERROR,
      );
    }
    return c.json(
      createSuccessResponse(result, 'Pharmacies de garde récupérées avec succès', HttpStatusCode.OK, c.req.path),
      HttpStatusCode.OK,
    );
  });

  router.post('/', async (c) => {
    const body = await c.req.json();
    const result = await pharmacieUseCases.create(body);
    if (typeof result === 'string') {
      return c.json(
        createErrorResponse(result, HttpStatusCode.BAD_REQUEST, [result], c.req.path),
        HttpStatusCode.BAD_REQUEST,
      );
    }
    return c.json(
      createSuccessResponse(result, 'Pharmacie créée avec succès', HttpStatusCode.CREATED, c.req.path),
      HttpStatusCode.CREATED,
    );
  });

  router.get('/:id', async (c) => {
    const id = c.req.param('id');
    const result = await pharmacieUseCases.findById(id);
    if (typeof result === 'string') {
      return c.json(
        createErrorResponse(result, HttpStatusCode.NOT_FOUND, [result], c.req.path),
        HttpStatusCode.NOT_FOUND,
      );
    }
    return c.json(
      createSuccessResponse(result, 'Pharmacie récupérée avec succès', HttpStatusCode.OK, c.req.path),
      HttpStatusCode.OK,
    );
  });

  router.put('/:id', async (c) => {
    const id = c.req.param('id');
    const body = await c.req.json();
    const result = await pharmacieUseCases.update(id, body);
    if (typeof result === 'string') {
      return c.json(
        createErrorResponse(result, HttpStatusCode.BAD_REQUEST, [result], c.req.path),
        HttpStatusCode.BAD_REQUEST,
      );
    }
    return c.json(
      createSuccessResponse(result, 'Pharmacie mise à jour avec succès', HttpStatusCode.OK, c.req.path),
      HttpStatusCode.OK,
    );
  });

  router.delete('/:id', async (c) => {
    const id = c.req.param('id');
    const result = await pharmacieUseCases.delete(id);
    if (typeof result === 'string') {
      return c.json(
        createErrorResponse(result, HttpStatusCode.BAD_REQUEST, [result], c.req.path),
        HttpStatusCode.BAD_REQUEST,
      );
    }
    return c.json(
      createSuccessResponse(null, 'Pharmacie supprimée avec succès', HttpStatusCode.OK, c.req.path),
      HttpStatusCode.OK,
    );
  });

  return router;
}
