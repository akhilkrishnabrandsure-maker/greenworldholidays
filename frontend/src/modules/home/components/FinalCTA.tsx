import React from 'react';

export function FinalCTA() {
  const whatsappUrl = `https://wa.me/918075438808?text=${encodeURIComponent("Hi! I'm ready to plan my trip to Kerala with Green World Holidays. Can you help me get started?")}`;

  return (
    <section className="py-20 bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-900 text-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">
          Ready for an Unforgettable Kerala Experience?
        </h2>
        <p className="text-lg md:text-xl text-emerald-100 mb-8 max-w-3xl mx-auto leading-relaxed">
          From tranquil backwaters to misty hill stations, let Green World Holidays craft your dream journey with tailored packages and reliable car rentals.
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-white text-emerald-800 hover:bg-emerald-50 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 shadow-2xl"
        >
          Start Planning Today
        </a>
      </div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
