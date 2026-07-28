'use client';

import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { Vehicle } from '../types/vehicle.types';

interface VehicleFinalCTAProps {
  vehicle: Vehicle;
}

export function VehicleFinalCTA({ vehicle }: VehicleFinalCTAProps) {
  const whatsappMessage = `Hi Green World Holidays! I am ready to book the ${vehicle.name} for my Kerala trip. Please assist me.`;
  const whatsappUrl = `https://wa.me/918075438808?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative bg-[#0B4F37] text-white rounded-3xl sm:rounded-[32px] p-8 sm:p-14 md:p-16 overflow-hidden shadow-[0_20px_50px_rgba(11,79,55,0.3)]">
        
        {/* Glow Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-300 bg-white/10 px-4 py-1.5 rounded-full border border-white/10 inline-block">
            Seamless Booking & Concierge
          </span>

          <h2 className="text-3xl sm:text-5xl font-bold font-serif leading-tight">
            Ready to Travel Across Kerala?
          </h2>

          <p className="text-emerald-100/90 text-base sm:text-lg leading-relaxed font-light">
            Book your {vehicle.name} today and experience comfortable, safe, and unforgettable journeys across God's Own Country.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-bold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-xl flex items-center justify-center space-x-2 text-base"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>WhatsApp Booking</span>
            </a>

            <a
              href="tel:+918075438808"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-full border border-white/20 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 text-base"
            >
              <Phone className="w-5 h-5 text-emerald-300" />
              <span>Call Our Experts</span>
            </a>
          </div>

          <p className="text-xs text-emerald-200/60 pt-2">
            ☎️ 24x7 Customer Helpline: +91 80754 38808 • Instant Confirmation
          </p>
        </div>
      </div>
    </section>
  );
}
