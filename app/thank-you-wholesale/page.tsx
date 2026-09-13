import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Building2, MessageCircle } from 'lucide-react';
import { SITE, CONTACT } from '@/config/site';

export const metadata: Metadata = {
  title: `Wholesale Application Received | ${SITE.name}`,
  description: `Your trade application has been submitted to our commercial desk.`,
  robots: { index: false, follow: true },
};

export default function ThankYouWholesalePage() {
  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto text-center space-y-8">
      <div className="w-16 h-16 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center mx-auto border border-amber-500/40">
        <Building2 className="w-8 h-8" />
      </div>

      {/* Exactly One H1 */}
      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
        Wholesale Application Received
      </h1>

      <p className="text-sm text-slate-300 leading-relaxed">
        Thank you for applying for a trade partnership with {SITE.name}. Our commercial operations team in Canberra is evaluating your business registration and will issue your catalog tier credentials within 24 business hours.
      </p>

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
