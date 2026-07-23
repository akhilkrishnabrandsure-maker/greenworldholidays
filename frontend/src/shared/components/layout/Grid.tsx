import React from 'react';

export interface GridProps {
  children?: React.ReactNode;
  className?: string;
}

export function Grid({ children, className = '' }: GridProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

