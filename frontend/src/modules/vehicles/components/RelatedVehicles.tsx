import React from 'react';
import Link from 'next/link';
import { Star, Users, Fuel, Car, Shield } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import { AppImage } from '@/shared/components/display/AppImage';
import { Vehicle } from '../types/vehicle.types';

interface RelatedVehiclesProps {
  vehicles: Vehicle[];
  title?: string;
}

export function RelatedVehicles({ vehicles, title = "Similar Vehicles" }: RelatedVehiclesProps) {
  if (!vehicles || vehicles.length === 0) return null;

  return (
    <section className="my-20">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 px-2 text-center md:text-left">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <Link
            key={vehicle.id}
            href={ROUTES.vehicleDetail(vehicle.slug)}
            className="group flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <AppImage
                src={vehicle.image}
                alt={vehicle.name}
                fill
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full z-10 flex items-center shadow-sm">
                <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                <span className="text-xs font-bold text-gray-900">{vehicle.rating}</span>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-lg font-bold text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors line-clamp-1">
                {vehicle.name}
              </h3>
              
              <div className="grid grid-cols-2 gap-3 mt-auto">
                <div className="flex items-center text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">{vehicle.seatCapacity} Seats</span>
                </div>
                {vehicle.fuelType && (
                  <div className="flex items-center text-gray-600">
                    <Fuel className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium line-clamp-1">{vehicle.fuelType}</span>
                  </div>
                )}
                {vehicle.transmission && (
                  <div className="flex items-center text-gray-600">
                    <Car className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium line-clamp-1">{vehicle.transmission}</span>
                  </div>
                )}
                <div className="flex items-center text-gray-600">
                  <Shield className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">{vehicle.luggageCapacity} Bags</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
