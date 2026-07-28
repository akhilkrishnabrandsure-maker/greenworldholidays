import React from 'react';
import { GalleryImage } from '../types/destination.types';
import { SectionHeader } from '@/shared/components/display/SectionHeader';
import { Gallery } from '@/shared/components/display/Gallery';

interface DestinationGalleryProps {
  gallery?: GalleryImage[];
  destinationName: string;
}

export function DestinationGallery({ gallery, destinationName }: DestinationGalleryProps) {
  if (!gallery || gallery.length === 0) return null;

  return (
    <section className="my-20">
      <SectionHeader
        title={`${destinationName} in Pictures`}
        subtitle="Immerse yourself in the captivating landscapes and vibrant colors of this beautiful region."
      />
      <Gallery images={gallery} />
    </section>
  );
}

