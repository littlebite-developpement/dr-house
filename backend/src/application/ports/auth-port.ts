import type { LoginRequest, LoginResponse, RegisterRequest } from "../dto";

export interface IAuthPort {
  login(request: LoginRequest): Promise<LoginResponse>;
  registerPatient(request: RegisterRequest): Promise<LoginResponse>;
  registerDoctor(request: RegisterRequest): Promise<LoginResponse>;
  hashPassword(password: string): Promise<string>;
  comparePassword(password: string, hash: string): Promise<boolean>;
  generateToken(payload: { userId: string; role: string }): string;
  verifyToken(token: string): { userId: string; role: string } | null;
}
