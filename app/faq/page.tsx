import type { Metadata } from 'next';
import Link from 'next/link';
import { HelpCircle, ArrowRight, ShieldCheck, Plane, Heart, Award } from 'lucide-react';
import JsonLd from '@/components/JsonLd';
import { FAQ, SITE, CONTACT } from '@/config/site';

export const metadata: Metadata = {
  title: `How Much Is a Maine Coon Kitten? FAQ | ${SITE.name}`,
  description: `How much is a Maine Coon kitten in Australia? Answers on pricing, adoption process, DNA health testing, flight delivery, temperament, and more.`,
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    title: `Maine Coon Price & Adoption FAQ | ${SITE.name}`,
    description: `Pricing, adoption process, flight transport, and pedigree certification questions for Maine Coons in Australia, answered.`,
    url: `https://${SITE.domain}/faq/`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Maine Coon Price & Adoption FAQ | ${SITE.name}`,
    description: `Pricing, adoption, health, and transport FAQ.`,
  },
  alternates: {
    canonical: `https://${SITE.domain}/faq/`,
  },
  robots: 'index, follow',
  other: {
    'og:updated_time': new Date().toISOString(),
  },
};

export default function FaqPage() {
  const faqSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ.map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `https://${SITE.domain}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'FAQ',
          item: `https://${SITE.domain}/faq/`,
        },
      ],
    },
  ];

  return (
    <>
      <JsonLd schema={faqSchema} />

      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase">
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Adoption & Care Intelligence</span>
          </div>
          {/* Exactly One H1 */}
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about our Canberra cattery, certified pedigree bloodlines, health warranties, and VIP flight courier delivery across Australia.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="space-y-4">
          {FAQ.map((item, idx) => (
            <div
              key={idx}
              className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-3 hover:border-amber-500/40 transition-colors shadow-lg"
            >
              <h2 className="font-serif text-base sm:text-lg font-bold text-amber-200 flex items-start gap-3">
                <span className="text-amber-400 font-serif text-lg shrink-0">Q.</span>
                <span>{item.question}</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 pl-6 leading-relaxed">
                {item.answer}
              </p>
            </div>
          ))}
        </div>

        {/* Contact Strip */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-amber-950/30 to-slate-900 border border-amber-500/30 text-center space-y-4">
          <h3 className="font-serif text-xl font-bold text-white">Still have questions?</h3>
          <p className="text-xs text-slate-300 max-w-md mx-auto">
            Our Canberra concierge is delighted to assist with pedigree queries, kitten coat genetics, and delivery dates.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              href="/contact/"
              className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs rounded-xl hover:brightness-110 transition-all"
            >
              Submit Cattery Inquiry
            </Link>
            <a
              href={`https://wa.me/${CONTACT.whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-slate-950 border border-slate-700 text-slate-200 hover:text-white text-xs font-semibold rounded-xl transition-all"
            >
              Direct WhatsApp Chat
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
