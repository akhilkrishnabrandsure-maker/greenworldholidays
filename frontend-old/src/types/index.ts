export interface User {
  _id?: string;
  name?: string;
  email?: string;
  phone?: string;
  role?: string;
  isActive?: boolean;
  lastLogin?: string;
  createdAt?: string;
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
  users: User[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalUsers: number;
    usersPerPage: number;
  };
}
