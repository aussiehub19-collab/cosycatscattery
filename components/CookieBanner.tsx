'use client';

import { useState, useEffect } from 'react';
import { Shield, Check, X } from 'lucide-react';
import { SITE } from '@/config/site';

export default function CookieBanner() {
  // Always matches SSR output (false) on first paint — consent state is read
  // client-side only, after mount, to avoid a hydration mismatch.
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem('cosy_cats_consent')) {
        // Intentional: hydrating visibility from localStorage has no
        // SSR-safe synchronous alternative — this is the one-time mount
        // read that avoids the hydration mismatch, not a state-sync loop.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setShow(true);
      }
    } catch {
      // localStorage unavailable — leave banner hidden rather than throw
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem('cosy_cats_consent', 'true');
    } catch {}
    setShow(false);
  };

  const decline = () => {
    try {
      localStorage.setItem('cosy_cats_consent', 'false');
    } catch {}
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      role="region"
      aria-label="Privacy & Cookie Preferences"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md bg-slate-950/95 backdrop-blur-md border border-amber-500/30 rounded-2xl p-5 shadow-2xl z-50 text-slate-200"
    >
      <div className="flex items-start gap-3">
        <Shield className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-2">
          <h4 className="font-serif text-sm font-bold text-white">Privacy & Experience Preferences</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            We use essential local storage to remember your cart reservations and ensure a seamless luxury browsing experience across Australia.
          </p>
          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={accept}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-xs font-bold rounded-lg hover:brightness-110 active:scale-95 transition-all flex items-center gap-1 shadow-md"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Accept</span>
            </button>
            <button
              type="button"
              onClick={decline}
              className="px-4 py-2 bg-slate-900 border border-slate-700 text-slate-300 hover:text-white text-xs font-medium rounded-lg hover:bg-slate-800 transition-all"
            >
              Essential Only
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
