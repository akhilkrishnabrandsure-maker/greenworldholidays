import React from 'react';
import { Star, CheckCircle } from 'lucide-react';
import { Vehicle } from '../types/vehicle.types';

interface VehicleOverviewProps {
  vehicle: Vehicle;
}

export function VehicleOverview({ vehicle }: VehicleOverviewProps) {
  if (!vehicle.overview && !vehicle.highlights?.length) return null;

  return (
    <section className="max-w-4xl mx-auto my-16 bg-white p-8 md:p-14 rounded-3xl shadow-premium border border-gray-100/50">
      <h2 className="text-2xl md:text-3.5xl font-bold font-serif text-gray-950 mb-6 leading-tight">
        About {vehicle.name}
      </h2>
      
      {vehicle.overview && (
        <div className="text-gray-700 text-base md:text-lg leading-relaxed space-y-4 mb-8">
          <p>{vehicle.overview}</p>
        </div>
      )}

      {vehicle.highlights && vehicle.highlights.length > 0 && (
        <div className="mt-8 pt-8 border-t border-gray-150/60">
          <h3 className="text-xl font-bold font-serif text-gray-950 mb-5">Key Highlights</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {vehicle.highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary-green mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 text-sm md:text-base font-semibold font-sans">{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
