import React from 'react';
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck, Zap, Sparkles, AlertCircle } from 'lucide-react';
import { Equipment } from '../types.ts';

interface WishlistViewProps {
  wishlistItems: Equipment[];
  onRemoveItem: (equipmentId: string) => void;
  onProceedToCheckout: (items: { equipment: Equipment; quantity: number }[]) => void;
  onExploreCatalog: () => void;
}

export const WishlistView: React.FC<WishlistViewProps> = ({
  wishlistItems,
  onRemoveItem,
  onProceedToCheckout,
  onExploreCatalog,
}) => {
  const [quantities, setQuantities] = React.useState<Record<string, number>>({});

  const getQty = (id: string) => quantities[id] || 1;

  const handleQtyChange = (id: string, delta: number, max: number) => {
    const current = getQty(id);
    const next = Math.max(1, Math.min(max, current + delta));
    setQuantities(prev => ({ ...prev, [id]: next }));
  };

  const dailySubtotal = wishlistItems.reduce((sum, item) => {
    return sum + item.dailyPriceZar * getQty(item.id);
  }, 0);

  const weekendSubtotal = wishlistItems.reduce((sum, item) => {
    return sum + item.weekendPriceZar * getQty(item.id);
  }, 0);

  const totalDeposit = wishlistItems.reduce((sum, item) => {
    return sum + item.depositZar * getQty(item.id);
  }, 0);

  if (wishlistItems.length === 0) {
    return (
      <div className="bg-[#181818] rounded-2xl border border-[#262626] p-12 text-center max-w-lg mx-auto space-y-4 my-8">
        <div className="w-16 h-16 rounded-2xl bg-[#222222] border border-[#333333] flex items-center justify-center mx-auto text-[#888888]">
          <ShoppingBag className="w-8 h-8 text-[#E50914]" />
        </div>
        <h2 className="text-2xl font-display font-bold text-white">Your Gear Cart is Empty</h2>
        <p className="text-sm text-[#B3B3B3] leading-relaxed">
          Bookmark equipment from our Gauteng catalog to build your custom studio or live DJ production bundle.
        </p>
        <button
          onClick={onExploreCatalog}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#E50914] hover:bg-[#FF3333] text-white text-sm font-bold transition-all shadow-lg shadow-[#E50914]/20 cursor-pointer"
        >
          <span>Explore Gauteng Equipment</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Title & Hub info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#181818] p-5 rounded-2xl border border-[#262626]">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Gear Cart & Saved Items</h1>
          <p className="text-xs text-[#B3B3B3] mt-1">
            Review your selected studio equipment for dispatch across Gauteng Province.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-[#121212] px-3.5 py-2 rounded-xl border border-[#262626] text-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="text-[#B3B3B3]">Hardware Calibration Guaranteed</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Gear Items List */}
        <div className="lg:col-span-2 space-y-3">
          {wishlistItems.map((item) => {
            const qty = getQty(item.id);
            return (
              <div
                key={item.id}
                className="bg-[#181818] rounded-xl border border-[#262626] hover:border-[#383838] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#0d0d0d] border border-[#2a2a2a] shrink-0">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#E50914] uppercase tracking-wider block">
                      {item.brand} • {item.category}
                    </span>
                    <h3 className="text-base font-bold text-white font-display leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#888888] mt-0.5">
                      Condition: {item.condition}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-xs">
                      <span className="text-white font-semibold">R {item.dailyPriceZar}/day</span>
                      <span className="text-[#666666]">|</span>
                      <span className="text-[#B3B3B3]">R {item.weekendPriceZar}/weekend</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-[#262626]">
                  {/* Quantity selector */}
                  <div className="flex items-center gap-2 bg-[#121212] px-2.5 py-1.5 rounded-lg border border-[#2c2c2c]">
                    <button
                      onClick={() => handleQtyChange(item.id, -1, item.availableQuantity)}
                      className="w-6 h-6 rounded flex items-center justify-center text-[#B3B3B3] hover:text-white hover:bg-[#262626] cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold text-white px-1">{qty}</span>
                    <button
                      onClick={() => handleQtyChange(item.id, 1, item.availableQuantity)}
                      className="w-6 h-6 rounded flex items-center justify-center text-[#B3B3B3] hover:text-white hover:bg-[#262626] cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove button */}
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-2 rounded-lg text-[#888888] hover:text-red-400 hover:bg-[#262626] transition-colors cursor-pointer"
                    title="Remove from Cart"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary Box */}
        <div className="bg-[#181818] rounded-2xl border border-[#262626] p-5 sm:p-6 space-y-5 h-fit shadow-xl">
          <h2 className="text-lg font-display font-bold text-white border-b border-[#262626] pb-3">
            Estimated Rental Package
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-[#B3B3B3]">
              <span>Daily Rate Total:</span>
              <span className="font-semibold text-white">R {dailySubtotal} / day</span>
            </div>

            <div className="flex justify-between text-[#B3B3B3]">
              <span>Weekend Pass Rate:</span>
              <span className="font-semibold text-[#E50914]">R {weekendSubtotal}</span>
            </div>

            <div className="flex justify-between text-[#B3B3B3]">
              <span>Estimated Gauteng Courier:</span>
              <span className="font-semibold text-white">R 120</span>
            </div>

            <div className="flex justify-between text-xs text-[#888888] pt-2 border-t border-[#262626]">
              <span>Refundable Deposit:</span>
              <span className="text-white font-medium">R {totalDeposit}</span>
            </div>
          </div>

          <div className="p-3 bg-[#141414] rounded-xl border border-[#2a2a2a] text-xs text-[#B3B3B3] space-y-1">
            <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <Zap className="w-3.5 h-3.5" />
              <span>Gauteng Same-Day Guarantee</span>
            </div>
            <p>
              Orders confirmed by 13:00 are prepared and dispatched to your Johannesburg or Pretoria studio the same afternoon.
            </p>
          </div>

          <button
            onClick={() => {
              const formattedItems = wishlistItems.map(item => ({
                equipment: item,
                quantity: getQty(item.id)
              }));
              onProceedToCheckout(formattedItems);
            }}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#E50914] hover:bg-[#FF3333] text-white font-bold text-sm transition-all shadow-lg shadow-[#E50914]/25 cursor-pointer"
          >
            <span>Proceed to Gauteng Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-[11px] text-[#777777] text-center">
            Zero commitment until address compatibility is verified.
          </p>
        </div>

      </div>

    </div>
  );
};
