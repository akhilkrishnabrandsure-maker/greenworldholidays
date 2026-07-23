import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { BreadcrumbItem } from '@/types';

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.href} className="flex items-center gap-2">
              {index > 0 && <ChevronRight className="h-4 w-4 shrink-0" aria-hidden="true" />}
              {isLast ? (
                <span className="text-emerald-700 font-medium" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-emerald-700 transition-colors">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
