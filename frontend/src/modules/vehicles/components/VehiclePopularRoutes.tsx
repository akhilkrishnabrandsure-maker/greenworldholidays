'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, MapPin, Clock } from 'lucide-react';
import { Vehicle, DestinationRoute } from '../types/vehicle.types';
import { AppImage } from '@/shared/components/display/AppImage';

interface VehiclePopularRoutesProps {
  vehicle: Vehicle;
}

export function VehiclePopularRoutes({ vehicle }: VehiclePopularRoutesProps) {
  const defaultDestinations: DestinationRoute[] = [
    {
      name: 'Munnar Hill Station',
      distance: '125 km from COK Airport',
      duration: '3.5 hrs scenic drive',
      image: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556519/munnar_img_nezzuf.jpg',
      slug: 'munnar',
    },
    {
      name: 'Alleppey Backwaters',
      distance: '85 km from COK Airport',
      duration: '2.2 hrs drive',
      image: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556508/houseboat_pvwt7k.jpg',
      slug: 'alleppey',
    },
    {
      name: 'Thekkady Wildlife Reserve',
      distance: '145 km from COK Airport',
      duration: '4.0 hrs drive',
      image: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=800&q=80',
      slug: 'thekkady',
    },
  ];

  const routes = vehicle.destinations?.length ? vehicle.destinations : defaultDestinations;

  return (
    <section className="py-16 sm:py-20 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">Kerala Itineraries</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-gray-900 mt-1">
              Perfect Destinations for This Vehicle
            </h2>
            <p className="text-sm text-gray-600 mt-1 max-w-xl">
              Recommended trips across Kerala tailored for smooth, comfortable travel in the {vehicle.name}.
            </p>
          </div>

          <Link
            href="/destinations"
            className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 hover:text-emerald-600 transition-colors"
          >
            <span>View All Kerala Routes</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {routes.map((route, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-gray-100 group hover:shadow-xl transition-all duration-500 flex flex-col"
            >
              <div className="relative h-60 w-full overflow-hidden">
                <AppImage
                  src={route.image}
                  alt={route.name}
                  fill
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl font-bold font-serif">{route.name}</h3>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{route.distance}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{route.duration}</span>
                  </div>
                </div>

                <a
                  href={`https://wa.me/918075438808?text=${encodeURIComponent(`Hi! I'm interested in booking the ${vehicle.name} for a trip to ${route.name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between w-full pt-3 border-t border-gray-100 text-xs font-bold text-emerald-800 hover:text-emerald-600 group-hover:px-1 transition-all"
                >
                  <span>Plan Trip to {route.name}</span>
                  <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
