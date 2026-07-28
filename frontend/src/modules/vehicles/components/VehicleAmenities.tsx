import React from 'react';
import * as LucideIcons from 'lucide-react';
import { Vehicle, Feature, Amenity } from '../types/vehicle.types';

interface VehicleAmenitiesProps {
  vehicle: Vehicle;
}

const renderIcon = (iconName: string = 'CheckCircle') => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.CheckCircle;
  return <IconComponent className="h-6 w-6 text-primary-green mb-3" />;
};

export function VehicleAmenities({ vehicle }: VehicleAmenitiesProps) {
  if (!vehicle.features?.length && !vehicle.amenities?.length) return null;

  return (
    <section className="max-w-4xl mx-auto my-16 bg-white p-8 md:p-14 rounded-3xl shadow-premium border border-gray-100/50">
      <h2 className="text-2xl md:text-3.5xl font-bold font-serif text-gray-950 mb-8 text-center leading-tight">
        Features & Amenities
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {vehicle.features?.map((feature: Feature, idx: number) => (
          <div key={`feature-${idx}`} className="flex flex-col items-center text-center p-5 rounded-2xl bg-cream-dark/20 border border-gray-50 hover:border-luxury-gold-light/35 hover:bg-cream-dark/30 transition-all duration-300">
            {renderIcon(feature.icon)}
            <span className="text-sm font-bold text-gray-950 font-sans">{feature.name}</span>
          </div>
        ))}
        
        {vehicle.amenities?.map((amenity: Amenity, idx: number) => (
          <div key={`amenity-${idx}`} className="flex flex-col items-center text-center p-5 rounded-2xl bg-cream-dark/20 border border-gray-50 hover:border-luxury-gold-light/35 hover:bg-cream-dark/30 transition-all duration-300">
            {renderIcon(amenity.icon)}
            <span className="text-sm font-bold text-gray-950 font-sans">{amenity.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
