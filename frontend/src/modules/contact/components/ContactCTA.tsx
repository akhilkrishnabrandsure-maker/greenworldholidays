'use client';

import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { contactRepository } from '../repository/contact.repository';

export function ContactCTA() {
  const { whatsapp, phone } = contactRepository.details;

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hi Green World Holidays, I'm ready to plan my Kerala journey!");
    window.open(`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
  };

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-emerald-800 via-emerald-900 to-emerald-950 rounded-[2.5rem] p-12 lg:p-20 text-center overflow-hidden shadow-2xl">
          
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent_40%)]" />
          <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556508/pattern_b63nka.png')] opacity-5 mix-blend-overlay" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
              Ready to Plan Your <span className="text-emerald-300">Kerala Journey?</span>
            </h2>
            <p className="font-outfit text-emerald-50/90 text-lg md:text-xl mb-12 font-light leading-relaxed">
              Connect with our local experts today and let us curate a memorable travel experience tailored specifically for you.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button
                onClick={handleWhatsApp}
                className="group w-full sm:w-auto flex items-center justify-center space-x-3 bg-white hover:bg-emerald-50 text-emerald-900 px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                  <MessageCircle className="w-5 h-5 text-emerald-700" />
                </div>
                <span>Chat on WhatsApp</span>
              </button>
              
              <a
                href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
                className="group w-full sm:w-auto flex items-center justify-center space-x-3 bg-emerald-700/50 hover:bg-emerald-600 border border-emerald-500/50 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 backdrop-blur-sm shadow-xl hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center group-hover:bg-emerald-500 transition-colors border border-emerald-400/50">
                  <Phone className="w-5 h-5 text-emerald-50" />
                </div>
                <span>Call Our Experts</span>
              </a>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
