import React from 'react';
import { X, ShieldCheck, Box, Zap, MapPin, ArrowRight, Heart, Check, Truck } from 'lucide-react';
import { Equipment } from '../types.ts';

interface GearModalProps {
  item: Equipment | null;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (equipmentId: string) => void;
  onSelectForRental: (item: Equipment) => void;
}

export const GearModal: React.FC<GearModalProps> = ({
  item,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onSelectForRental
}) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-[#181818] border border-[#333333] w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#262626] flex items-center justify-between bg-[#141414]">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-[#E50914] text-white uppercase">
              {item.category}
            </span>
            <span className="text-xs text-[#999999]">{item.brand} • {item.model}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#B3B3B3] hover:text-white hover:bg-[#262626] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scroll Body */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Image Preview */}
            <div className="space-y-3">
              <div className="relative h-64 sm:h-72 rounded-xl overflow-hidden bg-[#0d0d0d] border border-[#262626]">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <button
                    onClick={() => onToggleWishlist(item.id)}
                    className={`p-2.5 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                      isWishlisted
                        ? 'bg-[#E50914] text-white'
                        : 'bg-[#121212]/80 text-[#B3B3B3] hover:text-white'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Gauteng Hub Availability Notice */}
              <div className="p-3 bg-[#121212] rounded-xl border border-[#262626] flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <div className="text-xs">
                  <p className="font-semibold text-white">Stock Status in Gauteng</p>
                  <p className="text-[#B3B3B3]">
                    {item.availableQuantity} of {item.stockQuantity} units calibrated & ready at Midrand Logistics Hub.
                  </p>
                </div>
              </div>
            </div>

            {/* Info & Specs */}
            <div className="flex flex-col justify-between space-y-4">
              <div>
                <h2 className="text-2xl font-display font-bold text-white">{item.name}</h2>
                <p className="text-xs text-[#E50914] font-semibold uppercase mt-0.5 tracking-wider">
                  Authentic Studio & DJ Hardware
                </p>

                <p className="text-sm text-[#CCCCCC] mt-3 leading-relaxed">
                  {item.description}
                </p>

                {/* Bundle Details */}
                {item.bundleDetails && (
                  <div className="mt-4 p-3 bg-[#141414] rounded-xl border border-[#2a2a2a]">
                    <div className="flex items-center gap-2 text-xs font-bold text-white mb-1">
                      <Box className="w-4 h-4 text-[#E50914]" />
                      <span>What's Included in Case:</span>
                    </div>
                    <p className="text-xs text-[#B3B3B3]">
                      {item.bundleDetails}
                    </p>
                  </div>
                )}

                {/* Condition Inspection */}
                <div className="mt-3 flex items-center gap-2 text-xs text-[#B3B3B3]">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Condition: <strong className="text-white">{item.condition}</strong></span>
                </div>
              </div>

              {/* Price Box */}
              <div className="p-4 bg-[#121212] rounded-xl border border-[#262626] mt-4">
                <div className="grid grid-cols-2 gap-4 divide-x divide-[#262626]">
                  <div>
                    <span className="text-[11px] text-[#888888] uppercase block">Daily Rental</span>
                    <span className="text-2xl font-bold font-display text-white">
                      R {item.dailyPriceZar}
                    </span>
                    <span className="text-xs text-[#888888] block">Per 24h cycle</span>
                  </div>

                  <div className="pl-4">
                    <span className="text-[11px] text-[#E50914] uppercase font-bold block">Weekend Package</span>
                    <span className="text-2xl font-bold font-display text-white">
                      R {item.weekendPriceZar}
                    </span>
                    <span className="text-xs text-[#888888] block">Fri 14:00 - Mon 10:00</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-[#222222] flex items-center justify-between text-xs text-[#999999]">
                  <span>Refundable Security Deposit:</span>
                  <span className="font-semibold text-white">R {item.depositZar} (Returned on safe return)</span>
                </div>
              </div>

            </div>

          </div>

          {/* Technical Specifications Table */}
          <div className="pt-4 border-t border-[#262626]">
            <h3 className="text-sm font-bold font-display uppercase tracking-wider text-white mb-3">
              Technical Specifications & Connectors
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {Object.entries(item.specs).map(([key, val]) => (
                <div key={key} className="p-2.5 bg-[#141414] rounded-lg border border-[#222222] flex flex-col">
                  <span className="text-[#888888] text-[11px] uppercase font-semibold">{key}</span>
                  <span className="text-white font-medium mt-0.5">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Gauteng Transit Notice */}
          <div className="p-3.5 bg-gradient-to-r from-[#1f1616] to-[#141414] rounded-xl border border-[#E50914]/30 flex items-center gap-3">
            <Truck className="w-5 h-5 text-[#E50914] shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-white block">Gauteng Express Doorstep Delivery</span>
              <span className="text-[#B3B3B3]">
                Delivery available across Johannesburg, Sandton, Pretoria, Midrand & Centurion within 45-60 mins of dispatch.
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-[#262626] bg-[#141414] flex items-center justify-between gap-4">
          <button
            onClick={() => onToggleWishlist(item.id)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#222222] hover:bg-[#2b2b2b] text-white text-xs font-semibold border border-[#333333] transition-colors cursor-pointer"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'text-[#E50914] fill-current' : ''}`} />
            <span>{isWishlisted ? 'In Gear Cart' : 'Save to Cart'}</span>
          </button>

          <button
            disabled={item.availableQuantity <= 0}
            onClick={() => {
              onClose();
              onSelectForRental(item);
            }}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg cursor-pointer ${
              item.availableQuantity > 0
                ? 'bg-[#E50914] hover:bg-[#FF3333] text-white shadow-[#E50914]/30'
                : 'bg-[#262626] text-[#666666] cursor-not-allowed'
            }`}
          >
            <span>Proceed with Rental</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
