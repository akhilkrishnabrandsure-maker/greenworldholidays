import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SpecificationCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

export function SpecificationCard({ icon: Icon, label, value }: SpecificationCardProps) {
  return (
    <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-cream-dark/20 border border-gray-50 hover:border-luxury-gold-light/35 transition-colors">
      <span className="flex items-center justify-center h-10 w-10 rounded-full bg-emerald-50 text-primary-green mb-3">
        <Icon className="h-5 w-5" />
      </span>
      <span className="text-[10px] text-gray-500 font-extrabold uppercase tracking-wider mb-1">{label}</span>
      <span className="text-sm font-bold text-gray-950 font-sans">{value}</span>
    </div>
  );
}

