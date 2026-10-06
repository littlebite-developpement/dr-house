export class NumOrdre {
  private constructor(private readonly value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('Le numéro d\'ordre ne peut pas être vide');
    }
  }

  static create(value: string): NumOrdre {
    return new NumOrdre(value.trim());
  }

  toString(): string {
    return this.value;
  }
}
