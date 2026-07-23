import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { packageRepository } from '@/modules/packages/repository/package.repository';
import { PackageTemplate } from '@/modules/packages/pages/PackageTemplate';
import { constructMetadata } from '@/lib/seo';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const tourPackage = await packageRepository.getPackageBySlug(resolvedParams.slug);

  if (!tourPackage) {
    return constructMetadata({
      title: 'Package Not Found | Green World Holidays',
      description: 'The requested tour package could not be found.',
      noIndex: true,
    });
  }

  return constructMetadata({
    title: `${tourPackage.name} | Green World Holidays`,
    description: tourPackage.shortDescription,
    image: tourPackage.heroImage,
    url: `/packages/${tourPackage.slug}`,
  });
}

export async function generateStaticParams() {
  const packages = await packageRepository.getAllPackages();
  
  return packages.map((pkg) => ({
    slug: pkg.slug,
  }));
}

export default async function PackagePage({ params }: PageProps) {
  const resolvedParams = await params;
  return <PackageTemplate slug={resolvedParams.slug} />;
}
