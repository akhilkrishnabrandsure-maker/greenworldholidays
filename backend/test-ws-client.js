const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:5001');

ws.on('open', function open() {
  console.log('Connected to WebSocket server');
  
  // Send a test message
  ws.send(JSON.stringify({
    type: 'admin-connect',
    adminId: 'test-admin-1'
  }));
  
  console.log('Sent admin-connect message');
});

ws.on('message', function incoming(data) {
  console.log('Received message:', data.toString());
});

ws.on('close', function close() {
  console.log('Disconnected from WebSocket server');
});

ws.on('error', function error(err) {
  console.error('WebSocket error:', err.message);
});
