// Using relative path for development (handled by Vite proxy)
// In production, this should be an environment variable
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://greenworld-holidays.onrender.com/api' 
  : '/api';


export interface UserData {
  _id: string;
  name: string;
  email: string;
  phone: string;
  password?: string;
  role: string;
  balance?: number;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface RegisterUserData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  user?: T; // Keeping for backward compatibility
  token?: string;
  errors?: string[];
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  adminUsers: number;
  regularUsers: number;
  newUsersLast30Days: number;
}

export interface UsersResponse {
  users: UserData[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalUsers: number;
    usersPerPage: number;
  };
}

class ApiService {
  private async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, defaultOptions);
      
      let data: any = null;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        try {
          data = await response.json();
        } catch (jsonErr) {
          console.error('Error parsing JSON response:', jsonErr);
        }
      }

      if (!response.ok) {
        throw new Error((data && data.message) || `Server returned error status ${response.status}`);
      }

      return data as T;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Network error');
    }
  }

  async registerUser(userData: RegisterUserData): Promise<ApiResponse<UserData>> {
    try {
      const response = await this.makeRequest<ApiResponse<UserData>>('/users/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      });

      // If registration is successful, send WebSocket notification
      if (response.success && response.data) {
        try {
          const webSocketService = (await import('./websocketService')).webSocketService;
          webSocketService.send({
            type: 'USER_SIGNUP',
            data: {
              userId: response.data._id,
              name: response.data.name,
              phone: response.data.phone,
              email: response.data.email,
              timestamp: new Date().toISOString()
            }
          });
        } catch (error) {
          console.error('Error sending WebSocket notification:', error);
        }
      }

      return response;
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Registration failed',
        errors: ['An error occurred during registration']
      };
    }
  }

  async loginUser(email: string, password: string): Promise<ApiResponse<UserData>> {
    return this.makeRequest<ApiResponse<UserData>>('/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async getUserProfile(token: string): Promise<ApiResponse<UserData>> {
    return this.makeRequest<ApiResponse<UserData>>('/users/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  async updateUserProfile(token: string, userData: Partial<UserData>): Promise<ApiResponse<UserData>> {
    return this.makeRequest<ApiResponse<UserData>>('/users/profile', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
  }

  // Admin functions
  async getAllUsers(token: string, page: number = 1, limit: number = 10): Promise<UsersResponse> {
    return this.makeRequest<UsersResponse>(`/users/admin/users?page=${page}&limit=${limit}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  async getUserStats(token: string): Promise<{ stats: UserStats }> {
    return this.makeRequest<{ stats: UserStats }>('/users/admin/users/stats', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  async getUserById(token: string, userId: string): Promise<ApiResponse<UserData>> {
    return this.makeRequest<ApiResponse<UserData>>(`/users/admin/users/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  async createUser(token: string, userData: UserData & { role?: string }): Promise<ApiResponse<UserData>> {
    return this.makeRequest<ApiResponse<UserData>>('/users/admin/users', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
  }

  async updateUser(token: string, userId: string, userData: Partial<UserData & { role?: string; isActive?: boolean }>): Promise<ApiResponse<UserData>> {
    return this.makeRequest<ApiResponse<UserData>>(`/users/admin/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
  }

  async deleteUser(token: string, userId: string): Promise<{ message: string }> {
    return this.makeRequest<{ message: string }>(`/users/admin/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  // Balance Management
  async getUserBalance(token: string, userId: string): Promise<{ balance: number }> {
    return this.makeRequest<{ balance: number }>(`/users/${userId}/balance`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  async updateUserBalance(
    token: string, 
    userId: string, 
    amount: number, 
    action: 'add' | 'subtract' | 'set' = 'set'
  ): Promise<{ balance: number; message: string }> {
    return this.makeRequest<{ balance: number; message: string }>(
      `/users/${userId}/balance`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ amount, action }),
      }
    );
  }

  async toggleUserStatus(token: string, userId: string): Promise<ApiResponse> {
    return this.makeRequest<ApiResponse>(`/users/admin/users/${userId}/toggle-status`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  // Forgot Password methods (EMAIL)
  async sendOTPEmail(email: string): Promise<ApiResponse> {
    return this.makeRequest<ApiResponse>('/users/forgot-password/send-otp', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async verifyOTPEmail(email: string, otp: string): Promise<ApiResponse> {
    return this.makeRequest<ApiResponse>('/users/forgot-password/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ email, otp }),
    });
  }

  async resetPasswordEmail(email: string, otp: string, newPassword: string): Promise<ApiResponse> {
    return this.makeRequest<ApiResponse>('/users/forgot-password/reset', {
      method: 'POST',
      body: JSON.stringify({ email, otp, newPassword }),
    });
  }
}

export const apiService = new ApiService();
