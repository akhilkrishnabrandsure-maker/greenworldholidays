'use client';

import React, { useState } from 'react';
import { MapPin, Calendar, Users, Search } from 'lucide-react';

interface FloatingBookingFormProps {
  destinationName: string;
}

export function FloatingBookingForm({ destinationName }: FloatingBookingFormProps) {
  const [pickupLocation, setPickupLocation] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [passengers, setPassengers] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSearch = () => {
    const newErrors: { [key: string]: string } = {};
    if (!pickupLocation.trim()) newErrors.pickupLocation = 'Pickup location is required';
    if (!travelDate) newErrors.travelDate = 'Travel date is required';
    if (!passengers || parseInt(passengers) < 1) newErrors.passengers = 'Valid passenger count is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});

    const message = `Hi Green World Holidays,

I would like to get the transportation rates for my *${destinationName}* trip.

*Trip Details*
- Pickup Location: ${pickupLocation}
- Travel Date: ${travelDate}
- Passengers: ${passengers}

Please share the best vehicle options, availability, and pricing.`;

    const whatsappUrl = `https://wa.me/918075438808?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="w-full bg-white/95 backdrop-blur-xl rounded-2xl md:rounded-[2rem] p-6 shadow-premium-lg border border-white/20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
        {/* Pickup Location */}
        <div className="flex flex-col">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Pickup Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input 
              type="text" 
              placeholder="e.g. Cochin Airport" 
              value={pickupLocation}
              onChange={(e) => { setPickupLocation(e.target.value); if(errors.pickupLocation) setErrors({...errors, pickupLocation: ''}) }}
              className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-green/20 transition-all ${errors.pickupLocation ? 'border-red-300' : 'border-gray-200'}`}
            />
          </div>
          {errors.pickupLocation && <span className="text-red-500 text-xs mt-1">{errors.pickupLocation}</span>}
        </div>

        {/* Travel Date */}
        <div className="flex flex-col">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Travel Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input 
              type="date" 
              value={travelDate}
              onChange={(e) => { setTravelDate(e.target.value); if(errors.travelDate) setErrors({...errors, travelDate: ''}) }}
              className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-green/20 transition-all ${errors.travelDate ? 'border-red-300' : 'border-gray-200'}`}
            />
          </div>
          {errors.travelDate && <span className="text-red-500 text-xs mt-1">{errors.travelDate}</span>}
        </div>

        {/* Passengers */}
        <div className="flex flex-col">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Passengers</label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input 
              type="number" 
              min="1"
              placeholder="Count" 
              value={passengers}
              onChange={(e) => { setPassengers(e.target.value); if(errors.passengers) setErrors({...errors, passengers: ''}) }}
              className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-green/20 transition-all ${errors.passengers ? 'border-red-300' : 'border-gray-200'}`}
            />
          </div>
          {errors.passengers && <span className="text-red-500 text-xs mt-1">{errors.passengers}</span>}
        </div>

        {/* Search Button */}
        <div className="flex flex-col justify-end h-full mt-2 md:mt-0">
          <button 
            onClick={handleSearch}
            className="w-full bg-primary-green hover:bg-primary-green-dark text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:-translate-y-0.5 mt-auto"
            style={{ minHeight: '48px' }}
          >
            <Search className="h-5 w-5" />
            <span>Search Rates</span>
          </button>
        </div>
      </div>
    </div>
  );
}
