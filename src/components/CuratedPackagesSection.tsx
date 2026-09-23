import React from 'react';
import { PackageBundle } from '../types';
import { Sparkles, Check, ArrowRight, Shield, Zap, Plus } from 'lucide-react';

interface CuratedPackagesProps {
  packages: PackageBundle[];
  onAddPackageToCart: (pkg: PackageBundle) => void;
  onOpenCart: () => void;
}

export const CuratedPackagesSection: React.FC<CuratedPackagesProps> = ({
  packages,
  onAddPackageToCart,
  onOpenCart,
}) => {
  return (
    <section id="bundles" className="py-16 bg-zinc-950/60 border-y border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800 text-zinc-200 text-xs font-semibold mb-3 border border-zinc-700">
              <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
              <span>Turnkey Gauteng Studio & Stage Solutions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              Curated Production Bundles
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 mt-2 max-w-2xl">
              Pre-packaged rigs bundled with all required flightcases, high-grade Mogami wiring, and surge protection. Built for quick setup and maximum savings.
            </p>
          </div>

          <div className="text-xs text-zinc-400 bg-zinc-900/80 px-4 py-2.5 rounded-xl border border-white/10 self-start md:self-auto">
            <span className="text-white font-semibold">Weekend Special:</span> Friday 14:00 to Monday 11:00 billed at just 1.5 days!
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="rounded-2xl bg-zinc-900/80 border border-white/10 hover:border-zinc-400/50 transition-all flex flex-col overflow-hidden group shadow-lg"
            >
              {/* Package Header & Image Preview */}
              <div className="relative h-56 overflow-hidden bg-zinc-950">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-zinc-100 text-zinc-950 shadow-md">
                    {pkg.badge}
                  </span>
                </div>

                {/* Savings Pill */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Save R{pkg.savings}/day
                  </span>
                </div>

                {/* Rates on Image */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white font-display leading-tight">{pkg.name}</h3>
                    <p className="text-xs text-zinc-300 mt-0.5">{pkg.tagline}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-2xl font-black text-white font-display">
                      R{pkg.dailyRate.toLocaleString()}
                      <span className="text-xs font-normal text-zinc-400"> /day</span>
                    </div>
                    <div className="text-[11px] text-zinc-400">Weekend: R{pkg.weekendRate.toLocaleString()}</div>
                  </div>
                </div>
              </div>

              {/* Package Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {pkg.description}
                  </p>

                  {/* Included Items Checklist */}
                  <div className="mt-5 space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                      Included in this Rig:
                    </div>
                    <ul className="space-y-1.5">
                      {pkg.includedItems.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-zinc-200">
                          <Check className="w-3.5 h-3.5 text-zinc-300 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Highlight Features */}
                  <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap gap-2">
                    {pkg.features.map((feat, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-zinc-800 text-zinc-300 border border-white/5"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                  <div className="text-xs text-zinc-400">
                    <span className="text-zinc-300 font-medium">Target:</span> {pkg.targetAudience}
                  </div>

                  <button
                    id={`add-package-${pkg.id}-btn`}
                    onClick={() => {
                      onAddPackageToCart(pkg);
                      onOpenCart();
                    }}
                    className="px-4 py-2.5 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 font-bold text-xs transition-all shadow-md shadow-white/5 flex items-center gap-1.5 shrink-0 active:scale-95 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Hire This Bundle</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
