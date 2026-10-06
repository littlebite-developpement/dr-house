import type { RappelPrise } from '../entites/rappel-prise.js';
import type { IRappelPriseRepository } from '../repositories/rappel-prise-repository.js';

export class RappelPriseService {
  constructor(private readonly rappelRepository: IRappelPriseRepository) {}

  async creerRappel(
    patientId: string,
    ligneOrdonnanceId: string,
    heurePrise: string,
    dateRappel: Date,
  ): Promise<RappelPrise | string> {
    return this.rappelRepository.create({
      patientId,
      ligneOrdonnanceId,
      heurePrise,
      dateRappel,
      pris: false,
    });
  }

  async marquerCommePris(rappelId: string): Promise<RappelPrise | string> {
    return this.rappelRepository.markAsPris(rappelId);
  }

  async getRappelsDuJour(patientId: string): Promise<RappelPrise[] | string> {
    const today = new Date();
    return this.rappelRepository.findByDate(today, patientId);
  }

  async getRappelsEnAttente(patientId: string): Promise<RappelPrise[] | string> {
    return this.rappelRepository.findPending(patientId);
  }
}
