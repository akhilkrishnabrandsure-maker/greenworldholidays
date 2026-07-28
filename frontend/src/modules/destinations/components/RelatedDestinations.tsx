import { Destination } from '../types/destination.types';
import { DestinationGrid } from './DestinationGrid';
import { SectionHeader } from '@/shared/components/display/SectionHeader';

interface RelatedDestinationsProps {
  destinations: Destination[];
}

export function RelatedDestinations({ destinations }: RelatedDestinationsProps) {
  if (destinations.length === 0) return null;

  return (
    <section className="mt-20 pt-16 border-t border-gray-100">
      <SectionHeader
        title="Related Destinations"
        subtitle="Explore more incredible places across Kerala and South India."
      />
      <DestinationGrid destinations={destinations} showLearnMore={false} />
    </section>
  );
}

