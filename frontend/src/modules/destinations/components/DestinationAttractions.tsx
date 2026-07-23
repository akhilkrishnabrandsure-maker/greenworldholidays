import React from 'react';
import { Attraction } from '../types/destination.types';
import { AttractionCard } from './AttractionCard';

interface DestinationAttractionsProps {
  attractions?: Attraction[];
  destinationName: string;
}

export function DestinationAttractions({ attractions, destinationName }: DestinationAttractionsProps) {
  if (!attractions || attractions.length === 0) return null;

  return (
    <section className="my-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Top Attractions in {destinationName}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Must-visit places and iconic landmarks to include in your itinerary.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {attractions.map((attraction) => (
          <AttractionCard key={attraction.id} attraction={attraction} />
        ))}
      </div>
    </section>
  );
}
