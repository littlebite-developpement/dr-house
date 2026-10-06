import type { Pharmacie } from '../entites/pharmacie.js';
import type { IPharmacieRepository } from '../repositories/pharmacie-repository.js';

export class PharmacieService {
  constructor(private readonly pharmacieRepository: IPharmacieRepository) {}

  async getPharmaciesDeGarde(): Promise<Pharmacie[] | string> {
    return this.pharmacieRepository.findDeGarde();
  }

  async estDeGarde(pharmacieId: string): Promise<boolean | string> {
    const pharmacie = await this.pharmacieRepository.findById(pharmacieId);
    if (typeof pharmacie === 'string') {
      return pharmacie;
    }
    return pharmacie.estDeGarde;
  }
}
