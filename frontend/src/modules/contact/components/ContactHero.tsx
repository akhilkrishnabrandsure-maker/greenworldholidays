import React from 'react';
import Link from 'next/link';
import { ChevronRight, Phone, MessageCircle } from 'lucide-react';
import { contactRepository } from '../repository/contact.repository';
import { AppImage } from '@/shared/components/display/AppImage';

export function ContactHero() {
  const { whatsapp, phone } = contactRepository.details;
  const waUrl = `https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent("Hi Green World Holidays, I'd like to plan a Kerala trip.")}`;

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 flex items-center justify-center overflow-hidden min-h-[600px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <AppImage
          src="https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556508/houseboat_pvwt7k.jpg"
          alt="Kerala Backwaters Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-emerald-950/80 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Breadcrumbs */}
        <nav className="flex items-center justify-center space-x-2 text-sm text-emerald-100/80 mb-8 font-outfit">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white font-medium">Contact Us</span>
        </nav>

        {/* Heading */}
        <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
          Let&apos;s Plan Your <br className="md:hidden" />
          <span className="text-emerald-300">Kerala Journey</span>
        </h1>
        
        {/* Decorative Divider */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-emerald-400/50"></div>
          <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-emerald-400/50"></div>
        </div>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-emerald-50 max-w-2xl mx-auto font-outfit font-light leading-relaxed mb-12">
          Connect with our local travel experts. We are here 24/7 to help you curate an unforgettable and personalized Kerala experience.
        </p>
        
        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group w-full sm:w-auto flex items-center justify-center space-x-3 bg-white hover:bg-emerald-50 text-emerald-900 px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
              <MessageCircle className="w-5 h-5 text-emerald-700" />
            </div>
            <span>Chat on WhatsApp</span>
          </a>
          
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
    </section>
  );
}
