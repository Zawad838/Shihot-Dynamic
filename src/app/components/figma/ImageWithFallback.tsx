import { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
}

export function ImageWithFallback({ src, alt, fallbackSrc, className }: ImageWithFallbackProps) {
  const [error, setError] = useState(false);
  const fallback = fallbackSrc ?? 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=60';
  return (
    <img
      src={error ? fallback : src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  );
}
