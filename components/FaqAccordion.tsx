'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  variant?: 'page' | 'compact';
}

export default function FaqAccordion({ items, variant = 'page' }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(prev => (prev === idx ? null : idx));
  };

  const cardBg = variant === 'compact' ? 'bg-slate-950' : 'bg-slate-900';

  return (
    <div className="space-y-4">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        const panelId = `faq-answer-${variant}-${idx}`;
        const buttonId = `faq-question-${variant}-${idx}`;

        return (
          <div
            key={idx}
            className={`${cardBg} border border-slate-800 rounded-2xl shadow-lg hover:border-amber-500/40 transition-colors overflow-hidden`}
          >
            <h3 className="m-0">
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(idx)}
                className="w-full flex items-start justify-between gap-3 text-left p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 rounded-2xl"
              >
                <span className="font-serif text-base sm:text-lg font-bold text-amber-200 flex items-start gap-3">
                  {variant === 'compact' ? (
                    <HelpCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  ) : (
                    <span className="text-amber-400 font-serif text-lg shrink-0">Q.</span>
                  )}
                  <span>{item.question}</span>
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-amber-400 shrink-0 mt-1 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed px-6 pb-6 pl-[3.25rem]">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
