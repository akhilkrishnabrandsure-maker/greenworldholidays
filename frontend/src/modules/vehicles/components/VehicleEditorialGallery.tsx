'use client';

import React, { useState } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryImage } from '../types/vehicle.types';
import { AppImage } from '@/shared/components/display/AppImage';

interface VehicleEditorialGalleryProps {
  gallery?: GalleryImage[];
  vehicleName: string;
  defaultImage: string;
}

export function VehicleEditorialGallery({
  gallery = [],
  vehicleName,
  defaultImage,
}: VehicleEditorialGalleryProps) {
  // Combine gallery or generate rich defaults if empty
  const defaultGallery: GalleryImage[] = [
    { url: defaultImage, alt: `${vehicleName} Exterior`, caption: 'Exterior Design', category: 'Exterior' },
    { url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80', alt: `${vehicleName} Interior`, caption: 'Plush Captain Seating', category: 'Interior' },
    { url: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80', alt: `${vehicleName} Cockpit`, caption: 'Driver Console & Tech', category: 'Dashboard' },
    { url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80', alt: `${vehicleName} Luggage Boot`, caption: 'Luggage Capacity', category: 'Luggage Space' },
  ];

  const displayGallery = gallery.length > 0 ? gallery : defaultGallery;
  
  const categories = ['All', ...Array.from(new Set(displayGallery.map(img => img.category || 'Exterior')))];
  
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const filteredGallery = selectedCategory === 'All'
    ? displayGallery
    : displayGallery.filter(img => (img.category || 'Exterior') === selectedCategory);

  const activeImage = filteredGallery[activeImageIndex] || displayGallery[0];

  const handleNext = () => {
    setActiveImageIndex((prev) => (prev + 1) % filteredGallery.length);
  };

  const handlePrev = () => {
    setActiveImageIndex((prev) => (prev - 1 + filteredGallery.length) % filteredGallery.length);
  };

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">Visual Experience</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-gray-900 mt-1">
              Vehicle Gallery & Interiors
            </h2>
          </div>

          {/* Categories Tab */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setActiveImageIndex(0);
                }}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-emerald-900 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-emerald-50 hover:text-emerald-800 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Image Showcase */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl bg-gray-900 group aspect-[16/9] md:aspect-[21/9] max-h-[550px]">
          <AppImage
            src={activeImage.url}
            alt={activeImage.alt || vehicleName}
            fill
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

          {/* Caption & Fullscreen Button */}
          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end text-white z-10">
            <div>
              <span className="bg-emerald-600/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
                {activeImage.category || 'Gallery'}
              </span>
              <h3 className="text-lg sm:text-2xl font-bold font-serif">{activeImage.caption || activeImage.alt}</h3>
            </div>

            <button
              onClick={() => setIsLightboxOpen(true)}
              className="bg-white/20 hover:bg-white/40 backdrop-blur-md p-3 rounded-full text-white transition-all hover:scale-110"
              aria-label="Expand image"
            >
              <Maximize2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Thumbnails Row */}
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 sm:gap-4 mt-4 sm:mt-6">
          {filteredGallery.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImageIndex(idx)}
              className={`relative rounded-xl overflow-hidden aspect-[4/3] border-2 transition-all duration-300 ${
                activeImageIndex === idx
                  ? 'border-emerald-600 ring-2 ring-emerald-600/30 scale-105 shadow-md'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <AppImage
                src={img.url}
                alt={img.alt}
                fill
                className="object-cover w-full h-full"
                sizes="(max-width: 640px) 25vw, 16vw"
              />
            </button>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8">
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 bg-white/10 hover:bg-white/30 text-white p-3 rounded-full transition-all"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 bg-white/10 hover:bg-white/30 text-white p-3 rounded-full transition-all"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="relative max-w-5xl max-h-[80vh] w-full h-[70vh] rounded-2xl overflow-hidden">
            <AppImage
              src={activeImage.url}
              alt={activeImage.alt}
              fill
              className="object-contain w-full h-full"
              sizes="100vw"
            />
          </div>

          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 bg-white/10 hover:bg-white/30 text-white p-3 rounded-full transition-all"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  );
}
