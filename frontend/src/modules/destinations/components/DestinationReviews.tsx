import React from 'react';
import { Review } from '../types/destination.types';
import { SectionHeader } from '@/shared/components/display/SectionHeader';
import { ReviewsList } from '@/shared/components/display/ReviewsList';

interface DestinationReviewsProps {
  reviews?: Review[];
  destinationName: string;
}

export function DestinationReviews({ reviews, destinationName }: DestinationReviewsProps) {
  if (!reviews || reviews.length === 0) return null;

  return (
    <section className="my-20 bg-cream-dark/35 py-16 px-6 md:px-12 rounded-[2.5rem] border border-gray-100/50">
      <SectionHeader
        title={`Traveler Experiences in ${destinationName}`}
        subtitle={`Read real feedback from guests who visited ${destinationName} with us.`}
      />
      <ReviewsList reviews={reviews} />
    </section>
  );
}

