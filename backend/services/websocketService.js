const { Server } = require('socket.io');
const http = require('http');

class WebSocketService {
  constructor(server) {
    console.log('🚀 Initializing WebSocket service...');
    
    try {
      // Create HTTP server if not provided
      if (!server) {
        console.log('No HTTP server provided, creating a new one...');
        server = http.createServer();
        server.listen(5001, () => {
          console.log('WebSocket HTTP server started on port 5001');
        });
      }

      // Initialize Socket.IO with enhanced options
      this.io = new Server(server, {
        cors: {
          origin: [
            'http://localhost:5173',
            'http://127.0.0.1:5173',
            'http://localhost:3000',
            'http://127.0.0.1:3000',
            'https://greenworldholidays.co.in',
            'https://greenworldholiday.netlify.app',
            'https://greenworldholidays.in'
          ],
          methods: ['GET', 'POST', 'OPTIONS'],
          credentials: true,
          allowedHeaders: ['Content-Type', 'Authorization'],
        },
        path: '/socket.io/',
        transports: ['websocket', 'polling'],
        pingTimeout: 60000,
        pingInterval: 25000,
        cookie: false
      });

      // Log when Socket.IO is initialized
      this.io.on('connection', (socket) => {
        console.log(`✅ Client connected: ${socket.id}`);
        
        socket.on('disconnect', (reason) => {
          console.log(`❌ Client disconnected: ${socket.id} (${reason})`);
          this.removeClient(socket);
        });

        socket.on('error', (error) => {
          console.error(`⚠️ Socket error (${socket.id}):`, error);
        });
      });

      this.clients = new Map();
      console.log('✅ WebSocket server initialized successfully');
      
      // Setup event handlers
      this.setupEventHandlers();
      
    } catch (error) {
      console.error('❌ Failed to initialize WebSocket service:', error);
      throw error;
    }
  }
  
  // Helper method to remove a client
  removeClient(socket) {
    if (socket.adminId) {
      this.clients.delete(socket.adminId);
      console.log(`Removed admin client: ${socket.adminId}`);
    } else if (socket.userId) {
      this.clients.delete(socket.userId);
      console.log(`Removed user client: ${socket.userId}`);
    } else {
      console.log(`Removed anonymous client: ${socket.id}`);
    }
  }

  setupEventHandlers() {
    this.io.on('connection', (socket) => {
      console.log(`Client connected: ${socket.id}`);

      // Handle admin connection
      socket.on('admin-connect', (adminId) => {
        console.log(`Admin connected: ${adminId}`);
        this.clients.set(adminId, socket.id);
        socket.adminId = adminId;
      });

      // Handle user connection
      socket.on('user-connect', (userId) => {
        console.log(`User connected: ${userId}`);
        this.clients.set(userId, socket.id);
        socket.userId = userId;
      });

      // Handle disconnection
      socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
        if (socket.adminId) {
          this.clients.delete(socket.adminId);
        } else if (socket.userId) {
          this.clients.delete(socket.userId);
        }
      });
    });
  }

  // Send notification to specific admin
  sendToAdmin(adminId, event, data) {
    const socketId = this.clients.get(adminId);
    if (socketId) {
      this.io.to(socketId).emit(event, data);
      return true;
    }
    return false;
  }

  // Send notification to all connected admins
  broadcastToAdmins(event, data) {
    console.log(`Broadcasting ${event} to all admins:`, data);
    // Emit both the specific event and a general admin-notification
    this.io.emit(event, data);
    this.io.emit('admin-notification', { event, data });
  }

  // Get WebSocket instance
  getIO() {
    return this.io;
  }
}

let webSocketService = null;

const initWebSocket = (server) => {
  if (!webSocketService) {
    webSocketService = new WebSocketService(server);
  }
  return webSocketService;
};

const getWebSocketService = () => {
  if (!webSocketService) {
    throw new Error('WebSocket service not initialized');
  }
  return webSocketService;
};

module.exports = {
  initWebSocket,
  getWebSocketService
};
