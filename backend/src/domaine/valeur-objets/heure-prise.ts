export class HeurePrise {
  private constructor(private readonly value: string) {
    if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(value)) {
      throw new Error(`Heure invalide: ${value}. Format attendu: HH:MM`);
    }
  }

  static create(value: string): HeurePrise {
    return new HeurePrise(value);
  }

  toString(): string {
    return this.value;
  }
}
