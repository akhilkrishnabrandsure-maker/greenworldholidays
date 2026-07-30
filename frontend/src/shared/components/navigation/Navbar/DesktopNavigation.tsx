import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MAIN_NAVIGATION } from '@/constants/navigation';
import { ChevronDown } from 'lucide-react';

export function DesktopNavigation() {
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <div className="hidden md:block">
      <div className="ml-10 flex items-center space-x-8 mt-4 relative">
        {MAIN_NAVIGATION.map((item) => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/');
          const hasChildren = item.children && item.children.length > 0;
          
          return (
            <div 
              key={item.label}
              className="relative group"
              onMouseEnter={() => hasChildren && setActiveDropdown(item.label)}
              onMouseLeave={() => hasChildren && setActiveDropdown(null)}
            >
              <Link
                href={hasChildren ? '#' : item.href}
                onClick={(e) => {
                  if (hasChildren) {
                    e.preventDefault();
                    setActiveDropdown(activeDropdown === item.label ? null : item.label);
                  }
                }}
                className={`flex items-center px-3 py-2 text-base font-medium transition-colors hover:text-emerald-600 hover:bg-emerald-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-white ${
                  isActive ? 'text-emerald-600 bg-emerald-50' : 'text-gray-700'
                }`}
              >
                {item.label}
                {hasChildren && (
                  <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                )}
              </Link>

              {hasChildren && (
                <div 
                  className={`absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[600px] bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 p-6 transition-all duration-300 origin-top z-50
                    ${activeDropdown === item.label ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-2 invisible'}`}
                >
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                    {item.children?.map((child) => {
                      const isChildActive = pathname === child.href;
                      const Icon = child.icon;
                      
                      return (
                        <Link
                          key={child.label}
                          href={child.href}
                          className={`flex items-center p-3 rounded-xl transition-all duration-200 hover:bg-emerald-50 group/item ${
                            isChildActive ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700'
                          }`}
                        >
                          {Icon && (
                            <div className={`mr-4 p-2.5 rounded-xl transition-colors duration-200 ${
                              isChildActive ? 'bg-emerald-100 text-emerald-600' : 'bg-emerald-50/50 text-emerald-600/70 group-hover/item:bg-emerald-100 group-hover/item:text-emerald-600'
                            }`}>
                              <Icon className="w-5 h-5" />
                            </div>
                          )}
                          <span className={`text-sm font-medium transition-colors duration-200 ${
                            isChildActive ? 'text-emerald-700' : 'group-hover/item:text-emerald-700'
                          }`}>
                            {child.label}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
