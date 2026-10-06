import { Hono } from 'hono';
import { DossierMedicalUseCases } from '../../../application/cas-d-utilisation/dossier-medical-use-cases.js';
import { createSuccessResponse, createErrorResponse, HttpStatusCode } from '../../../application/dto/api-response.js';
import { DossierMedicalRepository } from '../../repositories/dossier-medical-repository.js';

export function createDossierMedicalRoutes() {
  const router = new Hono();
  const repo = new DossierMedicalRepository();
  const dossierMedicalUseCases = new DossierMedicalUseCases(repo);

  router.get('/:patientId', async (c) => {
    const patientId = c.req.param('patientId');
    const result = await dossierMedicalUseCases.findByPatientId(patientId);
    if (typeof result === 'string') {
      return c.json(
        createErrorResponse(result, HttpStatusCode.NOT_FOUND, [result], c.req.path),
        HttpStatusCode.NOT_FOUND,
      );
    }
    return c.json(
      createSuccessResponse(result, 'Dossier médical récupéré avec succès', HttpStatusCode.OK, c.req.path),
      HttpStatusCode.OK,
    );
  });

  router.get('/:id', async (c) => {
    const id = c.req.param('id');
    const result = await dossierMedicalUseCases.findById(id);
    if (typeof result === 'string') {
      return c.json(
        createErrorResponse(result, HttpStatusCode.NOT_FOUND, [result], c.req.path),
        HttpStatusCode.NOT_FOUND,
      );
    }
    return c.json(
      createSuccessResponse(result, 'Dossier médical récupéré avec succès', HttpStatusCode.OK, c.req.path),
      HttpStatusCode.OK,
    );
  });

  router.post('/', async (c) => {
    const body = await c.req.json();
    const result = await dossierMedicalUseCases.create(body);
    if (typeof result === 'string') {
      return c.json(
        createErrorResponse(result, HttpStatusCode.BAD_REQUEST, [result], c.req.path),
        HttpStatusCode.BAD_REQUEST,
      );
    }
    return c.json(
      createSuccessResponse(result, 'Dossier médical créé avec succès', HttpStatusCode.CREATED, c.req.path),
      HttpStatusCode.CREATED,
    );
  });

  router.put('/:id', async (c) => {
    const id = c.req.param('id');
    const body = await c.req.json();
    const result = await dossierMedicalUseCases.update(id, body);
    if (typeof result === 'string') {
      return c.json(
        createErrorResponse(result, HttpStatusCode.BAD_REQUEST, [result], c.req.path),
        HttpStatusCode.BAD_REQUEST,
      );
    }
    return c.json(
      createSuccessResponse(result, 'Dossier médical mis à jour avec succès', HttpStatusCode.OK, c.req.path),
      HttpStatusCode.OK,
    );
  });

  router.delete('/:id', async (c) => {
    const id = c.req.param('id');
    const result = await dossierMedicalUseCases.delete(id);
    if (typeof result === 'string') {
      return c.json(
        createErrorResponse(result, HttpStatusCode.BAD_REQUEST, [result], c.req.path),
        HttpStatusCode.BAD_REQUEST,
      );
    }
    return c.json(
      createSuccessResponse(null, 'Dossier médical supprimé avec succès', HttpStatusCode.OK, c.req.path),
      HttpStatusCode.OK,
    );
  });

  return router;
}
