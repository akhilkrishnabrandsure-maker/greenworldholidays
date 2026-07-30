import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { destinationRepository } from '../../../destinations/repository/destination.repository';
import { DestinationCard } from '../../../destinations/components/DestinationCard';
import { ROUTES } from '@/constants/routes';

export async function PopularDestinations() {
  const allDestinations = await destinationRepository.getAll();
  // Filter and select some popular destinations for packages
  const popularSlugs = ['munnar-hill-station', 'alappuzha-backwaters-houseboat', 'thekkady-periyar', 'wayanad-nature', 'kovalam-beach', 'kumarakom-bird-sanctuary'];
  
  const popularDestinations = allDestinations
    .filter(dest => popularSlugs.some(slug => dest.slug.includes(slug) || slug.includes(dest.slug)))
    .slice(0, 6);

  // If not enough match, just take the first 6
  const displayDestinations = popularDestinations.length >= 6 
    ? popularDestinations 
    : allDestinations.slice(0, 6);

  return (
    <section className="py-24 bg-cream-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-[10px] text-luxury-gold-dark font-extrabold uppercase tracking-widest mb-4 block">
              Explore Kerala
            </span>
            <h2 className="text-4xl md:text-5xl font-bold font-serif text-gray-900 leading-tight">
              Popular Destinations
            </h2>
          </div>
          <Link 
            href={ROUTES.DESTINATIONS}
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-primary-green transition-colors group"
          >
            <span>View All Destinations</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayDestinations.map(destination => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </div>
    </section>
  );
}
