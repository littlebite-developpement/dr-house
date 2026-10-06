import type { IPharmacieRepository } from '../../domaine/repositories/pharmacie-repository.js';
import type { PharmacieService } from '../../domaine/services/pharmacie-service.js';
import type { CreatePharmacieRequest, UpdatePharmacieRequest, PharmacieResponse } from '../dto/pharmacie-dto.js';
import type { PaginationParams, PaginatedResult } from '../../domaine/repositories/types.js';

export class PharmacieUseCases {
  constructor(
    private readonly pharmacieRepository: IPharmacieRepository,
    private readonly pharmacieService: PharmacieService,
  ) {}

  async create(request: CreatePharmacieRequest): Promise<PharmacieResponse | string> {
    const pharmacie = await this.pharmacieRepository.create({
      nom: request.nom,
      adresse: request.adresse,
      telephone: request.telephone ?? null,
      estDeGarde: request.estDeGarde ?? false,
    });
    if (typeof pharmacie === 'string') {
      return pharmacie;
    }
    return this.toResponse(pharmacie);
  }

  async findById(id: string): Promise<PharmacieResponse | string> {
    const pharmacie = await this.pharmacieRepository.findById(id);
    if (typeof pharmacie === 'string') {
      return pharmacie;
    }
    return this.toResponse(pharmacie);
  }

  async findAll(params?: PaginationParams): Promise<PaginatedResult<PharmacieResponse> | string> {
    const result = await this.pharmacieRepository.findAll(params);
    if (typeof result === 'string') {
      return result;
    }
    return {
      ...result,
      data: result.data.map(p => this.toResponse(p)),
    };
  }

  async update(id: string, request: UpdatePharmacieRequest): Promise<PharmacieResponse | string> {
    const pharmacie = await this.pharmacieRepository.update(id, {
      nom: request.nom,
      adresse: request.adresse,
      telephone: request.telephone,
      estDeGarde: request.estDeGarde,
    });
    if (typeof pharmacie === 'string') {
      return pharmacie;
    }
    return this.toResponse(pharmacie);
  }

  async delete(id: string): Promise<void | string> {
    return this.pharmacieRepository.delete(id);
  }

  async getPharmaciesDeGarde(): Promise<PharmacieResponse[] | string> {
    const pharmacies = await this.pharmacieService.getPharmaciesDeGarde();
    if (typeof pharmacies === 'string') {
      return pharmacies;
    }
    return pharmacies.map(p => this.toResponse(p));
  }

  private toResponse(pharmacie: any): PharmacieResponse {
    return {
      id: pharmacie.id,
      nom: pharmacie.nom,
      adresse: pharmacie.adresse,
      telephone: pharmacie.telephone,
      estDeGarde: pharmacie.estDeGarde,
    };
  }
}
