import React from 'react';
import { Star } from 'lucide-react';
import { FloatingBookingForm } from './FloatingBookingForm';
import { AppImage } from '@/shared/components/display/AppImage';

interface DestinationHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  badgeText?: string;
  rating?: number;
  ratingCount?: number;
  ratingLabel?: string;
  destinationName: string;
}

export function DestinationHero({
  title,
  subtitle,
  backgroundImage,
  badgeText,
  rating,
  ratingCount,
  ratingLabel = 'Google Rating',
  destinationName,
}: DestinationHeroProps) {
  // We need the clean destination name for the booking form
  const getCleanName = (name: string) => {
    // Handling specific edge cases like Alappuzha -> Alleppey if needed, but for simplicity split by space/dash
    if (name.toLowerCase().includes('alappuzha')) return 'Alleppey';
    return name.split(/[- \u2013\u2014]/)[0];
  };
  const cleanName = getCleanName(destinationName);

  return (
    <div className="relative w-full min-h-[75vh] md:min-h-[85vh] flex flex-col justify-end mb-16 md:mb-24">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <AppImage
          src={backgroundImage}
          alt={`Explore ${title}`}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10 z-10" />
      </div>

      {/* Content wrapper */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 pt-20">
        <div className="max-w-4xl">
          {/* Top Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            {badgeText && (
              <span className="bg-primary-green text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-md border border-primary-green-light">
                {badgeText}
              </span>
            )}
            
            {rating !== undefined && (
              <div className="inline-flex items-center gap-1.5 bg-black/30 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold border border-white/10 shadow-sm text-luxury-gold">
                <Star className="h-3.5 w-3.5 text-luxury-gold fill-luxury-gold shrink-0" />
                <span className="text-white">{rating}</span>
                <span className="text-gray-300 font-normal">
                  {ratingCount ? `(${ratingCount} reviews)` : ratingLabel}
                </span>
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif leading-tight tracking-tight mb-4 text-white drop-shadow-lg">
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p className="text-lg md:text-xl text-gray-200 font-sans max-w-2xl leading-relaxed mb-6 font-light drop-shadow-md">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Floating Booking Form - positioned absolutely at the bottom to overlap */}
      <div className="absolute bottom-0 left-0 w-full transform translate-y-1/2 z-30 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <FloatingBookingForm destinationName={cleanName} />
        </div>
      </div>
    </div>
  );
}
