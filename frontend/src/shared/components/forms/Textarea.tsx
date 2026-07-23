import React from 'react';

export interface TextareaProps {
  children?: React.ReactNode;
  className?: string;
}

export function Textarea({ children, className = '' }: TextareaProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

