import React from 'react';
import { Users, Fuel, Car, Briefcase } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import { Vehicle } from '../types/vehicle.types';
import { PremiumCard } from '@/shared/components/display/PremiumCard';
import { SectionHeader } from '@/shared/components/display/SectionHeader';

interface RelatedVehiclesProps {
  vehicles: Vehicle[];
  title?: string;
}

export function RelatedVehicles({ vehicles, title = "Similar Vehicles" }: RelatedVehiclesProps) {
  if (!vehicles || vehicles.length === 0) return null;

  return (
    <section className="my-20">
      <SectionHeader
        title={title}
        align="left"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {vehicles.map((vehicle) => {
          const footerItems = (
            <div className="grid grid-cols-2 gap-3 text-xs text-gray-600 font-semibold tracking-wide">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-primary-green" />
                <span>{vehicle.seatCapacity} Seats</span>
              </div>
              {vehicle.fuelType && (
                <div className="flex items-center">
                  <Fuel className="h-4 w-4 mr-2 text-primary-green" />
                  <span className="line-clamp-1">{vehicle.fuelType}</span>
                </div>
              )}
              {vehicle.transmission && (
                <div className="flex items-center">
                  <Car className="h-4 w-4 mr-2 text-primary-green" />
                  <span className="line-clamp-1">{vehicle.transmission}</span>
                </div>
              )}
              <div className="flex items-center">
                <Briefcase className="h-4 w-4 mr-2 text-primary-green" />
                <span>{vehicle.luggageCapacity} Bags</span>
              </div>
            </div>
          );

          return (
            <PremiumCard
              key={vehicle.id}
              href={ROUTES.vehicleDetail(vehicle.slug)}
              image={vehicle.image}
              title={vehicle.name}
              subtitle={vehicle.category}
              rating={vehicle.rating}
              footerItems={footerItems}
              actionText="View Details"
            />
          );
        })}
      </div>
    </section>
  );
}

