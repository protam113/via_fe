import Image, { ImageProps } from 'next/image';

interface CustomImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  quality?: number;
  priority?: boolean;
  className?: string;
}

export default function CustomImage({
  src,
  alt,
  width,
  height,
  sizes = '100vw',
  quality = 75,
  priority = false,
  className,
  ...rest
}: CustomImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      quality={quality}
      priority={priority}
      className={className}
      placeholder="blur"
      blurDataURL="/placeholder.png" // Optional low-quality image placeholder
      {...rest}
    />
  );
}
