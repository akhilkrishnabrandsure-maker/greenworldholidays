'use client';

import React from 'react';
import { Car, Users, Fuel, Shield, Star } from 'lucide-react';
import Link from 'next/link';
import { Vehicle } from '@/modules/vehicles/types/vehicle.types';
import { AppImage } from '@/shared/components/display/AppImage';
import { ROUTES } from '@/constants/routes';

interface VehicleCardProps {
  vehicle: Vehicle;
  onBook?: (vehicleName: string) => void;
}

export function VehicleCard({ vehicle, onBook }: VehicleCardProps) {
  const handleBookVehicle = () => {
    if (onBook) {
      onBook(vehicle.name);
      return;
    }
    const message = `Hi! I'm interested in booking the ${vehicle.name}. Could you please provide more details about availability and pricing?`;
    window.open(`https://wa.me/918075438808?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group flex flex-col border border-gray-100">
      <Link href={ROUTES.vehicleDetail(vehicle.slug)} className="relative h-48 md:h-56 w-full overflow-hidden block">
        <AppImage
          src={vehicle.image}
          alt={vehicle.name}
          fill
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 md:px-3 py-1 rounded-full z-10 shadow-sm border border-white/20">
          <div className="flex items-center space-x-1">
            <Star className="h-3 w-3 md:h-4 md:w-4 text-luxury-gold-dark fill-luxury-gold-dark" />
            <span className="text-xs md:text-sm font-bold text-gray-900">{vehicle.rating}</span>
          </div>
        </div>
        <div className="absolute top-4 left-4 bg-primary-green/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider z-10">
          {vehicle.category}
        </div>
      </Link>

      <div className="p-4 md:p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-4">
          <Link href={ROUTES.vehicleDetail(vehicle.slug)} className="hover:text-primary-green transition-colors">
            <h3 className="text-lg md:text-xl font-bold font-serif text-gray-900 hover:text-primary-green transition-colors leading-tight">
              {vehicle.name}
            </h3>
          </Link>
        </div>

        {/* Vehicle Specs */}
        <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-primary-green/70" />
            <span className="text-sm text-gray-600 font-medium">{vehicle.seatCapacity} Seats</span>
          </div>
          {vehicle.fuelType && (
            <div className="flex items-center space-x-2">
              <Fuel className="h-4 w-4 text-primary-green/70" />
              <span className="text-sm text-gray-600 font-medium line-clamp-1">{vehicle.fuelType}</span>
            </div>
          )}
          {vehicle.transmission && (
            <div className="flex items-center space-x-2">
              <Car className="h-4 w-4 text-primary-green/70" />
              <span className="text-sm text-gray-600 font-medium line-clamp-1">{vehicle.transmission}</span>
            </div>
          )}
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-primary-green/70" />
            <span className="text-sm text-gray-600 font-medium">{vehicle.luggageCapacity} Bags</span>
          </div>
        </div>

        <button
          onClick={handleBookVehicle}
          className="mt-auto w-full bg-primary-green hover:bg-primary-green-dark text-white py-3 px-6 rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg text-sm flex justify-center items-center gap-2 group"
        >
          <span>Book Vehicle</span>
        </button>
      </div>
    </div>
  );
}
