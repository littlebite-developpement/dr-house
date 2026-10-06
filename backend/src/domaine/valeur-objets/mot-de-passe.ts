export class MotDePasse {
  private constructor(private readonly value: string) {
    if (value.length < 8) {
      throw new Error('Le mot de passe doit contenir au moins 8 caractères');
    }
  }

  static create(value: string): MotDePasse {
    return new MotDePasse(value);
  }

  static fromHash(hashedValue: string): MotDePasse {
    return new MotDePasse(hashedValue);
  }

  toString(): string {
    return this.value;
  }

  equals(other: MotDePasse): boolean {
    return this.value === other.value;
  }
}
