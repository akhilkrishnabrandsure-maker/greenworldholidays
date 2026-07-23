import { io, Socket } from 'socket.io-client';
import { notificationService } from './notificationService';

type WebSocketMessage = {
  type: string;
  data: any;
};

class WebSocketService {
  private static instance: WebSocketService;
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectInterval = 3000;
  private messageHandlers: Array<(message: WebSocketMessage) => void> = [];
  private connectionStatusCallbacks: Array<(status: string) => void> = [];
  private isConnected = false;
  private eventHandlers: Map<string, Array<(data: any) => void>> = new Map();

  private constructor() {
    this.connect();
  }

  public static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  // Public method to get the socket instance (for testing)
  public getSocket(): Socket | null {
    return this.socket;
  }

  // Add a message handler
  public addMessageHandler(handler: (message: WebSocketMessage) => void): void {
    this.messageHandlers.push(handler);
  }

  // Remove a message handler
  public removeMessageHandler(handler: (message: WebSocketMessage) => void): void {
    this.messageHandlers = this.messageHandlers.filter(h => h !== handler);
  }

  // Add a connection status callback
  public addConnectionStatusCallback(callback: (status: string) => void): void {
    this.connectionStatusCallbacks.push(callback);
  }

  // Remove a connection status callback
  public removeConnectionStatusCallback(callback: (status: string) => void): void {
    this.connectionStatusCallbacks = this.connectionStatusCallbacks.filter(cb => cb !== callback);
  }

  // Update connection status and notify callbacks
  private updateConnectionStatus(status: string): void {
    this.connectionStatusCallbacks.forEach(callback => callback(status));
  }

  private getSocketUrl(): string {
    // For development, use the direct URL (HTTP, not WS)
    // In production, this should come from environment variables
    const url = import.meta.env.VITE_WS_URL || 'http://localhost:5001';
    console.log(`🔌 Connecting to Socket.IO server at: ${url}`);
    return url;
  }

  public connect(): void {
    if (this.socket?.connected) {
      console.log('Socket.IO already connected');
      return;
    }

    try {
      // Disconnect existing socket if any
      if (this.socket) {
        this.socket.disconnect();
      }

      const url = this.getSocketUrl();
      this.socket = io(url, {
        withCredentials: true,
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionAttempts: this.maxReconnectAttempts,
        reconnectionDelay: this.reconnectInterval,
        autoConnect: true,
        path: '/socket.io/'
      });

      this.setupEventListeners();
    } catch (error) {
      console.error('Failed to initialize Socket.IO:', error);
      this.handleReconnect();
    }
  }

  private setupEventListeners(): void {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('Socket.IO connected');
      this.isConnected = true;
      this.reconnectAttempts = 0;
      this.updateConnectionStatus('connected');
      this.authenticate();
    });

    this.socket.on('disconnect', (reason) => {
      console.log('Socket.IO disconnected:', reason);
      this.isConnected = false;
      this.updateConnectionStatus('disconnected');
      
      if (reason === 'io server disconnect') {
        // The server has forcefully disconnected the socket
        // We need to reconnect manually
        setTimeout(() => {
          this.socket?.connect();
        }, 1000);
      }
    });

    this.socket.on('connect_error', (error) => {
      console.error('Socket.IO connection error:', error.message);
      this.updateConnectionStatus('error');
    });

    // Handle custom events
    this.socket.onAny((event, data) => {
      console.log(`Socket.IO event received: ${event}`, data);
      
      // Forward to message handlers
      this.messageHandlers.forEach(handler => {
        try {
          handler({ type: event, data });
        } catch (error) {
          console.error('Error in message handler:', error);
        }
      });

      // Handle specific events
      switch (event) {
        case 'notification':
          this.handleNotification(data);
          break;
        case 'USER_SIGNUP':
        case 'USER_LOGIN':
          // These are handled by the notification service
          break;
        default:
          // Handle other events if needed
          break;
      }
    });
  }

  private handleNotification(notificationData: any): void {
    // Show notification using our notification service
    notificationService.showNotification(
      notificationData.title || 'New Notification',
      notificationData.message || '',
      notificationData.data || {}
    );
  }

  private authenticate(): void {
    if (!this.isConnected || !this.socket) return;
    
    // Get the authentication token (adjust based on your auth system)
    const token = localStorage.getItem('userToken');
    if (token) {
      this.socket.emit('authenticate', { token });
    }
  }

  private handleReconnect(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.warn('Max reconnection attempts reached');
      return;
    }

    const delay = Math.min(30000, this.reconnectInterval * Math.pow(1.5, this.reconnectAttempts));
    console.log(`Attempting to reconnect in ${delay}ms (attempt ${this.reconnectAttempts + 1}/${this.maxReconnectAttempts})`);
    
    setTimeout(() => {
      this.reconnectAttempts++;
      this.connect();
    }, delay);
  }

  // Public API
  public send(message: WebSocketMessage): void {
    if (!this.isConnected || !this.socket) {
      console.warn('Socket.IO not connected, cannot send message:', message);
      return;
    }

    try {
      this.socket.emit(message.type, message.data);
    } catch (error) {
      console.error('Error sending Socket.IO message:', error);
    }
  }

  public on(event: string, callback: (data: any) => void): () => void {
    if (!this.socket) {
      console.warn('Socket not initialized, cannot add event listener for:', event);
      return () => {}; // Return a no-op function
    }
    
    // Add to our internal tracking
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, []);
    }
    const handlers = this.eventHandlers.get(event) || [];
    handlers.push(callback);
    this.eventHandlers.set(event, handlers);
    
    // Set up the actual socket.io listener
    this.socket.on(event, callback);
    
    // Return a function to remove the event listener
    return () => {
      this.socket?.off(event, callback);
      const updatedHandlers = (this.eventHandlers.get(event) || []).filter(h => h !== callback);
      if (updatedHandlers.length === 0) {
        this.eventHandlers.delete(event);
      } else {
        this.eventHandlers.set(event, updatedHandlers);
      }
    };
  }

  public off(event: string, callback: (data: any) => void): void {
    if (!this.socket) return;
    
    if (callback) {
      // Remove specific handler
      this.socket.off(event, callback);
      
      // Update our internal tracking
      const handlers = this.eventHandlers.get(event) || [];
      const updatedHandlers = handlers.filter(h => h !== callback);
      
      if (updatedHandlers.length === 0) {
        this.eventHandlers.delete(event);
      } else {
        this.eventHandlers.set(event, updatedHandlers);
      }
    } else {
      // Remove all handlers for this event
      const handlers = this.eventHandlers.get(event) || [];
      handlers.forEach(handler => {
        this.socket?.off(event, handler);
      });
      this.eventHandlers.delete(event);
    }
  }

  public emit(event: string, data: any): void {
    if (!this.isConnected || !this.socket) {
      console.warn('Socket.IO not connected, cannot emit event:', event);
      return;
    }
    
    this.socket.emit(event, data);
  }

  public disconnect(): void {
    if (this.socket) {
      // Remove all event listeners
      this.eventHandlers.forEach((handlers, event) => {
        handlers.forEach(handler => {
          this.socket?.off(event, handler);
        });
      });
      this.eventHandlers.clear();
      
      // Disconnect the socket
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
      this.updateConnectionStatus('disconnected');
    }
  }
}

export const webSocketService = WebSocketService.getInstance();
