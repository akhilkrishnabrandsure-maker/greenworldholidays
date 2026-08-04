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
        border-[1.5px] transition-all duration-[250ms] ease-in-out
        ${selected 
          ? 'bg-[#0B4F37] border-[#0B4F37] text-white' 
          : 'bg-[#F5FBF8] border-[#D7EBDD] text-[#0B4F37] hover:bg-[#E8F7EE] hover:border-[#0B8A5A] hover:-translate-y-[2px]'
        }
      `}
    >
      {selected && <Check size={16} strokeWidth={2.5} />}
      {label}
    </button>
  );
}
