import React from 'react';
import { Check } from 'lucide-react';

interface EnquiryChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export function EnquiryChip({ label, selected, onClick }: EnquiryChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex items-center justify-center gap-2
        px-5 py-2.5 rounded-full text-sm font-medium 
        border-[1.5px] transition-all duration-300 ease-in-out
        ${selected 
          ? 'bg-[#0B4F37] border-[#0B4F37] text-white shadow-[0_4px_14px_0_rgba(11,79,55,0.39)] scale-[1.03]' 
          : 'bg-white border-[#0B4F37] text-[#0B4F37] hover:bg-[#ECFDF5] hover:-translate-y-[2px] hover:shadow-md hover:scale-[1.03]'
        }
      `}
    >
      {selected && <Check size={16} strokeWidth={2.5} />}
      {label}
    </button>
  );
}
