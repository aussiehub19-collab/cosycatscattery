import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Phone, MessageCircle } from 'lucide-react';
import { SITE, CONTACT } from '@/config/site';

export const metadata: Metadata = {
  title: `Thank You for Your Inquiry | ${SITE.name}`,
  description: `Your cattery inquiry has been received by our Canberra concierge.`,
  robots: { index: false, follow: true },
};

export default function ThankYouContactPage() {
  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto text-center space-y-8">
      <div className="w-16 h-16 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center mx-auto border border-amber-500/40">
        <CheckCircle2 className="w-8 h-8" />
      </div>

      {/* Exactly One H1 */}
      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
        Inquiry Received with Pleasure
      </h1>

      <p className="text-sm text-slate-300 leading-relaxed">
        Thank you for contacting {SITE.name}. Our Canberra breeding desk has received your details and will get back to you within 24 hours with full litter and pedigree information.
      </p>

      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-xs text-slate-400 space-y-3">
        <p className="font-bold text-amber-300">Need Immediate Assistance?</p>
        <p>You can also connect directly with our head breeder via WhatsApp:</p>
        <a
          href={`https://wa.me/${CONTACT.whatsapp.replace(/\D/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold rounded-xl hover:bg-emerald-900 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Chat on WhatsApp</span>
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
