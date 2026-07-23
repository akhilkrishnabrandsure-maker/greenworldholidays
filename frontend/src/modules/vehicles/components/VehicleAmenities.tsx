import React from 'react';
import * as LucideIcons from 'lucide-react';
import { Vehicle, Feature, Amenity } from '../types/vehicle.types';

interface VehicleAmenitiesProps {
  vehicle: Vehicle;
}

const renderIcon = (iconName: string = 'CheckCircle') => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.CheckCircle;
  return <IconComponent className="h-5 w-5 text-emerald-600 mb-2" />;
};

export function VehicleAmenities({ vehicle }: VehicleAmenitiesProps) {
  if (!vehicle.features?.length && !vehicle.amenities?.length) return null;

  return (
    <section className="max-w-4xl mx-auto my-14 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
        Features & Amenities
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {vehicle.features?.map((feature: Feature, idx: number) => (
          <div key={`feature-${idx}`} className="flex flex-col items-center text-center p-4 rounded-xl bg-gray-50 hover:bg-emerald-50 transition-colors">
            {renderIcon(feature.icon)}
            <span className="text-sm font-medium text-gray-900">{feature.name}</span>
          </div>
        ))}
        
        {vehicle.amenities?.map((amenity: Amenity, idx: number) => (
          <div key={`amenity-${idx}`} className="flex flex-col items-center text-center p-4 rounded-xl bg-gray-50 hover:bg-emerald-50 transition-colors">
            {renderIcon(amenity.icon)}
            <span className="text-sm font-medium text-gray-900">{amenity.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
