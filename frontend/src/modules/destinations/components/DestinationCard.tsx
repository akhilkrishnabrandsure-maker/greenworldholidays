import Link from 'next/link';
import { MapPin, Star, ArrowRight } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import { AppImage } from '@/shared/components/display/AppImage';
import { Destination } from '../types/destination.types';
import { getDestinationWhatsAppUrl } from '../utils/destination.utils';

interface DestinationCardProps {
  destination: Destination;
  showLearnMore?: boolean;
}

export function DestinationCard({ destination, showLearnMore = true }: DestinationCardProps) {
  return (
    <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col">
      <Link
        href={ROUTES.destinationDetail(destination.slug)}
        className="block group"
        aria-label={`View details for ${destination.name}`}
      >
        <div className="relative h-64 w-full overflow-hidden">
          <AppImage
            src={destination.image}
            alt={destination.name}
            fill
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="p-6 pb-4">
          <div className="flex items-center mb-2">
            <MapPin className="h-4 w-4 text-gray-500 mr-1" />
            <span className="text-sm text-gray-500">{destination.district}</span>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors">
            {destination.name}
          </h3>

          <div className="flex items-center mb-3">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 ml-1">{destination.rating}</span>
          </div>

          <p className="text-gray-600 text-sm">{destination.description}</p>
        </div>
      </Link>

      {showLearnMore && (
        <div className="px-6 pb-6 mt-auto">
          <a
            href={getDestinationWhatsAppUrl(destination.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
          >
            <span>Learn More</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      )}
    </article>
  );
}
