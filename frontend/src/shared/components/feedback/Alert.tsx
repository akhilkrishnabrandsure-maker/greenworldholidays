import React from 'react';

export interface AlertProps {
  children?: React.ReactNode;
  className?: string;
}

export function Alert({ children, className = '' }: AlertProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

