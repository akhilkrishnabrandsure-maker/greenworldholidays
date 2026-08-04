'use client';

import React from 'react';

export function BookingCTA() {
  const handlePlanTrip = () => {
    const message = `Hi! I'm interested in planning a Kerala trip with Green World Holidays. Could you please help me with travel packages and car rental options?`;
    const whatsappUrl = `https://wa.me/918075438808?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 w-full max-w-md sm:max-w-none mx-auto">
      <button
        onClick={handlePlanTrip}
        className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
      >
        Book Now
      </button>
      <button
        onClick={handlePlanTrip}
        className="w-full sm:w-auto group relative overflow-hidden bg-transparent border-2 border-white hover:border-emerald-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors duration-700 ease-in-out shadow-lg"
      >
        <span className="absolute inset-0 w-full h-full bg-emerald-600 origin-left scale-x-0 transition-transform duration-700 ease-in-out group-hover:scale-x-100 z-0" />
        <span className="relative z-10">Plan Your Trip</span>
      </button>
    </div>
  );
}
