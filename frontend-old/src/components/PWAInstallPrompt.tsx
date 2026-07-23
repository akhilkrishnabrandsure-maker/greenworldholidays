import { useState, useEffect } from 'react';

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show the install prompt if the app isn't already installed
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the default browser install prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      // Show our custom install button
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check if the app is already installed
    window.addEventListener('appinstalled', () => {
      console.log('App was installed');
      setIsVisible(false);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    // Show the browser's install prompt
    (deferredPrompt as any).prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await (deferredPrompt as any).userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    
    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      backgroundColor: '#4CAF50',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '5px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    }}>
      <span>Install App for better experience</span>
      <button 
        onClick={handleInstallClick}
        style={{
          backgroundColor: 'white',
          color: '#4CAF50',
          border: 'none',
          padding: '5px 10px',
          borderRadius: '3px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        Install
      </button>
    </div>
  );
};

export default PWAInstallPrompt;
