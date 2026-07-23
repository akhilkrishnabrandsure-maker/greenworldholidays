'use client';

import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut, Settings, ChevronDown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthProvider';
import { useModal } from '@/contexts/ModalProvider';

export function UserMenu() {
  const { user, isAuthenticated, logout } = useAuth();
  const { openModal } = useModal();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isAuthenticated || !user) {
    return (
      <div className="hidden md:flex items-center space-x-4">
        <button 
          onClick={() => openModal('login')}
          className="text-emerald-700 hover:text-emerald-900 font-medium transition-colors"
        >
          Sign In
        </button>
        <button 
          onClick={() => openModal('register')}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-full font-medium transition-colors shadow-md hover:shadow-lg"
        >
          Sign Up
        </button>
      </div>
    );
  }

  return (
    <div className="hidden md:flex relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-2 p-1.5 pr-3 rounded-full border border-emerald-200 bg-white/70 hover:bg-emerald-50 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
          {user.avatarUrl ? (
            <img src={user.avatarUrl} alt={user.name} className="w-full h-full rounded-full object-cover" />
          ) : (
            <User className="w-5 h-5" />
          )}
        </div>
        <span className="text-sm font-medium text-gray-700">{user.name.split(' ')[0]}</span>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2">
          <div className="px-4 py-2 border-b border-gray-100 mb-2">
            <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
          
          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 flex items-center space-x-2 transition-colors">
            <Settings className="w-4 h-4" />
            <span>Account Settings</span>
          </button>
          
          <button 
            onClick={() => {
              logout();
              setIsDropdownOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
}
