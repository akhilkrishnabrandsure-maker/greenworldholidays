export type UserRole = 'guest' | 'user' | 'admin';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface AuthSession {
  token: string;
  user: AuthUser;
}

export interface LoginRequest {
  email: string;
  password?: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password?: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  session?: AuthSession;
}
