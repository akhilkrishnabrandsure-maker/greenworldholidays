import React from 'react';
import { Star, Users, Car, Map } from 'lucide-react';

export function TrustSection() {
  const trustIndicators = [
    {
      icon: Star,
      title: "★★★★★",
      subtitle: "Google Rating",
      color: "text-yellow-400"
    },
    {
      icon: Users,
      title: "5000+",
      subtitle: "Happy Travellers",
      color: "text-emerald-400"
    },
    {
      icon: Car,
      title: "Premium",
      subtitle: "Fleet Collection",
      color: "text-emerald-400"
    },
    {
      icon: Map,
      title: "Kerala-wide",
      subtitle: "Service Area",
      color: "text-emerald-400"
    }
  ];

  return (
    <section className="py-12 bg-emerald-950 border-y border-emerald-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12">
          {trustIndicators.map((item, index) => (
            <div key={index} className="flex flex-col items-center justify-center text-center space-y-3 group">
              <div className="w-12 h-12 rounded-full bg-emerald-900/50 flex items-center justify-center border border-emerald-800 group-hover:bg-emerald-800 transition-colors duration-300">
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <div>
                <h4 className={`font-playfair font-bold text-xl mb-1 ${item.title === '★★★★★' ? 'text-yellow-400' : 'text-white'}`}>
                  {item.title}
                </h4>
                <p className="font-outfit text-emerald-200/70 text-sm tracking-wide uppercase">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
