import React, { useState } from 'react';
import { FREQUENT_QUESTIONS, CUSTOMER_TESTIMONIALS } from '../data/gearData';
import { ChevronDown, HelpCircle, Star, Quote, MessageSquare } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Testimonials */}
      <div className="mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-xs font-semibold text-zinc-300 mb-3">
            <Star className="w-3.5 h-3.5 text-zinc-300 fill-zinc-300" />
            <span>Trusted Across Gauteng’s Music Scene</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Producer & DJ Feedback
          </h2>
          <p className="text-sm text-zinc-400 mt-2">
            Trusted by Amapiano hitmakers, Sandton event sound designers, and commercial voice directors.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {CUSTOMER_TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10 flex flex-col justify-between space-y-4 relative group hover:border-zinc-400/40 transition-all shadow-lg"
            >
              <div className="space-y-3">
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-zinc-200">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-zinc-200 text-zinc-200" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white font-display">{t.name}</div>
                  <div className="text-xs text-zinc-400 font-medium">{t.role}</div>
                </div>
                <span className="text-[11px] text-zinc-500">{t.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-xs font-semibold text-zinc-300 mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-zinc-300" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight font-display">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-zinc-400 mt-2">
            Everything you need to know regarding Gauteng rentals, deposits, and delivery.
          </p>
        </div>

        <div className="space-y-3">
          {FREQUENT_QUESTIONS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-xl bg-zinc-900/70 border border-white/10 overflow-hidden transition-all"
              >
                <button
                  id={`faq-accordion-toggle-${idx}`}
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold text-white font-display">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-white' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-white/5 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
