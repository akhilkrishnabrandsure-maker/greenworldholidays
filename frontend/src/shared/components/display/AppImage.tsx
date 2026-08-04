import Image, { ImageProps } from 'next/image';

export function AppImage({ alt, ...props }: ImageProps) {
  return <Image alt={alt || ''} {...props} />;
}
