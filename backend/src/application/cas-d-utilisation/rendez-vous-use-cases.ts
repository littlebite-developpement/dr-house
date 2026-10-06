import type { IRendezVousRepository } from '../../domaine/repositories/rendez-vous-repository.js';
import type { RendezVousService } from '../../domaine/services/rendez-vous-service.js';
import type { CreateRendezVousRequest, UpdateRendezVousRequest, RendezVousResponse } from '../dto/rendez-vous-dto.js';

export class RendezVousUseCases {
  constructor(
    private readonly rdvRepository: IRendezVousRepository,
    private readonly rdvService: RendezVousService,
  ) {}

  async create(request: CreateRendezVousRequest): Promise<RendezVousResponse | string> {
    const rdv = await this.rdvService.planifierRendezVous(
      request.patientId,
      request.medecinId,
      request.dateRdv,
      request.heureRdv,
      request.motif,
    );
    if (typeof rdv === 'string') {
      return rdv;
    }
    return this.toResponse(rdv);
  }

  async findById(id: string): Promise<RendezVousResponse | string> {
    const rdv = await this.rdvRepository.findById(id);
    if (typeof rdv === 'string') {
      return rdv;
    }
    return this.toResponse(rdv);
  }

  async confirm(id: string): Promise<RendezVousResponse | string> {
    const rdv = await this.rdvService.confirmerRendezVous(id);
    if (typeof rdv === 'string') {
      return rdv;
    }
    return this.toResponse(rdv);
  }

  async cancel(id: string): Promise<RendezVousResponse | string> {
    const rdv = await this.rdvService.annulerRendezVous(id);
    if (typeof rdv === 'string') {
      return rdv;
    }
    return this.toResponse(rdv);
  }

  async complete(id: string): Promise<RendezVousResponse | string> {
    const rdv = await this.rdvService.terminerRendezVous(id);
    if (typeof rdv === 'string') {
      return rdv;
    }
    return this.toResponse(rdv);
  }

  async update(id: string, request: UpdateRendezVousRequest): Promise<RendezVousResponse | string> {
    const rdv = await this.rdvRepository.update(id, {
      dateRdv: request.dateRdv,
      heureRdv: request.heureRdv,
      motif: request.motif,
      statut: request.statut,
    });
    if (typeof rdv === 'string') {
      return rdv;
    }
    return this.toResponse(rdv);
  }

  async delete(id: string): Promise<void | string> {
    return this.rdvRepository.delete(id);
  }

  private toResponse(rdv: any): RendezVousResponse {
    return {
      id: rdv.id,
      patientId: rdv.patientId,
      medecinId: rdv.medecinId,
      dateRdv: rdv.dateRdv,
      heureRdv: rdv.heureRdv,
      statut: rdv.statut,
      motif: rdv.motif,
      createdAt: rdv.createdAt,
    };
  }
}
