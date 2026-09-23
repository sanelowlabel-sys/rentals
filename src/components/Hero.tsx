import React from 'react';
import { 
  Disc3, 
  Mic2, 
  Speaker, 
  Cpu, 
  Sliders, 
  Truck, 
  ShieldCheck, 
  CheckCircle2, 
  Zap, 
  ArrowRight,
  Sparkles,
  Layers
} from 'lucide-react';
import heroStudioImg from '../assets/images/gauteng_studio_hero_1789487858964.jpg';
import { GearCategory } from '../types';

interface HeroProps {
  onSelectCategory: (category: GearCategory) => void;
  onOpenCart: () => void;
  onScrollToCatalog: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onSelectCategory,
  onOpenCart,
  onScrollToCatalog,
}) => {
  const categories: { id: GearCategory; label: string; icon: React.ElementType; count: string }[] = [
    { id: 'synthesizers', label: 'Synths & Samplers', icon: Sliders, count: 'Korg Volcas, Kaossilator, Akai' },
    { id: 'dj', label: 'DJ Decks & Mixers', icon: Disc3, count: 'Pioneer CDJ-350, Numark, Hybrid' },
    { id: 'monitors', label: 'Studio Monitors', icon: Speaker, count: 'Yamaha HS8, JBL LSR, Pioneer DM-50' },
    { id: 'interfaces', label: 'Interfaces & Outboard', icon: Cpu, count: 'Behringer U-Phoria, Midex 8, DBBox' },
    { id: 'hardware', label: 'Stands & Hardware Bundles', icon: Layers, count: 'Double-X stands, Tripods' },
  ];

  return (
    <section id="hero" className="relative pt-6 pb-16 md:pt-10 md:pb-24 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-zinc-400/5 blur-[130px] -z-10 pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[350px] bg-zinc-500/5 blur-[120px] -z-10 pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid: Headline & Visual Card */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline, Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Territorial Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-700 text-xs font-semibold text-zinc-200">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-300 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <span>Gauteng Province’s Dedicated Gear Fleet</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] font-display">
              Pro Audio & DJ Gear Rental <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">Strictly Serving Gauteng.</span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed">
              Rent industry-standard Pioneer CDJ-3000s, Neumann U87s, Genelec monitors, Moog synths, and powered PA rigs. Pre-tested, flightcased, and delivered same-day to your studio or venue across Johannesburg, Sandton, and Pretoria.
            </p>

            {/* Key Value Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-medium text-zinc-300">
              <div className="flex items-center gap-2 bg-zinc-900/60 border border-white/5 px-3 py-2 rounded-xl">
                <Truck className="w-4 h-4 text-zinc-300 shrink-0" />
                <span>30-55m Express Dispatch</span>
              </div>
              <div className="flex items-center gap-2 bg-zinc-900/60 border border-white/5 px-3 py-2 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Insured & Flightcased</span>
              </div>
              <div className="flex items-center gap-2 bg-zinc-900/60 border border-white/5 px-3 py-2 rounded-xl col-span-2 sm:col-span-1">
                <Zap className="w-4 h-4 text-zinc-300 shrink-0" />
                <span>Surge-Protected Gear</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                id="hero-explore-catalog-btn"
                onClick={onScrollToCatalog}
                className="px-6 py-3.5 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 font-bold text-sm tracking-wide transition-all shadow-lg shadow-white/5 active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <span>Browse Gear Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-calculate-quote-btn"
                onClick={onOpenCart}
                className="px-6 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 font-semibold text-sm transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <span>Build Rental Quote</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-zinc-700/60 bg-zinc-900 shadow-2xl group">
              <img
                src={heroStudioImg}
                alt="Gear Rent Gauteng - Professional Audio Equipment in Johannesburg"
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1013] via-[#0f1013]/40 to-transparent" />

              {/* Overlay Content */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-zinc-950/85 backdrop-blur-md border border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-semibold text-white">Live Gauteng Depot Stock</span>
                  </div>
                  <span className="text-xs font-bold text-zinc-200">Wynberg, Sandton</span>
                </div>
                <p className="text-xs text-zinc-300 mt-1">
                  100% pre-serviced with Mogami cables and heavy-duty flightcases. Ready for immediate load-out.
                </p>
              </div>
            </div>

            {/* Floating Trust Indicator */}
            <div className="absolute -top-4 -right-2 sm:-right-4 bg-zinc-900/95 border border-zinc-700 rounded-xl p-3 shadow-xl backdrop-blur-sm hidden sm:block">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-zinc-800 text-zinc-200 flex items-center justify-center font-bold text-sm border border-zinc-700">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Weekend Special</div>
                  <div className="text-[11px] text-zinc-300">Pay 1.5 days for full Fri-Mon</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Quick Jump Grid */}
        <div className="mt-14 pt-10 border-t border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-display">
              Select Gear Department
            </h2>
            <span className="text-xs text-zinc-400">16 Available Rental Units</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  id={`hero-category-${cat.id}`}
                  onClick={() => {
                    onSelectCategory(cat.id);
                    onScrollToCatalog();
                  }}
                  className="flex flex-col items-start p-3.5 rounded-xl bg-zinc-900/70 hover:bg-zinc-800/90 border border-white/5 hover:border-zinc-400/50 text-left transition-all group cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-zinc-100 text-zinc-400 group-hover:text-zinc-950 flex items-center justify-center mb-2.5 transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-white group-hover:text-zinc-100 transition-colors">
                    {cat.label}
                  </span>
                  <span className="text-[11px] text-zinc-400 truncate mt-0.5 w-full">
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
