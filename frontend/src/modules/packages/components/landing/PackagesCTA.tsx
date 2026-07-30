import React from 'react';
import { PhoneCall, MessageCircle } from 'lucide-react';

export function PackagesCTA() {
  return (
    <section className="py-24 bg-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary-green rounded-[32px] p-12 md:p-20 text-center shadow-premium-lg relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-luxury-gold/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
          
          <div className="relative z-10">
            <span className="text-[10px] text-luxury-gold font-extrabold uppercase tracking-widest mb-4 block">
              Start Planning
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-white mb-6 leading-tight drop-shadow-md">
              Ready to Experience the <br className="hidden md:block" /> Magic of Kerala?
            </h2>
            <p className="text-lg text-emerald-100 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
              Connect with our travel specialists today to craft a bespoke itinerary tailored to your unique preferences.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="tel:+918075438808"
                className="w-full sm:w-auto bg-white hover:bg-gray-50 text-primary-green px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
              >
                <PhoneCall className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span>Request a Call Back</span>
              </a>
              <a 
                href="https://wa.me/918075438808?text=Hi%20Green%20World%20Holidays,%20I%20am%20interested%20in%20your%20Kerala%20Tour%20Packages."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
              >
                <MessageCircle className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
