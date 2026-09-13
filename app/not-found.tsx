import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Home, ShoppingBag, BookOpen } from 'lucide-react';
import { SITE } from '@/config/site';
import BrandLogo from '@/components/BrandLogo';

export const metadata: Metadata = {
  title: `404 — Page Not Found | ${SITE.name}`,
  description: `The page you were seeking has wandered off like a curious Maine Coon.`,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto text-center space-y-8">
      <div className="flex justify-center">
        <BrandLogo size="lg" showText={false} />
      </div>

      {/* Exactly One H1 */}
      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
        404 — Page Not Found
      </h1>

      <p className="text-sm text-slate-300 leading-relaxed">
        The page you are looking for may have been relocated or renamed. Please explore our pedigree litters or educational guides below.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
        <Link
          href="/"
          className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-400 text-xs font-bold text-slate-200 flex flex-col items-center gap-2 transition-all"
        >
          <Home className="w-5 h-5 text-amber-400" />
          <span>Homepage</span>
        </Link>
        <Link
          href="/shop/"
          className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-400 text-xs font-bold text-slate-200 flex flex-col items-center gap-2 transition-all"
        >
          <ShoppingBag className="w-5 h-5 text-amber-400" />
          <span>Available Kittens</span>
        </Link>
        <Link
          href="/blog/"
          className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-400 text-xs font-bold text-slate-200 flex flex-col items-center gap-2 transition-all"
        >
          <BookOpen className="w-5 h-5 text-amber-400" />
          <span>Feline Guides</span>
        </Link>
      </div>
    </div>
  );
}
