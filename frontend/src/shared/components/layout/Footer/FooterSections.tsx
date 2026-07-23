import React from 'react';
import Link from 'next/link';
import { MAIN_NAVIGATION, COMPANY_INFO } from '@/constants/navigation';
import { MapPin, Mail, Phone } from 'lucide-react';

export function FooterSections() {
  return (
    <>
      <div>
        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
        <ul className="space-y-2">
          {MAIN_NAVIGATION.map((item, index) => (
            <li key={index}>
              <Link href={item.href} className="text-gray-400 hover:text-emerald-400 transition-colors">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4 text-emerald-400" />
            <span className="text-gray-400">{COMPANY_INFO.phone}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4 text-emerald-400" />
            <span className="text-gray-400">{COMPANY_INFO.email}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-emerald-400" />
            <span className="text-gray-400">{COMPANY_INFO.address}</span>
          </div>
        </div>
      </div>
    </>
  );
}
