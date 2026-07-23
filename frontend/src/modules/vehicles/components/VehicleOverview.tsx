import React from 'react';
import { Star, CheckCircle } from 'lucide-react';
import { Vehicle } from '../types/vehicle.types';

interface VehicleOverviewProps {
  vehicle: Vehicle;
}

export function VehicleOverview({ vehicle }: VehicleOverviewProps) {
  if (!vehicle.overview && !vehicle.highlights?.length) return null;

  return (
    <section className="max-w-4xl mx-auto my-14 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        About {vehicle.name}
      </h2>
      
      {vehicle.overview && (
        <div className="text-gray-700 text-base md:text-lg leading-relaxed space-y-4 mb-8">
          <p>{vehicle.overview}</p>
        </div>
      )}

      {vehicle.highlights && vehicle.highlights.length > 0 && (
        <div className="mt-8 pt-8 border-t border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Key Highlights</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {vehicle.highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 text-sm md:text-base font-medium">{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
