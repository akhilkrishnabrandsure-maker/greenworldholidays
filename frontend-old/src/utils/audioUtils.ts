/**
 * Utility functions for playing notification sounds
 */

// Preload audio files
const notificationSound = new Audio('/sounds/notification.mp3');
notificationSound.preload = 'auto';

/**
 * Play the notification sound
 * @param volume - Volume level (0.0 to 1.0)
 */
export const playNotificationSound = (volume: number = 0.5): void => {
  try {
    // Clone the audio element to allow multiple sounds to play in sequence
    const sound = notificationSound.cloneNode(true) as HTMLAudioElement;
    sound.volume = Math.min(1, Math.max(0, volume)); // Ensure volume is between 0 and 1
    
    // Play the sound
    sound.play().catch(error => {
      console.warn('Failed to play notification sound:', error);
    });
  } catch (error) {
    console.error('Error playing notification sound:', error);
  }
};

/**
 * Preload audio files to reduce latency on first play
 */
export const preloadAudio = (): void => {
  try {
    // This will start loading the audio file
    notificationSound.load();
    console.log('Audio files preloaded');
  } catch (error) {
    console.error('Error preloading audio files:', error);
  }
};

// Preload audio when this module is loaded
if (typeof window !== 'undefined') {
  preloadAudio();
}
