const io = require('socket.io-client');

// Connect to the WebSocket server
const socket = io('http://localhost:5001', {
  path: '/socket.io/',
  transports: ['websocket'],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

// Connection established
socket.on('connect', () => {
  console.log('✅ Connected to WebSocket server');
  console.log('Socket ID:', socket.id);
  
  // Send a test message
  socket.emit('admin-connect', 'test-admin-1');
});

// Connection error
socket.on('connect_error', (error) => {
  console.error('❌ Connection error:', error.message);
});

// Disconnected
socket.on('disconnect', (reason) => {
  console.log('❌ Disconnected:', reason);
});

// Test event
socket.on('test-event', (data) => {
  console.log('📨 Received test event:', data);
});

// Handle errors
socket.on('error', (error) => {
  console.error('⚠️ Socket error:', error);
});

// Send a test message every 5 seconds
setInterval(() => {
  if (socket.connected) {
    console.log('Sending ping...');
    socket.emit('ping', { timestamp: Date.now() });
  }
}, 5000);

// Handle process termination
process.on('SIGINT', () => {
  console.log('\nDisconnecting...');
  socket.disconnect();
  process.exit(0);
});
