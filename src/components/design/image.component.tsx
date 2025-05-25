import Image, { ImageProps } from 'next/image';

interface CustomImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  src: ImageProps['src'];
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  loading?: 'lazy' | 'eager';
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
  loading,
  quality = 75,
  priority = false,
  className,
  ...rest
}: CustomImageProps) {
  if (process.env.NODE_ENV === 'development' && priority && loading) {
    console.warn(
      `CustomImage: Both "priority" and "loading" were passed. "loading" will be ignored.`
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      quality={quality}
      priority={priority}
      loading={priority ? undefined : loading ?? 'lazy'}
      className={className}
      placeholder="blur"
      blurDataURL="/placeholder.png"
      {...rest}
    />
  );
}
