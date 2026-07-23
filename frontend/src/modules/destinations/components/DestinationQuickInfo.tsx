import React from 'react';
import { MapPin, Star, Calendar, Clock, Award } from 'lucide-react';
import { Destination } from '../types/destination.types';

interface DestinationQuickInfoProps {
  destination: Destination;
}

export function DestinationQuickInfo({ destination }: DestinationQuickInfoProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-emerald-100 mb-10 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
      <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-emerald-50/50">
        <MapPin className="h-5 w-5 text-emerald-600 mb-1" />
        <span className="text-xs text-gray-500 font-medium">Location</span>
        <span className="text-sm font-semibold text-gray-900">
          {destination.district}{destination.state ? `, ${destination.state}` : ''}
        </span>
      </div>

      <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-emerald-50/50">
        <Star className="h-5 w-5 text-yellow-500 fill-current mb-1" />
        <span className="text-xs text-gray-500 font-medium">Rating</span>
        <span className="text-sm font-semibold text-gray-900">
          {destination.rating} {destination.reviewsCount ? `(${destination.reviewsCount}+ reviews)` : ''}
        </span>
      </div>

      <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-emerald-50/50">
        <Calendar className="h-5 w-5 text-emerald-600 mb-1" />
        <span className="text-xs text-gray-500 font-medium">Best Time</span>
        <span className="text-sm font-semibold text-gray-900">
          {destination.bestTimeToVisit || 'Year-round'}
        </span>
      </div>

      <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-emerald-50/50">
        <Award className="h-5 w-5 text-emerald-600 mb-1" />
        <span className="text-xs text-gray-500 font-medium">Top Feature</span>
        <span className="text-sm font-semibold text-gray-900">
          {destination.highlights && destination.highlights[0] ? 'Scenic Nature' : 'Popular Destination'}
        </span>
      </div>
    </div>
  );
}
