'use client';

import React, { useState } from 'react';
import { Car, Users, Fuel, Shield, Star } from 'lucide-react';
import { Vehicle } from '@/modules/vehicles/types/vehicle.types';
import { AppImage } from '@/shared/components/display/AppImage';

interface VehicleFilterListProps {
  initialVehicles: Vehicle[];
}

const CATEGORIES = ['All', 'MPV', 'Sedan', 'Van', 'Bus'];

export function VehicleFilterList({ initialVehicles }: VehicleFilterListProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredVehicles = selectedCategory === 'All' 
    ? initialVehicles.slice(0, 6) 
    : initialVehicles.filter(v => v.category === selectedCategory).slice(0, 6);

  const handleBookVehicle = (vehicleName: string) => {
    const message = `Hi! I'm interested in booking the ${vehicleName}. Could you please provide more details about availability and pricing?`;
    window.open(`https://wa.me/918075438808?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
          Our Vehicle Fleet
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 md:mb-12">
          Choose from our diverse range of well-maintained vehicles for your perfect journey
        </p>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-emerald-50 hover:text-emerald-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
        {filteredVehicles.map((vehicle) => (
          <div key={vehicle.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group flex flex-col">
            <div className="relative h-48 md:h-56 w-full overflow-hidden">
              <AppImage
                src={vehicle.image}
                alt={vehicle.name}
                fill
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 md:px-3 py-1 rounded-full z-10">
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 md:h-4 md:w-4 text-yellow-400 fill-current" />
                  <span className="text-xs md:text-sm font-medium">{vehicle.rating}</span>
                </div>
              </div>
              <div className="absolute top-4 left-4 bg-emerald-600 text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium z-10">
                {vehicle.category}
              </div>
            </div>
            
            <div className="p-4 md:p-6 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-3 md:mb-4">
                <h3 className="text-lg md:text-xl font-bold text-gray-900">{vehicle.name}</h3>
              </div>
              
              {/* Vehicle Specs */}
              <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{vehicle.seatCapacity} Seats</span>
                </div>
                {vehicle.fuelType && (
                  <div className="flex items-center space-x-2">
                    <Fuel className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600 line-clamp-1">{vehicle.fuelType}</span>
                  </div>
                )}
                {vehicle.transmission && (
                  <div className="flex items-center space-x-2">
                    <Car className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600 line-clamp-1">{vehicle.transmission}</span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{vehicle.luggageCapacity} Bags</span>
                </div>
              </div>
              
              <button
                onClick={() => handleBookVehicle(vehicle.name)}
                className="mt-auto w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 md:py-3 px-4 md:px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg text-sm md:text-base"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Fleet Manager CTA */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl md:rounded-3xl p-6 md:p-12 text-center text-white">
        <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Need a Custom Solution?</h3>
        <p className="text-lg md:text-xl mb-6 md:mb-8 opacity-90 max-w-2xl mx-auto">
          Can't find the perfect vehicle? Our fleet manager will help you find the ideal solution for your specific needs.
        </p>
        <a
          href={`https://wa.me/918075438808?text=${encodeURIComponent("Hi! I need a custom vehicle solution. Could you please help me with my requirements?")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-white text-emerald-600 hover:bg-gray-100 px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg text-sm md:text-base"
        >
          Contact Our Fleet Manager
        </a>
      </div>
    </div>
  );
}
