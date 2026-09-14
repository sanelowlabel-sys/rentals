import React from 'react';
import { Heart, Sparkles, ShieldCheck, ArrowRight, Layers, CheckCircle2, Clock } from 'lucide-react';
import { Equipment } from '../types.ts';

interface GearCardProps {
  item: Equipment;
  isWishlisted: boolean;
  onToggleWishlist: (equipmentId: string) => void;
  onQuickView: (item: Equipment) => void;
  onSelectForRental: (item: Equipment) => void;
}

export const GearCard: React.FC<GearCardProps> = ({
  item,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onSelectForRental,
}) => {
  const isAvailable = item.availableQuantity > 0;

  return (
    <div className="group relative bg-[#181818] rounded-xl border border-[#262626] hover:border-[#E50914]/50 transition-all duration-300 flex flex-col overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-[#E50914]/10">
      
      {/* Image Container */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#0d0d0d]">
        <img
          src={item.imageUrl}
          alt={item.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-black/40" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#121212]/90 backdrop-blur-md text-white border border-[#333333] shadow-md uppercase tracking-wider">
            {item.category}
          </span>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(item.id);
            }}
            aria-label={isWishlisted ? 'Remove from Gear Cart' : 'Save to Gear Cart'}
            className={`pointer-events-auto p-2 rounded-full backdrop-blur-md transition-all cursor-pointer shadow-md ${
              isWishlisted
                ? 'bg-[#E50914] text-white scale-110 shadow-[#E50914]/40'
                : 'bg-[#121212]/80 text-[#B3B3B3] hover:text-white hover:bg-[#121212]'
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Stock Status Indicator */}
        <div className="absolute bottom-3 left-3">
          {isAvailable ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              {item.availableQuantity} in Midrand Hub
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-950/80 text-amber-400 border border-amber-800/60 backdrop-blur-md">
              <Clock className="w-3 h-3" />
              Rented Out (Due Soon)
            </span>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 text-xs text-[#B3B3B3] mb-1">
            <span className="font-semibold uppercase tracking-wider text-[#999999]">{item.brand}</span>
            <span className="truncate max-w-[150px]">{item.model}</span>
          </div>

          <h3 
            onClick={() => onQuickView(item)}
            className="text-lg font-display font-bold text-white group-hover:text-[#E50914] transition-colors cursor-pointer line-clamp-1"
          >
            {item.name}
          </h3>

          <p className="text-xs text-[#B3B3B3] mt-2 line-clamp-2 leading-relaxed">
            {item.description}
          </p>

          {/* Condition / Bundle mini tag */}
          <div className="mt-3 flex items-center gap-2 text-[11px] text-[#999999] bg-[#121212] p-2 rounded-lg border border-[#222222]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate">{item.condition}</span>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="mt-5 pt-4 border-t border-[#262626]">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-[10px] uppercase font-semibold text-[#888888] block">Daily Rate</span>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold font-display text-white">
                  R {item.dailyPriceZar}
                </span>
                <span className="text-xs text-[#B3B3B3]">/ day</span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase font-semibold text-[#E50914] block">Weekend Pass</span>
              <span className="text-sm font-bold text-white">
                R {item.weekendPriceZar}
              </span>
              <span className="text-[10px] text-[#888888] block">Fri-Mon</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onQuickView(item)}
              className="px-3 py-2 rounded-lg bg-[#222222] hover:bg-[#2c2c2c] text-white text-xs font-semibold transition-colors border border-[#333333] cursor-pointer"
            >
              Specs & Box
            </button>

            <button
              type="button"
              disabled={!isAvailable}
              onClick={() => onSelectForRental(item)}
              className={`flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-xs font-bold transition-all shadow-md cursor-pointer ${
                isAvailable
                  ? 'bg-[#E50914] hover:bg-[#FF3333] text-white shadow-[#E50914]/20'
                  : 'bg-[#222222] text-[#666666] cursor-not-allowed'
              }`}
            >
              <span>{isAvailable ? 'Book Gear' : 'Unavailable'}</span>
              {isAvailable && <ArrowRight className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
