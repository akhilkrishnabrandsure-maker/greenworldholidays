import React from 'react';
import { Metadata } from 'next';
import { PackagesLandingHero } from '@/modules/packages/components/landing/PackagesLandingHero';
import { WhyGreenWorld } from '@/modules/packages/components/landing/WhyGreenWorld';
import { FeaturedPackages } from '@/modules/packages/components/landing/FeaturedPackages';
import { PopularDestinations } from '@/modules/packages/components/landing/PopularDestinations';
import { IncludedExperiences } from '@/modules/packages/components/landing/IncludedExperiences';
import { RecommendedFleet } from '@/modules/packages/components/landing/RecommendedFleet';
import { HowItWorksTimeline } from '@/modules/packages/components/landing/HowItWorksTimeline';
import { Testimonials } from '@/modules/home/components/Testimonials';
import { PackagesLandingFAQ } from '@/modules/packages/components/landing/PackagesLandingFAQ';
import { PackagesCTA } from '@/modules/packages/components/landing/PackagesCTA';

export const metadata: Metadata = {
  title: 'Premium Kerala Tour Packages | Green World Holidays',
  description: 'Discover handpicked luxury journeys through Kerala with premium transportation, curated stays, authentic experiences, and personalized itineraries.',
  alternates: {
    canonical: 'https://greenworldholidays.in/packages',
  }
};

export default function PackagesLandingPage() {
  return (
    <main className="flex min-h-screen flex-col w-full overflow-hidden bg-cream">
      <PackagesLandingHero />
      <WhyGreenWorld />
      <FeaturedPackages />
      <PopularDestinations />
      <IncludedExperiences />
      <RecommendedFleet />
      <HowItWorksTimeline />
      
      {/* Reusing Home Testimonials section */}
      <Testimonials />
      
      <PackagesLandingFAQ />
      <PackagesCTA />
      
      {/* JSON-LD Schema for Tour Packages */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": "Premium Kerala Tour Packages",
              "description": "Discover handpicked luxury journeys through Kerala with premium transportation, curated stays, and personalized itineraries.",
              "url": "https://greenworldholidays.in/packages",
              "publisher": {
                "@type": "Organization",
                "name": "Green World Holidays",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://greenworldholidays.in/logo.png"
                }
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://greenworldholidays.in/"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Tour Packages",
                  "item": "https://greenworldholidays.in/packages"
                }
              ]
            }
          ])
        }}
      />
    </main>
  );
}
