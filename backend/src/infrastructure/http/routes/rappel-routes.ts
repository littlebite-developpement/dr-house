import { Hono } from 'hono';
import { RappelUseCases } from '../../../application/cas-d-utilisation/rappel-use-cases.js';
import { createSuccessResponse, createErrorResponse, HttpStatusCode,} from '../../../application/dto/api-response.js';
import { RappelPriseService } from '../../../domaine/services/rappel-prise-service.js'
import { RappelPriseRepository } from '../../repositories/rappel-prise-repository.js';


export function createRappelRoutes() {
  const rappelRepo = new RappelPriseRepository()
  const rappelService = new RappelPriseService(rappelRepo)
  const rappelUseCases = new RappelUseCases(rappelRepo, rappelService)


  const router = new Hono();

  router.post('/', async (c) => {
  try {
    const body = await c.req.json();
    const result = await rappelUseCases.create(body);
    if (typeof result === 'string') {
      return c.json(
        createErrorResponse(
          result,
          HttpStatusCode.BAD_REQUEST,
          [result],
          c.req.path,
        ),
        HttpStatusCode.BAD_REQUEST,
      );
    }
    return c.json(
      createSuccessResponse(
        result,
        'Rappel créé avec succès',
        HttpStatusCode.CREATED,
        c.req.path,
      ),
      HttpStatusCode.CREATED,
    );
  } catch {
    return c.json(
      createErrorResponse(
        'Erreur interne lors de la création du rappel',
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        null,
        c.req.path,
      ),
      HttpStatusCode.INTERNAL_SERVER_ERROR,
    );
  }
  });

  router.patch('/:id/pris', async (c) => {
  try {
    const id = c.req.param('id');
    const result = await rappelUseCases.markAsPris(id);
    if (typeof result === 'string') {
      return c.json(
        createErrorResponse(
          result,
          HttpStatusCode.NOT_FOUND,
          [result],
          c.req.path,
        ),
        HttpStatusCode.NOT_FOUND,
      );
    }
    return c.json(
      createSuccessResponse(
        result,
        'Rappel marqué comme pris',
        HttpStatusCode.OK,
        c.req.path,
      ),
      HttpStatusCode.OK,
    );
  } catch {
    return c.json(
      createErrorResponse(
        'Erreur interne lors du marquage du rappel',
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        null,
        c.req.path
      ),
      HttpStatusCode.INTERNAL_SERVER_ERROR,
    );
  }
});

  router.get('/patient/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const result = await rappelUseCases.getRappelsDuJour(id);
    if (typeof result === 'string') {
      return c.json(
        createErrorResponse(
          result,
          HttpStatusCode.NOT_FOUND,
          [result],
          c.req.path,
        ),
        HttpStatusCode.NOT_FOUND,
      );
    }
    return c.json(
      createSuccessResponse(
        result,
        'Rappels du jour récupérés avec succès',
        HttpStatusCode.OK,
        c.req.path,
      ),
      HttpStatusCode.OK,
    );
  } catch {
    return c.json(
      createErrorResponse(
        'Erreur interne lors de la récupération des rappels',
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        null,
        c.req.path,
      ),
      HttpStatusCode.INTERNAL_SERVER_ERROR,
    );
  }
  });

  router.get('/waitlist', async (c) => {
    try {
      const id = c.req.param('id');
      if (typeof id === undefined) return c.json(
        createErrorResponse(
          "ID error",
          HttpStatusCode.BAD_REQUEST,
        ),
        HttpStatusCode.NOT_FOUND,
      );
      const result = await rappelUseCases.getRappelsEnAttente(id!);
      if (typeof result === 'string') {
        return c.json(
          createErrorResponse(
            result,
            HttpStatusCode.NOT_FOUND,
            [result],
            c.req.path,
          ),
          HttpStatusCode.NOT_FOUND,
        );
      }
      return c.json(
        createSuccessResponse(
          result,
          'Rappels en attente récupérés avec succès',
          HttpStatusCode.OK,
          c.req.path,
        ),
        HttpStatusCode.OK,
      );
    } catch {
      return c.json(
        createErrorResponse(
          'Erreur interne lors de la récupération des rappels',
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          null,
          c.req.path,
        ),
        HttpStatusCode.INTERNAL_SERVER_ERROR,
      );
    }
  })

  router.get('/:id', async (c) => {
    try {
      const id = c.req.param('id');
      const result = await rappelUseCases.findById(id);
      if (typeof result === 'string') {
        return c.json(
          createErrorResponse(
            result,
            HttpStatusCode.NOT_FOUND,
            [result],
            c.req.path,
          ),
          HttpStatusCode.NOT_FOUND,
        );
      }
      return c.json(
        createSuccessResponse(
          result,
          'Rappel récupéré avec succès',
          HttpStatusCode.OK,
          c.req.path,
        ),
        HttpStatusCode.OK,
      );
    } catch {
      return c.json(
        createErrorResponse(
          'Erreur interne lors de la récupération du rappel',
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          null,
          c.req.path,
        ),
        HttpStatusCode.INTERNAL_SERVER_ERROR,
      );
    }
  })

  router.delete('/:id', async (c) => {
    try {
      const id = c.req.param('id');
      const result = await rappelUseCases.delete(id);
      if (typeof result === 'string') {
        return c.json(
          createErrorResponse(
            result,
            HttpStatusCode.BAD_REQUEST,
            [result],
            c.req.path,
          ),
          HttpStatusCode.BAD_REQUEST,
        );
      }
      return c.json(
        createSuccessResponse(
          null,
          'Rappel supprimé avec succès',
          HttpStatusCode.OK,
          c.req.path,
        ),
        HttpStatusCode.OK,
      );
    } catch {
      return c.json(
        createErrorResponse(
          'Erreur interne lors de la suppression du rappel',
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          null,
          c.req.path,
        ),
        HttpStatusCode.INTERNAL_SERVER_ERROR,
      );
    }
  })

  return router;
}
