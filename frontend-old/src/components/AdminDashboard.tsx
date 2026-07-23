import React, { useState, useEffect } from 'react';
import { X, Users, BarChart3, Settings, UserPlus, UserMinus, Activity, Shield, Database, Copy, Phone, Mail } from 'lucide-react';
import { apiService } from '../services/api';
import { NotificationBell } from './NotificationBell';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
}

interface UserStats {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  adminUsers: number;
  regularUsers: number;
  newUsersLast30Days: number;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'settings'>('overview');
  const [showCopyNotification, setShowCopyNotification] = useState(false);
  const [copyMessage, setCopyMessage] = useState('');

  const userToken = localStorage.getItem('userToken');

  useEffect(() => {
    if (isOpen && userToken) {
      loadDashboardData();
    }
  }, [isOpen, userToken]);

  const loadDashboardData = async () => {
    if (!userToken) return;
    
    setIsLoading(true);
    try {
      // Load user statistics
      const statsResponse = await apiService.getUserStats(userToken);
      setStats(statsResponse.stats);

      // Load users list
      const usersResponse = await apiService.getAllUsers(userToken, currentPage);
      setUsers(usersResponse.users);
      setTotalPages(usersResponse.pagination.totalPages);
    } catch (error: unknown) {
      console.error('Error loading dashboard data:', error);
      // You might want to add error state handling here, for example:
      // setError(error instanceof Error ? error.message : 'Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleUserStatus = async (userId: string) => {
    if (!userToken) {
      setError('You must be logged in to perform this action');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      await apiService.toggleUserStatus(userToken, userId);
      
      // Show success message or update UI as needed
      console.log('User status toggled successfully');
      
      // Reload the dashboard data to reflect changes
      await loadDashboardData();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update user status';
      setError(errorMessage);
      console.error('Error toggling user status:', error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await apiService.deleteUser(userToken!, userId);
        loadDashboardData(); // Reload data
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleCopyToClipboard = async (text: string, type: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyMessage(`${type === 'email' ? 'Email' : 'Phone number'} copied to clipboard!`);
      setShowCopyNotification(true);
      setTimeout(() => setShowCopyNotification(false), 3000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopyMessage(`${type === 'email' ? 'Email' : 'Phone number'} copied to clipboard!`);
      setShowCopyNotification(true);
      setTimeout(() => setShowCopyNotification(false), 3000);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Copy Notification */}
      {showCopyNotification && (
        <div className="fixed top-4 right-4 bg-emerald-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {copyMessage}
        </div>
      )}
      
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="bg-emerald-100 p-2 rounded-lg">
                <Shield className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Admin Dashboard</h2>
                <p className="text-xs text-gray-500">Manage users and view statistics</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-1">
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                <NotificationBell />
              </button>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                activeTab === 'overview'
                  ? 'text-emerald-600 border-b-2 border-emerald-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              <span>Overview</span>
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                activeTab === 'users'
                  ? 'text-emerald-600 border-b-2 border-emerald-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Users className="h-4 w-4" />
              <span>Users</span>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                activeTab === 'settings'
                  ? 'text-emerald-600 border-b-2 border-emerald-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                <span className="ml-3 text-gray-600">Loading...</span>
              </div>
            ) : (
              <>
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-900">Dashboard Overview</h3>
                    
                    {stats && (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-emerald-50 p-6 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-emerald-600">Total Users</p>
                              <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                            </div>
                            <Users className="h-8 w-8 text-emerald-600" />
                          </div>
                        </div>
                        
                        <div className="bg-blue-50 p-6 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-blue-600">Active Users</p>
                              <p className="text-2xl font-bold text-gray-900">{stats.activeUsers}</p>
                            </div>
                            <Activity className="h-8 w-8 text-blue-600" />
                          </div>
                        </div>
                        
                        <div className="bg-orange-50 p-6 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-orange-600">New Users (30d)</p>
                              <p className="text-2xl font-bold text-gray-900">{stats.newUsersLast30Days}</p>
                            </div>
                            <UserPlus className="h-8 w-8 text-orange-600" />
                          </div>
                        </div>
                        
                        <div className="bg-purple-50 p-6 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-purple-600">Admin Users</p>
                              <p className="text-2xl font-bold text-gray-900">{stats.adminUsers}</p>
                            </div>
                            <Shield className="h-8 w-8 text-purple-600" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'users' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-semibold text-gray-900">User Management</h3>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                          disabled={currentPage === 1}
                          className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 disabled:opacity-50"
                        >
                          Previous
                        </button>
                        <span className="px-3 py-2 text-sm text-gray-600">
                          Page {currentPage} of {totalPages}
                        </span>
                        <button
                          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                          disabled={currentPage === totalPages}
                          className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 disabled:opacity-50"
                        >
                          Next
                        </button>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              User
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Contact Info
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Role
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Last Login
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {users.map((user) => (
                            <tr key={user._id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div>
                                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="space-y-2">
                                  {/* Email */}
                                  <div className="flex items-center space-x-2">
                                    <Mail className="h-4 w-4 text-gray-400" />
                                    <span className="text-sm text-gray-900">{user.email}</span>
                                    <button
                                      onClick={() => handleCopyToClipboard(user.email, 'email')}
                                      className="text-gray-400 hover:text-emerald-600 transition-colors"
                                      title="Copy email"
                                    >
                                      <Copy className="h-3 w-3" />
                                    </button>
                                  </div>
                                  {/* Phone */}
                                  <div className="flex items-center space-x-2">
                                    <Phone className="h-4 w-4 text-gray-400" />
                                    <span className="text-sm text-gray-900">{user.phone}</span>
                                    <button
                                      onClick={() => handleCopyToClipboard(user.phone, 'phone')}
                                      className="text-gray-400 hover:text-emerald-600 transition-colors"
                                      title="Copy phone number"
                                    >
                                      <Copy className="h-3 w-3" />
                                    </button>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  user.role === 'admin' 
                                    ? 'bg-purple-100 text-purple-800' 
                                    : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {user.role}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  user.isActive 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {user.isActive ? 'Active' : 'Inactive'}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() => handleToggleUserStatus(user._id)}
                                    className={`text-xs px-2 py-1 rounded ${
                                      user.isActive 
                                        ? 'text-red-600 hover:text-red-800' 
                                        : 'text-green-600 hover:text-green-800'
                                    }`}
                                  >
                                    {user.isActive ? 'Deactivate' : 'Activate'}
                                  </button>
                                  <button
                                    onClick={() => handleDeleteUser(user._id)}
                                    className="text-xs px-2 py-1 rounded text-red-600 hover:text-red-800"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeTab === 'settings' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-900">Admin Settings</h3>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">System Information</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-3">
                          <Database className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">Database</p>
                            <p className="text-sm text-gray-500">MongoDB Connected</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Shield className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">Security</p>
                            <p className="text-sm text-gray-500">JWT Authentication</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard; 