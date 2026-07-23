import React from 'react';

export interface SkeletonProps {
  children?: React.ReactNode;
  className?: string;
}

export function Skeleton({ children, className = '' }: SkeletonProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

