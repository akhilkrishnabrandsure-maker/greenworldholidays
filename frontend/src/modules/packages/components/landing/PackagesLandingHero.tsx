'use client';

import React, { useState } from 'react';
import { AppImage } from '@/shared/components/display/AppImage';
import { ChevronRight, MapPin, Calendar, Users, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/shared/components/forms/Button';
import { saveEnquiry } from '@/lib/leadService';
import { useToast } from '@/contexts/ToastProvider';

export function PackagesLandingHero() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pickupLocation: '',
    travelDates: '',
    travellers: '2 Adults'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const { showToast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleWhatsAppSubmit = async () => {
    if (!formData.name || !formData.phone) {
      showToast("Please provide your Name and Phone number.", "error");
      return;
    }

    setIsSubmitting(true);

    let message = `Hi Green World Holidays,\n\n`;
    message += `My name is ${formData.name}.\n\n`;
    message += `I'm interested in a Kerala Tour Package.\n`;
    if (formData.pickupLocation) message += `Pickup: ${formData.pickupLocation}\n`;
    if (formData.travelDates) message += `Dates: ${formData.travelDates}\n`;
    if (formData.travellers) message += `Travellers: ${formData.travellers}\n`;
    message += `\nPlease share a quote.`;

    const response = await saveEnquiry({
      name: formData.name,
      phone: formData.phone,
      pickup: formData.pickupLocation,
      travelDate: formData.travelDates,
      travellers: formData.travellers,
      source: 'Packages Landing'
    });

    setIsSubmitting(false);

    if (response.success) {
      showToast("Enquiry saved successfully. Redirecting to WhatsApp...", "success");
      setSuccess(true);
      const whatsappUrl = `https://wa.me/918075438808?text=${encodeURIComponent(message)}`;
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        setSuccess(false);
        setFormData({ name: '', phone: '', pickupLocation: '', travelDates: '', travellers: '2 Adults' });
      }, 1500);
    } else {
      showToast(response.message || "Failed to save enquiry. Please try again or chat with us on WhatsApp.", "error");
    }
  };
  return (
    <section className="relative w-full h-[90vh] min-h-[600px] flex items-center pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <AppImage
          src="https://images.unsplash.com/photo-1593693397690-362cb96667a0?auto=format&fit=crop&w=1920&q=80"
          alt="Munnar Tea Plantations"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Side Content */}
        <div className="flex-1 max-w-2xl text-white">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-300 mb-6 font-medium tracking-wide">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">Tour Packages</span>
          </div>

          {/* Luxury Badge */}
          <div className="inline-block glass-badge text-luxury-gold text-[10px] font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            Premium Kerala Experience
          </div>

          <h1 className="text-5xl md:text-7xl font-bold font-serif leading-tight tracking-tight mb-6 text-white drop-shadow-sm">
            Kerala Tour Packages
          </h1>

          <p className="text-lg md:text-xl text-gray-200 font-sans leading-relaxed font-light drop-shadow-sm">
            Discover the soul of God&apos;s Own Country with our meticulously crafted itineraries. From misty highland retreats to serene backwater voyages, experience Kerala in unparalleled luxury.
          </p>
        </div>

        {/* Right Side Enquiry Card */}
        <div className="w-full lg:w-[400px] shrink-0">
          <div className="glass-effect rounded-3xl p-8 shadow-premium-lg">
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6 text-center">
              Plan Your Journey
            </h3>
            
            <div className="space-y-4">
              {success ? (
                <div className="bg-emerald-50 text-emerald-800 p-6 rounded-2xl text-center border border-emerald-100">
                  <p className="font-semibold text-lg mb-2">Quote Request Sent!</p>
                  <p className="text-sm">Redirecting you to WhatsApp...</p>
                </div>
              ) : (
                <>
                  <fieldset disabled={isSubmitting} className="space-y-4">
                    <div className="space-y-1">
                      <label htmlFor="name" className="text-xs font-bold text-gray-700 uppercase tracking-wide">Your Name</label>
                      <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} placeholder="e.g. John Doe" className="w-full bg-white/80 border border-gray-200 focus:border-primary-green focus:ring-1 focus:ring-primary-green rounded-xl py-3 px-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all" />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="phone" className="text-xs font-bold text-gray-700 uppercase tracking-wide">Phone Number *</label>
                      <input id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange} placeholder="Your phone number" className="w-full bg-white/80 border border-gray-200 focus:border-primary-green focus:ring-1 focus:ring-primary-green rounded-xl py-3 px-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all" />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="pickupLocation" className="text-xs font-bold text-gray-700 uppercase tracking-wide">Pickup Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
                        <input id="pickupLocation" name="pickupLocation" type="text" value={formData.pickupLocation} onChange={handleChange} aria-label="Pickup Location" placeholder="e.g. Cochin Airport" className="w-full bg-white/80 border border-gray-200 focus:border-primary-green focus:ring-1 focus:ring-primary-green rounded-xl py-3 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="travelDates" className="text-xs font-bold text-gray-700 uppercase tracking-wide">Travel Dates</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
                        <input id="travelDates" name="travelDates" type="text" value={formData.travelDates} onChange={handleChange} aria-label="Travel Dates" placeholder="Select dates" className="w-full bg-white/80 border border-gray-200 focus:border-primary-green focus:ring-1 focus:ring-primary-green rounded-xl py-3 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="travellers" className="text-xs font-bold text-gray-700 uppercase tracking-wide">Travellers</label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
                        <select id="travellers" name="travellers" value={formData.travellers} onChange={handleChange} aria-label="Number of Travellers" className="w-full bg-white/80 border border-gray-200 focus:border-primary-green focus:ring-1 focus:ring-primary-green rounded-xl py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition-all appearance-none">
                          <option>2 Adults</option>
                          <option>2 Adults, 1 Child</option>
                          <option>2 Adults, 2 Children</option>
                          <option>4 Adults</option>
                          <option>Group (6+)</option>
                        </select>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button type="button" onClick={handleWhatsAppSubmit} disabled={isSubmitting} className="w-full flex items-center justify-center gap-2 group">
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Submitting...</span>
                          </>
                        ) : (
                          <>
                            <span>Get Free Quote</span>
                            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </Button>
                    </div>

                    <div className="flex items-center gap-4 my-2">
                      <div className="h-px bg-gray-200 flex-1"></div>
                      <span className="text-xs text-gray-400 font-medium">OR</span>
                      <div className="h-px bg-gray-200 flex-1"></div>
                    </div>

                    <div>
                      <button
                        type="button"
                        onClick={handleWhatsAppSubmit}
                        disabled={isSubmitting}
                        className="w-full bg-emerald-50 hover:bg-emerald-100 text-primary-green border border-emerald-200 font-bold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.52 3.44A11.96 11.96 0 0012 .13C5.46.13.13 5.46.13 12c0 2.09.55 4.14 1.58 5.94L.13 23.87l6.09-1.6c1.76.97 3.76 1.48 5.78 1.48h.01c6.54 0 11.87-5.33 11.87-11.87a11.9 11.9 0 00-3.36-8.44zM12 21.75c-1.78 0-3.53-.48-5.06-1.38l-.36-.21-3.76.99.99-3.66-.23-.37a9.92 9.92 0 01-1.51-5.26C2.07 6.42 6.42 2.07 12 2.07c2.72 0 5.27 1.06 7.2 2.98a9.91 9.91 0 012.97 7.07c-.01 5.44-4.45 9.63-10.17 9.63zM17.58 14.1c-.3-.15-1.8-.89-2.08-.99-.28-.1-.49-.15-.69.15-.2.3-.79.99-.97 1.19-.18.2-.36.22-.66.07-.3-.15-1.28-.47-2.44-1.5-1-1.02-1.68-2.28-1.88-2.58-.2-.3-.02-.46.13-.61.13-.13.3-.3.45-.45.15-.15.2-.26.3-.43.1-.17.05-.32-.02-.47-.07-.15-.69-1.67-.95-2.28-.25-.6-.51-.52-.69-.53-.18-.01-.38-.01-.58-.01-.2 0-.53.07-.81.37-.28.3-1.07 1.05-1.07 2.56 0 1.51 1.1 2.97 1.25 3.17.15.2 2.16 3.3 5.24 4.63.73.32 1.3.51 1.74.65.73.23 1.4.2 1.93.12.59-.09 1.8-.74 2.05-1.45.25-.71.25-1.32.18-1.45-.07-.13-.27-.21-.57-.36z" /></svg>
                        <span>Chat on WhatsApp</span>
                      </button>
                    </div>
                  </fieldset>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
