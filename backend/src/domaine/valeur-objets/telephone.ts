export class Telephone {
  private constructor(private readonly value: string) {
    if (!this.isValid(value)) {
      throw new Error(`Téléphone invalide: ${value}`);
    }
  }

  static create(value: string): Telephone {
    return new Telephone(value.trim());
  }

  private isValid(tel: string): boolean {
    return /^[+]?[\d\s\-()]{8,20}$/.test(tel);
  }

  toString(): string {
    return this.value;
  }

  equals(other: Telephone): boolean {
    return this.value === other.value;
  }
}
