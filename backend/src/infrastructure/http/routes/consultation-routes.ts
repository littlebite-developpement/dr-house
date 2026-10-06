import { Hono } from 'hono';
import { ConsultationUseCases } from '../../../application/cas-d-utilisation/consultation-use-cases.js';
import { createSuccessResponse, createErrorResponse, HttpStatusCode } from '../../../application/dto/api-response.js';
import { ConsultationRepository } from '../../repositories/consultation-repository.js';

export function createConsultationRoutes() {
  const router = new Hono();
  const repo = new ConsultationRepository();
  const consultationUseCases = new ConsultationUseCases(repo)

  router.post('/', async (c) => {
    const body = await c.req.json();
    const result = await consultationUseCases.create(body);
    if (typeof result === 'string') {
      return c.json(
        createErrorResponse(result, HttpStatusCode.BAD_REQUEST, [result], c.req.path),
        HttpStatusCode.BAD_REQUEST,
      );
    }
    return c.json(
      createSuccessResponse(result, 'Consultation créée avec succès', HttpStatusCode.CREATED, c.req.path),
      HttpStatusCode.CREATED,
    );
  });

  router.get('/:id', async (c) => {
    const id = c.req.param('id');
    const result = await consultationUseCases.findById(id);
    if (typeof result === 'string') {
      return c.json(
        createErrorResponse(result, HttpStatusCode.NOT_FOUND, [result], c.req.path),
        HttpStatusCode.NOT_FOUND,
      );
    }
    return c.json(
      createSuccessResponse(result, 'Consultation récupérée avec succès', HttpStatusCode.OK, c.req.path),
      HttpStatusCode.OK,
    );
  });

  router.put('/:id', async (c) => {
    const id = c.req.param('id');
    const body = await c.req.json();
    const result = await consultationUseCases.update(id, body);
    if (typeof result === 'string') {
      return c.json(
        createErrorResponse(result, HttpStatusCode.BAD_REQUEST, [result], c.req.path),
        HttpStatusCode.BAD_REQUEST,
      );
    }
    return c.json(
      createSuccessResponse(result, 'Consultation mise à jour avec succès', HttpStatusCode.OK, c.req.path),
      HttpStatusCode.OK,
    );
  });

  router.delete('/:id', async (c) => {
    const id = c.req.param('id');
    const result = await consultationUseCases.delete(id);
    if (typeof result === 'string') {
      return c.json(
        createErrorResponse(result, HttpStatusCode.BAD_REQUEST, [result], c.req.path),
        HttpStatusCode.BAD_REQUEST,
      );
    }
    return c.json(
      createSuccessResponse(null, 'Consultation supprimée avec succès', HttpStatusCode.OK, c.req.path),
      HttpStatusCode.OK,
    );
  });

  return router;
}
