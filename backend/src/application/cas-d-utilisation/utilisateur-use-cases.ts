import type { IUtilisateurRepository } from '../../domaine/repositories/utilisateur-repository.js';
import type { IAuthPort } from '../ports/auth-port.js';
import type { LoginRequest, LoginResponse, RegisterRequest } from '../dto/auth-dto.js';
import { Role } from '../../domaine/entites/enums.js';
import type { Utilisateur } from '../../domaine/entites/utilisateur.js';

export class UserUseCases {
  constructor(
    private readonly utilisateurRepository: IUtilisateurRepository,
  ) {}

  async findById(id: string): Promise<Utilisateur | string> {
    const utilisateur = await this.utilisateurRepository.findById(id);
    switch (typeof utilisateur) {
      case 'string':
        return utilisateur;
      case 'object':
        return utilisateur;
      default:
        return 'Utilisateur non trouvé';
    }
  }
}
