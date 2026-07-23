// Static data for Admin Dashboard
export const staticUsers = [
  {
    _id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    phone: '+1234567890',
    role: 'admin',
    isActive: true,
    lastLogin: new Date().toISOString(),
    createdAt: new Date('2023-01-01').toISOString()
  },
  {
    _id: '2',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1987654321',
    role: 'user',
    isActive: true,
    lastLogin: new Date().toISOString(),
    createdAt: new Date('2023-01-15').toISOString()
  },
  {
    _id: '3',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1122334455',
    role: 'user',
    isActive: false,
    lastLogin: new Date('2023-02-01').toISOString(),
    createdAt: new Date('2023-02-01').toISOString()
  }
];

export const staticStats = {
  totalUsers: 3,
  activeUsers: 2,
  inactiveUsers: 1,
  adminUsers: 1,
  regularUsers: 2,
  newUsersLast30Days: 1
};
