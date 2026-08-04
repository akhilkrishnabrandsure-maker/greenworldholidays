import React from 'react';
import { Star, Quote } from 'lucide-react';
import { AppImage } from './AppImage';

interface ReviewItem {
  id: string | number;
  author: string;
  rating: number;
  comment: string;
  avatar?: string;
  location?: string;
  date?: string;
}

interface ReviewsListProps {
  reviews: ReviewItem[];
  className?: string;
}

export function ReviewsList({ reviews, className = '' }: ReviewsListProps) {
  if (!reviews || reviews.length === 0) return null;

  return (
    <div className={`grid md:grid-cols-3 gap-6 ${className}`}>
      {reviews.map((review) => (
        <div
          key={review.id}
          className="bg-white p-7 rounded-3xl shadow-premium hover:shadow-premium-lg transition-shadow duration-300 flex flex-col justify-between border border-gray-100/50"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating
                        ? 'text-luxury-gold-dark fill-luxury-gold-dark'
                        : 'text-luxury-gold-light/40'
                    }`}
                  />
                ))}
              </div>
              <Quote className="h-6 w-6 text-primary-green/10" />
            </div>
            
            <p className="text-gray-700 text-sm leading-relaxed mb-6 font-sans italic">
              &quot;{review.comment}&quot;
            </p>
          </div>

          <div className="flex items-center pt-4 border-t border-gray-100/60">
            {review.avatar && (
              <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3 bg-gray-50 border border-gray-100">
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
              <div className="font-bold text-gray-950 text-sm leading-tight">{review.author}</div>
              {review.location || review.date ? (
                <div className="text-[10px] text-gray-500 font-medium mt-0.5">
                  {review.location}{review.location && review.date ? ` • ` : ''}{review.date}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
