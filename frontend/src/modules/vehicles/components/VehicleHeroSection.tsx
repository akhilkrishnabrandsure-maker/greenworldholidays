'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Star, MapPin, Calendar, Users, MessageCircle, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Vehicle } from '../types/vehicle.types';
import { AppImage } from '@/shared/components/display/AppImage';
import { ROUTES } from '@/constants/routes';

interface VehicleHeroSectionProps {
  vehicle: Vehicle;
}

export function VehicleHeroSection({ vehicle }: VehicleHeroSectionProps) {
  const [pickupLocation, setPickupLocation] = useState('Cochin International Airport (COK)');
  const [travelDate, setTravelDate] = useState('');
  const [passengers, setPassengers] = useState(vehicle.seatCapacity ? `${vehicle.seatCapacity} Passengers` : '7 Passengers');

  const defaultBackdrop = 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=2000&q=80';
  const backdropUrl = vehicle.heroBackdrop || defaultBackdrop;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'Flexible';
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`; // DD/MM/YYYY
    }
    return dateStr;
  };

  const handleReserveNow = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedDate = formatDate(travelDate);
    const message = `Hi Green World Holidays! I would like to reserve the ${vehicle.name}.\n\n📍 Pickup: ${pickupLocation}\n📅 Date: ${formattedDate}\n👥 Passengers: ${passengers}\n\nPlease check availability and assist me with booking.`;
    window.open(`https://wa.me/918075438808?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section className="relative w-full min-h-[90vh] lg:min-h-[85vh] flex items-center overflow-hidden bg-emerald-950 pt-20 pb-16 lg:py-24">
      {/* Background Kerala Landscape Image */}
      <div className="absolute inset-0 z-0">
        <AppImage
          src={backdropUrl}
          alt={`${vehicle.name} background landscape`}
          fill
          priority
          className="w-full h-full object-cover object-center brightness-75 scale-105 transition-transform duration-1000"
          sizes="100vw"
        />
        {/* Dark Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-emerald-950/70 to-emerald-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-emerald-950/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 text-white space-y-6">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-emerald-200/90 font-medium">
              <Link href={ROUTES.HOME} className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4 text-emerald-400" />
              <Link href={ROUTES.VEHICLES} className="hover:text-white transition-colors">Fleet</Link>
              <ChevronRight className="w-4 h-4 text-emerald-400" />
              <span className="text-white font-semibold">{vehicle.name}</span>
            </nav>

            {/* Category Badge */}
            <div className="inline-flex items-center space-x-2 bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 px-3.5 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold tracking-widest text-emerald-300 uppercase">
                {vehicle.category} • LUXURY FLEET
              </span>
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-serif leading-tight">
                {vehicle.name}
              </h1>
              <p className="text-lg sm:text-xl text-emerald-100/90 max-w-2xl font-light leading-relaxed">
                {vehicle.shortDescription || 'Luxury Family & Executive Transportation Across Kerala'}
              </p>
            </div>

            {/* Ratings & Trust Badges */}
            <div className="flex flex-wrap items-center gap-4 text-sm pt-2">
              <div className="flex items-center space-x-1.5 bg-black/40 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/10">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="font-bold text-white pl-1">{vehicle.rating || 4.9}</span>
                <span className="text-emerald-200/80 text-xs">(120+ Ratings)</span>
              </div>

              <div className="flex items-center space-x-2 text-emerald-200/90 bg-emerald-900/40 backdrop-blur-md px-3.5 py-2 rounded-full border border-emerald-500/20">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-medium">Chauffeur Included</span>
              </div>
            </div>

            {/* Cutout / Main Vehicle Image Visual */}
            <div className="relative mt-6 w-full h-64 sm:h-80 rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
              <AppImage
                src={vehicle.heroImage || vehicle.image}
                alt={vehicle.name}
                fill
                priority
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <span className="text-xs font-semibold tracking-wider text-emerald-200 uppercase bg-black/50 backdrop-blur-md px-3 py-1 rounded-full">
                  Sanitized & Fleet Verified
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Floating Glassmorphism Booking Card */}
          <div className="lg:col-span-5">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/40 text-gray-900 transition-all duration-300 hover:shadow-[0_25px_60px_rgba(0,0,0,0.35)]">

              {/* Header Info (Unpriced) */}
              <div className="flex justify-between items-start pb-5 border-b border-gray-100">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">Instant Reservation</span>
                  <p className="text-sm font-medium text-gray-600 mt-0.5">Custom Tariff & Route Quote</p>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-200 uppercase tracking-wide">
                  AVAILABLE NOW
                </span>
              </div>

              {/* Form Controls */}
              <form onSubmit={handleReserveNow} className="mt-6 space-y-4">
                {/* Pickup Location */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Pickup Location</span>
                  </label>
                  <select
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="w-full bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                  >
                    <option value="Cochin International Airport (COK)">Cochin International Airport (COK)</option>
                    <option value="Trivandrum International Airport (TRV)">Trivandrum International Airport (TRV)</option>
                    <option value="Kochi City / Ernakulam Junction">Kochi City / Ernakulam Junction</option>
                    <option value="Munnar Town">Munnar Town</option>
                    <option value="Alleppey / Alappuzha">Alleppey / Alappuzha</option>
                    <option value="Custom Location in Kerala">Custom Location in Kerala</option>
                  </select>
                </div>

                {/* Travel Date */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Travel Date</span>
                    </span>
                  </label>
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all cursor-pointer"
                  />
                </div>

                {/* Passengers */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center space-x-1">
                    <Users className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Passengers</span>
                  </label>
                  <select
                    value={passengers}
                    onChange={(e) => setPassengers(e.target.value)}
                    className="w-full bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                  >
                    {[...Array(vehicle.seatCapacity || 7)].map((_, idx) => (
                      <option key={idx + 1} value={`${idx + 1} Passenger${idx > 0 ? 's' : ''}`}>
                        {idx + 1} Passenger{idx > 0 ? 's' : ''} {idx + 1 === vehicle.seatCapacity ? '(Full Capacity)' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 space-y-3">
                  <button
                    type="submit"
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg shadow-emerald-900/20 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex items-center justify-center space-x-2 text-base"
                  >
                    <span>Reserve Now</span>
                  </button>

                  <a
                    href={`https://wa.me/918075438808?text=${encodeURIComponent(`Hi Green World Holidays! I want to inquire about renting the ${vehicle.name}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold py-3 px-6 rounded-xl border border-emerald-200 transition-all duration-300 flex items-center justify-center space-x-2 text-sm"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>Instant WhatsApp Inquiry</span>
                  </a>
                </div>

                <p className="text-center text-[11px] text-gray-500 pt-1">
                  🔒 No advance payment required for instant quotes. Free cancellation options.
                </p>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
