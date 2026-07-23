import React from 'react';
import { Star, Quote } from 'lucide-react';
import { AppImage } from '@/shared/components/display/AppImage';
import { Review } from '../types/vehicle.types';

interface VehicleReviewsProps {
  reviews?: Review[];
  vehicleName: string;
}

export function VehicleReviews({ reviews, vehicleName }: VehicleReviewsProps) {
  if (!reviews || reviews.length === 0) return null;

  return (
    <section className="my-16 bg-emerald-50/60 py-12 px-4 rounded-3xl">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Traveler Experiences with {vehicleName}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Read real feedback from guests who traveled in {vehicleName}.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between"
            >
              <div>
                <Quote className="h-8 w-8 text-emerald-600 mb-3" />
                <div className="flex items-center mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-6 italic">
                  "{review.comment}"
                </p>
              </div>

              <div className="flex items-center pt-4 border-t border-gray-100">
                {review.avatar && (
                  <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                    <AppImage
                      src={review.avatar}
                      alt={review.author}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                )}
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{review.author}</div>
                  <div className="text-xs text-gray-500">{review.location} • {review.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
