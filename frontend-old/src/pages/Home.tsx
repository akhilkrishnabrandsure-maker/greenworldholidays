import { useState, useEffect } from 'react';
import { webSocketService } from '../services/websocketService';
import { BellIcon } from '@heroicons/react/24/outline';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Destinations from '../components/Destinations';
import WhyKerala from '../components/WhyKerala';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import LoginModal from '../components/LoginModal';
import ForgotPassword from '../components/ForgotPassword';

const Home = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotificationBadge, setShowNotificationBadge] = useState(false);

  useEffect(() => {
    // Define WebSocket message handler with proper typing
    const handleNewNotification = (message: { type: string; data?: any }) => {
      if (message.type === 'NEW_NOTIFICATION') {
        setUnreadCount(prev => {
          const newCount = prev + 1;
          // Only show badge for new notifications, not when component mounts
          if (prev === 0) {
            setShowNotificationBadge(true);
          }
          return newCount;
        });
        
        // Auto-hide badge after 5 seconds if it's currently hidden
        if (!showNotificationBadge) {
          const timer = setTimeout(() => {
            setShowNotificationBadge(false);
          }, 5000);
          
          return () => clearTimeout(timer);
        }
      }
    };

    // Register WebSocket handler
    webSocketService.addMessageHandler(handleNewNotification);
    
    // Initialize WebSocket connection if not already connected
    const initializeWebSocket = async () => {
      try {
        const socket = webSocketService.getSocket();
        if (!socket || !socket.connected) {
          await webSocketService.connect();
          // Optionally fetch initial unread count here if needed
          // const response = await fetch('/api/notifications/unread-count');
          // const data = await response.json();
          // setUnreadCount(data.count);
        }
      } catch (error) {
        console.error('WebSocket connection error:', error);
      }
    };
    
    initializeWebSocket();

    return () => {
      webSocketService.removeMessageHandler(handleNewNotification);
    };
  }, [showNotificationBadge]); // Add showNotificationBadge to dependencies

  const handleLogin = async (credentials: { email: string; password: string }) => {
    try {
      // TODO: Replace with actual login API call
      console.log('Login attempt with:', credentials);
      
      // Reset notification state on login
      setUnreadCount(0);
      setShowNotificationBadge(false);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const handleForgotPassword = (email: string) => {
    // Handle forgot password logic here
    console.log('Forgot password for:', email);
  };

  const handleNotificationClick = () => {
    setShowNotificationBadge(false);
    // TODO: Navigate to notifications page or show notifications dropdown
    console.log('Show notifications');
  };

  return (
    <div className="space-y-16 md:space-y-24 relative">
      {/* Notification Bell */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleNotificationClick}
          className="relative p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          aria-label="Notifications"
        >
          <BellIcon className="h-6 w-6" />
          {showNotificationBadge && (
            <span className="absolute top-0 right-0 flex h-5 w-5 -mt-1 -mr-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex items-center justify-center h-5 w-5 rounded-full bg-red-500 text-xs font-medium text-white">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            </span>
          )}
        </button>
      </div>

      <Hero onBookNow={() => setIsLoginModalOpen(true)} />
      <About />
      <Services />
      <Destinations />
      <WhyKerala />
      <Testimonials />
      <Contact />
      
      {/* Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onForgotPassword={() => {
          setIsLoginModalOpen(false);
          setIsForgotPasswordOpen(true);
        }}
        onSubmit={handleLogin}
        onLogin={(credentials: { email: string; password: string }) => handleLogin(credentials)}
        isLoading={false}
      />
      
      <ForgotPassword
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
        onBackToLogin={() => {
          setIsForgotPasswordOpen(false);
          setIsLoginModalOpen(true);
        }}
        onSubmit={handleForgotPassword}
      />
    </div>
  );
};

export default Home;
