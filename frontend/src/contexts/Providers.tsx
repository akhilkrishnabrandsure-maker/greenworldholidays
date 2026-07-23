'use client';

import React from 'react';
import { AuthProvider } from './AuthProvider';
import { ModalProvider } from './ModalProvider';
import { ToastProvider } from './ToastProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <AuthProvider>
        <ModalProvider>
          {children}
        </ModalProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
