import { Destination } from '../types/destination.types';
import { DestinationCard } from './DestinationCard';

interface DestinationGridProps {
  destinations: Destination[];
  showLearnMore?: boolean;
}

export function DestinationGrid({ destinations, showLearnMore = true }: DestinationGridProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {destinations.map((destination) => (
        <DestinationCard
          key={destination.id}
          destination={destination}
          showLearnMore={showLearnMore}
        />
      ))}
    </div>
  );
}
