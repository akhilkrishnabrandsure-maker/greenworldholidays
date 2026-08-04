import React from 'react';
import { BookingCTA } from './BookingCTA';

export function HeroContent() {
  return (
    <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4 z-20">
      <div className="max-w-4xl w-full">
        <p className="text-lg md:text-xl font-medium mb-4 text-emerald-300">
          Welcome to Kerala
        </p>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight drop-shadow-md">
          <span className="block text-emerald-300">God's Own</span>
          <span className="block text-white">Country</span>
        </h1>
        
        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed text-gray-100 drop-shadow">
          Explore Kerala travel packages, backwaters, houseboats, and hill stations with Green World Holidays. Enjoy vibrant cultural experiences, serene landscapes, and customized tours for an unforgettable journey.
        </p>

        <BookingCTA />
      </div>
    </div>
  );
}
