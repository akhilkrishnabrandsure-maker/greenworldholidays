import React from 'react';
import { FAQ } from '../types/destination.types';
import { SectionHeader } from '@/shared/components/display/SectionHeader';
import { Accordion } from '@/shared/components/display/Accordion';

interface DestinationFAQProps {
  faqs?: FAQ[];
  destinationName: string;
}

export function DestinationFAQ({ faqs, destinationName }: DestinationFAQProps) {
  if (!faqs || faqs.length === 0) return null;

  const accordionItems = faqs.map((faq) => ({
    title: faq.question,
    content: faq.answer,
  }));

  return (
    <section className="my-20 max-w-4xl mx-auto px-4">
      <SectionHeader
        title={`Common Questions about ${destinationName}`}
        subtitle="Everything you need to know to plan your visit seamlessly."
      />
      <Accordion items={accordionItems} />
    </section>
  );
}

