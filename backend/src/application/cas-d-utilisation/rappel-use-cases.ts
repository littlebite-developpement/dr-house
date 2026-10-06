import type { IRappelPriseRepository } from '../../domaine/repositories/rappel-prise-repository.js';
import type { RappelPriseService } from '../../domaine/services/rappel-prise-service.js';
import type { CreateRappelRequest, RappelResponse } from '../dto/rappel-dto.js';
export class RappelUseCases {
  constructor(
    private readonly rappelRepository: IRappelPriseRepository,
    private readonly rappelService: RappelPriseService,
  ) {}
  async create(
    request: CreateRappelRequest
  ): Promise<RappelResponse | string> {
      const rappel = await this.rappelService.creerRappel(
        request.patientId,
        request.ligneOrdonnanceId,
        request.heurePrise,
        request.dateRappel,
      );
      if (typeof rappel === 'string') {
        return rappel;
      }
      return this.toResponse(rappel);
  }
  async findById(
    id: string
  ): Promise<RappelResponse | string> {
      const rappel = await this.rappelRepository.findById(id);
      if (typeof rappel === 'string') {
        return rappel;
      }
      return this.toResponse(rappel);
  }
  async markAsPris(
    id: string
  ): Promise<RappelResponse | string> {
      const rappel = await this.rappelService.marquerCommePris(id);
      if (typeof rappel === 'string') {
        return rappel;
      }
      return this.toResponse(rappel);
  }
  async getRappelsDuJour(
    patientId: string
  ): Promise<RappelResponse[] | string> {
      const rappels = await this.rappelService.getRappelsDuJour(patientId);
      if (typeof rappels === 'string') {
        return rappels;
      }
      return rappels.map(r => this.toResponse(r));
  }
  async getRappelsEnAttente(
    patientId: string
  ): Promise<RappelResponse[] | string> {
      const rappels =
        await this.rappelService.getRappelsEnAttente(patientId);
      if (typeof rappels === 'string') {
        return rappels;
      }
      return rappels.map(r => this.toResponse(r));
  }
  async delete(
    id: string
  ): Promise<void | string> {
      const result = await this.rappelRepository.delete(id);
      if (typeof result === 'string') {
        return result;
      }
      return;
  }
  private toResponse(rappel: any): RappelResponse {
    return {
      id: rappel.id,
      patientId: rappel.patientId,
      ligneOrdonnanceId: rappel.ligneOrdonnanceId,
      heurePrise: rappel.heurePrise,
      dateRappel: rappel.dateRappel,
      pris: rappel.pris,
    };
  }
}
