import type { Metadata } from 'next';
import Link from 'next/link';
import { Crown, ShieldCheck, Heart, Award, Sparkles, CheckCircle2, ArrowRight, Plane, MapPin } from 'lucide-react';
import SmartImage from '@/components/SmartImage';
import JsonLd from '@/components/JsonLd';
import { SITE, BRAND, CONTACT } from '@/config/site';

export const metadata: Metadata = {
  title: `About ${SITE.name} | Ethical Pedigree Breeder Heritage`,
  description: `Discover the Canberra heritage of ${SITE.name}. ANCATS registered breeder of purebred European and American Maine Coons with 100% DNA health clearance.`,
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    title: `About ${SITE.name} | Our Heritage & Standards`,
    description: `Discover our ethical breeding standards in Canberra. Cage-free cattery with certified 5-generation pedigree bloodlines.`,
    url: `https://${SITE.domain}/about/`,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1200&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: `${SITE.name} Canberra Nursery`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `About ${SITE.name} | Our Heritage & Standards`,
    description: `Pedigree Maine Coon breeding in Canberra, Australia.`,
    images: ['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1200&auto=format&fit=crop'],
  },
  alternates: {
    canonical: `https://${SITE.domain}/about/`,
  },
  robots: 'index, follow',
  other: {
    'og:updated_time': new Date().toISOString(),
  },
};

export default function AboutPage() {
  const aboutSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: `About ${SITE.name}`,
      description: BRAND.description,
      url: `https://${SITE.domain}/about/`,
      mainEntity: {
        '@type': 'Organization',
        name: SITE.name,
        foundingDate: BRAND.foundingYear,
        foundingLocation: {
          '@type': 'Place',
          name: BRAND.foundingLocation,
        },
        description: BRAND.description,
      },
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
          name: 'About Our Cattery',
          item: `https://${SITE.domain}/about/`,
        },
      ],
    },
  ];

  return (
    <>
      <JsonLd schema={aboutSchema} />

      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase">
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>Founded {BRAND.foundingYear} • Canberra, Australia</span>
          </div>
          {/* Exactly One H1 */}
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Our Heritage, Philosophy & Ethical Breeding Standards
          </h1>
          <p className="text-base text-slate-300 leading-relaxed">
            Cultivating healthy, grand, and exceptionally affectionate Maine Coon companions across Australia through genetic testing, cage-free living, and early sensory enrichment at <strong className="font-extrabold text-amber-300">{SITE.name}</strong>.
          </p>
        </div>

        {/* Founding Story Section (>700 words entity rich) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6 text-slate-300 text-sm leading-relaxed">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              The Genesis of <strong className="font-extrabold text-amber-300">{SITE.name}</strong> in Australia
            </h2>
            <p>
              <strong className="font-bold text-white">{SITE.name}</strong> was founded in {BRAND.foundingYear} in Canberra, Australian Capital Territory, with an unwavering passion for the authentic Maine Coon breed. As long-time admirers of the breed&apos;s distinctive physical stature—its heavy bone structure, square muzzle, lynx ear tips, and flowing water-resistant double coat—we noticed a crucial gap in Australia: many lines lacked certified comprehensive genetic health screening and authentic European heavyweight lineage.
            </p>
            <p>
              We committed ourselves to establishing a world-class breeding program by ethically importing foundation queens and champion studs from renowned European catteries across Germany, Poland, and Russia, alongside historic American lines. Every foundation feline was meticulously screened and certified clear for all known feline genetic anomalies before being introduced into our breeding program.
            </p>
            <p>
              Today, our Canberra cattery stands as an exemplar of ethical companion breeding. We strictly reject commercial kennel or caged setups. Every king, queen, and kitten resides inside our purpose-built, climate-controlled home estate with full access to expansive, secured outdoor sensory catteries filled with eucalyptus climbing trunks, sunlit platforms, and interactive enrichment modules.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 p-2 bg-slate-900 shadow-2xl aspect-[4/3]">
              <SmartImage
                src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1200&auto=format&fit=crop"
                alt={`${SITE.name} Queen resting in Canberra sunlight`}
              />
            </div>
          </div>
        </div>

        {/* The 4 Pillars of Excellence */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-semibold tracking-widest text-amber-400 uppercase">
              Our Uncompromised Principles
            </span>
            <h2 className="font-serif text-3xl font-bold text-white">
              The Four Pillars of Our Breeding Program
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
              <ShieldCheck className="w-8 h-8 text-amber-400" />
              <h3 className="font-serif text-base font-bold text-white">1. Strict DNA Health Testing</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                All breeding parents are screened via international feline genomics laboratories and certified N/N (negative) for HCM (A31P), SMA, PKDef, and Polycystic Kidney Disease (PKD).
              </p>
            </div>

            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
              <Award className="w-8 h-8 text-amber-400" />
              <h3 className="font-serif text-base font-bold text-white">2. Dual Registry Pedigree</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Registered with the Australian National Cats Inc (ANCATS) and The International Cat Association (TICA). Each kitten arrives with an official 5-generation pedigree chart.
              </p>
            </div>

            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
              <Sparkles className="w-8 h-8 text-amber-400" />
              <h3 className="font-serif text-base font-bold text-white">3. Early Bio-Sensor Enrichment</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Kittens benefit from early neurological stimulation between days 3 and 16, resulting in cats that are remarkably calm, confident, dog-friendly, and loving with children.
              </p>
            </div>

            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
              <Plane className="w-8 h-8 text-amber-400" />
              <h3 className="font-serif text-base font-bold text-white">4. VIP Flight Courier Delivery</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                We organize seamless, climate-controlled pet cabin flights to Sydney, Melbourne, Brisbane, Perth, Adelaide, Hobart, and regional airports with continuous live updates.
              </p>
            </div>
          </div>
        </div>

        {/* Milestones Timeline */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 sm:p-12 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-semibold tracking-widest text-amber-400 uppercase">
              Chronicle of Growth
            </span>
            <h2 className="font-serif text-3xl font-bold text-white">
              Key Historical Milestones
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {BRAND.milestones.map((m, idx) => (
              <div key={idx} className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <span className="text-xl font-bold text-amber-300 font-serif block">{m.year}</span>
                <p className="text-xs text-slate-300 leading-relaxed">{m.event}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="p-10 rounded-3xl bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border border-amber-500/30 text-center space-y-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Ready to Welcome a Pedigree Maine Coon into Your Family?
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl mx-auto">
            View our currently available pedigree kittens or schedule a private virtual or in-person cattery viewing at our Canberra estate.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/shop/"
              className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-lg hover:brightness-110 transition-all"
            >
              Browse Available Kittens
            </Link>
            <Link
              href="/contact/"
              className="px-8 py-3.5 bg-slate-950 border border-slate-700 hover:border-amber-400 text-slate-200 font-semibold text-xs rounded-xl transition-all"
            >
              Contact Our Canberra Team
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
