// ============================================================================
// CODES DE STATUT HTTP
// ============================================================================

export enum HttpStatusCode {
  // 2xx - Succès
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,

  // 3xx - Redirection
  MOVED_PERMANENTLY = 301,
  FOUND = 302,
  NOT_MODIFIED = 304,

  // 4xx - Erreurs client
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  TOO_MANY_REQUESTS = 429,

  // 5xx - Erreurs serveur
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
}

// ============================================================================
// REPONSE GENERIQUE DU SERVEUR
// ============================================================================

export interface ApiResponse<T = unknown> {
  success: boolean;
  statusCode: HttpStatusCode;
  message: string;
  data: T | null;
  errors: string[] | null;
  timestamp: string;
  path: string | null;
}

// ============================================================================
// FONCTIONS UTILITAIRES
// ============================================================================

export function createSuccessResponse<T>(
  data: T,
  message: string = 'Succès',
  statusCode: HttpStatusCode = HttpStatusCode.OK,
  path: string | null = null,
): ApiResponse<T> {
  return {
    success: true,
    statusCode,
    message,
    data,
    errors: null,
    timestamp: new Date().toISOString(),
    path,
  };
}

export function createErrorResponse(
  message: string,
  statusCode: HttpStatusCode = HttpStatusCode.BAD_REQUEST,
  errors: string[] | null = null,
  path: string | null = null,
): ApiResponse<null> {
  return {
    success: false,
    statusCode,
    message,
    data: null,
    errors,
    timestamp: new Date().toISOString(),
    path,
  };
}

// ============================================================================
// TYPES DE REPONSES COURANTES
// ============================================================================

export interface PaginatedData<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ValidationError {
  field: string;
  message: string;
}
