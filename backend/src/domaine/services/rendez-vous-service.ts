import type { RendezVous } from '../entites/rendez-vous.js';
import { StatutRendezVous } from '../entites/enums.js';
import type { IRendezVousRepository } from '../repositories/rendez-vous-repository.js';

export class RendezVousService {
  constructor(private readonly rdvRepository: IRendezVousRepository) {}

  async planifierRendezVous(
    patientId: string,
    medecinId: string,
    dateRdv: Date,
    heureRdv: string,
    motif?: string,
  ): Promise<RendezVous | string> {
    const now = new Date();
    const rdvDateTime = new Date(`${dateRdv.toISOString().split('T')[0]}T${heureRdv}`);
    if (rdvDateTime < now) {
      return 'La date du rendez-vous ne peut pas être dans le passé';
    }

    const hour = parseInt(heureRdv.split(':')[0], 10);
    if (hour < 8 || hour >= 18) {
      throw new Error('Les rendez-vous sont possibles entre 8h et 18h');
    }

    return this.rdvRepository.create({
      patientId,
      medecinId,
      dateRdv,
      heureRdv,
      statut: StatutRendezVous.PLANIFIE,
      motif: motif,
    });
  }

  async confirmerRendezVous(rdvId: string): Promise<RendezVous | string> {
    const rdv = await this.rdvRepository.findById(rdvId);
    if (typeof rdv === "string") {
      return 'Rendez-vous non trouvé';
    }
    if (rdv.statut !== StatutRendezVous.PLANIFIE) {
      return 'Seul un rendez-vous planifié peut être confirmé';
    }
    return this.rdvRepository.update(rdvId, { statut: StatutRendezVous.CONFIRME });
  }

  async annulerRendezVous(rdvId: string): Promise<RendezVous | string> {
    const rdv = await this.rdvRepository.findById(rdvId);
    if (typeof rdv === 'string') {
      throw new Error('Rendez-vous non trouvé');
    }
    if (rdv.statut === StatutRendezVous.TERMINE) {
      throw new Error('Un rendez-vous terminé ne peut pas être annulé');
    }
    return this.rdvRepository.update(rdvId, { statut: StatutRendezVous.ANNULE });
  }

  async terminerRendezVous(rdvId: string): Promise<RendezVous | string> {
    const rdv = await this.rdvRepository.findById(rdvId);
    if (typeof rdv === 'string') {
      return 'Rendez-vous non trouvé';
    }
    if (rdv.statut !== StatutRendezVous.CONFIRME) {
      return 'Seul un rendez-vous confirmé peut être terminé';
    }
    return this.rdvRepository.update(rdvId, { statut: StatutRendezVous.TERMINE });
  }
}
