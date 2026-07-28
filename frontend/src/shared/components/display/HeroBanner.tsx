import React from 'react';
import { AppImage } from './AppImage';
import { Star } from 'lucide-react';

interface HeroBannerProps {
  title: React.ReactNode;
  subtitle?: string;
  backgroundImage: string;
  badgeText?: string;
  rating?: number;
  ratingCount?: number;
  ratingLabel?: string;
  children?: React.ReactNode;
  className?: string;
}

export function HeroBanner({
  title,
  subtitle,
  backgroundImage,
  badgeText,
  rating,
  ratingCount,
  ratingLabel = 'Google Rating',
  children,
  className = '',
}: HeroBannerProps) {
  return (
    <div className={`relative w-full rounded-3xl md:rounded-[2.5rem] overflow-hidden min-h-[50vh] md:min-h-[65vh] flex flex-col justify-end p-6 md:p-14 text-white shadow-premium-lg ${className}`}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <AppImage
          src={backgroundImage}
          alt="Hero background"
          fill
          priority
          className="object-cover transition-transform duration-700 hover:scale-102"
          sizes="100vw"
        />
        {/* Soft elegant gradient overlays for readability and luxury aesthetics */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/15 z-10" />
      </div>

      {/* Content wrapper */}
      <div className="relative z-20 max-w-4xl w-full">
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
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-serif leading-tight tracking-tight mb-4 text-white drop-shadow-sm">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-base md:text-lg text-gray-200 font-sans max-w-2xl leading-relaxed mb-6 font-light">
            {subtitle}
          </p>
        )}

        {/* Action Elements or overlays */}
        {children}
      </div>
    </div>
  );
}
