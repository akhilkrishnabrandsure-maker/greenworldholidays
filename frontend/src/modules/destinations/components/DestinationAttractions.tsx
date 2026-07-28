import React from 'react';
import { Attraction } from '../types/destination.types';
import { AttractionCard } from './AttractionCard';
import { SectionHeader } from '@/shared/components/display/SectionHeader';

interface DestinationAttractionsProps {
  attractions?: Attraction[];
  destinationName: string;
}

export function DestinationAttractions({ attractions, destinationName }: DestinationAttractionsProps) {
  if (!attractions || attractions.length === 0) return null;

  return (
    <section className="my-20">
      <SectionHeader
        title={`Top Attractions in ${destinationName}`}
        subtitle="Must-visit places and iconic landmarks to include in your itinerary."
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {attractions.map((attraction) => (
          <AttractionCard key={attraction.id} attraction={attraction} />
        ))}
      </div>
    </section>
  );
}
