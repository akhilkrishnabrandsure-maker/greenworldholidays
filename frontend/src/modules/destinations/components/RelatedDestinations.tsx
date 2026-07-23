import { Destination } from '../types/destination.types';
import { DestinationGrid } from './DestinationGrid';

interface RelatedDestinationsProps {
  destinations: Destination[];
}

export function RelatedDestinations({ destinations }: RelatedDestinationsProps) {
  if (destinations.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-emerald-100">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Related Destinations</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore more incredible places across Kerala and South India.
        </p>
      </div>
      <DestinationGrid destinations={destinations} showLearnMore={false} />
    </section>
  );
}
