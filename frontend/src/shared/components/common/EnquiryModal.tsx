'use client';

import React, { useState, useEffect } from 'react';
import { X, Send, Loader2 } from 'lucide-react';
import { saveEnquiry } from '@/lib/leadService';
import { useToast } from '@/contexts/ToastProvider';

export interface EnquiryContext {
  source: string;
  destination?: string;
  package?: string;
  vehicle?: string;
}

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  context: EnquiryContext;
}

export function EnquiryModal({ isOpen, onClose, context }: EnquiryModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const { showToast } = useToast();

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    setSuccess(false);
    setFormData({ name: '', phone: '', email: '', message: '' });
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const generateWhatsAppMessage = () => {
    let message = `Hi Green World Holidays,\n\n`;
    if (formData.name) message += `My name is ${formData.name}.\n\n`;
    
    if (context.destination || context.package || context.vehicle) {
      message += `I'm interested in:\n`;
      if (context.package) message += `Package: ${context.package}\n`;
      if (context.destination) message += `Destination: ${context.destination}\n`;
      if (context.vehicle) message += `Vehicle: ${context.vehicle}\n`;
      message += `\n`;
    }

    if (formData.message) message += `Additional Details:\n${formData.message}\n\n`;
    
    message += `Please share the itinerary, pricing, and availability.\n\nThank you.`;
    return encodeURIComponent(message);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phone) {
      showToast("Please provide a phone number.", "error");
      return;
    }

    setIsSubmitting(true);

    const response = await saveEnquiry({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      message: formData.message,
      source: context.source,
      destination: context.destination,
      package: context.package,
      vehicle: context.vehicle
    });

    setIsSubmitting(false);

    if (response.success) {
      showToast("Enquiry saved successfully. Redirecting to WhatsApp...", "success");
      setSuccess(true);
      // Generate WhatsApp redirect
      const waUrl = `https://wa.me/918075438808?text=${generateWhatsAppMessage()}`;
      // Small delay before redirecting for UX
      setTimeout(() => {
        window.open(waUrl, '_blank');
        onClose();
        setSuccess(false);
        setFormData({ name: '', phone: '', email: '', message: '' });
      }, 1500);
    } else {
      showToast(response.message || "There was a problem submitting your enquiry. Please try again or contact us directly on WhatsApp.", "error");
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors z-10"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="p-6 md:p-8 overflow-y-auto">
          <h2 className="text-2xl font-serif font-bold text-emerald-950 mb-2">
            Plan Your Journey
          </h2>
          <p className="text-gray-600 text-sm mb-6">
            Enter your details below and we&apos;ll connect with you on WhatsApp instantly.
          </p>

          {success ? (
            <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl text-center">
              <p className="font-semibold mb-2">Enquiry Saved!</p>
              <p className="text-sm">Redirecting you to WhatsApp...</p>
            </div>
          ) : (
            <fieldset disabled={isSubmitting}>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your Phone Number"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email (Optional)</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email Address"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Any specific requirements?"
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-semibold py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 mt-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Continue to WhatsApp</span>
                    </>
                  )}
                </button>
              </form>
            </fieldset>
          )}
        </div>
      </div>
    </div>
  );
}
