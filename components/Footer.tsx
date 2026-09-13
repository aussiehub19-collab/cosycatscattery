import Link from 'next/link';
import { ShieldCheck, Heart, Mail, Phone, MapPin, Sparkles } from 'lucide-react';
import { SITE, CONTACT, BRAND, SHOP } from '@/config/site';
import BrandLogo from '@/components/BrandLogo';

export default function Footer() {
  return (
    <footer
      id="site-footer"
      className="bg-slate-950 border-t border-amber-500/20 text-slate-300 pt-16 pb-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="space-y-4">
            <Link href="/" className="inline-block group focus:outline-none">
              <BrandLogo size="md" />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              {BRAND.description}
            </p>
            <div className="flex flex-col gap-1.5 text-xs text-amber-400/90 font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" aria-hidden="true" />
                <span>ANCATS & TICA Pedigree Certified Lineage</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <span>ABN: <strong className="text-slate-200">{SITE.abn || '82 418 711 846'}</strong></span>
                <span>•</span>
                <a
                  href={`https://abr.business.gov.au/ABN/View?id=${(SITE.abn || '82 418 711 846').replace(/\s+/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300 underline underline-offset-2"
                >
                  Verify on ABR ↗
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-white font-serif text-base font-semibold mb-4 tracking-wide text-amber-300">
              Boutique & Catalog
            </h2>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/shop/"
                  id="footer-link-shop"
                  className="hover:text-amber-400 transition-colors"
                >
                  Available Pedigree Kittens
                </Link>
              </li>
              <li>
                <Link
                  href="/about/"
                  id="footer-link-about"
                  className="hover:text-amber-400 transition-colors"
                >
                  Our Canberra Estate & Sire Lineage
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/"
                  id="footer-link-blog"
                  className="hover:text-amber-400 transition-colors"
                >
                  Maine Coon Care & Nutrition Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/faq/"
                  id="footer-link-faq"
                  className="hover:text-amber-400 transition-colors"
                >
                  Interstate Flight & Adoption FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/search/"
                  id="footer-link-search"
                  className="hover:text-amber-400 transition-colors"
                >
                  Search Available Kittens
                </Link>
              </li>
            </ul>
          </div>

          {/* Pedigree & Health Standards */}
          <div>
            <h2 className="text-white font-serif text-base font-semibold mb-4 tracking-wide text-amber-300">
              Health & DNA Standards
            </h2>
            <ul className="space-y-2 text-xs text-slate-400 leading-relaxed">
              <li className="flex items-start gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
                <span>100% Negative Parents for HCM, SMA, PKDef, & PKD genetic markers.</span>
              </li>
              <li className="flex items-start gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
                <span>2-Year Comprehensive Genetic Health Warranty in adoption agreement.</span>
              </li>
              <li className="flex items-start gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
                <span>Microchipped, desexed, dual-vaccinated, and health cleared by feline veterinarians.</span>
              </li>
            </ul>
          </div>

          {/* Contact Concierge */}
          <div className="space-y-3">
            <h2 className="text-white font-serif text-base font-semibold mb-4 tracking-wide text-amber-300">
              Estate Concierge
            </h2>
            <p className="text-xs text-slate-400 flex items-start gap-2">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
              <span>{CONTACT.address}</span>
            </p>
            <p className="text-xs text-slate-400 flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
              <span>{CONTACT.phone}</span>
            </p>
            <p className="text-xs text-slate-400 flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
              <span>
                <a
                  href={`mailto:${CONTACT.rawEmail}`}
                  className="hover:text-amber-400 transition-colors"
                  dangerouslySetInnerHTML={{ __html: CONTACT.email }}
                />
              </span>
            </p>
            <div className="pt-2">
              <span className="text-[11px] text-slate-500 uppercase tracking-wider block mb-1">
                Accepted Australian Payment
              </span>
              <div className="flex gap-2">
                <span className="px-2.5 py-1 bg-slate-900 border border-slate-700 text-amber-200 text-xs rounded font-medium">
                  Australian Bank Transfer (BSB/Account)
                </span>
                <span className="px-2.5 py-1 bg-slate-900 border border-slate-700 text-amber-200 text-xs rounded font-medium">
                  Instant PayID
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved. Registered Ethical Feline Breeder in Canberra, Australia.
          </p>
          <div className="flex items-center space-x-6">
            <Link href="/faq/" className="hover:text-amber-400 transition-colors">
              Adoption Terms
            </Link>
            <Link href="/contact/" className="hover:text-amber-400 transition-colors">
              Health Guarantee Policy
            </Link>
            <Link href="/llms.txt" className="hover:text-amber-400 transition-colors">
              llms.txt
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
