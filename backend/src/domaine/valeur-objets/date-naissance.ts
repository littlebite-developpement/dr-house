export class DateNaissance {
  private constructor(private readonly value: Date) {
    const now = new Date();
    if (value > now) {
      throw new Error('La date de naissance ne peut pas être dans le futur');
    }
  }

  static create(value: Date): DateNaissance {
    return new DateNaissance(value);
  }

  toDate(): Date {
    return this.value;
  }

  getAge(): number {
    const now = new Date();
    let age = now.getFullYear() - this.value.getFullYear();
    const monthDiff = now.getMonth() - this.value.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < this.value.getDate())) {
      age--;
    }
    return age;
  }
}
