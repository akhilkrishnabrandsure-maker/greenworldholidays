import React from 'react';
import { Heart, Users, Star, Car, ShieldCheck, Clock, Map, CreditCard } from 'lucide-react';
import { aboutRepository } from '../repository/about.repository';

const iconMap: Record<string, React.ElementType> = {
  Heart,
  Users,
  Car,
  Map,
  Clock,
  CreditCard,
  ShieldCheck,
  Star
};

export function WhyChooseUs() {
  const { features } = aboutRepository;

  return (
    <section className="py-20 lg:py-32 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 lg:mb-24">
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-emerald-950 mb-6">
            Why Choose <span className="text-emerald-700">Green World Holidays</span>
          </h2>
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="w-12 h-px bg-emerald-200"></div>
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <div className="w-12 h-px bg-emerald-200"></div>
          </div>
          <p className="font-outfit text-gray-600 text-lg max-w-2xl mx-auto font-light">
            We are committed to delivering premium travel experiences with unmatched hospitality and reliability.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => {
            const Icon = iconMap[feature.iconName] || Star;
            return (
              <div 
                key={feature.id}
                className="group bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl border border-emerald-50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white text-emerald-600 transition-colors duration-300">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-playfair text-xl font-bold text-emerald-950 mb-3 group-hover:text-emerald-700 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="font-outfit text-gray-600 text-sm leading-relaxed font-light group-hover:text-gray-700 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}
