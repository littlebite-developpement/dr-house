import type { IMedicamentRepository } from '../../domaine/repositories/medicament-repository.js';
import type { CreateMedicamentRequest, UpdateMedicamentRequest, MedicamentResponse } from '../dto/medicament-dto.js';
import type { PaginationParams, PaginatedResult } from '../../domaine/repositories/types.js';

export class MedicamentUseCases {
  constructor(private readonly medicamentRepository: IMedicamentRepository) {}

  async create(request: CreateMedicamentRequest): Promise<MedicamentResponse | string> {
    const medicament = await this.medicamentRepository.create({
      nom: request.nom,
      forme: request.forme ?? null,
      dosage: request.dosage ?? null,
    });
    if (typeof medicament === 'string') {
      return medicament;
    }
    return this.toResponse(medicament);
  }

  async findById(id: string): Promise<MedicamentResponse | string> {
    const medicament = await this.medicamentRepository.findById(id);
    if (typeof medicament === 'string') {
      return medicament;
    }
    return this.toResponse(medicament);
  }

  async findAll(params?: PaginationParams): Promise<PaginatedResult<MedicamentResponse> | string> {
    const result = await this.medicamentRepository.findAll(params);
    if (typeof result === 'string') {
      return result;
    }
    return {
      ...result,
      data: result.data.map(m => this.toResponse(m)),
    };
  }

  async update(id: string, request: UpdateMedicamentRequest): Promise<MedicamentResponse | string> {
    const medicament = await this.medicamentRepository.update(id, {
      nom: request.nom,
      forme: request.forme,
      dosage: request.dosage,
    });
    if (typeof medicament === 'string') {
      return medicament;
    }
    return this.toResponse(medicament);
  }

  async delete(id: string): Promise<void | string> {
    return this.medicamentRepository.delete(id);
  }

  private toResponse(medicament: any): MedicamentResponse {
    return {
      id: medicament.id,
      nom: medicament.nom,
      forme: medicament.forme,
      dosage: medicament.dosage,
    };
  }
}
