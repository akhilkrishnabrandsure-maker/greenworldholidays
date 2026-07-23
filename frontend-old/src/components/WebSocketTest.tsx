import { useEffect, useState, useCallback, useRef } from 'react';
import { webSocketService } from '../services/websocketService';

interface Message {
  id: string;
  content: string;
  timestamp: Date;
}

type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

interface ConnectionState {
  status: ConnectionStatus;
  error?: string;
}

const WebSocketTest: React.FC = () => {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionState>({ 
    status: 'disconnected' 
  });
  
  const [messages, setMessages] = useState<Message[]>([]);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMounted = useRef(true);

  // Handle incoming messages
  const handleMessage = useCallback((message: any) => {
    setMessages(prevMessages => [
      ...prevMessages,
      {
        id: Date.now().toString(),
        content: `[${message.type || 'message'}] ${JSON.stringify(message.data || message, null, 2)}`,
        timestamp: new Date()
      }
    ]);
  }, []);

  // Handle connection status changes
  const handleStatusChange = useCallback((status: string) => {
    if (!isMounted.current) return;

    const newStatus: ConnectionState = {
      status: status as ConnectionStatus,
      error: status === 'error' ? 'Connection error occurred' : undefined
    };

    setConnectionStatus(newStatus);
    
    // Handle reconnection logic
    if (status === 'disconnected' && reconnectAttempts.current < maxReconnectAttempts) {
      const delay = Math.min(1000 * 2 ** reconnectAttempts.current, 30000);
      reconnectTimeoutRef.current = setTimeout(() => {
        if (!isMounted.current) return;
        reconnectAttempts.current += 1;
        webSocketService.connect();
      }, delay);
    } else if (status === 'connected') {
      reconnectAttempts.current = 0; // Reset on successful connection
    }
  }, []);

  useEffect(() => {
    isMounted.current = true;
    
    // Initialize WebSocket connection
    const initWebSocket = () => {
      try {
        webSocketService.addMessageHandler(handleMessage);
        webSocketService.addConnectionStatusCallback(handleStatusChange);
        
        const socket = webSocketService.getSocket();
        if (!socket) {
          handleStatusChange('connecting');
          webSocketService.connect();
        } else if (socket.connected) {
          handleStatusChange('connected');
        } else {
          handleStatusChange('connecting');
        }
      } catch (error) {
        console.error('WebSocket initialization error:', error);
        handleStatusChange('error');
      }
    };

    initWebSocket();
    
    // Clean up on unmount
    return () => {
      isMounted.current = false;
      webSocketService.removeMessageHandler(handleMessage);
      webSocketService.removeConnectionStatusCallback(handleStatusChange);
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
    };
  }, [handleMessage, handleStatusChange]);

  const sendTestMessage = useCallback(async () => {
    try {
      const message = {
        type: 'TEST',
        data: { 
          message: 'Hello from frontend!',
          timestamp: new Date().toISOString()
        }
      };
      
      const socket = webSocketService.getSocket();
      if (socket?.connected) {
        socket.emit('message', message);
        setMessages(prevMessages => [
          ...prevMessages,
          {
            id: Date.now().toString(),
            content: `[SENT] ${JSON.stringify(message, null, 2)}`,
            timestamp: new Date()
          }
        ]);
      } else {
        throw new Error('WebSocket is not connected');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setConnectionStatus(prevStatus => ({
        ...prevStatus,
        status: 'error',
        error: error instanceof Error ? error.message : 'Failed to send message'
      }));
    }
  }, []);

  // Get connection status color based on status
  const getStatusColor = (status: ConnectionStatus): string => {
    switch(status) {
      case 'connected': return '#4CAF50';
      case 'disconnected': return '#f44336';
      case 'error': return '#ff9800';
      case 'connecting': return '#2196F3';
      default: return '#9E9E9E';
    }
  };

  // Format status text for display
  const getStatusText = (): string => {
    const { status, error } = connectionStatus;
    if (error) {
      return `Error: ${error}`;
    }
    return status.charAt(0).toUpperCase() + 
           status.slice(1) + 
           (reconnectAttempts.current > 0 ? ` (reconnecting ${reconnectAttempts.current}/${maxReconnectAttempts})` : '');
  };



  return (
    <div style={{ 
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ color: '#333', marginBottom: '20px' }}>WebSocket Connection Test</h2>
      
      <div style={{ 
        display: 'flex', 
        alignItems: 'center',
        marginBottom: '20px',
        padding: '10px',
        backgroundColor: '#f5f5f5',
        borderRadius: '4px'
      }}>
        <div style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: getStatusColor(connectionStatus.status),
          marginRight: '10px'
        }} />
        <div className="flex flex-col">
          <span>Status: <strong>{getStatusText()}</strong></span>
          {reconnectAttempts.current > 0 && reconnectAttempts.current < maxReconnectAttempts && (
            <span className="text-xs text-gray-500">
              Reconnecting... (attempt {reconnectAttempts.current} of {maxReconnectAttempts})
            </span>
          )}
        </div>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={sendTestMessage}
          disabled={connectionStatus.status !== 'connected'}
          style={{
            padding: '10px 20px',
            backgroundColor: connectionStatus.status === 'connected' ? '#4CAF50' : '#cccccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: connectionStatus.status === 'connected' ? 'pointer' : 'not-allowed',
            fontSize: '16px',
            transition: 'background-color 0.3s',
            marginRight: '10px'
          }}
        >
          Send Test Message
        </button>
        
        <button 
          onClick={() => webSocketService.getSocket()?.close()}
          disabled={connectionStatus.status !== 'connected'}
          style={{
            padding: '10px 20px',
            backgroundColor: connectionStatus.status === 'connected' ? '#f44336' : '#cccccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: connectionStatus.status === 'connected' ? 'pointer' : 'not-allowed',
            fontSize: '16px',
            transition: 'background-color 0.3s'
          }}
        >
          Disconnect
        </button>
      </div>

      <div style={{ 
        backgroundColor: '#fff',
        borderRadius: '4px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          padding: '15px',
          borderBottom: '1px solid #eee',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h3 style={{ margin: 0, color: '#333' }}>WebSocket Messages</h3>
          <button 
            onClick={() => setMessages([])}
            style={{
              padding: '5px 10px',
              backgroundColor: '#f5f5f5',
              border: '1px solid #ddd',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Clear Messages
          </button>
        </div>

        <div
          style={{
            height: '300px',
            overflowY: 'auto',
            padding: '15px',
            backgroundColor: '#fafafa',
            fontFamily: 'monospace',
            fontSize: '14px',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word'
          }}
        >
          {messages.length === 0 ? (
            <div style={{ color: '#999', textAlign: 'center', padding: '20px 0' }}>
              No messages yet...
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  padding: '12px 0',
                  borderBottom: '1px solid #eee',
                  lineHeight: '1.5',
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    color: '#666',
                    fontSize: '12px',
                    marginBottom: '4px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span>WebSocket Message</span>
                  <span>{msg.timestamp.toLocaleTimeString()}</span>
                </div>
                <div
                  style={{
                    color: '#333',
                    backgroundColor: '#f8f9fa',
                    padding: '8px',
                    borderRadius: '4px',
                    fontFamily: 'monospace',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    fontSize: '14px'
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default WebSocketTest;
