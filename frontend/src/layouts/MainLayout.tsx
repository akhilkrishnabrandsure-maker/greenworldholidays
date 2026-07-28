import React from 'react';
import { Navbar } from '@/shared/components/navigation/Navbar/Navbar';
import { Footer } from '@/shared/components/layout/Footer/Footer';
import { FloatingWhatsAppButton } from '@/shared/components/layout/FloatingWhatsAppButton';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer />
      <FloatingWhatsAppButton />
    </div>
  );
}
