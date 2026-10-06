// Erreurs métier : portent le code HTTP, lu par le error-handler.
export class AppError extends Error {
  constructor(message: string, public readonly status: number = 400) {
    super(message);
    this.name = new.target.name;
  }
}

export class RequeteInvalideError extends AppError {
  constructor(message: string) { super(message, 400); }
}
export class AccesInterditError extends AppError {
  constructor(message = 'Accès non autorisé') { super(message, 403); }
}
export class NonTrouveError extends AppError {
  constructor(message: string) { super(message, 404); }
}
export class ConflitError extends AppError {
  constructor(message: string) { super(message, 409); }
}
