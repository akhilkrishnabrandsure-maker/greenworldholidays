import React from 'react';
import Link from 'next/link';
import { destinationRepository } from '../../destinations/repository/destination.repository';
import { DestinationCard } from '../../destinations/components/DestinationCard';
import { ArrowRight } from 'lucide-react';
import { ROUTES } from '@/constants/routes';

export async function DestinationPreview() {
  const allDestinations = await destinationRepository.getAll();
  // Limit to 3 or 4 for preview
  const previewDestinations = allDestinations.slice(0, 3);

  return (
    <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-emerald-50/20" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-emerald-950 mb-4">
              Popular <span className="text-emerald-700">Destinations</span>
            </h2>
            <p className="font-outfit text-gray-600 text-lg leading-relaxed font-light">
              Explore the most loved locations across God's Own Country, from misty hill stations to serene backwaters.
            </p>
          </div>
          
          <Link 
            href={ROUTES.DESTINATIONS}
            className="group flex items-center space-x-2 text-emerald-700 font-semibold hover:text-emerald-800 transition-colors whitespace-nowrap"
          >
            <span>View All Destinations</span>
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {previewDestinations.map(destination => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </div>
    </section>
  );
}
