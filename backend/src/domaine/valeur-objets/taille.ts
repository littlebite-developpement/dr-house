export class Taille {
  private constructor(private readonly value: number) {
    if (value <= 0 || value > 300) {
      throw new Error('La taille doit être entre 0 et 300 cm');
    }
  }

  static create(value: number): Taille {
    return new Taille(value);
  }

  toNumber(): number {
    return this.value;
  }
}
