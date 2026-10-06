import { Hono } from 'hono';
import { createSuccessResponse, createErrorResponse, HttpStatusCode } from '../../../application/dto/api-response.js';
import { PatientUseCases } from '../../../application/cas-d-utilisation/patient-use-cases.js';
import { PatientRepository } from '../../repositories/patient-repository.js';
import { UtilisateurRepository } from '../../repositories/utilisateur-repository.js';

export function createPatientRoutes() {
  const router = new Hono();
  const repoPatient = new PatientRepository();
  const repoUser = new UtilisateurRepository();
  const patientUseCases = new PatientUseCases(repoPatient, repoUser);

  router.post('/', async (c) => {
    const body = await c.req.json();
    const result = await patientUseCases.create(body);
    if (typeof result === 'string') {
      return c.json(
        createErrorResponse(result, HttpStatusCode.BAD_REQUEST, [result], c.req.path),
        HttpStatusCode.BAD_REQUEST,
      );
    }
    return c.json(
      createSuccessResponse(result, 'Patient créé avec succès', HttpStatusCode.CREATED, c.req.path),
      HttpStatusCode.CREATED,
    );
  });

  router.get('/:id', async (c) => {
    const id = c.req.param('id');
    const result = await patientUseCases.findById(id);
    if (typeof result === 'string') {
      return c.json(
        createErrorResponse(result, HttpStatusCode.NOT_FOUND, [result], c.req.path),
        HttpStatusCode.NOT_FOUND,
      );
    }
    return c.json(
      createSuccessResponse(result, 'Patient récupéré avec succès', HttpStatusCode.OK, c.req.path),
      HttpStatusCode.OK,
    );
  });

  router.put('/:id', async (c) => {
    const id = c.req.param('id');
    const body = await c.req.json();
    const result = await patientUseCases.update(id, body);
    if (typeof result === 'string') {
      return c.json(
        createErrorResponse(result, HttpStatusCode.BAD_REQUEST, [result], c.req.path),
        HttpStatusCode.BAD_REQUEST,
      );
    }
    return c.json(
      createSuccessResponse(result, 'Patient mis à jour avec succès', HttpStatusCode.OK, c.req.path),
      HttpStatusCode.OK,
    );
  });

  router.delete('/:id', async (c) => {
    const id = c.req.param('id');
    const result = await patientUseCases.delete(id);
    if (typeof result === 'string') {
      return c.json(
        createErrorResponse(result, HttpStatusCode.BAD_REQUEST, [result], c.req.path),
        HttpStatusCode.BAD_REQUEST,
      );
    }
    return c.json(
      createSuccessResponse(null, 'Patient supprimé avec succès', HttpStatusCode.OK, c.req.path),
      HttpStatusCode.OK,
    );
  });

  return router;
}
