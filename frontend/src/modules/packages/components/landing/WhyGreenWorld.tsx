import React from 'react';
import { Map, Car, Headset, Hotel, ShieldCheck, Settings } from 'lucide-react';

const FEATURES = [
  {
    icon: Map,
    title: 'Local Expertise',
    description: 'Deep-rooted knowledge of Kerala’s hidden gems, ensuring you experience the authentic culture beyond typical tourist trails.'
  },
  {
    icon: Car,
    title: 'Premium Fleet',
    description: 'Travel in ultimate comfort with our immaculately maintained luxury vehicles driven by professional, courteous chauffeurs.'
  },
  {
    icon: ShieldCheck,
    title: 'Safety Assured',
    description: 'Uncompromising standards of safety and hygiene across all our partner properties and transportation services.'
  },
  {
    icon: Headset,
    title: '24/7 Concierge',
    description: 'Dedicated trip managers available round-the-clock to ensure your journey is flawless from arrival to departure.'
  },
  {
    icon: Hotel,
    title: 'Handpicked Stays',
    description: 'Exclusive partnerships with Kerala’s finest luxury resorts, heritage boutiques, and premium houseboats.'
  },
  {
    icon: Settings,
    title: 'Bespoke Itineraries',
    description: 'Fully customizable travel plans tailored to your pace, preferences, and vision of the perfect holiday.'
  }
];

export function WhyGreenWorld() {
  return (
    <section className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[10px] text-luxury-gold-dark font-extrabold uppercase tracking-widest mb-4 block">
            The Green World Difference
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-gray-900 mb-6 leading-tight">
            Curated Luxury. Seamless Travel.
          </h2>
          <div className="h-0.5 w-12 bg-luxury-gold mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div 
                key={idx} 
                className="bg-white rounded-3xl p-10 shadow-premium hover:shadow-premium-lg transition-all duration-300 hover:-translate-y-1.5 border border-gray-50 flex flex-col items-start"
              >
                <div className="h-14 w-14 rounded-2xl bg-emerald-50 text-primary-green flex items-center justify-center mb-8">
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold font-serif text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed font-light">
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
