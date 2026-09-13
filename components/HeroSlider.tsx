'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import Image from 'next/image';

const SLIDES = [
  '/images/hero/hero-1.webp',
  '/images/hero/hero-2.webp',
  '/images/hero/hero-3.webp',
  '/images/hero/hero-4.webp',
];

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
}
function getReducedMotionSnapshot() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
function getReducedMotionServerSnapshot() {
  return false;
}

export default function HeroSlider() {
  const [active, setActive] = useState(0);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  useEffect(() => {
    if (reducedMotion) return;
    const timer = setInterval(() => {
      setActive(prev => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [reducedMotion]);

  return (
    <div className="absolute inset-0" aria-hidden="true">
      {SLIDES.map((src, idx) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          priority={idx === 0}
          loading={idx === 0 ? 'eager' : 'lazy'}
          sizes="100vw"
          className={`object-cover transition-opacity duration-1000 ease-in-out ${
            idx === active || reducedMotion ? 'opacity-100' : 'opacity-0'
          } ${reducedMotion && idx !== 0 ? 'hidden' : ''}`}
        />
      ))}
      {/* Scrim for text legibility — light enough that the photo still reads clearly */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/45 to-slate-950/75" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(212,175,55,0.12),transparent_70%)]" />

      {!reducedMotion && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-hidden="true"
              tabIndex={-1}
              onClick={() => setActive(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === active ? 'w-6 bg-amber-400' : 'w-1.5 bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
