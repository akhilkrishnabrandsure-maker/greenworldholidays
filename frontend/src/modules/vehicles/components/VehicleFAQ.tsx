'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ } from '../types/vehicle.types';

interface VehicleFAQProps {
  faqs?: FAQ[];
  vehicleName: string;
}

export function VehicleFAQ({ faqs, vehicleName }: VehicleFAQProps) {
  const defaultFaqs: FAQ[] = [
    {
      question: `Is fuel included in the daily rental price for the ${vehicleName}?`,
      answer: 'Yes! All standard itineraries include fuel costs, professional driver charges, and basic vehicle maintenance. Tolls and state entry permits are paid as actuals unless specified in custom package quotes.',
    },
    {
      question: `Can the driver take us to hill stations like Munnar and Vagamon?`,
      answer: 'Absolutely. All our chauffeurs are highly experienced in navigating Western Ghats hill routes, hairpin bends, and misty weather conditions with smooth, safe driving.',
    },
    {
      question: `What happens if my flight arrives late at Cochin International Airport (COK)?`,
      answer: 'Our 24x7 operations team tracks flight landings in real-time. Your assigned driver will wait at the arrival terminal with a name sign, regardless of flight delays, at no extra waiting fee for the first 2 hours.',
    },
    {
      question: `What is the cancellation policy for vehicle bookings?`,
      answer: 'We offer free flexible cancellation up to 48 hours prior to your scheduled pickup time. For emergency trip adjustments, our support team will reschedule your booking free of cost.',
    },
  ];

  const displayFaqs = faqs?.length ? faqs : defaultFaqs;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 sm:py-20 bg-[#FDFBF7]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">Clear & Transparent</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-gray-900 mt-1">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Everything you need to know about booking and traveling in the {vehicleName}.
          </p>
        </div>

        <div className="space-y-4">
          {displayFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 hover:border-emerald-200"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full px-6 py-5 text-left font-serif font-bold text-base sm:text-lg text-gray-900 flex justify-between items-center space-x-4 focus:outline-none"
                >
                  <span>{faq.question}</span>
                  <div className={`w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-700 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 bg-emerald-800 text-white' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-gray-600 leading-relaxed border-t border-gray-50 animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
