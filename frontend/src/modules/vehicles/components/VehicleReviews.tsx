import React from 'react';
import { Review } from '../types/vehicle.types';
import { SectionHeader } from '@/shared/components/display/SectionHeader';
import { ReviewsList } from '@/shared/components/display/ReviewsList';

interface VehicleReviewsProps {
  reviews?: Review[];
  vehicleName: string;
}

export function VehicleReviews({ reviews, vehicleName }: VehicleReviewsProps) {
  if (!reviews || reviews.length === 0) return null;

  return (
    <section className="my-20 bg-cream-dark/35 py-16 px-6 md:px-12 rounded-[2.5rem] border border-gray-100/50">
      <SectionHeader
        title={`Traveler Experiences with ${vehicleName}`}
        subtitle={`Read real feedback from guests who rented the ${vehicleName} for their journey.`}
      />
      <ReviewsList reviews={reviews} />
    </section>
  );
}

