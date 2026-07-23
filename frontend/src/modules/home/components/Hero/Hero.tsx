import React from 'react';
import { HeroImageGrid } from './HeroImageGrid';
import { HeroContent } from './HeroContent';

export function Hero() {
  return (
    <section id="hero" className="relative w-full h-screen mt-16 overflow-hidden">
      <HeroImageGrid />
      <HeroContent />
    </section>
  );
}
