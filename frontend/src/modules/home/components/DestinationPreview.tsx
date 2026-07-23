import React from 'react';
import Link from 'next/link';
import { destinationRepository } from '@/modules/destinations/repository/destination.repository';
import { DestinationGrid } from '@/modules/destinations/components/DestinationGrid';
import { DestinationCTA } from '@/modules/destinations/components/DestinationCTA';
import { ROUTES } from '@/constants/routes';

export async function DestinationPreview() {
  const destinations = await destinationRepository.getAll();
  const featuredDestinations = destinations.slice(0, 6);

  return (
    <section id="destinations" className="py-20 bg-gradient-to-b from-emerald-50 via-emerald-100 to-emerald-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Popular Destinations</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the world&apos;s most spectacular natural wonders and create memories that last a
            lifetime.
          </p>
        </div>

        <DestinationGrid destinations={featuredDestinations} />

        <div className="text-center mt-12">
          <Link
            href={ROUTES.DESTINATIONS}
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
          >
            View All Destinations
          </Link>
        </div>

        <DestinationCTA />
      </div>
    </section>
  );
}
