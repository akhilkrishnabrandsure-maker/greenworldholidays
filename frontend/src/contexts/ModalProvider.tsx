'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';

// Use dynamic imports for modals so they don't block the main thread until opened
const LoginModal = dynamic(() => import('@/modules/auth/components/LoginModal'), { ssr: false });
const RegisterModal = dynamic(() => import('@/modules/auth/components/RegisterModal'), { ssr: false });
const ForgotPasswordModal = dynamic(() => import('@/modules/auth/components/ForgotPasswordModal'), { ssr: false });

export type ModalType = 'login' | 'register' | 'forgotPassword' | null;

interface ModalContextType {
  activeModal: ModalType;
  openModal: (modal: ModalType) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const openModal = useCallback((modal: ModalType) => setActiveModal(modal), []);
  const closeModal = useCallback(() => setActiveModal(null), []);

  return (
    <ModalContext.Provider value={{ activeModal, openModal, closeModal }}>
      {children}
      
      {/* Global Modals rendered dynamically based on active state */}
      {activeModal === 'login' && <LoginModal isOpen={true} onClose={closeModal} />}
      {activeModal === 'register' && <RegisterModal isOpen={true} onClose={closeModal} />}
      {activeModal === 'forgotPassword' && <ForgotPasswordModal isOpen={true} onClose={closeModal} />}
    </ModalContext.Provider>
  );
}

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
