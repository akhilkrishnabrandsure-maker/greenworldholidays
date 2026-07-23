import React from 'react';
import { AppImage } from '@/shared/components/display/AppImage';

interface ServiceHeroProps {
  title: string;
  image: string;
}

export function ServiceHero({ title, image }: ServiceHeroProps) {
  return (
    <div className="relative h-[60vh] min-h-[400px] w-full mt-16 md:mt-20">
      <AppImage
        src={image}
        alt={title}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
      
      <div className="absolute inset-0 flex items-end pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white max-w-4xl tracking-tight">
            {title}
          </h1>
        </div>
      </div>
    </div>
  );
}
