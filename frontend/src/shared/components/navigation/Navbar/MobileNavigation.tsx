import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MAIN_NAVIGATION } from '@/constants/navigation';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNavigation({ isOpen, onClose }: Props) {
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-gradient-to-r from-white via-emerald-100 to-emerald-300/90 backdrop-blur-md shadow-lg absolute w-full top-20 left-0">
      <div className="px-4 pt-4 pb-6 space-y-2">
        {MAIN_NAVIGATION.map((item) => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/');
          
          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={onClose}
              className={`block px-4 py-3 text-base font-medium hover:text-emerald-600 hover:bg-emerald-50 rounded-lg w-full text-left transition-all duration-200 ${
                isActive ? 'text-emerald-600 bg-emerald-50' : 'text-emerald-800'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
