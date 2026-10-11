import React from 'react';
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import { AppImage } from './AppImage';
import { StaticImageData } from 'next/image';

interface PremiumCardProps {
  href: string;
  image: string | StaticImageData;
  title: string;
  subtitle?: string;
  description?: string;
  rating?: number;
  badge?: string;
  footerItems?: React.ReactNode;
  actionText?: string;
  onActionClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  actionHref?: string;
  className?: string;
}

export function PremiumCard({
  href,
  image,
  title,
  subtitle,
  description,
  rating,
  badge,
  footerItems,
  actionText,
  onActionClick,
  actionHref,
  className = '',
}: PremiumCardProps) {
  return (
    <article className={`bg-white rounded-3xl overflow-hidden shadow-premium hover:shadow-premium-lg transition-all duration-300 hover:-translate-y-1.5 flex flex-col border border-gray-100/50 ${className}`}>
      <Link href={href} className="block group flex-1 flex flex-col">
        {/* Image wrapper */}
        <div className="relative h-60 w-full overflow-hidden bg-gray-100">
          <AppImage
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {badge && (
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-white/90 backdrop-blur-sm text-primary-green text-[10px] font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm border border-emerald-50">
                {badge}
              </span>
            </div>
          )}
          {rating !== undefined && (
            <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm text-xs font-bold text-gray-950">
              <Star className="h-3.5 w-3.5 text-luxury-gold-dark fill-luxury-gold-dark" />
              <span>{rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        {/* Content wrapper */}
        <div className="p-6 flex-1 flex flex-col">
          {subtitle && (
            <span className="text-[10px] text-luxury-gold-dark font-extrabold uppercase tracking-widest mb-2 block">
              {subtitle}
            </span>
          )}
          <h3 className="text-xl font-bold text-gray-950 group-hover:text-primary-green transition-colors font-serif mb-2 leading-snug">
            {title}
          </h3>
          {description && (
            <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
              {description}
            </p>
          )}

          {footerItems && (
            <div className="mt-auto pt-4 border-t border-gray-100/50">
              {footerItems}
            </div>
          )}
        </div>
      </Link>

      {/* Call to action at bottom */}
      {actionText && (
        <div className="px-6 pb-6 pt-1">
          {actionHref ? (
            <a
              href={actionHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onActionClick as React.MouseEventHandler<HTMLAnchorElement>}
              className="w-full bg-primary-green hover:bg-primary-green-dark text-white py-3 px-4 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg group"
            >
              <span>{actionText}</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          ) : (
            <Link
              href={href}
              className="w-full bg-primary-green hover:bg-primary-green-dark text-white py-3 px-4 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg group"
            >
              <span>{actionText}</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          )}
        </div>
      )}
    </article>
  );
}
