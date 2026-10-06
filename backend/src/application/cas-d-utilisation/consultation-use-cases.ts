import type { IConsultationRepository } from '../../domaine/repositories/consultation-repository.js';
import type { CreateConsultationRequest, UpdateConsultationRequest, ConsultationResponse } from '../dto/consultation-dto.js';

export class ConsultationUseCases {
  constructor(private readonly consultationRepository: IConsultationRepository) {}

  async create(request: CreateConsultationRequest): Promise<ConsultationResponse | string> {
    const consultation = await this.consultationRepository.create({
      rdvId: request.rdvId ?? null,
      patientId: request.patientId,
      medecinId: request.medecinId,
      motif: request.motif,
      diagnostic: request.diagnostic,
      observations: request.observations ?? null,
    });
    if (typeof consultation === 'string') {
      return consultation;
    }
    return this.toResponse(consultation);
  }

  async findById(id: string): Promise<ConsultationResponse | string> {
    const consultation = await this.consultationRepository.findById(id);
    if (typeof consultation === 'string') {
      return consultation;
    }
    return this.toResponse(consultation);
  }

  async update(id: string, request: UpdateConsultationRequest): Promise<ConsultationResponse | string> {
    const consultation = await this.consultationRepository.update(id, {
      motif: request.motif,
      diagnostic: request.diagnostic,
      observations: request.observations,
    });
    if (typeof consultation === 'string') {
      return consultation;
    }
    return this.toResponse(consultation);
  }

  async delete(id: string): Promise<void | string> {
    return this.consultationRepository.delete(id);
  }

  private toResponse(consultation: any): ConsultationResponse {
    return {
      id: consultation.id,
      rdvId: consultation.rdvId,
      patientId: consultation.patientId,
      medecinId: consultation.medecinId,
      dateConsultation: consultation.dateConsultation,
      motif: consultation.motif,
      diagnostic: consultation.diagnostic,
      observations: consultation.observations,
    };
  }
}
