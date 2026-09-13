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
  /** 'cover' crops to fill the frame; 'contain' letterboxes to show the
   * whole photo uncropped. Real animal photography (product/kitten cards)
   * should use 'contain' so no part of the cat is cut off. */
  objectFit?: 'cover' | 'contain';
  /** Anchor point kept in view when objectFit="cover" crops the photo.
   * 'top' keeps faces/ears in frame when a portrait photo is cropped to
   * a shorter uniform card ratio (any surface/floor is cropped instead). */
  objectPosition?: 'top' | 'center' | 'bottom';
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
  objectFit = 'cover',
  objectPosition = 'center',
}: SmartImageProps) {
  // A failed image shows an empty frame, never a substitute stock photo —
  // swapping in a different cat's photo when a real listing's image 404s
  // would misrepresent what's actually for sale.
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className={`flex items-center justify-center bg-slate-900 text-slate-600 text-xs w-full ${fill ? 'absolute inset-0' : ''} ${className}`}
        style={fill ? undefined : { aspectRatio }}
        role="img"
        aria-label={alt || 'Image unavailable'}
      >
        Image unavailable
      </div>
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt || 'Cosy Cats Cattery Maine Coon'}
        fill
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        referrerPolicy="no-referrer"
        sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
        className={`${objectFit === 'contain' ? 'object-contain' : 'object-cover'} ${className}`}
        style={{ objectPosition }}
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
        src={src}
        alt={alt || 'Cosy Cats Cattery Maine Coon'}
        width={width}
        height={height}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        referrerPolicy="no-referrer"
        sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
        className={`w-full h-full transition-transform duration-500 hover:scale-105 ${
          objectFit === 'contain' ? 'object-contain' : 'object-cover'
        } ${className}`}
        style={{ objectPosition }}
        onError={() => setError(true)}
      />
    </div>
  );
}
