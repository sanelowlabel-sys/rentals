import React from 'react';
import { GearItem } from '../types';
import { 
  X, 
  Check, 
  ShieldCheck, 
  Zap, 
  Package, 
  Sliders, 
  Calendar, 
  Plus, 
  Phone,
  Truck
} from 'lucide-react';

interface GearDetailModalProps {
  gear: GearItem | null;
  onClose: () => void;
  onAddToCart: (gear: GearItem) => void;
  onOpenCart: () => void;
}

export const GearDetailModal: React.FC<GearDetailModalProps> = ({
  gear,
  onClose,
  onAddToCart,
  onOpenCart,
}) => {
  if (!gear) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-3xl bg-[#13151b] border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-10 my-8">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#171922]">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-black bg-zinc-100 text-zinc-950">
              {gear.brand}
            </span>
            <span className="text-xs text-zinc-400 font-medium">Model: {gear.model}</span>
          </div>

          <button
            id="close-specs-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scroll Content */}
        <div className="p-6 max-h-[80vh] overflow-y-auto space-y-6">
          {/* Top Hero Preview */}
          <div className="grid md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-6 relative rounded-xl overflow-hidden bg-zinc-950 border border-white/10 h-64">
              <img
                src={gear.image}
                alt={gear.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-zinc-900/90 text-emerald-300 border border-emerald-500/30 backdrop-blur-sm">
                  {gear.inStock ? 'Ready for Gauteng Loadout' : 'Check Availability'}
                </span>
              </div>
            </div>

            <div className="md:col-span-6 space-y-4">
              <div>
                <span className="text-xs text-zinc-300 font-semibold uppercase tracking-wider">
                  {gear.categoryLabel}
                </span>
                <h2 className="text-2xl font-bold text-white font-display mt-0.5 leading-tight">
                  {gear.name}
                </h2>
                <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
                  {gear.description}
                </p>
              </div>

              {/* Rate Box */}
              <div className="p-4 rounded-xl bg-zinc-900 border border-white/10 space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-zinc-400">Daily Hire (24 Hours)</span>
                  <span className="text-2xl font-black text-white font-display">
                    R{gear.dailyRate.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-zinc-300 pt-1 border-t border-white/5">
                  <span>Weekend Special (Fri 14:00 - Mon 11:00)</span>
                  <span className="font-bold text-emerald-400">R{gear.weekendRate.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-zinc-300">
                  <span>Weekly Rate (7 Full Days)</span>
                  <span className="font-bold text-white">R{gear.weeklyRate.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1 border-t border-white/5">
                  <span>Refundable Security Deposit</span>
                  <span className="text-zinc-200 font-medium">R{gear.deposit.toLocaleString()} (Refunded in 24h)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Specifications */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-zinc-300" />
              <span>Key Technical Specifications</span>
            </h4>
            <div className="grid sm:grid-cols-2 gap-2">
              {gear.specs.map((spec, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-zinc-200 bg-zinc-900/60 p-2.5 rounded-lg border border-white/5">
                  <Check className="w-3.5 h-3.5 text-zinc-300 shrink-0 mt-0.5" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Included Road Accessories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-2">
              <Package className="w-4 h-4 text-zinc-300" />
              <span>Accessories Included Free with Rental</span>
            </h4>
            <div className="grid sm:grid-cols-2 gap-2">
              {gear.includedAccessories.map((acc, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-zinc-200 bg-zinc-900/60 p-2.5 rounded-lg border border-white/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  <span>{acc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Power & Ideal Application */}
          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-white/10 text-xs">
              <div className="flex items-center gap-1.5 text-zinc-200 font-semibold mb-1">
                <Zap className="w-4 h-4" />
                <span>Power & Surge Requirements</span>
              </div>
              <p className="text-zinc-300">{gear.powerRequirement}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-white/10 text-xs">
              <div className="flex items-center gap-1.5 text-cyan-400 font-semibold mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Recommended Application</span>
              </div>
              <p className="text-zinc-300">{gear.idealFor}</p>
            </div>
          </div>
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="p-4 sm:p-6 border-t border-white/10 bg-[#171922] flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-zinc-400 flex items-center gap-2">
            <Truck className="w-4 h-4 text-zinc-300 shrink-0" />
            <span>Delivery available anywhere in Gauteng or collect free at Wynberg depot</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="modal-add-to-hire-btn"
              onClick={() => {
                onAddToCart(gear);
                onClose();
                onOpenCart();
              }}
              className="px-5 py-2.5 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 font-bold text-xs transition-all shadow-md shadow-white/5 flex items-center gap-2 active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Add to Hire Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
