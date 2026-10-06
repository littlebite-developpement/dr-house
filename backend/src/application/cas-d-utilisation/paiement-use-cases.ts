import type { IPaiementRepository } from '../../domaine/repositories/paiement-repository.js';
import type { CreatePaiementRequest, UpdatePaiementRequest, PaiementResponse } from '../dto/paiement-dto.js';
import { StatutPaiement } from '../../domaine/entites/enums.js';

export class PaiementUseCases {
  constructor(private readonly paiementRepository: IPaiementRepository) {}

  async create(request: CreatePaiementRequest): Promise<PaiementResponse | string> {
    const paiement = await this.paiementRepository.create({
      rdvId: request.rdvId ?? null,
      consultationId: request.consultationId ?? null,
      montant: request.montant,
      modePaiement: request.modePaiement,
      statut: StatutPaiement.EN_ATTENTE,
      transactionRef: null,
    });
    if (typeof paiement === 'string') {
      return paiement;
    }
    return this.toResponse(paiement);
  }

  async findById(id: string): Promise<PaiementResponse | string> {
    const paiement = await this.paiementRepository.findById(id);
    if (typeof paiement === 'string') {
      return paiement;
    }
    return this.toResponse(paiement);
  }

  async update(id: string, request: UpdatePaiementRequest): Promise<PaiementResponse | string> {
    const paiement = await this.paiementRepository.update(id, {
      statut: request.statut,
      transactionRef: request.transactionRef,
    });
    if (typeof paiement === 'string') {
      return paiement;
    }
    return this.toResponse(paiement);
  }

  async delete(id: string): Promise<void | string> {
    return this.paiementRepository.delete(id);
  }

  private toResponse(paiement: any): PaiementResponse {
    return {
      id: paiement.id,
      rdvId: paiement.rdvId,
      consultationId: paiement.consultationId,
      montant: paiement.montant,
      modePaiement: paiement.modePaiement,
      statut: paiement.statut,
      transactionRef: paiement.transactionRef,
      datePaiement: paiement.datePaiement,
    };
  }
}
