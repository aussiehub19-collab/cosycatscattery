'use client';

import { useState, useEffect } from 'react';
import { ShieldCheck, Plane, Award, Sparkles } from 'lucide-react';

const announcements = [
  { text: '👑 Australia’s Premier Pedigree European & American Maine Coons — DNA Health Certified', icon: Award },
  { text: '✈️ VIP Climate-Controlled Flight Delivery Available Across All Australian States & Regional Hubs', icon: Plane },
  { text: '🛡️ 100% Negative Parents for HCM, SMA, PKDef & PKD with 2-Year Genetic Health Guarantee', icon: ShieldCheck },
  { text: '✨ Reserve Your 2025 Royal Kitten Litter — Direct Bank Transfer & Instant PayID Accepted', icon: Sparkles },
];

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const current = announcements[index];
  const Icon = current.icon;

  return (
    <div
      id="announcement-bar"
      className="bg-gradient-to-r from-amber-950 via-slate-950 to-amber-950 border-b border-amber-500/20 text-amber-200 text-xs sm:text-sm py-2 px-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center text-center font-medium tracking-wide">
        <Icon className="w-3.5 h-3.5 mr-2 text-amber-400 shrink-0" aria-hidden="true" />
        <span className="truncate">{current.text}</span>
      </div>
    </div>
  );
}
