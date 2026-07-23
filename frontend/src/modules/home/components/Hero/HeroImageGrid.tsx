import React from 'react';
import { AppImage } from '@/shared/components/display/AppImage';

const HERO_IMAGES = [
  {
    src: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1755231050/kathakali_img_ulaa3h.jpg',
    alt: 'Kerala Kathakali dance tour by Green World Holidays'
  },
  {
    src: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556505/athirapally_falls_ax0zbh.jpg',
    alt: 'Kerala waterfall biggest waterfall tour by Green world holidays'
  },
  {
    src: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556508/houseboat_pvwt7k.jpg',
    alt: 'Kerala lighthouse tour by Green world holidays'
  },
  {
    src: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556519/munnar_img_nezzuf.jpg',
    alt: 'Kerala hills tour by Green world Holidays'
  }
];

export function HeroImageGrid() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 h-full w-full">
        {HERO_IMAGES.map((image, index) => (
          <div key={index} className="relative overflow-hidden w-full h-full">
            <AppImage
              src={image.src}
              alt={image.alt}
              fill
              priority={index < 2}
              className="w-full h-full object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-40 z-10" />
    </>
  );
}
