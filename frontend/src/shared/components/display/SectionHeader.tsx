import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  align = 'center',
  className = '',
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';
  return (
    <div className={`${alignClass} mb-10 max-w-3xl ${className}`}>
      <h2 className="text-3xl md:text-4.5xl font-bold font-serif text-primary-green tracking-tight leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base md:text-lg text-gray-600 font-sans leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
