import type { IOrdonnanceRepository } from '../../domaine/repositories/ordonnance-repository.js';
import type { CreateOrdonnanceRequest, OrdonnanceResponse } from '../dto/ordonnance-dto.js';

export class OrdonnanceUseCases {
  constructor(private readonly ordonnanceRepository: IOrdonnanceRepository) {}

  async create(request: CreateOrdonnanceRequest): Promise<OrdonnanceResponse | string> {
    const ordonnance = await this.ordonnanceRepository.create({
      consultationId: request.consultationId ?? null,
      patientId: request.patientId,
      medecinId: request.medecinId,
      instructions: request.instructions ?? null,
      lignes: request.lignes.map(l => ({
        medicamentId: l.medicamentId,
        posologie: l.posologie,
        dureeJours: l.dureeJours,
        quantite: l.quantite,
      })),
    });
    if (typeof ordonnance === 'string') {
      return ordonnance;
    }
    return this.toResponse(ordonnance);
  }

  async findById(id: string): Promise<OrdonnanceResponse | string> {
    const ordonnance = await this.ordonnanceRepository.findById(id);
    if (typeof ordonnance === 'string') {
      return ordonnance;
    }
    return this.toResponse(ordonnance);
  }

  async delete(id: string): Promise<void | string> {
    return this.ordonnanceRepository.delete(id);
  }

  private toResponse(ordonnance: any): OrdonnanceResponse {
    return {
      id: ordonnance.id,
      consultationId: ordonnance.consultationId,
      patientId: ordonnance.patientId,
      medecinId: ordonnance.medecinId,
      dateOrdonnance: ordonnance.dateOrdonnance,
      instructions: ordonnance.instructions,
      lignes: ordonnance.lignes.map((l: any) => ({
        id: l.id,
        medicamentId: l.medicamentId,
        posologie: l.posologie,
        dureeJours: l.dureeJours,
        quantite: l.quantite,
      })),
    };
  }
}
