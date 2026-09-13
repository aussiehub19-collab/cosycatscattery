'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X, Phone, ExternalLink, ShieldCheck } from 'lucide-react';
import { SITE, CONTACT } from '@/config/site';
import BrandLogo from '@/components/BrandLogo';

interface NavProps {
  cartCount: number;
  onOpenCart: () => void;
}

export default function Nav({ cartCount, onOpenCart }: NavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cleanAbn = (SITE.abn || '82 418 711 846').replace(/\s+/g, '');

  return (
    <header
      id="site-header"
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/95 backdrop-blur-md border-b border-amber-500/20 shadow-xl shadow-black/40'
          : 'bg-slate-950 border-b border-slate-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            id="nav-logo-link"
            className="flex items-center group focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-lg p-1"
          >
            <BrandLogo size="md" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            id="desktop-main-nav"
            aria-label="Main Navigation"
            className="hidden md:flex items-center space-x-1 lg:space-x-6 text-sm font-medium"
          >
            <Link
              href="/shop/"
              id="nav-link-shop"
              className="text-slate-200 hover:text-amber-400 px-3 py-2 rounded-md transition-colors hover:bg-slate-900"
            >
              Available Kittens & Shop
            </Link>
            <Link
              href="/about/"
              id="nav-link-about"
              className="text-slate-200 hover:text-amber-400 px-3 py-2 rounded-md transition-colors hover:bg-slate-900"
            >
              Heritage & DNA
            </Link>
            <Link
              href="/blog/"
              id="nav-link-blog"
              className="text-slate-200 hover:text-amber-400 px-3 py-2 rounded-md transition-colors hover:bg-slate-900"
            >
              Breed Guides
            </Link>
            <Link
              href="/faq/"
              id="nav-link-faq"
              className="text-slate-200 hover:text-amber-400 px-3 py-2 rounded-md transition-colors hover:bg-slate-900"
            >
              Adoption FAQ
            </Link>
            <Link
              href="/contact/"
              id="nav-link-contact"
              className="text-slate-200 hover:text-amber-400 px-3 py-2 rounded-md transition-colors hover:bg-slate-900"
            >
              Concierge
            </Link>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Link
              href="/search/"
              id="nav-search-button"
              aria-label="Search available kittens and articles"
              className="p-2.5 text-slate-300 hover:text-amber-400 hover:bg-slate-900 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <Search className="w-5 h-5" aria-hidden="true" />
            </Link>

            {/* Cart Trigger */}
            <button
              id="nav-cart-button"
              type="button"
              onClick={onOpenCart}
              aria-label={`Open reservation cart with ${cartCount} items`}
              className="relative p-2.5 text-slate-300 hover:text-amber-400 hover:bg-slate-900 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <ShoppingBag className="w-5 h-5" aria-hidden="true" />
              {cartCount > 0 && (
                <span
                  id="nav-cart-badge"
                  className="absolute top-1 right-1 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse"
                >
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              id="nav-mobile-toggle"
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label="Toggle Navigation Menu"
              className="md:hidden p-2.5 text-slate-300 hover:text-amber-400 hover:bg-slate-900 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              {mobileOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ABN Verification Bar Under Navigation */}
      <div
        id="nav-abn-verification-bar"
        className="bg-slate-900/90 border-t border-slate-800/80 text-[11px] sm:text-xs text-slate-300 py-1.5 px-4"
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Registered Australian Entity
            </span>
            <span className="text-slate-500 hidden sm:inline">•</span>
            <span className="font-mono text-slate-300">
              ABN: <strong className="text-white font-bold">{SITE.abn || '82 418 711 846'}</strong>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`https://abr.business.gov.au/ABN/View?id=${cleanAbn}`}
              target="_blank"
              rel="noopener noreferrer"
              id="nav-abr-verification-link"
              className="inline-flex items-center gap-1 font-semibold text-amber-400 hover:text-amber-300 transition-colors group underline underline-offset-2 decoration-amber-400/50 hover:decoration-amber-300"
              title="Verify Cosy Cats Cattery on Australian Business Register"
            >
              <span>Verify on ABR</span>
              <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <span className="text-slate-700 hidden md:inline">|</span>
            <span className="text-slate-400 hidden md:inline text-[11px]">
              Canberra, ACT
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div
          id="mobile-nav-panel"
          className="md:hidden bg-slate-950 border-b border-amber-500/20 px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-in slide-in-from-top duration-200"
        >
          <Link
            href="/shop/"
            id="mobile-link-shop"
            onClick={() => setMobileOpen(false)}
            className="block text-slate-200 hover:text-amber-300 px-3 py-2.5 rounded-md text-base font-medium hover:bg-slate-900"
          >
            👑 Available Kittens & Shop
          </Link>
          <Link
            href="/about/"
            id="mobile-link-about"
            onClick={() => setMobileOpen(false)}
            className="block text-slate-200 hover:text-amber-300 px-3 py-2.5 rounded-md text-base font-medium hover:bg-slate-900"
          >
            🏛️ Heritage & DNA Standards
          </Link>
          <Link
            href="/blog/"
            id="mobile-link-blog"
            onClick={() => setMobileOpen(false)}
            className="block text-slate-200 hover:text-amber-300 px-3 py-2.5 rounded-md text-base font-medium hover:bg-slate-900"
          >
            📖 Feline Breed Guides
          </Link>
          <Link
            href="/faq/"
            id="mobile-link-faq"
            onClick={() => setMobileOpen(false)}
            className="block text-slate-200 hover:text-amber-300 px-3 py-2.5 rounded-md text-base font-medium hover:bg-slate-900"
          >
            ❓ Adoption & Flight FAQ
          </Link>
          <Link
            href="/contact/"
            id="mobile-link-contact"
            onClick={() => setMobileOpen(false)}
            className="block text-slate-200 hover:text-amber-300 px-3 py-2.5 rounded-md text-base font-medium hover:bg-slate-900"
          >
            💬 Contact Concierge
          </Link>
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-amber-400">
            <span>Canberra Estate Nursery</span>
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" aria-hidden="true" /> +61 2 6100 0000
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
