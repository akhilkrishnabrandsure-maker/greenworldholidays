'use client';

import React, { useState } from 'react';
import { X, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthProvider';
import { useModal } from '@/contexts/ModalProvider';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ForgotPasswordModal({ isOpen, onClose }: ForgotPasswordModalProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const { forgotPassword } = useAuth();
  const { openModal } = useModal();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { success } = await forgotPassword(email);
    setIsSubmitting(false);
    if (success) {
      setIsSent(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center p-6 border-b border-gray-100">
          <button onClick={() => openModal('login')} className="mr-4 text-gray-400 hover:text-gray-600 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-semibold text-gray-800 flex-1">Reset Password</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {isSent ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">Check your email</h3>
            <p className="text-sm text-gray-600">
              We've sent password reset instructions to <strong>{email}</strong>
            </p>
            <button 
              onClick={() => openModal('login')}
              className="w-full py-2.5 px-4 mt-6 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg font-medium transition-colors"
            >
              Return to login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <p className="text-sm text-gray-600 mb-4">
              Enter your email address and we'll send you instructions to reset your password.
            </p>
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
            
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full py-3 px-4 mt-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors disabled:opacity-70"
            >
              {isSubmitting ? 'Sending instructions...' : 'Send Instructions'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
