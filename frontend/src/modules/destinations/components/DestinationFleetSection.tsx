import React from 'react';
import { Users, Fuel, Car, Briefcase } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import { vehicleRepository } from '@/modules/vehicles/repository/vehicle.repository';
import { Destination } from '../types/destination.types';
import { PremiumCard } from '@/shared/components/display/PremiumCard';
import { SectionHeader } from '@/shared/components/display/SectionHeader';

interface DestinationFleetSectionProps {
  destination: Destination;
}

export async function DestinationFleetSection({ destination }: DestinationFleetSectionProps) {
  if (!destination.recommendedVehicleSlugs || destination.recommendedVehicleSlugs.length === 0) {
    return null;
  }

  // Extract a clean destination name (e.g. "Munnar Hill Station" -> "Munnar")
  const getCleanName = (slug: string, name: string) => {
    if (slug.includes('alappuzha')) return 'Alleppey';
    return name.split(/[- \u2013\u2014]/)[0];
  };

  const cleanName = getCleanName(destination.slug, destination.name);

  // Fetch all recommended vehicles
  const vehiclesPromises = destination.recommendedVehicleSlugs.map((slug) => 
    vehicleRepository.getVehicleBySlug(slug)
  );
  
  const fetchedVehicles = await Promise.all(vehiclesPromises);
  const vehicles = fetchedVehicles.filter(v => v !== undefined);

  if (vehicles.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 mb-4">
      <SectionHeader
        title={`Our Fleet for ${cleanName}`}
        subtitle={`Choose the perfect vehicle for your ${cleanName} journey, from comfortable family cars to spacious luxury coaches.`}
        align="center"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
        {vehicles.map((vehicle) => {
          const footerItems = (
            <div className="grid grid-cols-2 gap-3 text-xs text-gray-600 font-semibold tracking-wide mb-4">
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

          // WhatsApp link generation
          const message = `Hi Green World Holidays, I would like to book the *${vehicle.name}* for my *${cleanName} trip*. Please share the availability and pricing.`;
          const whatsappUrl = `https://wa.me/918075438808?text=${encodeURIComponent(message)}`;

          // Find the badge based on category or features
          const badge = vehicle.category === 'Bus' || vehicle.category === 'Van' ? `Premium ${vehicle.seatCapacity} Seater` : (vehicle.category === 'MPV' ? 'Recommended' : 'Premium 4x4');

          return (
            <PremiumCard
              key={vehicle.id}
              href={ROUTES.vehicleDetail(vehicle.slug)}
              image={vehicle.image}
              title={vehicle.name}
              subtitle={vehicle.shortDescription || vehicle.category}
              rating={vehicle.rating}
              badge={badge}
              footerItems={footerItems}
              actionText="Book Now"
              actionHref={whatsappUrl}
            />
          );
        })}
      </div>
    </section>
  );
}
