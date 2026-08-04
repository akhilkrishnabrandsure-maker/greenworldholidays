import React from 'react';
import { Map, Car, Compass, CreditCard, Clock, ShieldCheck } from 'lucide-react';
import { contactRepository } from '../repository/contact.repository';

const iconMap: Record<string, React.ElementType> = {
  Map,
  Car,
  Compass,
  CreditCard,
  Clock,
  ShieldCheck
};

export function ContactReasons() {
  const { reasons } = contactRepository;

  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="font-playfair text-4xl font-bold text-emerald-950 mb-4">
            Why Contact <span className="text-emerald-700">Green World Holidays?</span>
          </h2>
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="w-12 h-px bg-emerald-200"></div>
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <div className="w-12 h-px bg-emerald-200"></div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => {
            const Icon = iconMap[reason.icon] || Compass;
            return (
              <div 
                key={index}
                className="group flex gap-6 p-6 rounded-3xl hover:bg-emerald-50 border border-transparent hover:border-emerald-100 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-600 transition-colors duration-300">
                  <Icon className="w-7 h-7 text-emerald-700 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="font-playfair text-xl font-bold text-emerald-950 mb-2 group-hover:text-emerald-700 transition-colors duration-300">
                    {reason.title}
                  </h3>
                  <p className="font-outfit text-gray-600 text-sm leading-relaxed font-light">
                    {reason.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}
