import React from 'react';

export interface GalleryProps {
  children?: React.ReactNode;
  className?: string;
}

export function Gallery({ children, className = '' }: GalleryProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

