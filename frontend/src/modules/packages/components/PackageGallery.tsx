import React from 'react';
import { AppImage } from '@/shared/components/display/AppImage';
import { GalleryImage } from '../types/package.types';

interface PackageGalleryProps {
  gallery?: GalleryImage[];
  packageName: string;
}

export function PackageGallery({ gallery, packageName }: PackageGalleryProps) {
  if (!gallery || gallery.length === 0) return null;

  return (
    <section className="my-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          {packageName} in Pictures
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          A glimpse into the amazing experiences that await you.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {gallery.map((item, idx) => (
          <div
            key={idx}
            className="group relative h-60 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
          >
            <AppImage
              src={item.url}
              alt={item.alt || `${packageName} photo ${idx + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
            {item.caption && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white text-xs font-medium">{item.caption}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
