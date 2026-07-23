import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SpecificationCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

export function SpecificationCard({ icon: Icon, label, value }: SpecificationCardProps) {
  return (
    <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-emerald-50/50">
      <Icon className="h-5 w-5 text-emerald-600 mb-1" />
      <span className="text-xs text-gray-500 font-medium">{label}</span>
      <span className="text-sm font-semibold text-gray-900">{value}</span>
    </div>
  );
}
