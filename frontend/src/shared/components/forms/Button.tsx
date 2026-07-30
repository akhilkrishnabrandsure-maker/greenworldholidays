import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ 
  children, 
  className = '', 
  variant = 'primary',
  size = 'md',
  ...props 
}: ButtonProps) {
  
  const baseStyles = 'inline-flex items-center justify-center font-bold transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none rounded-xl';
  
  const variants = {
    primary: 'bg-primary-green hover:bg-primary-green-dark text-white shadow-md hover:shadow-lg',
    secondary: 'bg-emerald-50 hover:bg-emerald-100 text-primary-green border border-emerald-200',
    outline: 'bg-transparent border border-gray-300 hover:border-primary-green hover:text-primary-green text-gray-900',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-900'
  };

  const sizes = {
    sm: 'text-xs px-4 py-2',
    md: 'text-sm px-6 py-3',
    lg: 'text-base px-8 py-4',
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
}
