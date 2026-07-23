'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ } from '../types/service.types';

interface ServiceFAQProps {
  faqs?: FAQ[];
  serviceName: string;
}

export function ServiceFAQ({ faqs, serviceName }: ServiceFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="my-16 max-w-4xl mx-auto px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Frequently Asked Questions about {serviceName}
        </h2>
        <p className="text-gray-600">
          Everything you need to know about our services.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-200"
            >
              <button
                type="button"
                onClick={() => toggleAccordion(index)}
                aria-expanded={isOpen}
                className="w-full px-6 py-5 text-left flex items-center justify-between text-gray-900 font-semibold text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-2xl"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 text-emerald-600 transition-transform duration-300 ${
                    isOpen ? 'transform rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-6 pb-5 pt-1 text-gray-600 leading-relaxed text-sm md:text-base border-t border-gray-50">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
