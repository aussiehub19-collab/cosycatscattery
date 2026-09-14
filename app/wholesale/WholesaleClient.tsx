'use client';

import { useState } from 'react';
import { Crown, Building2, PackageCheck, Send, CheckCircle2, ShieldCheck, Truck } from 'lucide-react';
import JsonLd from '@/components/JsonLd';
import { SITE, FORMS } from '@/config/site';

export default function WholesaleClient() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    const form = e.currentTarget;
    const key = (form.querySelector('[name="access_key"]') as HTMLInputElement)?.value;

    const thankYouUrl = '/thank-you-wholesale/';

    // Key-pending fallback
    if (!key || key.startsWith('YOUR-') || key === 'pending') {
      window.location.href = thankYouUrl;
      return;
    }

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      const data = await res.json();
      if (res.status === 200 && data.success) {
        window.location.href = thankYouUrl;
      } else {
        throw new Error(data.message || 'Wholesale inquiry submission failed.');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'An error occurred. Please contact us directly via WhatsApp.');
      setLoading(false);
    }
  };

  const schema = {
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
        name: 'Wholesale & B2B Inquiries',
        item: `https://${SITE.domain}/wholesale/`,
      },
    ],
  };

  return (
    <>
      <JsonLd schema={schema} />

      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase">
            <Building2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Commercial & Veterinary Trade Program</span>
          </div>
          {/* Exactly One H1 */}
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Wholesale Timber Castles & Holistic Nutrition Supply
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            We partner with licensed Australian veterinary clinics, luxury feline hotels, boutique pet boutiques, and registered pedigree catteries for bulk timber fixtures and nutrition complexes.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
            <PackageCheck className="w-7 h-7 text-amber-400" />
            <h3 className="font-serif text-base font-bold text-white">Tiered Commercial Pricing</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Volume discounts starting from 5+ units on our Australian hardwood Maine Coon climbing castles and scratching towers.
            </p>
          </div>
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
            <Truck className="w-7 h-7 text-amber-400" />
            <h3 className="font-serif text-base font-bold text-white">Palletized Freight Delivery</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Consolidated commercial freight to commercial loading docks across ACT, NSW, VIC, QLD, WA, SA, and TAS.
            </p>
          </div>
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
            <ShieldCheck className="w-7 h-7 text-amber-400" />
            <h3 className="font-serif text-base font-bold text-white">Commercial Grade Warranty</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              All hardwood structures feature replaceable natural sisal wraps and 5-year structural warranties.
            </p>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
                Register for Wholesale Trade Account
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Please provide your business credentials below. Our commercial desk will review your inquiry within 24 business hours.
              </p>
            </div>

            {errorMsg && (
              <div className="p-4 rounded-xl bg-red-950/80 border border-red-800 text-red-200 text-xs">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="hidden" name="access_key" value={FORMS.web3formsKey || ''} />
              <input type="hidden" name="subject" value={`New Wholesale Inquiry — ${SITE.name}`} />
              <input type="hidden" name="from_name" value={`${SITE.name} Trade`} />
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="wholesale-name" className="text-xs font-semibold text-slate-300">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    id="wholesale-name"
                    name="name"
                    required
                    placeholder="e.g. Dr. Eleanor Vance"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="wholesale-business" className="text-xs font-semibold text-slate-300">
                    Business / Cattery Name *
                  </label>
                  <input
                    type="text"
                    id="wholesale-business"
                    name="business_name"
                    required
                    placeholder="e.g. Royal Paws Feline Hotel"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="wholesale-email" className="text-xs font-semibold text-slate-300">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="wholesale-email"
                    name="email"
                    required
                    placeholder="trade@yourdomain.com.au"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="wholesale-phone" className="text-xs font-semibold text-slate-300">
                    Phone / Mobile *
                  </label>
                  <input
                    type="tel"
                    id="wholesale-phone"
                    name="phone"
                    required
                    placeholder="+61 400 000 000"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="wholesale-abn" className="text-xs font-semibold text-slate-300">
                  Australian Business Number (ABN) or International Registration
                </label>
                <input
                  type="text"
                  id="wholesale-abn"
                  name="abn"
                  placeholder="ABN XX XXX XXX XXX"
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="wholesale-message" className="text-xs font-semibold text-slate-300">
                  Estimated Quantity & Requirements *
                </label>
                <textarea
                  id="wholesale-message"
                  name="message"
                  rows={4}
                  required
                  placeholder="Please specify which timber castles or holistic nutrition items you wish to order in volume..."
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span>Processing Submission...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Wholesale Application</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
