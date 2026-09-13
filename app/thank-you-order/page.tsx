import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, ShieldCheck, MessageCircle } from 'lucide-react';
import { SITE, CONTACT } from '@/config/site';

export const metadata: Metadata = {
  title: `Order & Reservation Draft Created | ${SITE.name}`,
  description: `Your order draft has been logged. Our concierge will finalize details.`,
  robots: { index: false, follow: true },
};

export default function ThankYouOrderPage() {
  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto text-center space-y-8">
      <div className="w-16 h-16 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center mx-auto border border-amber-500/40">
        <CheckCircle2 className="w-8 h-8" />
      </div>

      {/* Exactly One H1 */}
      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
        Reservation Draft Initialized
      </h1>

      <p className="text-sm text-slate-300 leading-relaxed">
        Thank you for submitting your reservation draft with {SITE.name}. Our Canberra concierge will review your chosen pedigree kitten and items and contact you immediately to coordinate adoption paperwork and travel dates.
      </p>

      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-xs text-slate-400 space-y-3">
        <p className="font-bold text-amber-300">Fast-Track Via WhatsApp</p>
        <p>If you prefer an instant confirmation on hold status, message us directly:</p>
        <a
          href={`https://wa.me/${CONTACT.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
            'Hello, I just placed an order/kitten reservation draft on your website and would like to confirm.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold rounded-xl hover:bg-emerald-900 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Confirm on WhatsApp</span>
        </a>
      </div>

      <div className="pt-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-lg hover:brightness-110 transition-all"
        >
          <span>Return to Homepage</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
