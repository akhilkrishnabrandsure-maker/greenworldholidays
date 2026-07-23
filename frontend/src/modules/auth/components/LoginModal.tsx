'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthProvider';
import { useModal } from '@/contexts/ModalProvider';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const { openModal } = useModal();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { success } = await login({ email, password });
    setIsSubmitting(false);
    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800">Welcome Back</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
          <div className="flex justify-end">
            <button 
              type="button" 
              onClick={() => openModal('forgotPassword')}
              className="text-sm text-emerald-600 hover:text-emerald-700 hover:underline"
            >
              Forgot password?
            </button>
          </div>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors disabled:opacity-70"
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
          
          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{' '}
            <button 
              type="button" 
              onClick={() => openModal('register')}
              className="text-emerald-600 hover:text-emerald-700 hover:underline font-medium"
            >
              Sign up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
