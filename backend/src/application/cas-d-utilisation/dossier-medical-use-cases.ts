import type { IDossierMedicalRepository } from '../../domaine/repositories/dossier-medical-repository.js';
import type { CreateDossierMedicalRequest, UpdateDossierMedicalRequest, DossierMedicalResponse } from '../dto/dossier-medical-dto.js';

export class DossierMedicalUseCases {
  constructor(private readonly dossierRepository: IDossierMedicalRepository) {}

  async create(request: CreateDossierMedicalRequest): Promise<DossierMedicalResponse | string> {
    const dossier = await this.dossierRepository.create({
      patientId: request.patientId,
      antecedents: request.antecedents ?? null,
      allergies: request.allergies ?? null,
    });
    if (typeof dossier === 'string') {
      return dossier;
    }
    return this.toResponse(dossier);
  }

  async findById(id: string): Promise<DossierMedicalResponse | string> {
    const dossier = await this.dossierRepository.findById(id);
    if (typeof dossier === 'string') {
      return dossier;
    }
    return this.toResponse(dossier);
  }

  async findByPatientId(patientId: string): Promise<DossierMedicalResponse | string> {
    const dossier = await this.dossierRepository.findByPatientId(patientId);
    if (typeof dossier === 'string') {
      return dossier;
    }
    return this.toResponse(dossier);
  }

  async update(id: string, request: UpdateDossierMedicalRequest): Promise<DossierMedicalResponse | string> {
    const dossier = await this.dossierRepository.update(id, {
      antecedents: request.antecedents,
      allergies: request.allergies,
    });
    if (typeof dossier === 'string') {
      return dossier;
    }
    return this.toResponse(dossier);
  }

  async delete(id: string): Promise<void | string> {
    return this.dossierRepository.delete(id);
  }

  private toResponse(dossier: any): DossierMedicalResponse {
    return {
      id: dossier.id,
      patientId: dossier.patientId,
      antecedents: dossier.antecedents,
      allergies: dossier.allergies,
      dateCreation: dossier.dateCreation,
      updatedAt: dossier.updatedAt,
    };
  }
}
