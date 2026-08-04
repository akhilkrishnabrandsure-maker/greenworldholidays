import React from 'react';
import { ContactHero } from '../components/ContactHero';
import { ContactInfo } from '../components/ContactInfo';
import { ContactForm } from '../components/ContactForm';
import { GoogleMapSection } from '../components/GoogleMapSection';
import { ContactReasons } from '../components/ContactReasons';
import { FAQPreview } from '../components/FAQPreview';
import { TrustSection } from '../components/TrustSection';
import { ContactCTA } from '../components/ContactCTA';

export function ContactPage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7]">
      <ContactHero />
      <ContactInfo />
      <ContactForm />
      <GoogleMapSection />
      <ContactReasons />
      <FAQPreview />
      <TrustSection />
      <ContactCTA />
    </main>
  );
}
