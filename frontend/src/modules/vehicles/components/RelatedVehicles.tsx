'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Users, Briefcase, Star } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import { Vehicle } from '../types/vehicle.types';
import { AppImage } from '@/shared/components/display/AppImage';

interface RelatedVehiclesProps {
  vehicles: Vehicle[];
  title?: string;
}

export function RelatedVehicles({ vehicles, title = "Explore Alternative Options" }: RelatedVehiclesProps) {
  if (!vehicles || vehicles.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">Fleet Recommendations</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-gray-900 mt-1">
              {title}
            </h2>
          </div>

          <Link
            href={ROUTES.VEHICLES}
            className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 hover:text-emerald-600 transition-colors"
          >
            <span>View Full Fleet</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {vehicles.slice(0, 3).map((vehicle) => (
            <Link
              key={vehicle.id}
              href={ROUTES.vehicleDetail(vehicle.slug)}
              className="bg-white rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-gray-100 group hover:shadow-2xl transition-all duration-500 flex flex-col"
            >
              <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                <AppImage
                  src={vehicle.image}
                  alt={vehicle.name}
                  fill
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-gray-900 flex items-center space-x-1 shadow-sm">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />
                  <span>{vehicle.rating || 4.8}</span>
                </div>
                <div className="absolute top-4 left-4 bg-emerald-800 text-white px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider">
                  {vehicle.category}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-bold font-serif text-gray-900 group-hover:text-emerald-800 transition-colors">
                    {vehicle.name}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-2 mt-1.5 leading-relaxed">
                    {vehicle.shortDescription || 'Premium luxury transport across Kerala.'}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center space-x-3 text-xs text-gray-500">
                    <span className="flex items-center space-x-1">
                      <Users className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{vehicle.seatCapacity} Seats</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{vehicle.luggageCapacity} Luggage</span>
                    </span>
                  </div>

                  <span className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-800 group-hover:text-emerald-600 transition-colors">
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
