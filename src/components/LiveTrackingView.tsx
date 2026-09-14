import React, { useState, useEffect } from 'react';
import { 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  AlertCircle, 
  Play, 
  Building, 
  RefreshCw, 
  FileText,
  User,
  Radio,
  ExternalLink
} from 'lucide-react';
import { RentalOrder, RentalStatus } from '../types.ts';

interface LiveTrackingViewProps {
  orders: RentalOrder[];
  selectedOrderId?: string;
  onRefreshOrders: () => void;
  onSelectOrder: (orderId: string) => void;
}

const STAGES: { key: RentalStatus; label: string; stepNum: number }[] = [
  { key: 'CONFIRMED', label: 'Order Confirmed', stepNum: 1 },
  { key: 'PREPARING', label: 'Preparing in Gauteng Hub', stepNum: 2 },
  { key: 'OUT_FOR_DELIVERY', label: 'Out for Delivery', stepNum: 3 },
  { key: 'DELIVERED', label: 'Delivered to Studio', stepNum: 4 },
];

export const LiveTrackingView: React.FC<LiveTrackingViewProps> = ({
  orders,
  selectedOrderId,
  onRefreshOrders,
  onSelectOrder
}) => {
  const currentOrder = orders.find(o => o.id === selectedOrderId || o.orderNumber === selectedOrderId) || orders[0];
  const [isAdvancing, setIsAdvancing] = useState(false);
  const [localOrder, setLocalOrder] = useState<RentalOrder | null>(currentOrder || null);

  useEffect(() => {
    if (currentOrder) {
      setLocalOrder(currentOrder);
    }
  }, [currentOrder]);

  if (!localOrder) {
    return (
      <div className="bg-[#181818] rounded-2xl border border-[#262626] p-12 text-center max-w-lg mx-auto space-y-4 my-8">
        <div className="w-16 h-16 rounded-full bg-[#222222] flex items-center justify-center mx-auto text-[#888888]">
          <Truck className="w-8 h-8 text-[#E50914]" />
        </div>
        <h2 className="text-xl font-bold font-display text-white">No Active Rentals Yet</h2>
        <p className="text-xs text-[#B3B3B3]">
          Once you book studio gear, your real-time Gauteng dispatch and driver tracking will appear here.
        </p>
      </div>
    );
  }

  // Advance tracking stage via API
  const handleAdvanceStage = async () => {
    if (!localOrder) return;
    setIsAdvancing(true);

    try {
      const res = await fetch(`/api/rentals/${localOrder.orderNumber}/advance-stage`, {
        method: 'POST'
      });
      const data = await res.json();
      if (data.success && data.order) {
        setLocalOrder(data.order);
        onRefreshOrders();
      }
    } catch (err) {
      console.error('Failed to advance stage:', err);
    } finally {
      setIsAdvancing(false);
    }
  };

  const currentStageIdx = localOrder.currentStageIndex ?? 0;
  const isComplete = localOrder.status === 'DELIVERED';

  return (
    <div className="space-y-6">
      
      {/* Top Header & Switcher */}
      <div className="bg-[#181818] p-5 rounded-2xl border border-[#262626] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-display font-bold text-white">
              Real-Time Equipment Dispatch Tracker
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E50914] text-white flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
              LIVE GAUTENG HUB
            </span>
          </div>
          <p className="text-xs text-[#B3B3B3] mt-1">
            Tracking order <strong className="text-white">{localOrder.orderNumber}</strong> • {localOrder.items.length} gear units en route
          </p>
        </div>

        {/* Order Selector and Live Advance Demo Button */}
        <div className="flex flex-wrap items-center gap-3">
          {orders.length > 1 && (
            <select
              value={localOrder.id}
              onChange={(e) => onSelectOrder(e.target.value)}
              className="bg-[#121212] text-xs text-white px-3 py-2 rounded-xl border border-[#2c2c2c] focus:outline-none focus:border-[#E50914] cursor-pointer"
            >
              {orders.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.orderNumber} ({o.status})
                </option>
              ))}
            </select>
          )}

          <button
            onClick={handleAdvanceStage}
            disabled={isAdvancing || isComplete}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer ${
              isComplete
                ? 'bg-[#222222] text-[#666666] cursor-not-allowed'
                : 'bg-[#E50914] hover:bg-[#FF3333] text-white shadow-[#E50914]/25'
            }`}
            title="Simulate dispatch driver and technician updates in real-time"
          >
            <Play className="w-3.5 h-3.5" />
            <span>{isComplete ? 'Order Delivered' : isAdvancing ? 'Updating...' : 'Advance Next Stage (Test)'}</span>
          </button>
        </div>
      </div>

      {/* Progress Bar & Stages */}
      <div className="bg-[#181818] p-6 rounded-2xl border border-[#262626] shadow-xl space-y-6">
        
        {/* Visual Progress Bar */}
        <div className="relative">
          <div className="overflow-hidden h-2 mb-6 text-xs flex rounded bg-[#262626]">
            <div 
              style={{ width: `${((currentStageIdx + 1) / 4) * 100}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-[#B30006] to-[#E50914] transition-all duration-700"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STAGES.map((s, idx) => {
              const isPassed = idx < currentStageIdx;
              const isCurrent = idx === currentStageIdx;
              return (
                <div 
                  key={s.key}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isCurrent
                      ? 'bg-[#1f1515] border-[#E50914] shadow-md shadow-[#E50914]/10 ring-1 ring-[#E50914]'
                      : isPassed
                      ? 'bg-[#141414] border-[#2a2a2a]'
                      : 'bg-[#121212] border-[#222222] opacity-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      isCurrent
                        ? 'bg-[#E50914] text-white animate-pulse'
                        : isPassed
                        ? 'bg-emerald-500 text-white'
                        : 'bg-[#262626] text-[#666666]'
                    }`}>
                      {isPassed ? <CheckCircle2 className="w-4 h-4" /> : s.stepNum}
                    </span>

                    {isCurrent && (
                      <span className="text-[10px] font-bold text-[#E50914] uppercase tracking-wider">
                        Active Stage
                      </span>
                    )}
                  </div>
                  <p className="font-bold text-white text-xs leading-snug">{s.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Current Stage Highlight Alert */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-[#201515] to-[#161616] border border-[#E50914]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E50914]/20 border border-[#E50914]/40 flex items-center justify-center shrink-0">
              <Radio className="w-5 h-5 text-[#E50914] animate-pulse" />
            </div>
            <div>
              <p className="text-xs text-[#E50914] font-bold uppercase tracking-wider">Current Live Status</p>
              <h3 className="text-base font-bold text-white font-display">
                {localOrder.timeline[currentStageIdx]?.title || 'En Route'}
              </h3>
              <p className="text-xs text-[#B3B3B3]">
                {localOrder.timeline[currentStageIdx]?.description}
              </p>
            </div>
          </div>

          <div className="sm:text-right text-xs bg-[#121212] p-3 rounded-lg border border-[#262626] shrink-0">
            <span className="text-[#888888] block text-[10px] uppercase font-semibold">Estimated Arrival:</span>
            <span className="text-sm font-bold text-white text-emerald-400">
              {localOrder.estimatedDeliveryTime || 'Within 45 mins'}
            </span>
          </div>
        </div>

      </div>

      {/* Main Grid: Logistics Map & Driver Profile */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Gauteng Logistics Route Map Simulation */}
        <div className="lg:col-span-2 bg-[#181818] p-5 sm:p-6 rounded-2xl border border-[#262626] shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#E50914]" />
              <h3 className="text-base font-display font-bold text-white">
                Gauteng Highway Transit Corridor Simulation
              </h3>
            </div>
            <span className="text-[11px] text-[#888888] font-mono">
              Vehicle: {localOrder.vehiclePlate}
            </span>
          </div>

          {/* Interactive Route Diagram */}
          <div className="relative h-64 bg-[#0d0d0d] rounded-xl border border-[#262626] p-4 flex flex-col justify-between overflow-hidden">
            {/* Background grid lines mimicking GPS map */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:24px_24px] opacity-30 pointer-events-none" />

            {/* Gauteng Highway Corridor Line */}
            <div className="relative z-10 flex items-center justify-between h-full px-4 sm:px-8">
              
              {/* Point 1: Pretoria Menlyn Depot */}
              <div className="flex flex-col items-center text-center">
                <div className="w-8 h-8 rounded-full bg-[#222222] border border-[#444444] flex items-center justify-center text-xs font-bold text-white shadow-md">
                  PTA
                </div>
                <span className="text-[10px] font-semibold text-[#888888] mt-1">Pretoria</span>
                <span className="text-[9px] text-[#555555]">Menlyn Depot</span>
              </div>

              {/* Highway Route Line with animated driver vehicle */}
              <div className="flex-1 relative mx-3 h-1 bg-[#2a2a2a] rounded">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#B30006] to-[#E50914] transition-all duration-700"
                  style={{ width: `${Math.min(100, (currentStageIdx / 3) * 100)}%` }}
                />

                {/* Driver Van on Map */}
                <div 
                  className="absolute -top-3.5 -translate-x-1/2 transition-all duration-700 flex flex-col items-center"
                  style={{ left: `${Math.min(95, Math.max(5, (currentStageIdx / 3) * 100))}%` }}
                >
                  <div className="w-8 h-8 rounded-full bg-[#E50914] text-white flex items-center justify-center shadow-lg shadow-[#E50914]/50 border-2 border-white">
                    <Truck className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-bold text-white bg-black/80 px-1 rounded mt-0.5 whitespace-nowrap">
                    Van {localOrder.vehiclePlate}
                  </span>
                </div>
              </div>

              {/* Point 2: Midrand Hub */}
              <div className="flex flex-col items-center text-center">
                <div className="w-8 h-8 rounded-full bg-[#E50914]/20 border border-[#E50914] flex items-center justify-center text-xs font-bold text-[#E50914] shadow-md">
                  HUB
                </div>
                <span className="text-[10px] font-semibold text-white mt-1">Midrand</span>
                <span className="text-[9px] text-[#888888]">Calibration Hub</span>
              </div>

              {/* Second Route Segment */}
              <div className="flex-1 relative mx-3 h-1 bg-[#2a2a2a] rounded">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#B30006] to-[#E50914] transition-all duration-700"
                  style={{ width: `${currentStageIdx >= 2 ? (currentStageIdx === 3 ? 100 : 60) : 0}%` }}
                />
              </div>

              {/* Point 3: Studio Destination */}
              <div className="flex flex-col items-center text-center">
                <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold shadow-md ${
                  currentStageIdx === 3
                    ? 'bg-emerald-500 border-emerald-400 text-white'
                    : 'bg-[#222222] border-[#444444] text-[#B3B3B3]'
                }`}>
                  JHB
                </div>
                <span className="text-[10px] font-semibold text-white mt-1">{localOrder.deliverySuburb}</span>
                <span className="text-[9px] text-[#888888]">Studio Destination</span>
              </div>

            </div>

            {/* Bottom Live GPS Coordinates Bar */}
            <div className="relative z-10 bg-[#141414]/90 backdrop-blur-md px-3 py-2 rounded-lg border border-[#262626] flex items-center justify-between text-[11px] text-[#B3B3B3]">
              <span>Active GPS Corridor: <strong className="text-white">M1 / N1 Highway Gauteng</strong></span>
              <span>Speed: <strong className="text-white">68 km/h</strong> (Temperature: 21°C Climate Regulated)</span>
            </div>
          </div>

          {/* Timeline History Details */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#888888]">
              Dispatch Milestones Timeline
            </h4>
            <div className="space-y-2">
              {localOrder.timeline.map((step, idx) => (
                <div 
                  key={idx} 
                  className={`p-3 rounded-xl border flex items-start gap-3 transition-colors ${
                    step.active
                      ? 'bg-[#1f1515] border-[#E50914]/50'
                      : step.completed
                      ? 'bg-[#141414] border-[#222222]'
                      : 'bg-[#101010] border-[#1c1c1c] opacity-40'
                  }`}
                >
                  <div className="mt-0.5">
                    {step.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : step.active ? (
                      <Clock className="w-4 h-4 text-[#E50914] animate-spin-slow" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-[#444444]" />
                    )}
                  </div>
                  <div className="flex-1 text-xs">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-white">{step.title}</p>
                      <span className="text-[10px] text-[#777777] font-mono">
                        {step.location}
                      </span>
                    </div>
                    <p className="text-[#999999] mt-0.5">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Driver Profile & Gear Manifest */}
        <div className="space-y-6">
          
          {/* Dedicated Driver Box */}
          <div className="bg-[#181818] p-5 rounded-2xl border border-[#262626] shadow-xl space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#888888]">
              Assigned Gauteng Courier Driver
            </h3>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#262626] border border-[#383838] flex items-center justify-center text-lg font-bold text-white">
                SM
              </div>
              <div>
                <h4 className="font-display font-bold text-white text-base">
                  {localOrder.driverName || 'Sipho Mthembu'}
                </h4>
                <p className="text-xs text-[#B3B3B3]">Senior Audio Equipment Courier</p>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Insured • 1,200+ Studio Runs</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-[#121212] rounded-xl border border-[#262626] space-y-2 text-xs">
              <div className="flex justify-between text-[#888888]">
                <span>Vehicle:</span>
                <span className="text-white font-mono">Toyota HiAce ({localOrder.vehiclePlate})</span>
              </div>
              <div className="flex justify-between text-[#888888]">
                <span>Hub Origin:</span>
                <span className="text-white">{localOrder.hubLocation}</span>
              </div>
              <div className="flex justify-between text-[#888888]">
                <span>Direct Contact:</span>
                <a href={`tel:${localOrder.driverPhone}`} className="text-[#E50914] font-semibold hover:underline">
                  {localOrder.driverPhone}
                </a>
              </div>
            </div>

            <a
              href={`tel:${localOrder.driverPhone}`}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#222222] hover:bg-[#2c2c2c] text-white text-xs font-semibold border border-[#333333] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#E50914]" />
              <span>Direct Driver Voice Call</span>
            </a>
          </div>

          {/* Equipment Cargo Manifest */}
          <div className="bg-[#181818] p-5 rounded-2xl border border-[#262626] shadow-xl space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#888888] flex items-center justify-between">
              <span>Cargo Manifest ({localOrder.items.length})</span>
              <span className="text-emerald-400 font-normal">Calibrated</span>
            </h3>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {localOrder.items.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-2 bg-[#121212] rounded-lg border border-[#222222] text-xs">
                  <img
                    src={item.equipment.imageUrl}
                    alt={item.equipment.name}
                    referrerPolicy="no-referrer"
                    className="w-8 h-8 rounded object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-white truncate">{item.equipment.name}</p>
                    <p className="text-[10px] text-[#888888]">{item.equipment.brand} • Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-2.5 bg-[#141414] rounded-lg border border-[#262626] text-[11px] text-[#999999]">
              <p>Delivery Address:</p>
              <p className="text-white font-medium mt-0.5">{localOrder.deliveryAddress}</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
