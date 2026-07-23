'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { DesktopNavigation } from './DesktopNavigation';
import { MobileNavigation } from './MobileNavigation';
import { UserMenu } from './UserMenu';
import { AppImage } from '../../display/AppImage';
import { COMPANY_INFO } from '@/constants/navigation';
import { ROUTES } from '@/constants/routes';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 
      ${isScrolled 
        ? 'bg-gradient-to-r from-white via-emerald-100 to-emerald-300/80 backdrop-blur-md shadow-lg' 
        : 'bg-gradient-to-r from-white via-emerald-100 to-emerald-300/90'}
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href={ROUTES.HOME} className="flex items-center">
            <AppImage 
              src="https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556507/green_world_zetcew.png" 
              alt={COMPANY_INFO.name} 
              width={160}
              height={64}
              className="h-16 sm:h-14 lg:h-16 w-auto drop-shadow-md"
              unoptimized
            />
          </Link>
          
          <DesktopNavigation />
          
          <UserMenu />

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-md ${isScrolled ? 'text-gray-700' : 'text-emerald-700'} bg-white/70 hover:bg-emerald-100 transition-colors`}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <MobileNavigation isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </nav>
  );
}
