import React, { useState } from 'react';
import { GAUTENG_ZONES } from '../data/gearData';
import { 
  MapPin, 
  Clock, 
  Truck, 
  Zap, 
  ShieldCheck, 
  Building2, 
  Phone,
  CheckCircle,
  Sparkles
} from 'lucide-react';

export const GautengLogisticsSection: React.FC = () => {
  const [activeZoneId, setActiveZoneId] = useState<string>('sandton_rosebank');

  const activeZone = GAUTENG_ZONES.find(z => z.id === activeZoneId) || GAUTENG_ZONES[0];

  return (
    <section id="logistics" className="py-16 md:py-20 bg-zinc-950/80 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800 text-zinc-200 text-xs font-semibold mb-3 border border-white/10">
            <Truck className="w-3.5 h-3.5" />
            <span>Express Provincial Logistics Fleet</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Strictly Serving Gauteng
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 mt-2 leading-relaxed">
            By operating exclusively within Gauteng, our technicians guarantee rapid dispatch times, professional on-site sound check testing, and immediate equipment swaps if you need extra channels during production.
          </p>
        </div>

        {/* Two-Column Grid: Zone Selector & Zone Detail Box */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Zones List */}
          <div className="lg:col-span-6 space-y-3">
            <div className="flex items-center justify-between pb-2 text-xs font-bold uppercase tracking-wider text-zinc-400">
              <span>Select Delivery Hub / Region</span>
              <span className="text-zinc-300 font-semibold">Flat Rate Transparent Pricing</span>
            </div>

            <div className="space-y-2.5">
              {GAUTENG_ZONES.map((zone) => {
                const isSelected = activeZoneId === zone.id;
                return (
                  <button
                    key={zone.id}
                    id={`zone-selector-${zone.id}`}
                    onClick={() => setActiveZoneId(zone.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between gap-4 cursor-pointer ${
                      isSelected
                        ? 'bg-zinc-900 border-zinc-400/60 shadow-lg shadow-white/5'
                        : 'bg-zinc-900/40 border-white/5 hover:bg-zinc-900/70 hover:border-white/10'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg mt-0.5 ${isSelected ? 'bg-zinc-100 text-zinc-950' : 'bg-zinc-800 text-zinc-400'}`}>
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white font-display">
                          {zone.name}
                        </div>
                        <div className="text-xs text-zinc-400 mt-0.5 line-clamp-1">
                          {zone.area}
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-xs font-semibold text-emerald-400 flex items-center justify-end gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{zone.dispatchTimeMins}</span>
                      </div>
                      <div className="text-xs font-bold text-zinc-300 mt-0.5">
                        {zone.deliveryFee === 0 ? (
                          <span className="text-zinc-200 uppercase font-bold tracking-wider">FREE PICKUP</span>
                        ) : (
                          <span>R{zone.deliveryFee} Flat Fee</span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Zone Details & Studio Depot Information */}
          <div className="lg:col-span-6 space-y-6">
            {/* Active Zone Card */}
            <div className="p-6 rounded-2xl bg-zinc-900/90 border border-white/10 shadow-xl space-y-5">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                    Selected Delivery Corridor
                  </span>
                  <h3 className="text-2xl font-bold text-white font-display mt-0.5">
                    {activeZone.name}
                  </h3>
                </div>
                <div className="px-3 py-1 rounded-full text-xs font-bold bg-zinc-800 text-zinc-200 border border-zinc-700/60">
                  {activeZone.dispatchTimeMins}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/5 space-y-3">
                <div className="text-xs text-zinc-300">
                  <span className="text-zinc-400 font-medium">Coverage Suburbs: </span>
                  {activeZone.area}
                </div>

                <div className="text-xs text-zinc-300">
                  <span className="text-zinc-400 font-medium">Frequent Venue Drops: </span>
                  {activeZone.popularLocations.join(' • ')}
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-zinc-400">Standard Delivery Rate:</span>
                  <span className="text-white font-bold">
                    {activeZone.deliveryFee === 0 ? 'R0.00 (Self-Collection)' : `R${activeZone.deliveryFee}.00`}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl">
                <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>Orders over R2,500 automatically receive 100% Free Delivery in this zone.</span>
              </div>
            </div>

            {/* Load Shedding & Power Protection Banner */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-700/60 shadow-xl space-y-3">
              <div className="flex items-center gap-3 text-zinc-200">
                <div className="p-2 rounded-xl bg-zinc-800 text-zinc-200 border border-zinc-700/60">
                  <Zap className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white font-display">
                  Load-Shedding & Power Surge Guaranteed
                </h4>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed">
                Stage 1 to Stage 6 load cuts will never interrupt your recording session or DJ set. Every order comes with heavy-duty surge-protected distribution powerboards. We also offer portable 1000W Pure Sine Wave battery backup packs capable of running Pioneer CDJ rigs or microphone vocal chains for 4+ hours seamlessly.
              </p>

              <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-zinc-300">
                <span>• Surge Arrestors Included</span>
                <span>• Optional LiFePO4 Inverter Packs</span>
                <span>• 24/7 Power Support</span>
              </div>
            </div>

            {/* Central Depot Location */}
            <div className="p-5 rounded-2xl bg-zinc-900/50 border border-white/5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-zinc-800 text-zinc-300">
                  <Building2 className="w-5 h-5 text-zinc-300" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white font-display">Wynberg Studio Depot</div>
                  <div className="text-xs text-zinc-400">5th Street, Wynberg (5 mins from Sandton City)</div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="text-xs text-zinc-400">Hours: 07:00 – 22:00</div>
                <div className="text-xs font-bold text-zinc-200">Sound-Check Dock 3</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
