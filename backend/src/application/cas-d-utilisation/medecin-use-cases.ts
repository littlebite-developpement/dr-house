import type { IMedecinRepository } from '../../domaine/repositories/medecin-repository.js';
import type { IUtilisateurRepository } from '../../domaine/repositories/utilisateur-repository.js';
import type { IAuthPort } from '../ports/auth-port.js';
import type { CreateMedecinRequest, UpdateMedecinRequest, MedecinResponse } from '../dto/medecin-dto.js';
import { Role } from '../../domaine/entites/enums.js';

export class MedecinUseCases {
  constructor(
    private readonly medecinRepository: IMedecinRepository,
    private readonly utilisateurRepository: IUtilisateurRepository,
  ) {}

  async create(request: CreateMedecinRequest): Promise<MedecinResponse | string> {
    const medecin = await this.medecinRepository.create({
      specialite: request.specialite,
      numOrdre: request.numOrdre,
      hopitalId: request.hopitalId ?? null,
      utilisateur: {
        nom: request.nom,
        prenom: request.prenom,
        email: request.email,
        telephone: request.telephone,
        motDePasse: request.motDePasse,
        role: Role.MEDECIN,
      },
    });

    if (typeof medecin === 'string') {
      return medecin;
    }
    return this.toResponse(medecin);
  }

  async findById(id: string): Promise<MedecinResponse | string> {
    const medecin = await this.medecinRepository.findById(id);
    if (typeof medecin === 'string') {
      return medecin;
    }
    return this.toResponse(medecin);
  }

  async update(id: string, request: UpdateMedecinRequest): Promise<MedecinResponse | string> {
    const medecin = await this.medecinRepository.update(id, {
      specialite: request.specialite ?? undefined,
      hopitalId: request.hopitalId ?? undefined,
    });
    if (typeof medecin === 'string') {
      return medecin;
    }

    if (request.nom || request.prenom || request.telephone) {
      const utilisateur = await this.utilisateurRepository.update(id, {
        nom: request.nom ?? undefined,
        prenom: request.prenom ?? undefined,
        telephone: request.telephone ?? undefined,
      });
      if (typeof utilisateur === 'string') {
        return utilisateur;
      }
    }

    return this.toResponse(medecin);
  }

  async delete(id: string): Promise<void | string> {
    return this.medecinRepository.delete(id);
  }

  private toResponse(medecin: any): MedecinResponse {
    return {
      id: medecin.id,
      nom: medecin.utilisateur.nom,
      prenom: medecin.utilisateur.prenom,
      email: medecin.utilisateur.email,
      telephone: medecin.utilisateur.telephone,
      specialite: medecin.specialite,
      numOrdre: medecin.numOrdre,
      hopitalId: medecin.hopitalId,
    };
  }
}
