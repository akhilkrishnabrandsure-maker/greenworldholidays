import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export function AboutHero() {
  return (
    <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556508/houseboat_pvwt7k.jpg"
          alt="Kerala Backwaters"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-emerald-950/70" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Breadcrumbs */}
        <nav className="flex items-center justify-center space-x-2 text-sm text-emerald-100/80 mb-6 font-outfit">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white font-medium">About Us</span>
        </nav>

        {/* Heading */}
        <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
          About <span className="text-emerald-300">Green World</span>
        </h1>
        
        {/* Decorative Divider */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-emerald-400/50"></div>
          <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-emerald-400/50"></div>
        </div>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-emerald-50 max-w-2xl mx-auto font-outfit font-light leading-relaxed">
          Your Complete Travel Partner for Unforgettable Kerala Experiences. 
          Discover the magic of God's Own Country with our trusted expertise.
        </p>
      </div>
    </section>
  );
}
