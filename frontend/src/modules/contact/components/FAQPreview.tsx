'use client';

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { contactRepository } from '../repository/contact.repository';

export function FAQPreview() {
  const { faqs } = contactRepository;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 lg:py-24 bg-emerald-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl font-bold text-emerald-950 mb-4">
            Frequently Asked <span className="text-emerald-700">Questions</span>
          </h2>
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="w-12 h-px bg-emerald-200"></div>
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <div className="w-12 h-px bg-emerald-200"></div>
          </div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div 
                key={faq.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-emerald-100 transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="font-playfair font-semibold text-emerald-950 text-lg pr-8">
                    {faq.question}
                  </span>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                    isOpen ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-600'
                  }`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6 font-outfit text-gray-600 leading-relaxed font-light">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
