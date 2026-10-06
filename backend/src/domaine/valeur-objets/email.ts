export class Email {
  private constructor(private readonly value: string) {
    if (!this.isValid(value)) {
      throw new Error(`Email invalide: ${value}`);
    }
  }

  static create(value: string): Email {
    return new Email(value.toLowerCase().trim());
  }

  private isValid(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  toString(): string {
    return this.value;
  }

  equals(other: Email): boolean {
    return this.value === other.value;
  }
}
