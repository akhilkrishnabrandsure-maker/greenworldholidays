import React from 'react';
import { MapPin, Clock } from 'lucide-react';
import { AppImage } from '@/shared/components/display/AppImage';
import { Attraction } from '../types/destination.types';

interface AttractionCardProps {
  attraction: Attraction;
}

export function AttractionCard({ attraction }: AttractionCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-48 w-full overflow-hidden">
        <AppImage
          src={attraction.image}
          alt={attraction.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{attraction.name}</h3>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-1">{attraction.description}</p>

        <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          {attraction.distance && (
            <span className="flex items-center">
              <MapPin className="h-3.5 w-3.5 text-emerald-600 mr-1" />
              {attraction.distance}
            </span>
          )}
          {attraction.duration && (
            <span className="flex items-center">
              <Clock className="h-3.5 w-3.5 text-emerald-600 mr-1" />
              {attraction.duration}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
