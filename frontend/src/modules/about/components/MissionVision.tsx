import React from 'react';
import { Target, Compass, Sparkles, CheckCircle2 } from 'lucide-react';
import { aboutRepository } from '../repository/about.repository';

export function MissionVision() {
  const { mission, vision } = aboutRepository;

  const missionHighlights = [
    "Personalized Tours",
    "Luxury Fleet",
    "Local Experts",
    "24×7 Support"
  ];

  const visionHighlights = [
    "Trusted Travel Partner",
    "Sustainable Tourism",
    "Premium Experiences",
    "Transparent Pricing"
  ];

  return (
    <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-emerald-50/30" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16 lg:mb-24">
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-emerald-950 mb-6">
            Our <span className="text-emerald-700">Purpose</span>
          </h2>
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="w-12 h-px bg-emerald-200"></div>
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <div className="w-12 h-px bg-emerald-200"></div>
          </div>
          <p className="font-outfit text-gray-600 text-lg max-w-2xl mx-auto font-light">
            Building unforgettable Kerala travel experiences through trust, hospitality, and personalized service.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Mission Card */}
          <div className="group relative bg-gradient-to-br from-emerald-900 to-emerald-950 rounded-[2rem] p-10 lg:p-14 shadow-xl border border-emerald-800 hover:shadow-2xl hover:shadow-emerald-900/20 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
            {/* Decorative Accent */}
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-[radial-gradient(circle,rgba(250,204,21,0.1)_0%,transparent_70%)] rounded-full blur-xl" />
            <Sparkles className="absolute top-8 right-8 w-12 h-12 text-yellow-400/20 group-hover:text-yellow-400/40 transition-colors duration-500" />
            
            <div className="w-16 h-16 bg-emerald-800/50 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-8 border border-emerald-700/50">
              <Target className="w-8 h-8 text-[#D4AF37]" />
            </div>
            
            <h3 className="font-playfair text-3xl font-bold text-white mb-6">
              {mission.title}
            </h3>
            <p className="font-outfit text-emerald-50 text-lg leading-relaxed font-light mb-10">
              {mission.description}
            </p>

            <ul className="grid grid-cols-2 gap-4">
              {missionHighlights.map((highlight, index) => (
                <li key={index} className="flex items-center space-x-3 text-emerald-100 font-outfit text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Vision Card */}
          <div className="group relative bg-[#FDFBF7] rounded-[2rem] p-10 lg:p-14 shadow-xl border border-emerald-200 hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
            {/* Decorative Accent */}
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-[radial-gradient(circle,rgba(16,185,129,0.1)_0%,transparent_70%)] rounded-full blur-xl" />
            <Sparkles className="absolute top-8 right-8 w-12 h-12 text-emerald-600/10 group-hover:text-emerald-600/30 transition-colors duration-500" />

            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-8 border border-emerald-100 group-hover:bg-emerald-600 transition-colors duration-500">
              <Compass className="w-8 h-8 text-emerald-700 group-hover:text-white transition-colors duration-500" />
            </div>
            
            <h3 className="font-playfair text-3xl font-bold text-emerald-950 mb-6">
              {vision.title}
            </h3>
            <p className="font-outfit text-emerald-800 text-lg leading-relaxed font-light mb-10">
              {vision.description}
            </p>

            <ul className="grid grid-cols-2 gap-4">
              {visionHighlights.map((highlight, index) => (
                <li key={index} className="flex items-center space-x-3 text-emerald-900 font-outfit text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span className="font-medium">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
