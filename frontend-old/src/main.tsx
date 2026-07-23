import React from 'react'
import ReactDOM from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import { HelmetProvider } from 'react-helmet-async'
// WebSocket service will be imported dynamically when needed
import { getNotificationService } from './services/notificationService'
import App from './App'
import './index.css'

// Initialize services
const initializeServices = async () => {
  try {
    // Dynamically import WebSocket service
    const { webSocketService } = await import('./services/websocketService');
    
    // Initialize WebSocket service
    webSocketService.addConnectionStatusCallback((status: string) => {
      console.log('WebSocket status:', status);
    });
    
    // Initialize notification service with WebSocket service
    getNotificationService(webSocketService);
    
    console.log('Services initialized');
  } catch (error) {
    console.error('Failed to initialize services:', error);
  }
};

// Initialize services when the app starts
initializeServices();

// Register service worker for PWA
if ('serviceWorker' in navigator) {
  const updateSW = registerSW({
    onNeedRefresh: () => {
      if (confirm('New content available. Reload?')) {
        updateSW(true);
      }
    },
    onOfflineReady: () => {
      console.log('App ready to work offline');
    },
    onRegistered: (registration: ServiceWorkerRegistration | undefined) => {
      if (registration) {
        console.log('Service Worker registered');
      }
    },
    onRegisterError: (error: Error) => {
      console.error('Service Worker registration error:', error);
    },
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
)
