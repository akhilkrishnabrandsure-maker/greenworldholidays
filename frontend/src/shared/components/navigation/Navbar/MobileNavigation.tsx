import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MAIN_NAVIGATION } from '@/constants/navigation';
import { ChevronDown } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNavigation({ isOpen, onClose }: Props) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const toggleExpand = (label: string, e: React.MouseEvent) => {
    e.preventDefault();
    setExpandedItems(prev => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <div className="md:hidden bg-gradient-to-r from-white via-emerald-100 to-emerald-300/90 backdrop-blur-md shadow-lg absolute w-full top-20 left-0 max-h-[calc(100vh-5rem)] overflow-y-auto">
      <div className="px-4 pt-4 pb-6 space-y-2">
        {MAIN_NAVIGATION.map((item) => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/');
          const hasChildren = item.children && item.children.length > 0;
          const isExpanded = expandedItems[item.label];
          
          return (
            <div key={item.label} className="flex flex-col">
              <div className="flex items-center justify-between">
                <Link
                  href={item.href}
                  onClick={hasChildren ? undefined : onClose}
                  className={`flex-1 px-4 py-3 text-base font-medium rounded-lg text-left transition-all duration-200 ${
                    isActive && !hasChildren ? 'text-emerald-600 bg-emerald-50' : 'text-emerald-800 hover:text-emerald-600 hover:bg-emerald-50'
                  }`}
                >
                  {item.label}
                </Link>
                {hasChildren && (
                  <button 
                    onClick={(e) => toggleExpand(item.label, e)}
                    className="p-3 text-emerald-800 hover:bg-emerald-50 rounded-lg transition-colors focus:outline-none"
                    aria-label="Toggle submenu"
                  >
                    <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>
                )}
              </div>
              
              {hasChildren && (
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isExpanded ? 'max-h-[1000px] opacity-100 mt-2' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="bg-white/60 rounded-[24px] p-2 space-y-1 mx-2">
                    {item.children?.map((child) => {
                      const isChildActive = pathname === child.href;
                      const Icon = child.icon;
                      
                      return (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={onClose}
                          className={`flex items-center px-4 py-3 rounded-xl transition-colors duration-200 ${
                            isChildActive ? 'bg-emerald-50 text-emerald-700' : 'text-emerald-800 hover:bg-emerald-50 hover:text-emerald-700'
                          }`}
                        >
                          {Icon && <Icon className={`mr-3 w-5 h-5 flex-shrink-0 ${isChildActive ? 'text-emerald-600' : 'text-emerald-600/70'}`} />}
                          <span className="text-sm font-medium leading-tight">{child.label}</span>
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
