import type { IPatientRepository } from '../../domaine/repositories/patient-repository.js';
import type { IUtilisateurRepository } from '../../domaine/repositories/utilisateur-repository.js';
import type { IAuthPort } from '../ports/auth-port.js';
import type { CreatePatientRequest, UpdatePatientRequest, PatientResponse } from '../dto/patient-dto.js';
import { Role } from '../../domaine/entites/enums.js';
import { DateNaissance } from '../../domaine/valeur-objets/date-naissance.js';

export class PatientUseCases {
  constructor(
    private readonly patientRepository: IPatientRepository,
    private readonly utilisateurRepository: IUtilisateurRepository,
  ) {}

  async create(request: CreatePatientRequest): Promise<PatientResponse | string> {
    const patient = await this.patientRepository.create({
      dateNaissance: request.dateNaissance,
      sexe: request.sexe,
      poids: request.poids ?? null,
      taille: request.taille ?? null,
      groupeSanguin: request.groupeSanguin ?? null,
      utilisateur: {
        nom: request.nom,
        prenom: request.prenom,
        email: request.email,
        telephone: request.telephone,
        motDePasse: request.motDePasse,
        role: Role.PATIENT,
      },
    });

    if (typeof patient === 'string') {
      return patient;
    }
    return this.toResponse(patient);
  }

  async findById(id: string): Promise<PatientResponse | string> {
    const patient = await this.patientRepository.findById(id);
    if (typeof patient === 'string') {
      return patient;
    }
    return this.toResponse(patient);
  }

  async update(id: string, request: UpdatePatientRequest): Promise<PatientResponse | string> {
    const patient = await this.patientRepository.update(id, {
      poids: request.poids ?? undefined,
      taille: request.taille ?? undefined,
      groupeSanguin: request.groupeSanguin ?? undefined,
    });
    if (typeof patient === 'string') {
      return patient;
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

    return this.toResponse(patient);
  }

  async delete(id: string): Promise<void | string> {
    return this.patientRepository.delete(id);
  }

  private toResponse(patient: any): PatientResponse {
    const dateNaissance = DateNaissance.create(patient.dateNaissance);
    return {
      id: patient.id,
      nom: patient.utilisateur.nom,
      prenom: patient.utilisateur.prenom,
      email: patient.utilisateur.email,
      telephone: patient.utilisateur.telephone,
      dateNaissance: patient.dateNaissance,
      sexe: patient.sexe,
      poids: patient.poids,
      taille: patient.taille,
      groupeSanguin: patient.groupeSanguin,
      age: dateNaissance.getAge(),
    };
  }
}
