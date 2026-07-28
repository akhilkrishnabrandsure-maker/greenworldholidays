import React from 'react';
import { ROUTES } from '@/constants/routes';
import { Destination } from '../types/destination.types';
import { getDestinationWhatsAppUrl } from '../utils/destination.utils';
import { PremiumCard } from '@/shared/components/display/PremiumCard';

interface DestinationCardProps {
  destination: Destination;
  showLearnMore?: boolean;
}

export function DestinationCard({ destination, showLearnMore = true }: DestinationCardProps) {
  return (
    <PremiumCard
      href={ROUTES.destinationDetail(destination.slug)}
      image={destination.image}
      title={destination.name}
      subtitle={destination.district}
      description={destination.description}
      rating={destination.rating}
      badge="Destination"
      actionText={showLearnMore ? "Learn More" : undefined}
      actionHref={showLearnMore ? getDestinationWhatsAppUrl(destination.name) : undefined}
    />
  );
}

