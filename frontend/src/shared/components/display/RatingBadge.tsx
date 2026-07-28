import React from 'react';
import { Star } from 'lucide-react';

interface RatingBadgeProps {
  rating: number;
  count?: number;
  label?: string;
  className?: string;
}

export function RatingBadge({
  rating,
  count,
  label = 'Google Rating',
  className = '',
}: RatingBadgeProps) {
  return (
    <div className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full glass-badge text-luxury-gold-dark font-medium text-sm shadow-sm ${className}`}>
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-3.5 w-3.5 ${
              i < Math.round(rating)
                ? 'text-luxury-gold-dark fill-luxury-gold-dark'
                : 'text-luxury-gold-light'
            }`}
          />
        ))}
      </div>
      <span className="font-bold text-gray-950 ml-1">{rating}</span>
      {count ? (
        <span className="text-gray-600 font-normal">({count} reviews)</span>
      ) : label ? (
        <span className="text-gray-600 font-normal">{label}</span>
      ) : null}
    </div>
  );
}
