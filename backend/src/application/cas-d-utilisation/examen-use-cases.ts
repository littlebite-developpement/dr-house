import type { IExamenRepository } from '../../domaine/repositories/examen-repository.js';
import type { CreateExamenRequest, UpdateExamenRequest, ExamenResponse } from '../dto/examen-dto.js';

export class ExamenUseCases {
  constructor(private readonly examenRepository: IExamenRepository) {}

  async create(request: CreateExamenRequest): Promise<ExamenResponse | string> {
    const examen = await this.examenRepository.create({
      consultationId: request.consultationId ?? null,
      dossierMedicalId: request.dossierMedicalId ?? null,
      typeExamen: request.typeExamen,
      description: request.description ?? null,
      resultat: request.resultat ?? null,
      dateExamen: request.dateExamen ?? null,
    });
    if (typeof examen === 'string') {
      return examen;
    }
    return this.toResponse(examen);
  }

  async findById(id: string): Promise<ExamenResponse | string> {
    const examen = await this.examenRepository.findById(id);
    if (typeof examen === 'string') {
      return examen;
    }
    return this.toResponse(examen);
  }

  async update(id: string, request: UpdateExamenRequest): Promise<ExamenResponse | string> {
    const examen = await this.examenRepository.update(id, {
      typeExamen: request.typeExamen,
      description: request.description,
      resultat: request.resultat,
      dateExamen: request.dateExamen,
    });
    if (typeof examen === 'string') {
      return examen;
    }
    return this.toResponse(examen);
  }

  async delete(id: string): Promise<void | string> {
    return this.examenRepository.delete(id);
  }

  private toResponse(examen: any): ExamenResponse {
    return {
      id: examen.id,
      consultationId: examen.consultationId,
      dossierMedicalId: examen.dossierMedicalId,
      typeExamen: examen.typeExamen,
      description: examen.description,
      resultat: examen.resultat,
      dateExamen: examen.dateExamen,
    };
  }
}
