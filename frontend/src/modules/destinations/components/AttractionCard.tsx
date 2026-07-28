import React from 'react';
import { MapPin, Clock } from 'lucide-react';
import { AppImage } from '@/shared/components/display/AppImage';
import { Attraction } from '../types/destination.types';

interface AttractionCardProps {
  attraction: Attraction;
}

export function AttractionCard({ attraction }: AttractionCardProps) {
  return (
    <div className="bg-white rounded-3xl shadow-premium overflow-hidden border border-gray-100/50 flex flex-col hover:shadow-premium-lg transition-all duration-300 hover:-translate-y-1.5">
      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
        <AppImage
          src={attraction.image}
          alt={attraction.name}
          fill
          className="object-cover transition-transform duration-700 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-gray-950 font-serif mb-2 leading-tight">{attraction.name}</h3>
        <p className="text-gray-600 text-sm mb-5 leading-relaxed flex-1">{attraction.description}</p>

        <div className="pt-4 border-t border-gray-100/60 flex items-center justify-between text-xs text-gray-500 font-semibold tracking-wide">
          {attraction.distance && (
            <span className="flex items-center gap-1 text-primary-green">
              <MapPin className="h-3.5 w-3.5" />
              <span>{attraction.distance}</span>
            </span>
          )}
          {attraction.duration && (
            <span className="flex items-center gap-1 text-gray-500">
              <Clock className="h-3.5 w-3.5" />
              <span>{attraction.duration}</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

