import React from 'react';

export interface LoadingProps {
  children?: React.ReactNode;
  className?: string;
}

export function Loading({ children, className = '' }: LoadingProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

