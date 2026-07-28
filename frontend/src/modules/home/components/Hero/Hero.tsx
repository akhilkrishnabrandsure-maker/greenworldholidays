import React from 'react';
import { HeroImageGrid } from './HeroImageGrid';
import { HeroContent } from './HeroContent';

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">
      {/* 2x2 Image Grid */}
      <HeroImageGrid />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/45 z-10" />

      {/* Hero Content */}
      <HeroContent />
    </section>
  );
}
