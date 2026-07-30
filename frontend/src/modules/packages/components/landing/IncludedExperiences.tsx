import React from 'react';
import { Car, Hotel, Plane, Camera, Coffee, HeartHandshake, UserCheck, Headset } from 'lucide-react';

const EXPERIENCES = [
  { icon: Car, label: 'Private Transportation' },
  { icon: Hotel, label: 'Premium Accommodation' },
  { icon: Plane, label: 'Airport Pickup' },
  { icon: Camera, label: 'Guided Sightseeing' },
  { icon: Coffee, label: 'Daily Breakfast' },
  { icon: HeartHandshake, label: 'Travel Assistance' },
  { icon: UserCheck, label: 'Local Guide' },
  { icon: Headset, label: '24/7 Support' },
];

export function IncludedExperiences() {
  return (
    <section className="py-24 bg-primary-green text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-serif mb-16 text-white drop-shadow-sm">
          Everything You Need for a Perfect Holiday
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8">
          {EXPERIENCES.map((exp, idx) => {
            const Icon = exp.icon;
            return (
              <div key={idx} className="flex flex-col items-center group">
                <div className="h-20 w-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 group-hover:bg-white/20 transition-all duration-300 border border-white/10 group-hover:border-white/30 group-hover:scale-110">
                  <Icon className="h-8 w-8 text-luxury-gold-light" strokeWidth={1.5} />
                </div>
                <span className="text-sm md:text-base font-bold uppercase tracking-wider text-gray-200">
                  {exp.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
