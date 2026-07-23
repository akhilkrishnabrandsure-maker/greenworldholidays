import Image, { ImageProps } from 'next/image';

export function AppImage(props: ImageProps) {
  return <Image {...props} />;
}
