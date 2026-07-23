import { useState, useEffect, useCallback } from 'react';
import { BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { notificationService, type NotificationData } from '../services/notificationService';

export const NotificationBell = () => {
  const [hasNewNotifications, setHasNewNotifications] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mark a notification as read
  const markAsRead = useCallback((id: string) => {
    notificationService.markAsRead(id);
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
    setHasNewNotifications(notifications.some(n => !n.read));
  }, [notifications]);

  // Mark all notifications as read
  const markAllAsRead = useCallback(() => {
    notificationService.markAllAsRead();
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setHasNewNotifications(false);
  }, []);

  // Toggle dropdown
  const toggleDropdown = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  // Delete a notification
  const deleteNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    setHasNewNotifications(notifications.some(n => !n.read));
  }, [notifications]);

  // Set up notification subscription and initial load
  useEffect(() => {
    console.log('Setting up notification subscription');
    
    // Initial load of existing notifications
    const existingNotifications = notificationService.getNotifications();
    console.log('Existing notifications:', existingNotifications);
    
    if (existingNotifications.length > 0) {
      setNotifications(existingNotifications);
      setHasNewNotifications(existingNotifications.some(n => !n.read));
    }
    
    // Subscribe to new notifications
    const unsubscribe = notificationService.subscribe((notification) => {
      console.log('Received new notification:', notification);
      setNotifications(prev => [{
        ...notification,
        id: notification.id || `notif-${Date.now()}`,
        message: notification.message || notification.body || 'New notification',
        read: notification.read || false,
        timestamp: notification.timestamp || new Date()
      }, ...prev]);
      
      setHasNewNotifications(true);
    });
    
    setIsLoading(false);
    
    // Cleanup subscription on unmount
    return () => {
      console.log('Cleaning up notification subscription');
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-gray-200 h-6 w-6"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative inline-block text-left">
      <div className="relative">
        <button
          type="button"
          onClick={toggleDropdown}
          className="inline-flex items-center justify-center p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <span className="sr-only">View notifications</span>
          <BellIcon className="h-6 w-6" aria-hidden="true" />
          {hasNewNotifications && (
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500" />
          )}
        </button>
      </div>

      {isOpen && (
        <div 
          className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="notification-menu"
        >
          <div className="py-1">
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
              <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={markAllAsRead}
                  className="text-xs text-indigo-600 hover:text-indigo-900 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!notifications.length || notifications.every(n => n.read)}
                >
                  Mark all as read
                </button>
                <button
                  type="button"
                  onClick={toggleDropdown}
                  className="text-gray-400 hover:text-gray-500"
                  aria-label="Close notifications"
                >
                  <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="px-4 py-3 text-sm text-gray-500 text-center">
                  No notifications
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {notifications.map((notification) => (
                    <li 
                      key={notification.id} 
                      className={`px-4 py-3 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 pt-0.5">
                          <div className={`h-5 w-5 rounded-full flex items-center justify-center ${
                            notification.read ? 'bg-gray-200' : 'bg-indigo-100 text-indigo-600'
                          }`}>
                            <span className="text-xs font-medium">
                              {notification.type === 'user_signup' ? '👤' : 'ℹ️'}
                            </span>
                          </div>
                        </div>
                        <div className="ml-3 flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {notification.title}
                          </p>
                          <p className="mt-1 text-sm text-gray-600 break-words">
                            {notification.message}
                          </p>
                          {notification.timestamp && (
                            <p className="mt-1 text-xs text-gray-400">
                              {new Date(notification.timestamp).toLocaleString()}
                            </p>
                          )}
                          <div className="mt-2 flex space-x-2">
                            {!notification.read && (
                              <button
                                type="button"
                                onClick={() => notification.id && markAsRead(notification.id)}
                                className="text-xs text-indigo-600 hover:text-indigo-900"
                              >
                                Mark as read
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => notification.id && deleteNotification(notification.id)}
                              className="text-xs text-gray-500 hover:text-gray-700"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          
          <div className="p-2 border-t border-gray-200 bg-gray-50 text-center">
            <a 
              href="/admin/notifications" 
              className="text-xs font-medium text-indigo-600 hover:text-indigo-800 inline-flex items-center"
            >
              View all notifications
              <svg className="ml-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
