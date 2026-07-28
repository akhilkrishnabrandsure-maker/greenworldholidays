import React from 'react';
import { MessageCircle, ArrowRight } from 'lucide-react';

interface BookingCTAProps {
  title: string;
  description: string;
  whatsappUrl: string;
  buttonText?: string;
  className?: string;
}

export function BookingCTA({
  title,
  description,
  whatsappUrl,
  buttonText = 'Enquire Now on WhatsApp',
  className = '',
}: BookingCTAProps) {
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-primary-green via-primary-green-dark to-emerald-950 text-white rounded-3xl md:rounded-[2.5rem] p-8 md:p-14 text-center shadow-premium-lg border border-primary-green-light/10 ${className}`}>
      {/* Premium accent gold glows */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-luxury-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-luxury-gold/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />
      
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        {/* Title */}
        <h2 className="text-3xl md:text-4.5xl font-bold font-serif mb-4 tracking-tight leading-tight">
          {title}
        </h2>
        
        {/* Description */}
        <p className="text-base md:text-lg text-emerald-100/90 font-sans max-w-2xl mb-8 leading-relaxed font-light">
          {description}
        </p>
        
        {/* WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2.5 bg-white text-primary-green hover:bg-luxury-gold-dark hover:text-white px-8 py-4 rounded-xl font-bold text-base md:text-lg transition-all duration-300 hover:scale-105 shadow-xl"
        >
          <MessageCircle className="h-5 w-5 shrink-0" />
          <span>{buttonText}</span>
          <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
}
