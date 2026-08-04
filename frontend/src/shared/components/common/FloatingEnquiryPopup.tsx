'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { X, MessageCircle, Phone } from 'lucide-react';
import { EnquiryChip } from './EnquiryChip';

const ENQUIRY_OPTIONS = [
  'Kerala Tour Packages',
  'Customized Tour Packages',
  'Honeymoon Packages',
  'Group Tour Packages',
  'Airport Transfer',
  'Vehicle Rental'
];

const POPUP_REMINDER_MS = 45000; // 45 seconds
const CONTACTED_KEY = 'gwh_user_contacted';

export function FloatingEnquiryPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  
  const [name, setName] = useState('');
  const [destination, setDestination] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  
  const pathname = usePathname();
  const popupRef = useRef<HTMLDivElement>(null);
  
  const triggerTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reminderTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Context-awareness based on pathname
  useEffect(() => {
    if (!pathname) return;
    
    const decodedPath = decodeURIComponent(pathname);
    
    if (decodedPath.includes('/vehicles')) {
      setSelectedOption('Vehicle Rental');
    } else if (decodedPath.includes('/packages')) {
      if (decodedPath.includes('honeymoon')) setSelectedOption('Honeymoon Packages');
      else setSelectedOption('Customized Tour Packages');
    } else if (decodedPath.includes('/destinations/')) {
      const parts = decodedPath.split('/');
      const destSlug = parts[parts.indexOf('destinations') + 1];
      if (destSlug) {
        const formattedDest = destSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        setDestination(formattedDest);
      }
    }
  }, [pathname]);

  const hasContacted = useCallback(() => {
    if (typeof window === 'undefined') return false;
    try {
      return sessionStorage.getItem(CONTACTED_KEY) === 'true';
    } catch {
      return false;
    }
  }, []);

  const startReminderTimer = useCallback((delay = POPUP_REMINDER_MS) => {
    if (reminderTimeoutRef.current) clearTimeout(reminderTimeoutRef.current);
    if (hasContacted()) return;

    reminderTimeoutRef.current = setTimeout(() => {
      if (hasContacted()) return;

      // Don't interrupt if the user is typing
      const activeTag = document.activeElement?.tagName?.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea') {
        startReminderTimer(10000); // Defer for 10 seconds
        return;
      }

      setIsOpen(true);
    }, delay);
  }, [hasContacted]);

  const closePopup = useCallback((wasContacted = false) => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      
      // Start reminder if they didn't contact
      if (!wasContacted && !hasContacted()) {
        startReminderTimer();
      }
    }, 300); // match animation duration
  }, [startReminderTimer, hasContacted]);

  const markAsContacted = () => {
    try {
      sessionStorage.setItem(CONTACTED_KEY, 'true');
    } catch (e) {}
    
    // Stop all timers permanently for this session
    if (reminderTimeoutRef.current) clearTimeout(reminderTimeoutRef.current);
    if (triggerTimeoutRef.current) clearTimeout(triggerTimeoutRef.current);
  };

  const triggerInitialPopup = useCallback(() => {
    if (hasContacted() || hasTriggered) return;
    setHasTriggered(true);
    setIsOpen(true);
  }, [hasContacted, hasTriggered]);

  // Initial Triggers
  useEffect(() => {
    if (hasTriggered || hasContacted()) return;

    // Time trigger for desktop (20s)
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    if (!isMobile) {
      triggerTimeoutRef.current = setTimeout(() => {
        triggerInitialPopup();
      }, 20000);
    }

    // Scroll trigger
    const handleScroll = () => {
      if (hasTriggered || hasContacted()) return;
      
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPos = window.scrollY;
      
      if (scrollHeight <= 0) return;
      
      const scrollPercent = (scrollPos / scrollHeight) * 100;
      const targetPercent = window.innerWidth < 768 ? 50 : 40;
      
      if (scrollPercent >= targetPercent) {
        triggerInitialPopup();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Check once immediately on mount
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (triggerTimeoutRef.current) clearTimeout(triggerTimeoutRef.current);
    };
  }, [hasTriggered, triggerInitialPopup, hasContacted]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (reminderTimeoutRef.current) clearTimeout(reminderTimeoutRef.current);
      if (triggerTimeoutRef.current) clearTimeout(triggerTimeoutRef.current);
    };
  }, []);

  // Escape key and click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePopup(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        closePopup(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    
    // Prevent body scroll when modal is open on mobile
    if (window.innerWidth < 768) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, closePopup]);

  const handleWhatsApp = () => {
    let message = `Hi Green World Holidays,\n\n`;
    if (name.trim()) {
      message += `My name is ${name.trim()}.\n\n`;
    }
    
    if (selectedOption || destination.trim()) {
      message += `I am interested in:\n`;
      if (selectedOption) message += `${selectedOption}\n`;
      if (destination.trim()) message += `${destination.trim()}\n`;
      message += `\n`;
    }
    
    message += `Please share the itinerary, pricing, and availability.\n\nThank you.`;

    markAsContacted();
    const whatsappUrl = `https://wa.me/918075438808?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    closePopup(true);
  };

  const handleCall = () => {
    markAsContacted();
    window.location.href = 'tel:+918075438808';
    closePopup(true);
  };

  if (!isOpen && !isClosing) return null;

  return (
    <div className={`fixed inset-0 z-[9999] flex items-end md:items-center justify-center p-0 md:p-4 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
      <div 
        ref={popupRef}
        className={`bg-[#FDFBF7] w-full md:w-[700px] md:rounded-[32px] rounded-t-[32px] md:rounded-b-[32px] shadow-2xl flex flex-col md:flex-row overflow-hidden relative transform transition-transform duration-300 ${isClosing ? 'translate-y-full md:scale-95' : 'translate-y-0 md:scale-100'}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="popup-title"
      >
        {/* Left Image Section - Hidden on small mobile, visible on desktop */}
        <div className="hidden md:block md:w-2/5 relative bg-emerald-900">
          <img 
            src="https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556508/houseboat_pvwt7k.jpg" 
            alt="Kerala Backwaters"
            className="absolute inset-0 w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <p className="font-playfair text-xl font-medium leading-snug">Experience the Magic of Kerala</p>
          </div>
        </div>

        {/* Right Content Section */}
        <div className="w-full md:w-3/5 p-6 md:p-8 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 id="popup-title" className="font-playfair text-2xl md:text-3xl font-bold text-emerald-950 mb-2">
                Need Help Planning<br/>Your Kerala Trip?
              </h2>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                Tell us what you're looking for and our travel experts will assist you instantly.
              </p>
            </div>
            <button 
              onClick={() => closePopup(false)}
              className="p-2 -mt-2 -mr-2 text-gray-400 hover:text-emerald-900 hover:bg-emerald-50 rounded-full transition-colors"
              aria-label="Close popup"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-6">
            {/* Input Fields */}
            <div className="space-y-3">
              <input 
                type="text" 
                placeholder="Your Name (Optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all shadow-sm font-outfit"
              />
              <input 
                type="text" 
                placeholder="Destination (Optional)"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all shadow-sm font-outfit"
              />
            </div>

            {/* Chips */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3 font-outfit">What are you looking for?</p>
              <div className="flex flex-wrap gap-2">
                {ENQUIRY_OPTIONS.map(option => (
                  <EnquiryChip 
                    key={option}
                    label={option}
                    selected={selectedOption === option}
                    onClick={() => setSelectedOption(option === selectedOption ? '' : option)}
                  />
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button 
                onClick={handleWhatsApp}
                className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-3.5 rounded-full font-medium flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md font-outfit"
              >
                <MessageCircle size={20} />
                <span>Chat on WhatsApp</span>
              </button>
              <button 
                onClick={handleCall}
                className="flex-1 bg-white hover:bg-emerald-50 text-emerald-800 border-2 border-emerald-700 px-4 py-3.5 rounded-full font-medium flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm font-outfit"
              >
                <Phone size={20} />
                <span>Call Expert</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
