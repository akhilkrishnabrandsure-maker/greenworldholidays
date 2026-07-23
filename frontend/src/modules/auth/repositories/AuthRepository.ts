import { AuthSession, LoginRequest, RegisterRequest, AuthResponse } from '../types/AuthTypes';

// Mock database
const MOCK_USERS = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@greenworld.com',
    role: 'admin' as const,
  },
  {
    id: '2',
    name: 'Test User',
    email: 'test@example.com',
    role: 'user' as const,
  }
];

export const AuthRepository = {
  async login(request: LoginRequest): Promise<AuthResponse> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const user = MOCK_USERS.find(u => u.email === request.email);

    if (user) {
      // Create a mock token
      const token = `mock-token-${Date.now()}`;
      return {
        success: true,
        message: 'Login successful',
        session: { token, user }
      };
    }

    return {
      success: false,
      message: 'Invalid credentials',
    };
  },

  async register(request: RegisterRequest): Promise<AuthResponse> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    if (MOCK_USERS.some(u => u.email === request.email)) {
      return {
        success: false,
        message: 'Email already exists',
      };
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name: request.name,
      email: request.email,
      role: 'user' as const,
    };

    MOCK_USERS.push(newUser);

    const token = `mock-token-${Date.now()}`;

    return {
      success: true,
      message: 'Registration successful',
      session: { token, user: newUser }
    };
  },

  async logout(): Promise<void> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
  }
};
