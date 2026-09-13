'use client';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export default function BrandLogo({ size = 'md', showText = true, className = '' }: BrandLogoProps) {
  const sizeMap = {
    sm: { box: 'w-8 h-8', icon: 'w-5 h-5', title: 'text-sm sm:text-base', sub: 'text-[8px] tracking-[0.2em]' },
    md: { box: 'w-11 h-11', icon: 'w-6 h-6', title: 'text-lg sm:text-xl', sub: 'text-[9px] tracking-[0.22em]' },
    lg: { box: 'w-14 h-14', icon: 'w-8 h-8', title: 'text-2xl sm:text-3xl', sub: 'text-[11px] tracking-[0.25em]' },
    xl: { box: 'w-20 h-20', icon: 'w-12 h-12', title: 'text-3xl sm:text-4xl', sub: 'text-xs tracking-[0.28em]' },
  };

  const current = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Luxury Feline Emblem */}
      <div
        className={`${current.box} relative rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-200 p-[1.5px] shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-all duration-300 shrink-0 group-hover:scale-105`}
      >
        <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center relative overflow-hidden">
          {/* Subtle gold ray gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(212,175,55,0.25),transparent_70%)]" />
          
          {/* Stylized Maine Coon Cat & Royal Crest Vector */}
          <svg
            className={`${current.icon} text-amber-300 relative z-10 transition-transform duration-300 group-hover:scale-110`}
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="cosyGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDE68A" />
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>
            </defs>
            {/* Maine Coon Lynx-tufted Silhouette & Crown */}
            <path
              d="M24 4L26.5 9.5L32 10.5L28 14.5L29 20L24 17L19 20L20 14.5L16 10.5L21.5 9.5L24 4Z"
              fill="url(#cosyGoldGrad)"
            />
            {/* Elegant Feline Head with Tufted Ears */}
            <path
              d="M12 18L18 24C18 24 20 22 24 22C28 22 30 24 30 24L36 18C35 24 35 29 33 33C31 37 28 41 24 42C20 41 17 37 15 33C13 29 13 24 12 18Z"
              stroke="url(#cosyGoldGrad)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="rgba(245, 158, 11, 0.08)"
            />
            {/* Royal Whiskers */}
            <path
              d="M10 32C15 32 18 34 20 35M10 36C15 35 18 36 20 37"
              stroke="#FCD34D"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M38 32C33 32 30 34 28 35M38 36C33 35 30 36 28 37"
              stroke="#FCD34D"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Heart Nose & Muzzle */}
            <path
              d="M22.5 31C22.5 30 24 29 24 29C24 29 25.5 30 25.5 31C25.5 32 24 33 24 33C24 33 22.5 32 22.5 31Z"
              fill="#FDE68A"
            />
            <path
              d="M24 33V35M24 35C23 36 22 36 21 36M24 35C25 36 26 36 27 36"
              stroke="#FDE68A"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Typography Brand Mark */}
      {showText && (
        <div className="flex flex-col text-left">
          <span className={`font-serif ${current.title} font-extrabold tracking-tight text-white group-hover:text-amber-300 transition-colors leading-tight whitespace-nowrap`}>
            Cosy Cats Cattery
          </span>
          <span className={`${current.sub} text-amber-400 font-bold tracking-[0.25em] uppercase mt-0.5`}>
            CANBERRA • AUSTRALIA
          </span>
        </div>
      )}
    </div>
  );
}
