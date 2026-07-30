'use client';

import React from 'react';
import { Accordion } from '@/shared/components/display/Accordion';

const FAQ_ITEMS = [
  {
    id: '1',
    title: 'Are flights included in the tour packages?',
    content: 'Our standard tour packages do not include flight tickets to allow you flexibility in choosing your preferred airlines and timings. However, we can assist with flight bookings upon request as an add-on service.'
  },
  {
    id: '2',
    title: 'Can I customize the itinerary?',
    content: 'Absolutely! All our packages are fully customizable. Once you select a base package, our travel specialists will work with you to adjust the duration, destinations, accommodations, and activities to perfectly match your preferences.'
  },
  {
    id: '3',
    title: 'What type of vehicles do you provide?',
    content: 'We provide only premium, well-maintained vehicles. Depending on your group size, you can choose from Sedans (Dzire/Etios), MPVs (Innova Crysta/Ertiga), or larger vehicles like Force Urbania and luxury coaches.'
  },
  {
    id: '4',
    title: 'Is it safe to travel to Kerala during the monsoon?',
    content: 'Yes, Kerala is beautiful during the monsoons (June-August). While some activities like beach visits might be restricted, it is the best time to experience the lush greenery, waterfalls, and Ayurvedic treatments. We tailor monsoon itineraries specifically to ensure safety and comfort.'
  },
  {
    id: '5',
    title: 'Are your packages suitable for senior citizens?',
    content: 'Yes, we take special care for senior citizens by providing comfortable vehicles, ground-floor rooms (or hotels with elevators), wheelchair assistance if needed, and a relaxed itinerary pace.'
  }
];

export function PackagesLandingFAQ() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[10px] text-luxury-gold-dark font-extrabold uppercase tracking-widest mb-4 block">
            Got Questions?
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-gray-900 mb-6 leading-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="bg-cream rounded-3xl p-6 md:p-10 shadow-premium-lg border border-gray-100">
          <Accordion items={FAQ_ITEMS} />
        </div>
      </div>
    </section>
  );
}
