'use client';

import React from 'react';
import { ShieldCheck, HeartHandshake, Award, Clock, Sparkles, PhoneCall, Plane, Users } from 'lucide-react';

export function VehiclePromiseSection() {
  const promises = [
    {
      icon: Award,
      title: 'Maximum Comfort',
      description: 'Ergonomic leather recliners and ample legroom tailored for long hill & highway trips.',
    },
    {
      icon: Sparkles,
      title: 'Sanitized Daily',
      description: 'Every vehicle undergoes deep cleaning and high-touch surface sanitization after every trip.',
    },
    {
      icon: HeartHandshake,
      title: 'Professional Chauffeur',
      description: 'Courteous, multi-lingual drivers with deep local route knowledge and safety certification.',
    },
    {
      icon: Clock,
      title: 'On-Time Pickup',
      description: 'Guaranteed 15-minute early arrival for airport transfers and scheduled resort pickups.',
    },
    {
      icon: ShieldCheck,
      title: 'Premium Maintenance',
      description: 'Regular authorized dealership servicing to ensure 100% mechanical reliability.',
    },
    {
      icon: PhoneCall,
      title: '24×7 Support',
      description: 'Dedicated travel manager on call throughout your journey across Kerala.',
    },
    {
      icon: Plane,
      title: 'Airport Specialists',
      description: 'Seamless pickup & drop services at Cochin (COK) & Trivandrum (TRV) airports.',
    },
    {
      icon: Users,
      title: 'Family Friendly',
      description: 'Child safety seat compatible, spacious luggage space, and smooth suspension.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-emerald-950 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-700/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-800/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Excellence Guarantee</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif mt-2">
            The Green World Promise
          </h2>
          <p className="text-emerald-200/80 text-sm sm:text-base mt-3 leading-relaxed">
            Experience the highest standards of luxury hospitality, safety, and vehicle maintenance for your Kerala exploration.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {promises.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                className="bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-900/80 border border-emerald-500/30 flex items-center justify-center text-emerald-300 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 mb-4">
                  <IconComp className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-serif font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs text-emerald-100/70 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
