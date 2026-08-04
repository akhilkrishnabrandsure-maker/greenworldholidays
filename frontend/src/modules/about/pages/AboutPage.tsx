import React from 'react';
import { AboutHero } from '../components/AboutHero';
import { OurStory } from '../components/OurStory';
import { MissionVision } from '../components/MissionVision';
import { CompanyStats } from '../components/CompanyStats';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { FleetPreview } from '../components/FleetPreview';
import { DestinationPreview } from '../components/DestinationPreview';
import { CustomerTestimonials } from '../components/CustomerTestimonials';
import { AboutCTA } from '../components/AboutCTA';

export function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7]">
      <AboutHero />
      <OurStory />
      <MissionVision />
      <CompanyStats />
      <WhyChooseUs />
      <FleetPreview />
      <DestinationPreview />
      <CustomerTestimonials />
      <AboutCTA />
    </main>
  );
}
