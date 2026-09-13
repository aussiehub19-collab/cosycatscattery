'use client';

import { useState } from 'react';
import { MessageCircle, X, Phone, Mail, Clock, ShieldCheck } from 'lucide-react';
import { CONTACT, SITE } from '@/config/site';
import BrandLogo from '@/components/BrandLogo';

export default function ChatHub() {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappCleanNumber = CONTACT.whatsapp.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${whatsappCleanNumber}?text=${encodeURIComponent(
    `Hello ${SITE.name} concierge, I would like to enquire about available Maine Coon kittens.`
  )}`;

  return (
    <div id="concierge-chat-hub" className="fixed bottom-6 right-6 z-40">
      {/* Floating Panel */}
      {isOpen && (
        <div
          id="chat-hub-panel"
          className="mb-4 w-80 sm:w-96 bg-slate-950 border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5 duration-200"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 p-4 border-b border-amber-500/20 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BrandLogo size="sm" showText={false} />
              <div>
                <h3 className="font-serif text-sm font-bold text-amber-200">
                  {SITE.name} Concierge
                </h3>
                <p className="text-[11px] text-slate-300 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Canberra Nursery Online
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close concierge hub"
              className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3 text-xs text-slate-300">
            <p className="leading-relaxed text-slate-300">
              Welcome to {SITE.name}. Our dedicated feline concierge is available to assist with pedigree queries, kitten reservations, and interstate flight arrangements.
            </p>

            <div className="space-y-2 pt-1">
              {/* WhatsApp Link Channel */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="chat-whatsapp-link"
                className="flex items-center justify-between p-3 bg-emerald-950/40 border border-emerald-500/30 hover:bg-emerald-950/70 text-emerald-300 rounded-xl font-medium transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <span>VIP WhatsApp Concierge</span>
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full">
                  Instant Reply
                </span>
              </a>

              {/* Phone Channel */}
              <a
                href={`tel:${CONTACT.phone.replace(/\s+/g, '')}`}
                id="chat-phone-link"
                className="flex items-center justify-between p-3 bg-slate-900 border border-slate-800 hover:bg-slate-850 hover:border-amber-500/30 text-slate-200 rounded-xl font-medium transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Call Canberra Nursery</span>
                </div>
                <span className="text-[11px] text-slate-400">{CONTACT.phone}</span>
              </a>

              {/* Email Channel */}
              <a
                href={`mailto:${CONTACT.rawEmail}`}
                id="chat-email-link"
                className="flex items-center justify-between p-3 bg-slate-900 border border-slate-800 hover:bg-slate-850 hover:border-amber-500/30 text-slate-200 rounded-xl font-medium transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-amber-400" />
                  <span>Email Cattery Desk</span>
                </div>
                <span className="text-[11px] text-slate-400">concierge&#64;</span>
              </a>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-500/70" /> {CONTACT.hours}
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-500/70" /> ANCATS Certified
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Trigger Button */}
      <button
        id="chat-hub-toggle-button"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close Concierge Chat Hub' : 'Open Concierge Chat Hub'}
        className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-slate-950 font-bold rounded-full shadow-2xl shadow-amber-500/30 hover:scale-105 hover:brightness-110 active:scale-95 transition-all"
      >
        {isOpen ? (
          <X className="w-5 h-5" aria-hidden="true" />
        ) : (
          <MessageCircle className="w-5 h-5 text-slate-950" aria-hidden="true" />
        )}
        <span className="text-sm tracking-wide hidden sm:inline">Concierge Support</span>
      </button>
    </div>
  );
}
