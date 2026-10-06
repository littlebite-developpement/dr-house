export class TransactionRef {
  private constructor(private readonly value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('La référence de transaction ne peut pas être vide');
    }
  }

  static create(value: string): TransactionRef {
    return new TransactionRef(value.trim());
  }

  toString(): string {
    return this.value;
  }
}
