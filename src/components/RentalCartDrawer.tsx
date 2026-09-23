import React, { useState, useMemo } from 'react';
import { CartItem, GautengDeliveryZone } from '../types';
import { GAUTENG_ZONES } from '../data/gearData';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  Calendar, 
  MapPin, 
  Truck, 
  ShieldCheck, 
  Zap, 
  FileText, 
  Send, 
  Phone,
  Info,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface RentalCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (gearId: string, delta: number) => void;
  onRemoveItem: (gearId: string) => void;
  onClearCart: () => void;
  onOpenQuoteModal: (bookingDetails: any) => void;
}

export const RentalCartDrawer: React.FC<RentalCartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOpenQuoteModal,
}) => {
  // Default dates: tomorrow and day after tomorrow
  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];
  
  const returnDay = new Date();
  returnDay.setDate(returnDay.getDate() + 2);
  const returnDayStr = returnDay.toISOString().split('T')[0];

  const [startDate, setStartDate] = useState<string>(tomorrowStr);
  const [returnDate, setReturnDate] = useState<string>(returnDayStr);
  const [selectedZoneId, setSelectedZoneId] = useState<string>('sandton_rosebank');
  const [deliveryOption, setDeliveryOption] = useState<'delivery' | 'pickup'>('delivery');
  const [includeLoadSheddingPack, setIncludeLoadSheddingPack] = useState<boolean>(true);

  // Customer details
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [venueAddress, setVenueAddress] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');

  // Selected Zone
  const selectedZone = GAUTENG_ZONES.find(z => z.id === selectedZoneId) || GAUTENG_ZONES[0];

  // Calculate rental duration in days
  const rentalDays = useMemo(() => {
    if (!startDate || !returnDate) return 1;
    const start = new Date(startDate);
    const end = new Date(returnDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  }, [startDate, returnDate]);

  // Check if it's weekend (e.g. Friday to Monday, 3 calendar days billed as 1.5 days)
  const isWeekendSpecial = useMemo(() => {
    if (rentalDays === 3) {
      const s = new Date(startDate);
      // 5 is Friday
      if (s.getDay() === 5) return true;
    }
    return false;
  }, [startDate, rentalDays]);

  // Calculate Subtotal for all items based on duration
  const { gearSubtotal, totalDeposit } = useMemo(() => {
    let subtotal = 0;
    let deposit = 0;

    cart.forEach(item => {
      let itemRate = item.gear.dailyRate;
      
      if (isWeekendSpecial) {
        // Weekend special rate
        itemRate = item.gear.weekendRate / 1.5; // normalized
      } else if (rentalDays >= 7) {
        // Weekly discounted rate
        const weeks = Math.floor(rentalDays / 7);
        const extraDays = rentalDays % 7;
        const totalCost = (weeks * item.gear.weeklyRate) + (extraDays * item.gear.dailyRate * 0.75);
        itemRate = totalCost / rentalDays;
      }

      subtotal += itemRate * rentalDays * item.quantity;
      deposit += item.gear.deposit * item.quantity;
    });

    return { 
      gearSubtotal: Math.round(subtotal), 
      totalDeposit: Math.round(deposit) 
    };
  }, [cart, rentalDays, isWeekendSpecial]);

  // Delivery fee logic (Free if subtotal > R2,500 or pickup)
  const deliveryFee = useMemo(() => {
    if (deliveryOption === 'pickup') return 0;
    if (gearSubtotal >= 2500) return 0;
    return selectedZone.deliveryFee;
  }, [deliveryOption, gearSubtotal, selectedZone]);

  const loadSheddingFee = includeLoadSheddingPack ? 180 : 0;
  const grandTotal = gearSubtotal + deliveryFee + loadSheddingFee;

  // Free delivery progress
  const freeDeliveryThreshold = 2500;
  const amountToFreeDelivery = Math.max(0, freeDeliveryThreshold - gearSubtotal);

  // Generate Booking Data Object
  const currentBookingDetails = {
    quoteNumber: `GSG-${Math.floor(100000 + Math.random() * 900000)}`,
    items: cart,
    startDate,
    returnDate,
    totalDays: rentalDays,
    isWeekendSpecial,
    deliveryOption,
    zone: selectedZone,
    venueAddress: deliveryOption === 'pickup' ? 'Wynberg Depot Self-Collection' : (venueAddress || selectedZone.name),
    customerName: customerName || 'Client Name',
    customerPhone: customerPhone || '+27',
    customerEmail: customerEmail || 'client@example.co.za',
    idNumber: idNumber || 'Pending Verification',
    specialNotes,
    gearSubtotal,
    deliveryFee,
    includeLoadSheddingPack,
    loadSheddingFee,
    totalDeposit,
    grandTotal,
  };

  // WhatsApp Booking Link generator
  const handleWhatsAppBooking = () => {
    const itemsList = cart
      .map(c => `• ${c.quantity}x ${c.gear.name} (R${c.gear.dailyRate}/day)`)
      .join('%0A');

    const message = `*GAUTENG STUDIO GEAR HIRE REQUEST*%0A` +
      `*Quote Ref:* ${currentBookingDetails.quoteNumber}%0A%0A` +
      `*Client:* ${customerName || 'Pending'}%0A` +
      `*Phone:* ${customerPhone || 'Pending'}%0A` +
      `*SA ID / Passport:* ${idNumber || 'Pending'}%0A%0A` +
      `*Rental Dates:* ${startDate} to ${returnDate} (${rentalDays} Days${isWeekendSpecial ? ' - Weekend Special Rate' : ''})%0A` +
      `*Delivery Area:* ${deliveryOption === 'pickup' ? 'Depot Collection (Wynberg)' : selectedZone.name}%0A` +
      `*Venue Address:* ${venueAddress || 'To be specified'}%0A%0A` +
      `*Equipment Selected:*%0A${itemsList}%0A%0A` +
      `*Estimated Subtotal:* R${gearSubtotal.toLocaleString()}%0A` +
      `*Delivery Fee:* R${deliveryFee.toLocaleString()}%0A` +
      `*Load Shedding Pack:* ${includeLoadSheddingPack ? 'Yes (+R180)' : 'No'}%0A` +
      `*Total Hire Amount:* R${grandTotal.toLocaleString()}%0A` +
      `*Refundable Security Deposit:* R${totalDeposit.toLocaleString()}%0A%0A` +
      `*Special Notes:* ${specialNotes || 'None'}`;

    window.open(`https://wa.me/27118874920?text=${message}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-xl bg-[#12141a] border-l border-white/10 shadow-2xl h-full flex flex-col z-10 overflow-hidden">
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 bg-[#161821] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-zinc-800 text-zinc-200 border border-zinc-700/60 flex items-center justify-center font-bold">
              {cart.reduce((s, i) => s + i.quantity, 0)}
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-display">Gauteng Hire & Quote Cart</h2>
              <p className="text-[11px] text-zinc-400">Strictly Greater Johannesburg & Pretoria</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                id="clear-cart-btn"
                onClick={onClearCart}
                className="text-[11px] text-zinc-400 hover:text-rose-400 transition-colors px-2 py-1 cursor-pointer"
              >
                Clear
              </button>
            )}
            <button
              id="close-cart-drawer-btn"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Empty State */}
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-12 h-12 rounded-full bg-zinc-800/80 text-zinc-500 flex items-center justify-center mx-auto">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">Your hire cart is currently empty</h3>
              <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                Browse our CDJs, microphones, studio monitors, and synth catalog to add gear to your booking.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-4 py-2 bg-zinc-100 text-zinc-950 text-xs font-bold rounded-xl hover:bg-white transition-colors cursor-pointer"
              >
                Explore Gear Catalog
              </button>
            </div>
          ) : (
            <>
              {/* Free Delivery Banner Progress */}
              <div className="p-3.5 rounded-xl bg-zinc-900 border border-white/5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-300 font-medium">Free Gauteng Delivery</span>
                  {amountToFreeDelivery === 0 ? (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Unlocked! (Free Dispatch)</span>
                    </span>
                  ) : (
                    <span className="text-zinc-200 font-semibold">
                      Add R{amountToFreeDelivery.toLocaleString()} for Free Delivery
                    </span>
                  )}
                </div>
                <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-zinc-400 to-emerald-400 transition-all duration-500"
                    style={{ width: `${Math.min(100, (gearSubtotal / freeDeliveryThreshold) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Selected Equipment ({cart.length} Models)
                </div>

                {cart.map(({ gear, quantity }) => (
                  <div
                    key={gear.id}
                    className="p-3 rounded-xl bg-zinc-900/90 border border-white/5 flex items-center gap-3"
                  >
                    <img
                      src={gear.image}
                      alt={gear.name}
                      className="w-16 h-16 rounded-lg object-cover bg-zinc-950 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] text-zinc-400 font-semibold uppercase">{gear.brand}</div>
                      <h4 className="text-xs font-bold text-white truncate">{gear.name}</h4>
                      <div className="text-xs text-zinc-400 mt-0.5">
                        R{gear.dailyRate.toLocaleString()} <span className="text-[10px]">/day</span>
                      </div>
                    </div>

                    {/* Quantity Adjustment */}
                    <div className="flex items-center gap-1.5 bg-zinc-950 px-2 py-1 rounded-lg border border-white/5">
                      <button
                        onClick={() => onUpdateQuantity(gear.id, -1)}
                        className="p-1 text-zinc-400 hover:text-white cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-white px-1">{quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(gear.id, 1)}
                        className="p-1 text-zinc-400 hover:text-white cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => onRemoveItem(gear.id)}
                      className="p-2 text-zinc-500 hover:text-rose-400 transition-colors cursor-pointer"
                      title="Remove Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Rental Dates Picker */}
              <div className="p-4 rounded-xl bg-zinc-900/90 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-zinc-300" />
                    <span>Rental Schedule</span>
                  </div>
                  <span className="text-xs font-bold text-zinc-200">
                    {rentalDays} {rentalDays === 1 ? 'Day' : 'Days'} Total
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-zinc-400 mb-1">Pick Up / Start Date</label>
                    <input
                      type="date"
                      min={todayStr}
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full bg-zinc-950 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:border-zinc-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-zinc-400 mb-1">Return Date</label>
                    <input
                      type="date"
                      min={startDate}
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full bg-zinc-950 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:border-zinc-400 focus:outline-none"
                    />
                  </div>
                </div>

                {isWeekendSpecial && (
                  <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Weekend Special automatically applied! (Billed at 1.5x daily rate).</span>
                  </div>
                )}
              </div>

              {/* Delivery & Logistics Options */}
              <div className="p-4 rounded-xl bg-zinc-900/90 border border-white/10 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-zinc-300" />
                  <span>Delivery & Handover in Gauteng</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setDeliveryOption('delivery')}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      deliveryOption === 'delivery'
                        ? 'bg-zinc-100 text-zinc-950 shadow-md font-bold'
                        : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    }`}
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>Direct Delivery</span>
                  </button>

                  <button
                    onClick={() => setDeliveryOption('pickup')}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      deliveryOption === 'pickup'
                        ? 'bg-zinc-100 text-zinc-950 shadow-md font-bold'
                        : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Wynberg Depot (Free)</span>
                  </button>
                </div>

                {deliveryOption === 'delivery' && (
                  <div className="space-y-2 pt-1">
                    <label className="block text-[11px] text-zinc-400">Select Delivery Region</label>
                    <select
                      value={selectedZoneId}
                      onChange={(e) => setSelectedZoneId(e.target.value)}
                      className="w-full bg-zinc-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-zinc-400 focus:outline-none cursor-pointer"
                    >
                      {GAUTENG_ZONES.map((zone) => (
                        <option key={zone.id} value={zone.id}>
                          {zone.name} ({zone.dispatchTimeMins}) - {zone.deliveryFee === 0 ? 'Free' : `R${zone.deliveryFee}`}
                        </option>
                      ))}
                    </select>

                    <input
                      type="text"
                      placeholder="Venue / Studio Physical Address in Gauteng"
                      value={venueAddress}
                      onChange={(e) => setVenueAddress(e.target.value)}
                      className="w-full bg-zinc-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-zinc-400 focus:outline-none"
                    />
                  </div>
                )}
              </div>

              {/* Load Shedding Pack Option */}
              <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-white/10 flex items-center justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 rounded-lg bg-zinc-800 text-zinc-300 border border-zinc-700/60 mt-0.5">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Load Shedding Power Pack (+R180)</div>
                    <div className="text-[11px] text-zinc-400">
                      Surge-protected distribution board + portable sine-wave battery backup
                    </div>
                  </div>
                </div>

                <input
                  type="checkbox"
                  checked={includeLoadSheddingPack}
                  onChange={(e) => setIncludeLoadSheddingPack(e.target.checked)}
                  className="rounded bg-zinc-800 border-zinc-700 text-zinc-200 focus:ring-0 w-4 h-4 accent-zinc-200 cursor-pointer"
                />
              </div>

              {/* Renter Contact & SA Verification Info */}
              <div className="p-4 rounded-xl bg-zinc-900/90 border border-white/10 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Renter & Verification Details</span>
                </div>

                <div className="grid sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Full Name / Artist Name *"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="bg-zinc-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-zinc-400 focus:outline-none"
                  />

                  <input
                    type="tel"
                    placeholder="Cell / WhatsApp Number *"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="bg-zinc-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-zinc-400 focus:outline-none"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-2">
                  <input
                    type="email"
                    placeholder="Email Address (for Tax Quote)"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="bg-zinc-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-zinc-400 focus:outline-none"
                  />

                  <input
                    type="text"
                    placeholder="SA ID or Passport Number"
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                    className="bg-zinc-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-zinc-400 focus:outline-none"
                  />
                </div>

                <textarea
                  rows={2}
                  placeholder="Special technical requests (e.g., extra long XLR cables, laptop stand, boom arm height)..."
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  className="w-full bg-zinc-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-zinc-400 focus:outline-none resize-none"
                />
              </div>

              {/* Price Calculation Summary */}
              <div className="p-4 rounded-xl bg-zinc-950 border border-white/10 space-y-2.5 text-xs">
                <div className="flex items-center justify-between text-zinc-300">
                  <span>Equipment Rental ({rentalDays} Days):</span>
                  <span className="font-bold text-white">R{gearSubtotal.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between text-zinc-300">
                  <span>Gauteng Delivery & Sound Check:</span>
                  <span className={deliveryFee === 0 ? 'text-emerald-400 font-bold' : 'text-white font-bold'}>
                    {deliveryFee === 0 ? 'FREE' : `R${deliveryFee.toLocaleString()}`}
                  </span>
                </div>

                {includeLoadSheddingPack && (
                  <div className="flex items-center justify-between text-zinc-300">
                    <span>Surge & Battery Inverter Pack:</span>
                    <span className="font-bold text-white">R{loadSheddingFee}</span>
                  </div>
                )}

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-sm">
                  <span className="font-bold text-white">Total Rental Amount:</span>
                  <span className="text-xl font-black text-white font-display">
                    R{grandTotal.toLocaleString()}
                  </span>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-400">
                  <span>Refundable Security Deposit:</span>
                  <span className="text-zinc-200 font-medium">R{totalDeposit.toLocaleString()} (Refunded in 24h)</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Bottom Actions Bar */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-white/10 bg-[#161821] space-y-2.5">
            <button
              id="whatsapp-booking-btn"
              onClick={handleWhatsAppBooking}
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Confirm & Book via WhatsApp</span>
            </button>

            <button
              id="generate-tax-quote-btn"
              onClick={() => onOpenQuoteModal(currentBookingDetails)}
              className="w-full py-2.5 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-zinc-300" />
              <span>View / Download Official Tax Quote Sheet</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
