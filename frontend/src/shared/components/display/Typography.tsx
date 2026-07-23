import React from 'react';

export interface TypographyProps {
  children?: React.ReactNode;
  className?: string;
}

export function Typography({ children, className = '' }: TypographyProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

