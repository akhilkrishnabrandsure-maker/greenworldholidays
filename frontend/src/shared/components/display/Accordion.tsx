'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export function Accordion({ items, className = '' }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="bg-white rounded-2xl border border-gray-100 shadow-premium overflow-hidden transition-all duration-300"
          >
            <button
              type="button"
              onClick={() => toggleAccordion(index)}
              aria-expanded={isOpen}
              className="w-full px-6 py-5 text-left flex items-center justify-between text-gray-950 font-bold text-base md:text-lg focus:outline-none hover:bg-cream-dark/25 transition-colors"
            >
              <span className="pr-4">{item.title}</span>
              <span className={`flex items-center justify-center h-8 w-8 rounded-full bg-emerald-50/60 text-primary-green transition-all duration-300 ${
                isOpen ? 'rotate-180 bg-primary-green text-white' : ''
              }`}>
                <ChevronDown className="h-4 w-4 shrink-0" />
              </span>
            </button>

            <div className={`transition-all duration-300 ease-in-out ${
              isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
            }`}>
              <div className="px-6 pb-6 pt-2 text-gray-600 leading-relaxed text-sm md:text-base border-t border-gray-50/50">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
