'use client';

import Image from 'next/image';
import { useState } from 'react';

interface SmartImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  aspectRatio?: string;
  fill?: boolean;
  sizes?: string;
}

export default function SmartImage({
  src,
  alt,
  width = 1200,
  height = 900,
  priority = false,
  className = '',
  aspectRatio = '4/3',
  fill = false,
  sizes,
}: SmartImageProps) {
  const [error, setError] = useState(false);
  const fallbackSrc = 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1200&auto=format&fit=crop';

  if (fill) {
    return (
      <Image
        src={error ? fallbackSrc : src}
        alt={alt || 'Cosy Cats Cattery Maine Coon'}
        fill
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        referrerPolicy="no-referrer"
        sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
        className={`object-cover ${className}`}
        onError={() => setError(true)}
      />
    );
  }

  return (
    <div
      className="relative overflow-hidden bg-slate-900 w-full"
      style={{ aspectRatio }}
    >
      <Image
        src={error ? fallbackSrc : src}
        alt={alt || 'Cosy Cats Cattery Maine Coon'}
        width={width}
        height={height}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        referrerPolicy="no-referrer"
        sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
        className={`w-full h-full object-cover transition-transform duration-500 hover:scale-105 ${className}`}
        onError={() => setError(true)}
      />
    </div>
  );
}
