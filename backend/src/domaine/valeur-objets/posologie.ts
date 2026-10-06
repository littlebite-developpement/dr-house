export class Posologie {
  private constructor(private readonly value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('La posologie ne peut pas être vide');
    }
  }

  static create(value: string): Posologie {
    return new Posologie(value.trim());
  }

  toString(): string {
    return this.value;
  }
}
