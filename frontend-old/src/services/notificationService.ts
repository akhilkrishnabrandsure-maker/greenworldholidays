// Types
export type NotificationType = 'info' | 'success' | 'warning' | 'error' | 'user_signup' | 'user_login';

// Import audio utilities
import { playNotificationSound } from '../utils/audioUtils';

export interface NotificationData {
  id?: string;
  title: string;
  message?: string;
  body?: string;
  data?: {
    userId?: string;
    name?: string;
    email?: string;
    phone?: string;
    timestamp?: string;
    url?: string;
    path?: string;
    [key: string]: unknown;
  };
  read?: boolean;
  timestamp?: Date;
  type?: NotificationType;
}

type NotificationCallback = (notification: NotificationData) => void;

interface WebSocketMessage {
  type: string;
  data?: NotificationData | any;
}

class NotificationService {
  private static instance: NotificationService | null = null;
  private subscribers: NotificationCallback[] = [];
  private notifications: NotificationData[] = [];
  private webSocketService: any = null;

  private constructor() {
    // Initialize with an empty array of notifications
    this.notifications = [];
  }

  // Initialize with WebSocket service
  public initialize(webSocketService: any) {
    if (this.webSocketService) return; // Already initialized
    
    this.webSocketService = webSocketService;
    this.setupWebSocketListeners();
  }

  public static getInstance(webSocketService?: any): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
      if (webSocketService) {
        NotificationService.instance.initialize(webSocketService);
      }
    } else if (webSocketService && !NotificationService.instance.webSocketService) {
      NotificationService.instance.initialize(webSocketService);
    }
    return NotificationService.instance;
  }

  private setupWebSocketListeners(): void {
    if (!this.webSocketService) {
      console.warn('WebSocket service not available');
      return;
    }

    this.webSocketService.addMessageHandler((message: WebSocketMessage) => {
      console.log('Received WebSocket message:', message);
      
      if (message.type === 'USER_SIGNUP' && message.data) {
        const userData = message.data;
        this.notify({
          id: `user-signup-${Date.now()}`,
          title: 'New User Signup',
          message: `${userData.name} (${userData.phone}) has just signed up!`,
          type: 'user_signup',
          data: userData,
          timestamp: new Date()
        });
      } else if (message.type === 'USER_LOGIN' && message.data) {
        const userData = message.data;
        this.notify({
          id: `user-login-${Date.now()}`,
          title: 'User Login',
          message: `${userData.name} (${userData.phone}) has just logged in.`,
          type: 'user_login',
          data: userData,
          timestamp: new Date(userData.timestamp) || new Date()
        });
      } else if (message.type === 'notification' && message.data) {
        try {
          const notification = message.data as NotificationData;
          this.notify(notification);
        } catch (error) {
          console.error('Error handling WebSocket notification:', error);
        }
      }
    });
  }

  public subscribe(callback: NotificationCallback): () => void {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  private notify(notification: NotificationData): void {
    // Ensure the notification has an ID and timestamp
    const newNotification: NotificationData = {
      ...notification,
      id: notification.id || `notif-${Date.now()}`,
      timestamp: notification.timestamp || new Date(),
      read: false
    };

    // Add to notifications array
    this.notifications.unshift(newNotification);

    // Play notification sound (only for new notifications, not when loading from storage)
    if (typeof window !== 'undefined' && newNotification.id?.startsWith('notif-')) {
      try {
        playNotificationSound(0.5); // Play sound at 50% volume
      } catch (error) {
        console.warn('Failed to play notification sound:', error);
      }
    }

    // Notify all subscribers
    this.subscribers.forEach(callback => callback(newNotification));

    // Log the notification
    console.log('New notification:', newNotification);
    this.notifySubscribers(newNotification);
  }

  public getNotifications(): NotificationData[] {
    return [...this.notifications];
  }

  public markAsRead(notificationId: string): void {
    this.notifications = this.notifications.map(notif => 
      notif.id === notificationId ? { ...notif, read: true } : notif
    );
  }

  public markAllAsRead(): void {
    this.notifications = this.notifications.map(notif => ({
      ...notif,
      read: true
    }));
  }

  public clearNotifications(): void {
    this.notifications = [];
  }

  private notifySubscribers(notification: NotificationData): void {
    console.log('Notifying subscribers, count:', this.subscribers.length);
    this.subscribers.forEach(callback => {
      try {
        callback(notification);
      } catch (error) {
        console.error('Error in notification subscriber:', error);
      }
    });
  }

  public showNotification(
    title: string,
    message: string,
    data?: Record<string, unknown>,
    type: NotificationType = 'info'
  ): void {
    this.notify({
      id: `notif-${Date.now()}`,
      title,
      message,
      data,
      type,
      timestamp: new Date()
    });
  }
}

// Export a function to get the notification service instance
export const getNotificationService = (webSocketService?: any) => {
  const instance = NotificationService.getInstance();
  if (webSocketService && !instance['webSocketService']) {
    instance.initialize(webSocketService);
  }
  return instance;
};

// For backward compatibility
export const notificationService = getNotificationService();
