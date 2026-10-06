export class Montant {
  private constructor(private readonly value: number) {
    if (value < 0) {
      throw new Error('Le montant ne peut pas être négatif');
    }
  }

  static create(value: number): Montant {
    return new Montant(value);
  }

  toNumber(): number {
    return this.value;
  }
}
