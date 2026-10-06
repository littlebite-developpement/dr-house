import { Hono } from 'hono';
import { RendezVousUseCases } from '../../../application/cas-d-utilisation/rendez-vous-use-cases.js';
import { createSuccessResponse, createErrorResponse, HttpStatusCode } from '../../../application/dto/api-response.js';
import type { RendezVousResponse, CreateRendezVousRequest, UpdateRendezVousRequest } from '../../../application/dto/rendez-vous-dto.js';
import { RendezVousService } from '../../../domaine/services/rendez-vous-service.js';
import { RendezVousRepository } from '../../repositories/rendez-vous-repository.js';

export function createRendezVousRoutes() {
  const router = new Hono();
  const rendezVousRepository = new RendezVousRepository();
  const rendezVousService = new RendezVousService(rendezVousRepository);
  const rendezVousUseCases = new RendezVousUseCases(rendezVousRepository, rendezVousService);

  router.post('/', async (c) => {
    const body = await c.req.json<CreateRendezVousRequest>()
    const result = await rendezVousUseCases.create(body);
    if (typeof result === 'string') {
      return c.json(createErrorResponse(result, HttpStatusCode.BAD_REQUEST))
    }
    return c.json(createSuccessResponse(result, 'success', HttpStatusCode.ACCEPTED));
  });

  router.get('/:id', async (c) => {
    const id = c.req.param('id');
    const result = await rendezVousUseCases.findById(id);
    if (typeof result === 'string') {
      return c.json(createErrorResponse(result, HttpStatusCode.BAD_REQUEST))
    }
    return c.json(createSuccessResponse(result, 'success', HttpStatusCode.ACCEPTED));
  });

  router.patch('/:id/confirm', async (c) => {
    const id = c.req.param('id');
    const result = await rendezVousUseCases.confirm(id);
    if (typeof result === 'string') {
      return c.json(createErrorResponse(result, HttpStatusCode.BAD_REQUEST))
    }
    return c.json(createSuccessResponse(result, 'success', HttpStatusCode.ACCEPTED));
  });

  router.patch('/:id/cancel', async (c) => {
    const id = c.req.param('id');
    const result = await rendezVousUseCases.cancel(id);
    if (typeof result === 'string') {
      return c.json(createErrorResponse(result, HttpStatusCode.BAD_REQUEST))
    }
    return c.json(createSuccessResponse(result, 'success', HttpStatusCode.ACCEPTED));
  });

  router.patch('/:id/complete', async (c) => {
    const id = c.req.param('id');
    const result = await rendezVousUseCases.complete(id);
    if (typeof result === 'string') {
      return c.json(createErrorResponse(result, HttpStatusCode.BAD_REQUEST))
    }
    return c.json(createSuccessResponse(result, 'success', HttpStatusCode.ACCEPTED));
  });

  router.put('/:id', async (c) => {
    const id = c.req.param('id');
    const body = await c.req.json();
    const result = await rendezVousUseCases.update(id, body);
    if (typeof result === 'string') {
      return c.json(createErrorResponse(result, HttpStatusCode.BAD_REQUEST))
    }
    return c.json(createSuccessResponse(result, 'success', HttpStatusCode.ACCEPTED));
  });

  router.delete('/:id', async (c) => {
    const id = c.req.param('id');
    const result = await rendezVousUseCases.delete(id);
    if (typeof result === 'string') {
      return c.json(createErrorResponse(result, HttpStatusCode.BAD_REQUEST))
    }
    return c.json(createSuccessResponse(null, 'success', HttpStatusCode.ACCEPTED));
  });

  return router;
}
