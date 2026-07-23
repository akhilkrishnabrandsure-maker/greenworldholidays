import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MAIN_NAVIGATION } from '@/constants/navigation';

export function DesktopNavigation() {
  const pathname = usePathname();

  return (
    <div className="hidden md:block">
      <div className="ml-10 flex items-center space-x-8 mt-4">
        {MAIN_NAVIGATION.map((item) => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/');
          
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`px-3 py-2 text-base font-medium transition-colors hover:text-emerald-600 hover:bg-emerald-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-white ${
                isActive ? 'text-emerald-600 bg-emerald-50' : 'text-gray-700'
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
