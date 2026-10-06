import { Hono } from 'hono';
import { MedicamentUseCases } from '../../../application/cas-d-utilisation/medicament-use-cases.js';
import { createSuccessResponse, createErrorResponse, HttpStatusCode } from '../../../application/dto/api-response.js';
import { MedicamentRepository } from '../../repositories/medicament-repository.js';


export function createMedicamentRoutes() {
  const router = new Hono();
  const repo = new MedicamentRepository();
  const medicamentUseCases = new MedicamentUseCases(repo);

  router.get('/', async (c) => {
    const result = await medicamentUseCases.findAll();
    if (typeof result === 'string') {
      return c.json(
        createErrorResponse(result, HttpStatusCode.INTERNAL_SERVER_ERROR, [result], c.req.path),
        HttpStatusCode.INTERNAL_SERVER_ERROR,
      );
    }
    return c.json(
      createSuccessResponse(result, 'Médicaments récupérés avec succès', HttpStatusCode.OK, c.req.path),
      HttpStatusCode.OK,
    );
  });

  router.post('/', async (c) => {
    const body = await c.req.json();
    const result = await medicamentUseCases.create(body);
    if (typeof result === 'string') {
      return c.json(
        createErrorResponse(result, HttpStatusCode.BAD_REQUEST, [result], c.req.path),
        HttpStatusCode.BAD_REQUEST,
      );
    }
    return c.json(
      createSuccessResponse(result, 'Médicament créé avec succès', HttpStatusCode.CREATED, c.req.path),
      HttpStatusCode.CREATED,
    );
  });

  router.get('/:id', async (c) => {
    const id = c.req.param('id');
    const result = await medicamentUseCases.findById(id);
    if (typeof result === 'string') {
      return c.json(
        createErrorResponse(result, HttpStatusCode.NOT_FOUND, [result], c.req.path),
        HttpStatusCode.NOT_FOUND,
      );
    }
    return c.json(
      createSuccessResponse(result, 'Médicament récupéré avec succès', HttpStatusCode.OK, c.req.path),
      HttpStatusCode.OK,
    );
  });

  router.put('/:id', async (c) => {
    const id = c.req.param('id');
    const body = await c.req.json();
    const result = await medicamentUseCases.update(id, body);
    if (typeof result === 'string') {
      return c.json(
        createErrorResponse(result, HttpStatusCode.BAD_REQUEST, [result], c.req.path),
        HttpStatusCode.BAD_REQUEST,
      );
    }
    return c.json(
      createSuccessResponse(result, 'Médicament mis à jour avec succès', HttpStatusCode.OK, c.req.path),
      HttpStatusCode.OK,
    );
  });

  router.delete('/:id', async (c) => {
    const id = c.req.param('id');
    const result = await medicamentUseCases.delete(id);
    if (typeof result === 'string') {
      return c.json(
        createErrorResponse(result, HttpStatusCode.BAD_REQUEST, [result], c.req.path),
        HttpStatusCode.BAD_REQUEST,
      );
    }
    return c.json(
      createSuccessResponse(null, 'Médicament supprimé avec succès', HttpStatusCode.OK, c.req.path),
      HttpStatusCode.OK,
    );
  });

  return router;
}
