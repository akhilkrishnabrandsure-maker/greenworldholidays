import React from 'react';
import { MapPin, Star, Calendar, Award } from 'lucide-react';
import { Destination } from '../types/destination.types';

interface DestinationQuickInfoProps {
  destination: Destination;
}

export function DestinationQuickInfo({ destination }: DestinationQuickInfoProps) {
  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-premium border border-gray-100/60 mb-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
      <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-cream-dark/20 border border-gray-50 hover:border-luxury-gold-light/35 transition-colors">
        <span className="flex items-center justify-center h-10 w-10 rounded-full bg-emerald-50 text-primary-green mb-3">
          <MapPin className="h-5 w-5" />
        </span>
        <span className="text-[10px] text-gray-500 font-extrabold uppercase tracking-wider mb-1">Location</span>
        <span className="text-sm font-bold text-gray-950 font-sans">
          {destination.district}{destination.state ? `, ${destination.state}` : ''}
        </span>
      </div>

      <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-cream-dark/20 border border-gray-50 hover:border-luxury-gold-light/35 transition-colors">
        <span className="flex items-center justify-center h-10 w-10 rounded-full bg-amber-50 text-luxury-gold-dark mb-3">
          <Star className="h-5 w-5 fill-current" />
        </span>
        <span className="text-[10px] text-gray-500 font-extrabold uppercase tracking-wider mb-1">Rating</span>
        <span className="text-sm font-bold text-gray-950 font-sans">
          {destination.rating} {destination.reviewsCount ? `(${destination.reviewsCount}+ reviews)` : ''}
        </span>
      </div>

      <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-cream-dark/20 border border-gray-50 hover:border-luxury-gold-light/35 transition-colors">
        <span className="flex items-center justify-center h-10 w-10 rounded-full bg-emerald-50 text-primary-green mb-3">
          <Calendar className="h-5 w-5" />
        </span>
        <span className="text-[10px] text-gray-500 font-extrabold uppercase tracking-wider mb-1">Best Time</span>
        <span className="text-sm font-bold text-gray-950 font-sans">
          {destination.bestTimeToVisit || 'Year-round'}
        </span>
      </div>

      <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-cream-dark/20 border border-gray-50 hover:border-luxury-gold-light/35 transition-colors">
        <span className="flex items-center justify-center h-10 w-10 rounded-full bg-emerald-50 text-primary-green mb-3">
          <Award className="h-5 w-5" />
        </span>
        <span className="text-[10px] text-gray-500 font-extrabold uppercase tracking-wider mb-1">Top Feature</span>
        <span className="text-sm font-bold text-gray-950 font-sans">
          {destination.highlights && destination.highlights[0] ? destination.highlights[0] : 'Scenic Nature'}
        </span>
      </div>
    </div>
  );
}

