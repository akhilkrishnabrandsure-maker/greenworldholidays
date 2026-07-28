export interface NavigationItem {
  label: string;
  href: string;
  icon?: any;
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
