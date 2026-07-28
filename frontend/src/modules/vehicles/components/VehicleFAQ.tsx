import React from 'react';
import { FAQ } from '../types/vehicle.types';
import { SectionHeader } from '@/shared/components/display/SectionHeader';
import { Accordion } from '@/shared/components/display/Accordion';

interface VehicleFAQProps {
  faqs?: FAQ[];
  vehicleName: string;
}

export function VehicleFAQ({ faqs, vehicleName }: VehicleFAQProps) {
  if (!faqs || faqs.length === 0) return null;

  const accordionItems = faqs.map((faq) => ({
    title: faq.question,
    content: faq.answer,
  }));

  return (
    <section className="my-20 max-w-4xl mx-auto px-4">
      <SectionHeader
        title={`Common Questions about ${vehicleName}`}
        subtitle="Everything you need to know about renting and traveling in this vehicle."
      />
      <Accordion items={accordionItems} />
    </section>
  );
}

