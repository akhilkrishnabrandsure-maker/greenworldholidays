import React from 'react';
import Link from 'next/link';
import { vehicleRepository } from '../../vehicles/repository/vehicle.repository';
import { VehicleCard } from '../../vehicles/components/VehicleCard';
import { ArrowRight } from 'lucide-react';
import { ROUTES } from '@/constants/routes';

export async function FleetPreview() {
  const featuredVehicles = await vehicleRepository.getPopularVehicles();

  return (
    <section className="py-20 lg:py-32 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-emerald-950 mb-4">
              Our Premium <span className="text-emerald-700">Fleet</span>
            </h2>
            <p className="font-outfit text-gray-600 text-lg leading-relaxed font-light">
              Travel in comfort and style with our well-maintained selection of vehicles, perfectly suited for Kerala's diverse terrain.
            </p>
          </div>
          
          <Link 
            href={ROUTES.VEHICLES}
            className="group flex items-center space-x-2 text-emerald-700 font-semibold hover:text-emerald-800 transition-colors whitespace-nowrap"
          >
            <span>View Full Fleet</span>
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {featuredVehicles.map(vehicle => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>

      </div>
    </section>
  );
}
