import React from 'react';
import { AppImage } from './AppImage';
import { StaticImageData } from 'next/image';

interface GalleryImage {
  url: string | StaticImageData;
  alt?: string;
  caption?: string;
}

export interface GalleryProps {
  images: GalleryImage[];
  className?: string;
}

export function Gallery({ images, className = '' }: GalleryProps) {
  if (!images || images.length === 0) return null;

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
      {images.map((item, idx) => (
        <div
          key={idx}
          className="group relative h-64 rounded-3xl overflow-hidden shadow-premium hover:shadow-premium-lg transition-all duration-500 bg-gray-100"
        >
          <AppImage
            src={item.url}
            alt={item.alt || `Gallery photo ${idx + 1}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          {item.caption && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
              <span className="text-white text-xs font-semibold tracking-wide translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                {item.caption}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
