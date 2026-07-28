'use client';

import React from 'react';
import { Users, Wind, Briefcase, ShieldCheck, UserCheck, Clock, Plane, Sparkles } from 'lucide-react';
import { Vehicle } from '../types/vehicle.types';

interface VehicleQuickHighlightsProps {
  vehicle: Vehicle;
}

export function VehicleQuickHighlights({ vehicle }: VehicleQuickHighlightsProps) {
  const highlights = [
    {
      icon: Users,
      title: `${vehicle.seatCapacity || 7} Seats`,
      subtitle: 'Spacious & Reclining',
    },
    {
      icon: Wind,
      title: vehicle.airConditioning !== false ? 'Dual AC' : 'Climate Control',
      subtitle: 'All Row Vents',
    },
    {
      icon: Briefcase,
      title: `${vehicle.luggageCapacity || 4} Large Bags`,
      subtitle: 'Dedicated Boot Space',
    },
    {
      icon: UserCheck,
      title: 'Pro Chauffeur',
      subtitle: 'Multi-lingual & Verified',
    },
    {
      icon: Plane,
      title: 'Airport Pickup',
      subtitle: 'COK & TRV Specialists',
    },
    {
      icon: Clock,
      title: '24×7 Support',
      subtitle: 'On-road Assistance',
    },
    {
      icon: ShieldCheck,
      title: vehicle.transmission || 'Automatic',
      subtitle: 'Smooth Hill Drive',
    },
    {
      icon: Sparkles,
      title: 'Sanitized Daily',
      subtitle: 'Hospital Grade Clean',
    },
  ];

  return (
    <section className="relative z-20 -mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl md:rounded-3xl p-4 sm:p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-emerald-900/10">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {highlights.map((item, index) => {
            const IconComp = item.icon;
            return (
              <div 
                key={index} 
                className="bg-emerald-50/50 hover:bg-emerald-100/60 transition-all duration-300 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center group border border-emerald-100/60 hover:shadow-sm"
              >
                <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-white shadow-sm flex items-center justify-center text-emerald-700 group-hover:scale-110 group-hover:bg-emerald-700 group-hover:text-white transition-all duration-300">
                  <IconComp className="w-5 h-5" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-emerald-950 line-clamp-1">{item.title}</h4>
                <p className="text-[10px] sm:text-xs text-gray-500 font-medium line-clamp-1">{item.subtitle}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
