import React from 'react';

export interface NavigationItem {
  label: string;
  href: string;
  icon?: React.ElementType;
  children?: NavigationItem[];
}

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}
