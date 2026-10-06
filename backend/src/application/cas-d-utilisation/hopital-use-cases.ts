import type { IHopitalRepository } from '../../domaine/repositories/hopital-repository.js';
import type { CreateHopitalRequest, UpdateHopitalRequest, HopitalResponse } from '../dto/hopital-dto.js';
import type { PaginationParams, PaginatedResult } from '../../domaine/repositories/types.js';

export class HopitalUseCases {
  constructor(private readonly hopitalRepository: IHopitalRepository) {}

  async create(request: CreateHopitalRequest): Promise<HopitalResponse | string> {
    const hopital = await this.hopitalRepository.create({
      nom: request.nom,
      adresse: request.adresse,
      telephone: request.telephone ?? null,
      ville: request.ville,
    });
    if (typeof hopital === 'string') {
      return hopital;
    }
    return this.toResponse(hopital);
  }

  async findById(id: string): Promise<HopitalResponse | string> {
    const hopital = await this.hopitalRepository.findById(id);
    if (typeof hopital === 'string') {
      return hopital;
    }
    return this.toResponse(hopital);
  }

  async findAll(params?: PaginationParams): Promise<PaginatedResult<HopitalResponse> | string> {
    const result = await this.hopitalRepository.findAll(params);
    if (typeof result === 'string') {
      return result;
    }
    return {
      ...result,
      data: result.data.map(h => this.toResponse(h)),
    };
  }

  async update(id: string, request: UpdateHopitalRequest): Promise<HopitalResponse | string> {
    const hopital = await this.hopitalRepository.update(id, {
      nom: request.nom,
      adresse: request.adresse,
      telephone: request.telephone,
      ville: request.ville,
    });
    if (typeof hopital === 'string') {
      return hopital;
    }
    return this.toResponse(hopital);
  }

  async delete(id: string): Promise<void | string> {
    return this.hopitalRepository.delete(id);
  }

  private toResponse(hopital: any): HopitalResponse {
    return {
      id: hopital.id,
      nom: hopital.nom,
      adresse: hopital.adresse,
      telephone: hopital.telephone,
      ville: hopital.ville,
    };
  }
}
