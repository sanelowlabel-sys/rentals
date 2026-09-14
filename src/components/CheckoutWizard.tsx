import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  MapPin, 
  CreditCard, 
  Calendar, 
  ShieldCheck, 
  AlertTriangle, 
  Truck, 
  Building, 
  Coins, 
  ArrowRight, 
  ArrowLeft, 
  Lock, 
  Sparkles,
  Disc3
} from 'lucide-react';
import { Equipment, GautengLocationValidation, RentalOrder, User } from '../types.ts';
import { GAUTENG_SUBURBS, GAUTENG_HUBS } from '../data/equipmentData.ts';

interface CheckoutWizardProps {
  selectedItems: { equipment: Equipment; quantity: number }[];
  currentUser: User | null;
  onOrderCompleted: (order: RentalOrder) => void;
  onCancel: () => void;
}

export const CheckoutWizard: React.FC<CheckoutWizardProps> = ({
  selectedItems,
  currentUser,
  onOrderCompleted,
  onCancel,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Step 1: Dates & Package
  const [rentalType, setRentalType] = useState<'daily' | 'weekend'>('daily');
  const [durationDays, setDurationDays] = useState(3);
  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });

  // Step 2: Gauteng Address & Verification
  const [deliveryType, setDeliveryType] = useState<'DELIVERY' | 'HUB_COLLECTION'>('DELIVERY');
  const [selectedHub, setSelectedHub] = useState(GAUTENG_HUBS[0].name);
  const [streetAddress, setStreetAddress] = useState(currentUser?.streetAddress || '42 Oxford Road, Studio 4B');
  const [selectedSuburb, setSelectedSuburb] = useState(currentUser?.suburb || 'Rosebank');
  const [postalCode, setPostalCode] = useState(currentUser?.postalCode || '2196');
  const [city, setCity] = useState(currentUser?.city || 'Johannesburg');
  const [deliveryInstructions, setDeliveryInstructions] = useState('Studio intercom code #402. Call upon arrival.');
  const [validationResult, setValidationResult] = useState<GautengLocationValidation | null>(null);
  const [isValidatingAddress, setIsValidatingAddress] = useState(false);

  // Step 3: Payment
  const [paymentMethod, setPaymentMethod] = useState<'PAYFAST' | 'OZOW' | 'CREDIT_CARD' | 'SNAPSCAN'>('PAYFAST');
  const [applyRewards, setApplyRewards] = useState(true);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8921');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('841');

  // Verify address on mount or when suburb/postal code change
  useEffect(() => {
    validateGautengAddress(selectedSuburb, postalCode, city);
  }, [selectedSuburb, postalCode, city]);

  const validateGautengAddress = async (sub: string, code: string, cty: string) => {
    setIsValidatingAddress(true);
    try {
      const res = await fetch('/api/rentals/validate-address', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ suburb: sub, postalCode: code, city: cty })
      });
      const data = await res.json();
      setValidationResult(data);
    } catch (err) {
      console.error('Validation error:', err);
    } finally {
      setIsValidatingAddress(false);
    }
  };

  // Calculations
  const dailyBaseTotal = selectedItems.reduce((acc, curr) => {
    return acc + curr.equipment.dailyPriceZar * curr.quantity;
  }, 0);

  const weekendBaseTotal = selectedItems.reduce((acc, curr) => {
    return acc + curr.equipment.weekendPriceZar * curr.quantity;
  }, 0);

  const subtotal = rentalType === 'weekend' 
    ? weekendBaseTotal 
    : dailyBaseTotal * durationDays;

  const totalDeposit = selectedItems.reduce((acc, curr) => {
    return acc + curr.equipment.depositZar * curr.quantity;
  }, 0);

  const deliveryFee = deliveryType === 'HUB_COLLECTION' ? 0 : (validationResult?.deliveryFeeZar || 130);

  const availableRewardCredits = currentUser?.rewardCredits || 0;
  const rewardDiscount = applyRewards ? Math.min(availableRewardCredits, 150) : 0;

  const grandTotal = Math.max(0, subtotal + deliveryFee - rewardDiscount + totalDeposit);

  // Submit and create order
  const handleFinalizeBooking = async () => {
    setIsProcessingPayment(true);

    try {
      const payload = {
        items: selectedItems.map(item => ({
          equipmentId: item.equipment.id,
          quantity: item.quantity
        })),
        startDate,
        durationDays: rentalType === 'weekend' ? 3 : durationDays,
        deliveryType,
        deliveryAddress: deliveryType === 'DELIVERY' ? `${streetAddress}, ${selectedSuburb}, ${city}` : `Self Collection at ${selectedHub}`,
        deliverySuburb: selectedSuburb,
        deliveryCity: city,
        deliveryPostalCode: postalCode,
        deliveryInstructions,
        hubLocation: deliveryType === 'HUB_COLLECTION' ? selectedHub : (validationResult?.hubSource || 'Midrand Logistics & Calibration Hub'),
        paymentMethod,
        applyRewards
      };

      const res = await fetch('/api/rentals/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser?.email || 'SanelowLabel@gmail.com'}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (data.success && data.order) {
        setTimeout(() => {
          setIsProcessingPayment(false);
          onOrderCompleted(data.order);
        }, 1200);
      } else {
        setIsProcessingPayment(false);
        alert(data.error || 'Failed to process rental checkout');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setIsProcessingPayment(false);
      alert('An error occurred during booking. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Wizard Step Navigation */}
      <div className="bg-[#181818] p-4 sm:p-5 rounded-2xl border border-[#262626] shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
              step >= 1 ? 'bg-[#E50914] text-white' : 'bg-[#262626] text-[#666666]'
            }`}>
              1
            </span>
            <div className="hidden sm:block">
              <p className="text-xs font-bold text-white">Rental Period</p>
              <p className="text-[11px] text-[#888888]">Dates & Duration</p>
            </div>
          </div>

          <div className={`h-0.5 flex-1 mx-3 ${step >= 2 ? 'bg-[#E50914]' : 'bg-[#262626]'}`} />

          <div className="flex items-center gap-3">
            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
              step >= 2 ? 'bg-[#E50914] text-white' : 'bg-[#262626] text-[#666666]'
            }`}>
              2
            </span>
            <div className="hidden sm:block">
              <p className="text-xs font-bold text-white">Gauteng Verification</p>
              <p className="text-[11px] text-[#888888]">Address & Logistics</p>
            </div>
          </div>

          <div className={`h-0.5 flex-1 mx-3 ${step >= 3 ? 'bg-[#E50914]' : 'bg-[#262626]'}`} />

          <div className="flex items-center gap-3">
            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
              step === 3 ? 'bg-[#E50914] text-white' : 'bg-[#262626] text-[#666666]'
            }`}>
              3
            </span>
            <div className="hidden sm:block">
              <p className="text-xs font-bold text-white">SA Payment</p>
              <p className="text-[11px] text-[#888888]">PayFast / Ozow</p>
            </div>
          </div>
        </div>
      </div>

      {/* STEP 1: Rental Package & Dates */}
      {step === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2 bg-[#181818] p-5 sm:p-6 rounded-2xl border border-[#262626] space-y-6">
            <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#E50914]" />
              <span>Select Rental Package & Dates</span>
            </h2>

            {/* Package Type Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => setRentalType('daily')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  rentalType === 'daily'
                    ? 'bg-[#1f1515] border-[#E50914] ring-1 ring-[#E50914]'
                    : 'bg-[#121212] border-[#2c2c2c] hover:border-[#444444]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-white text-sm">Flexible Daily Rental</span>
                  {rentalType === 'daily' && <CheckCircle2 className="w-4 h-4 text-[#E50914]" />}
                </div>
                <p className="text-xs text-[#B3B3B3]">
                  Choose any custom duration from 1 to 30 days. Full 24-hour cycle.
                </p>
                <p className="text-sm font-bold text-[#E50914] mt-3">
                  R {dailyBaseTotal} / day
                </p>
              </div>

              <div
                onClick={() => setRentalType('weekend')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  rentalType === 'weekend'
                    ? 'bg-[#1f1515] border-[#E50914] ring-1 ring-[#E50914]'
                    : 'bg-[#121212] border-[#2c2c2c] hover:border-[#444444]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-white text-sm">Gauteng Weekend Pass</span>
                  {rentalType === 'weekend' && <CheckCircle2 className="w-4 h-4 text-[#E50914]" />}
                </div>
                <p className="text-xs text-[#B3B3B3]">
                  Friday 14:00 to Monday 10:00. Special discounted gig rate!
                </p>
                <p className="text-sm font-bold text-[#E50914] mt-3">
                  R {weekendBaseTotal} total
                </p>
              </div>
            </div>

            {/* Date Configuration */}
            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#B3B3B3] mb-1.5">
                    Start Date / Delivery Arrival
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#121212] rounded-xl border border-[#2c2c2c] text-sm text-white focus:outline-none focus:border-[#E50914]"
                  />
                </div>

                {rentalType === 'daily' && (
                  <div>
                    <label className="block text-xs font-semibold text-[#B3B3B3] mb-1.5">
                      Rental Duration (Days)
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 5, 7].map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setDurationDays(d)}
                          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                            durationDays === d
                              ? 'bg-[#E50914] text-white'
                              : 'bg-[#121212] text-[#B3B3B3] border border-[#2c2c2c] hover:text-white'
                          }`}
                        >
                          {d}d
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Selected Gear Items review */}
              <div className="pt-4 border-t border-[#262626]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#888888] mb-3">
                  Equipment in this Package ({selectedItems.length})
                </h4>
                <div className="space-y-2">
                  {selectedItems.map(({ equipment, quantity }) => (
                    <div key={equipment.id} className="flex items-center justify-between p-2.5 bg-[#141414] rounded-lg border border-[#222222] text-xs">
                      <div className="flex items-center gap-3">
                        <img 
                          src={equipment.imageUrl} 
                          alt={equipment.name} 
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 rounded object-cover" 
                        />
                        <div>
                          <p className="font-bold text-white">{equipment.name} <span className="text-[#888888]">x{quantity}</span></p>
                          <p className="text-[11px] text-[#888888]">{equipment.brand} • Deposit: R {equipment.depositZar * quantity}</p>
                        </div>
                      </div>
                      <span className="font-semibold text-white">R {equipment.dailyPriceZar * quantity} / day</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-[#262626]">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-xs font-semibold text-[#B3B3B3] hover:text-white cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#E50914] hover:bg-[#FF3333] text-white text-xs font-bold shadow-md shadow-[#E50914]/20 cursor-pointer"
              >
                <span>Continue to Gauteng Delivery</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Summary Sidebar */}
          <SummaryCard 
            subtotal={subtotal}
            deliveryFee={deliveryFee}
            rewardDiscount={rewardDiscount}
            totalDeposit={totalDeposit}
            grandTotal={grandTotal}
            rentalType={rentalType}
            durationDays={durationDays}
          />
        </div>
      )}

      {/* STEP 2: Gauteng Address Compatibility Checker */}
      {step === 2 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2 bg-[#181818] p-5 sm:p-6 rounded-2xl border border-[#262626] space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#E50914]" />
                <span>Gauteng Delivery Address Compatibility</span>
              </h2>
              <span className="text-xs px-2 py-0.5 rounded bg-[#E50914]/20 text-[#E50914] font-bold">
                PROVINCIAL CHECK
              </span>
            </div>

            {/* Delivery Method Choice */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => setDeliveryType('DELIVERY')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  deliveryType === 'DELIVERY'
                    ? 'bg-[#1f1515] border-[#E50914] ring-1 ring-[#E50914]'
                    : 'bg-[#121212] border-[#2c2c2c]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-white text-sm flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-[#E50914]" />
                    Express Doorstep Van Delivery
                  </span>
                  {deliveryType === 'DELIVERY' && <CheckCircle2 className="w-4 h-4 text-[#E50914]" />}
                </div>
                <p className="text-xs text-[#B3B3B3]">
                  Delivered directly to your studio or venue in custom padded flight flight cases.
                </p>
                <p className="text-xs font-semibold text-white mt-2">
                  Delivery Fee: R {validationResult?.deliveryFeeZar || 130}
                </p>
              </div>

              <div
                onClick={() => setDeliveryType('HUB_COLLECTION')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  deliveryType === 'HUB_COLLECTION'
                    ? 'bg-[#1f1515] border-[#E50914] ring-1 ring-[#E50914]'
                    : 'bg-[#121212] border-[#2c2c2c]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-white text-sm flex items-center gap-1.5">
                    <Building className="w-4 h-4 text-[#E50914]" />
                    Direct Hub Collection (Free)
                  </span>
                  {deliveryType === 'HUB_COLLECTION' && <CheckCircle2 className="w-4 h-4 text-[#E50914]" />}
                </div>
                <p className="text-xs text-[#B3B3B3]">
                  Pick up and test on-site at any of our 3 Gauteng logistics centers.
                </p>
                <p className="text-xs font-bold text-emerald-400 mt-2">
                  Free Collection (R0)
                </p>
              </div>
            </div>

            {/* Delivery Inputs */}
            {deliveryType === 'DELIVERY' ? (
              <div className="space-y-4">
                
                {/* Suburb Selector */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#B3B3B3] mb-1.5">
                      Gauteng Suburb / District
                    </label>
                    <select
                      value={selectedSuburb}
                      onChange={(e) => {
                        const sub = e.target.value;
                        setSelectedSuburb(sub);
                        const found = GAUTENG_SUBURBS.find(s => s.name === sub);
                        if (found) {
                          setPostalCode(found.postalCode);
                          setCity(found.city);
                        }
                      }}
                      className="w-full px-3.5 py-2.5 bg-[#121212] rounded-xl border border-[#2c2c2c] text-sm text-white focus:outline-none focus:border-[#E50914]"
                    >
                      {GAUTENG_SUBURBS.map((s) => (
                        <option key={s.name} value={s.name}>
                          {s.name} ({s.city} - {s.postalCode})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#B3B3B3] mb-1.5">
                      South African Postal Code
                    </label>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="e.g. 2196, 2001, 0157"
                      className="w-full px-3.5 py-2.5 bg-[#121212] rounded-xl border border-[#2c2c2c] text-sm text-white focus:outline-none focus:border-[#E50914]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#B3B3B3] mb-1.5">
                    Street Address & Studio / Unit Details
                  </label>
                  <input
                    type="text"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    placeholder="e.g. 42 Oxford Road, Rosebank Studio Complex Unit 4"
                    className="w-full px-3.5 py-2.5 bg-[#121212] rounded-xl border border-[#2c2c2c] text-sm text-white focus:outline-none focus:border-[#E50914]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#B3B3B3] mb-1.5">
                    Gate Access / Studio Buzzing Instructions
                  </label>
                  <input
                    type="text"
                    value={deliveryInstructions}
                    onChange={(e) => setDeliveryInstructions(e.target.value)}
                    placeholder="e.g. Security guard access code, boom gate phone number"
                    className="w-full px-3.5 py-2.5 bg-[#121212] rounded-xl border border-[#2c2c2c] text-sm text-white focus:outline-none focus:border-[#E50914]"
                  />
                </div>

                {/* Validation Status Card */}
                {validationResult && (
                  <div className={`p-4 rounded-xl border text-xs flex items-start gap-3 ${
                    validationResult.valid 
                      ? 'bg-emerald-950/40 border-emerald-800/80 text-emerald-300' 
                      : 'bg-red-950/40 border-red-800/80 text-red-300'
                  }`}>
                    {validationResult.valid ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="font-bold text-sm">
                        {validationResult.valid ? 'Gauteng Address Verified' : 'Regional Delivery Warning'}
                      </p>
                      <p className="mt-0.5 leading-relaxed text-[#CCCCCC]">
                        {validationResult.message}
                      </p>
                      {validationResult.valid && (
                        <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] text-white">
                          <span>Dispatch Hub: <strong>{validationResult.hubSource}</strong></span>
                          <span>•</span>
                          <span>Estimated Transit: <strong>{validationResult.estimatedTransitTime}</strong></span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

              </div>
            ) : (
              /* Hub Collection details */
              <div className="space-y-4">
                <label className="block text-xs font-semibold text-[#B3B3B3] mb-1.5">
                  Select Pickup Depot Hub in Gauteng
                </label>
                <div className="space-y-3">
                  {GAUTENG_HUBS.map((hub) => (
                    <div
                      key={hub.id}
                      onClick={() => setSelectedHub(hub.name)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        selectedHub === hub.name
                          ? 'bg-[#1f1515] border-[#E50914] ring-1 ring-[#E50914]'
                          : 'bg-[#121212] border-[#262626] hover:border-[#383838]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-sm">{hub.name}</span>
                        {selectedHub === hub.name && <CheckCircle2 className="w-4 h-4 text-[#E50914]" />}
                      </div>
                      <p className="text-xs text-[#888888] mt-1">{hub.address}</p>
                      <div className="mt-2 flex items-center justify-between text-[11px] text-[#B3B3B3]">
                        <span>Hours: {hub.hours}</span>
                        <span className="text-white font-mono">{hub.phone}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-[#262626]">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#B3B3B3] hover:text-white cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                disabled={deliveryType === 'DELIVERY' && validationResult && !validationResult.valid}
                onClick={() => setStep(3)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer ${
                  deliveryType === 'DELIVERY' && validationResult && !validationResult.valid
                    ? 'bg-[#222222] text-[#666666] cursor-not-allowed'
                    : 'bg-[#E50914] hover:bg-[#FF3333] text-white shadow-[#E50914]/20'
                }`}
              >
                <span>Proceed to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <SummaryCard 
            subtotal={subtotal}
            deliveryFee={deliveryFee}
            rewardDiscount={rewardDiscount}
            totalDeposit={totalDeposit}
            grandTotal={grandTotal}
            rentalType={rentalType}
            durationDays={durationDays}
          />
        </div>
      )}

      {/* STEP 3: Payment Gateway & Review */}
      {step === 3 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2 bg-[#181818] p-5 sm:p-6 rounded-2xl border border-[#262626] space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#E50914]" />
                <span>South African Secure Payment Gateway</span>
              </h2>
              <span className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-950/40 px-2 py-1 rounded-md border border-emerald-800/50">
                <Lock className="w-3 h-3" />
                256-Bit SSL
              </span>
            </div>

            {/* Payment Method Selector */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: 'PAYFAST', label: 'PayFast SA', sub: 'Instant Credit / Debit' },
                { id: 'OZOW', label: 'Ozow Instant EFT', sub: 'Capitec / FNB / Std Bank' },
                { id: 'CREDIT_CARD', label: 'Visa / Mastercard', sub: '3D Secure' },
                { id: 'SNAPSCAN', label: 'SnapScan / Zapper', sub: 'Mobile QR Scan' }
              ].map((method) => (
                <div
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id as any)}
                  className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                    paymentMethod === method.id
                      ? 'bg-[#1f1515] border-[#E50914] text-white ring-1 ring-[#E50914]'
                      : 'bg-[#121212] border-[#2c2c2c] text-[#888888] hover:border-[#444444]'
                  }`}
                >
                  <p className="text-xs font-bold text-white">{method.label}</p>
                  <p className="text-[10px] text-[#888888] mt-0.5">{method.sub}</p>
                </div>
              ))}
            </div>

            {/* Simulated Card / Gateway Details */}
            <div className="p-4 bg-[#121212] rounded-xl border border-[#262626] space-y-3">
              <div className="flex items-center justify-between text-xs text-[#B3B3B3] mb-2">
                <span>Payment Simulation Gateway</span>
                <span className="text-white font-mono">Currency: ZAR (South African Rand)</span>
              </div>

              {paymentMethod === 'CREDIT_CARD' || paymentMethod === 'PAYFAST' ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] text-[#888888] mb-1">Card Number (Simulated)</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3 py-2 bg-[#181818] rounded-lg border border-[#333333] text-sm text-white font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-[#888888] mb-1">Expiry</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-3 py-2 bg-[#181818] rounded-lg border border-[#333333] text-sm text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#888888] mb-1">CVV</label>
                      <input
                        type="password"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full px-3 py-2 bg-[#181818] rounded-lg border border-[#333333] text-sm text-white font-mono"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-[#141414] rounded-lg text-center space-y-2">
                  <p className="text-xs text-white font-semibold">
                    {paymentMethod === 'OZOW' ? 'Ready for Ozow Instant EFT Verification' : 'SnapScan / Zapper Mobile Payment Simulator'}
                  </p>
                  <p className="text-xs text-[#888888]">
                    Clicking "Confirm & Secure Rental" will simulate an approved instant bank transfer from your South African account.
                  </p>
                </div>
              )}
            </div>

            {/* Loyalty SoundCoins discount checkbox */}
            {availableRewardCredits > 0 && (
              <label className="flex items-center justify-between p-3 bg-[#141414] rounded-xl border border-[#2a2a2a] cursor-pointer hover:border-[#383838]">
                <div className="flex items-center gap-2 text-xs">
                  <input
                    type="checkbox"
                    checked={applyRewards}
                    onChange={(e) => setApplyRewards(e.target.checked)}
                    className="accent-[#E50914] w-4 h-4 rounded cursor-pointer"
                  />
                  <div>
                    <span className="font-bold text-white">Redeem SoundCoins Reward Credits</span>
                    <p className="text-[11px] text-[#888888]">You have R {availableRewardCredits} available. Use R 150 off this booking.</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-amber-400">- R 150</span>
              </label>
            )}

            {/* Final Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-[#262626]">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#B3B3B3] hover:text-white cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                disabled={isProcessingPayment}
                onClick={handleFinalizeBooking}
                className="flex items-center gap-2 px-8 py-3 rounded-xl bg-[#E50914] hover:bg-[#FF3333] text-white text-sm font-bold shadow-lg shadow-[#E50914]/30 transition-all cursor-pointer"
              >
                {isProcessingPayment ? (
                  <>
                    <Disc3 className="w-4 h-4 animate-spin text-white" />
                    <span>Authorizing with PayFast SA...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Authorize & Pay R {grandTotal}</span>
                  </>
                )}
              </button>
            </div>

          </div>

          <SummaryCard 
            subtotal={subtotal}
            deliveryFee={deliveryFee}
            rewardDiscount={rewardDiscount}
            totalDeposit={totalDeposit}
            grandTotal={grandTotal}
            rentalType={rentalType}
            durationDays={durationDays}
          />
        </div>
      )}

    </div>
  );
};

interface SummaryCardProps {
  subtotal: number;
  deliveryFee: number;
  rewardDiscount: number;
  totalDeposit: number;
  grandTotal: number;
  rentalType: 'daily' | 'weekend';
  durationDays: number;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  subtotal,
  deliveryFee,
  rewardDiscount,
  totalDeposit,
  grandTotal,
  rentalType,
  durationDays
}) => {
  return (
    <div className="bg-[#181818] p-5 sm:p-6 rounded-2xl border border-[#262626] h-fit space-y-4 shadow-xl">
      <h3 className="text-base font-display font-bold text-white border-b border-[#262626] pb-3">
        Booking Calculation (ZAR)
      </h3>

      <div className="space-y-2.5 text-xs">
        <div className="flex justify-between text-[#B3B3B3]">
          <span>Package ({rentalType === 'weekend' ? 'Weekend Pass' : `${durationDays} Days`}):</span>
          <span className="font-semibold text-white">R {subtotal}</span>
        </div>

        <div className="flex justify-between text-[#B3B3B3]">
          <span>Gauteng Delivery / Logistics:</span>
          <span className="font-semibold text-white">
            {deliveryFee === 0 ? 'FREE (Hub Pickup)' : `R ${deliveryFee}`}
          </span>
        </div>

        {rewardDiscount > 0 && (
          <div className="flex justify-between text-amber-400">
            <span>SoundCoins Discount:</span>
            <span className="font-semibold">- R {rewardDiscount}</span>
          </div>
        )}

        <div className="flex justify-between text-[#888888] pt-2 border-t border-[#262626]">
          <span>Refundable Deposit:</span>
          <span className="text-white font-medium">R {totalDeposit}</span>
        </div>

        <div className="pt-3 border-t border-[#333333] flex justify-between items-baseline">
          <span className="text-sm font-bold text-white">Total Due Today:</span>
          <span className="text-2xl font-bold font-display text-[#E50914]">
            R {grandTotal}
          </span>
        </div>
      </div>

      <div className="pt-3 text-[11px] text-[#888888] leading-relaxed">
        * Deposits are automatically refunded to your original South African payment method within 24 hours of equipment safe return and diagnostic inspection.
      </div>
    </div>
  );
};
