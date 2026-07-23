'use client';

import React from 'react';

export function BookingCTA() {
  const handlePlanTrip = () => {
    const message = `Hi! I'm interested in planning a Kerala trip with Green World Holidays. Could you please help me with travel packages and car rental options?`;
    const whatsappUrl = `https://wa.me/918075438808?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
      <button
        onClick={handlePlanTrip}
        className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
      >
        Book Now
      </button>
      <button
        onClick={handlePlanTrip}
        className="bg-transparent border-2 border-white hover:bg-white hover:bg-opacity-10 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
      >
        Plan Your Trip
      </button>
    </div>
  );
}
