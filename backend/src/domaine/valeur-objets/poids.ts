export class Poids {
  private constructor(private readonly value: number) {
    if (value <= 0 || value > 500) {
      throw new Error('Le poids doit être entre 0 et 500 kg');
    }
  }

  static create(value: number): Poids {
    return new Poids(value);
  }

  toNumber(): number {
    return this.value;
  }
}
