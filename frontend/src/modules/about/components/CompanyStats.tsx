'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Users, Car, MapPin, Award } from 'lucide-react';
import { aboutRepository } from '../repository/about.repository';

// Reusable CountUp hook
function useCountUp(target: number, duration: number, start: boolean, suffix = '') {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTimestamp: number | null = null;
    let frame: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * target));
      
      if (progress < 1) {
        frame = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, start]);

  return suffix ? `${count}${suffix}` : count;
}

const iconMap: Record<string, React.ElementType> = {
  Users,
  Car,
  MapPin,
  Award
};

export function CompanyStats() {
  const { stats } = aboutRepository;
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect(); // Only trigger once
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-16 lg:py-24 bg-emerald-950 relative overflow-hidden"
    >
      {/* Premium Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat) => {
            const Icon = iconMap[stat.iconName] || Award;
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const displayValue = useCountUp(stat.value, 1500, isInView, stat.suffix);
            
            return (
              <div 
                key={stat.id}
                className="text-center group"
              >
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-emerald-500/20 group-hover:border-emerald-500/30 transition-all duration-500 backdrop-blur-sm">
                    <Icon className="w-8 h-8 text-emerald-300" />
                  </div>
                </div>
                <div className="font-playfair text-4xl lg:text-5xl font-bold text-white mb-3 tracking-tight">
                  {displayValue}
                </div>
                <div className="font-outfit text-emerald-100/80 text-sm md:text-base font-light tracking-wide">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
