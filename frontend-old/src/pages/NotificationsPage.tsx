import { useState, useEffect, useCallback } from 'react';
import { UserPlusIcon } from '@heroicons/react/24/outline';
import { webSocketService } from '../services/websocketService';

interface UserSignupNotification {
  _id: string;
  email: string;
  name: string;
  timestamp: Date;
  read: boolean;
}

export const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<UserSignupNotification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // Fetch user signup notifications
      const response = await fetch('/api/admin/user-signups');
      if (!response.ok) throw new Error('Failed to fetch notifications');
      
      const data = await response.json();
      setNotifications(data);
      setUnreadCount(data.filter((n: UserSignupNotification) => !n.read).length);
      setError(null);
    } catch (err) {
      console.error('Error fetching notifications:', err);
      setError('Failed to load notifications');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const markAsRead = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/user-signups/${id}/read`, {
        method: 'PATCH',
      });
      
      if (!response.ok) throw new Error('Failed to mark as read');
      
      setNotifications(prev => 
        prev.map(n => n._id === id ? { ...n, read: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  useEffect(() => {
    fetchNotifications();

    // Set up WebSocket for real-time updates
    const handleNewUserSignup = (newUser: UserSignupNotification) => {
      setNotifications(prev => [newUser, ...prev]);
      setUnreadCount(prev => prev + 1);
    };

    webSocketService.on('newUserSignup', handleNewUserSignup);

    return () => {
      webSocketService.off('newUserSignup', handleNewUserSignup);
    };
  }, [fetchNotifications]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <p className="text-red-700">{error}</p>
        <button 
          onClick={fetchNotifications}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">New User Signups</h1>
        {unreadCount > 0 && (
          <span className="bg-red-500 text-white text-sm font-semibold px-2.5 py-0.5 rounded-full">
            {unreadCount} new
          </span>
        )}
      </div>

      <div className="space-y-4">
        {notifications.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No new user signups
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {notifications.map((notification) => (
              <li 
                key={notification._id} 
                className={`p-4 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-0.5">
                    <UserPlusIcon className="h-6 w-6 text-green-500" />
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">
                        New User: {notification.name}
                      </p>
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification._id)}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">
                      {notification.email}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Signed up on {new Date(notification.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
