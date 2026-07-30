import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { vehicleRepository } from '../../../vehicles/repository/vehicle.repository';
import { VehicleCard } from '../../../vehicles/components/VehicleCard';
import { ROUTES } from '@/constants/routes';

export async function RecommendedFleet() {
  const vehicles = await vehicleRepository.getAll();
  // We'll take the first 3 premium vehicles for the package page
  const recommendedVehicles = vehicles.slice(0, 3);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-[10px] text-luxury-gold-dark font-extrabold uppercase tracking-widest mb-4 block">
              Travel In Comfort
            </span>
            <h2 className="text-4xl md:text-5xl font-bold font-serif text-gray-900 leading-tight">
              Recommended Fleet
            </h2>
          </div>
          <Link 
            href={ROUTES.VEHICLES}
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-primary-green transition-colors group"
          >
            <span>View All Vehicles</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommendedVehicles.map(vehicle => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </div>
    </section>
  );
}
