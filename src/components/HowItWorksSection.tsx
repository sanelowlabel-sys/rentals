import React from 'react';
import { 
  CalendarDays, 
  FileCheck2, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface HowItWorksProps {
  onBrowseCatalog: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksProps> = ({ onBrowseCatalog }) => {
  const steps = [
    {
      num: '01',
      title: 'Select Gear & Rental Dates',
      desc: 'Browse our catalog of Pioneer CDJs, Neumann mics, Genelec monitors, and analog synths. Choose daily, weekend special, or weekly rental options.',
      icon: CalendarDays,
      badge: 'Transparent ZAR Rates'
    },
    {
      num: '02',
      title: '5-Minute Verification (FICA)',
      desc: 'First-time renters complete a swift digital verification: valid SA Smart ID / Passport and Proof of Address. Corporate accounts qualify for zero deposit.',
      icon: FileCheck2,
      badge: 'Quick & Secure'
    },
    {
      num: '03',
      title: 'Delivery & Sound Check',
      desc: 'Our logistics crew delivers directly to your Gauteng studio, club, or event. All gear is flightcased, sanitized, pre-wired, and audio-tested on site.',
      icon: Truck,
      badge: 'Same-Day Dispatch'
    },
    {
      num: '04',
      title: 'Return & 24h Deposit Release',
      desc: 'We collect the gear or you drop off at our Wynberg Sandton depot. Following our 15-minute bench check, your security deposit is released back into your bank account within 24h.',
      icon: RotateCcw,
      badge: 'Fast EFT Refund'
    }
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-xs font-semibold text-zinc-300 mb-3">
          <ShieldCheck className="w-3.5 h-3.5 text-zinc-300" />
          <span>Streamlined Gauteng Rental Process</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
          How Gear Rental Works
        </h2>
        <p className="text-sm sm:text-base text-zinc-300 mt-2 leading-relaxed">
          Zero friction, professional protocol. From high-profile festival sets to private vocal tracking sessions, we ensure your audio gear arrives flightcased and stage-ready.
        </p>
      </div>

      {/* Steps Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-zinc-400/50 transition-all flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black text-zinc-300 font-display">
                    {step.num}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-zinc-800 text-zinc-300 border border-white/5">
                    {step.badge}
                  </span>
                </div>

                <div className="w-10 h-10 rounded-xl bg-zinc-800 text-zinc-200 border border-zinc-700/60 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="text-base font-bold text-white font-display mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 text-[11px] text-zinc-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
                <span>Professional standard</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA Box */}
      <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-zinc-900 via-[#161821] to-zinc-900 border border-zinc-700/60 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-sm font-bold text-white font-display">
            Need equipment for a gig or session tonight in Gauteng?
          </div>
          <div className="text-xs text-zinc-300 mt-0.5">
            Emergency technician on call for last-minute dispatch to Sandton, Rosebank, and Pretoria.
          </div>
        </div>

        <button
          onClick={onBrowseCatalog}
          className="px-5 py-2.5 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 font-bold text-xs transition-all shadow-md shadow-white/5 shrink-0 flex items-center gap-2 cursor-pointer"
        >
          <span>Find Available Gear</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
