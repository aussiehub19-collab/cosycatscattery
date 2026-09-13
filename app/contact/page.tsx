'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, ShieldCheck, Crown } from 'lucide-react';
import JsonLd from '@/components/JsonLd';
import { SITE, CONTACT, FORMS } from '@/config/site';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    const form = e.currentTarget;
    const key = (form.querySelector('[name="access_key"]') as HTMLInputElement)?.value;

    const thankYouUrl = '/thank-you-contact/';

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
        throw new Error(data.message || 'Submission failed.');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'An error occurred. Please contact us via WhatsApp.');
      setLoading(false);
    }
  };

  const contactSchema = {
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
        name: 'Contact Cattery',
        item: `https://${SITE.domain}/contact/`,
      },
    ],
  };

  return (
    <>
      <JsonLd schema={contactSchema} />

      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase">
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>Canberra Private Estate & Concierge Desk</span>
          </div>
          {/* Exactly One H1 */}
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Contact {SITE.name}
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Whether inquiring about upcoming pedigree litters, private nursery visits, or national flight transport, our Canberra concierge is at your service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Info & Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-6">
              <h2 className="font-serif text-xl font-bold text-white border-b border-slate-800 pb-3">
                Cattery Headquarters & Desk
              </h2>

              <div className="space-y-4 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                  <div>
                    <span className="font-bold text-white block">Estate Location</span>
                    <span>{CONTACT.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                  <div>
                    <span className="font-bold text-white block">Concierge Email</span>
                    <span>concierge&#64;{SITE.domain}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                  <div>
                    <span className="font-bold text-white block">Direct Telephone</span>
                    <span>{CONTACT.phone}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                  <div>
                    <span className="font-bold text-white block">Viewing Hours</span>
                    <span>Monday – Sunday: 9:00 AM – 6:00 PM AEST</span>
                    <span className="text-[11px] text-amber-400 block mt-0.5">
                      (Strictly by confirmed appointment for kitten biosecurity)
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <a
                  href={`https://wa.me/${CONTACT.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-emerald-950/80 border border-emerald-700/50 hover:border-emerald-500 text-emerald-300 font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Instant WhatsApp Inquiries</span>
                </a>
              </div>
            </div>

            <div className="p-6 bg-slate-900/50 border border-slate-800/80 rounded-2xl space-y-2 text-xs text-slate-400">
              <span className="font-bold text-amber-300 block">Biosecurity & Estate Visits</span>
              <p className="leading-relaxed">
                To protect unvaccinated newborn kittens from external feline pathogens, estate visits are scheduled following the first 8-week vaccination milestone. Virtual HD video calls are available at any time.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl space-y-6">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
                Send an Adoption or Litter Inquiry
              </h2>

              {errorMsg && (
                <div className="p-4 rounded-xl bg-red-950/80 border border-red-800 text-red-200 text-xs">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="hidden" name="access_key" value={FORMS.web3formsKey || ''} />
                <input type="hidden" name="subject" value={`New Cattery Inquiry — ${SITE.name}`} />
                <input type="hidden" name="from_name" value={`${SITE.name} Website`} />
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="contact-name" className="text-xs font-semibold text-slate-300">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      required
                      placeholder="e.g. Charlotte Montgomery"
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="contact-email" className="text-xs font-semibold text-slate-300">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      required
                      placeholder="charlotte@example.com"
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="contact-phone" className="text-xs font-semibold text-slate-300">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="contact-phone"
                      name="phone"
                      required
                      placeholder="+61 400 000 000"
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="contact-location" className="text-xs font-semibold text-slate-300">
                      Your State / City *
                    </label>
                    <input
                      type="text"
                      id="contact-location"
                      name="location"
                      required
                      placeholder="e.g. Sydney, NSW"
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="contact-interest" className="text-xs font-semibold text-slate-300">
                    Primary Area of Interest
                  </label>
                  <select
                    id="contact-interest"
                    name="interest"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="reserve-kitten">Reserve an Available Pedigree Kitten</option>
                    <option value="upcoming-litter">Inquire About Future Litter Reservations</option>
                    <option value="estate-visit">Schedule Canberra Estate Viewing</option>
                    <option value="timber-furniture">Bespoke Hardwood Cat Castles</option>
                    <option value="general-inquiry">General Breed & Health Inquiry</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label htmlFor="contact-message" className="text-xs font-semibold text-slate-300">
                    Your Message / Household Details *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    placeholder="Tell us about your home environment, experience with giant cat breeds, and any color preferences..."
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span>Sending Inquiry...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Concierge Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
