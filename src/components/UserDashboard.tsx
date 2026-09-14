import React from 'react';
import { 
  Package, 
  Truck, 
  Coins, 
  Heart, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  ExternalLink,
  MapPin,
  Building2,
  RefreshCw,
  Sliders,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { RentalOrder, User } from '../types.ts';
import { GAUTENG_HUBS } from '../data/equipmentData.ts';

interface UserDashboardProps {
  currentUser: User | null;
  orders: RentalOrder[];
  wishlistCount: number;
  onTrackOrder: (orderId: string) => void;
  onExploreCatalog: () => void;
  onOpenHubsModal: () => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  currentUser,
  orders,
  wishlistCount,
  onTrackOrder,
  onExploreCatalog,
  onOpenHubsModal
}) => {
  const activeOrders = orders.filter(o => ['CONFIRMED', 'PREPARING', 'OUT_FOR_DELIVERY'].includes(o.status));
  const pastOrders = orders.filter(o => ['DELIVERED', 'RETURNED'].includes(o.status));

  return (
    <div className="space-y-8">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#181818] via-[#201515] to-[#181818] p-6 sm:p-8 rounded-2xl border border-[#262626] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#E50914] text-white uppercase tracking-wider">
              Gauteng Verified Studio Account
            </span>
            <span className="text-xs text-[#888888]">• {currentUser?.city || 'Johannesburg'} Regional Member</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">
            Welcome back, {currentUser?.fullName || 'Studio Producer'}
          </h1>
          <p className="text-sm text-[#B3B3B3] mt-1 max-w-2xl leading-relaxed">
            Manage your active gear reservations, live Gauteng courier dispatches, and accumulated SoundCoins loyalty credits.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onExploreCatalog}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E50914] hover:bg-[#FF3333] text-white text-xs font-bold transition-all shadow-lg shadow-[#E50914]/25 cursor-pointer"
          >
            <Sliders className="w-4 h-4" />
            <span>Rent More Gear</span>
          </button>
        </div>
      </div>

      {/* Real-Time Metrics Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Active Deliveries */}
        <div className="bg-[#181818] p-5 rounded-2xl border border-[#262626] shadow-md hover:border-[#E50914]/40 transition-colors">
          <div className="flex items-center justify-between text-xs text-[#888888] mb-3">
            <span className="font-semibold uppercase tracking-wider">Active Rentals</span>
            <div className="w-8 h-8 rounded-lg bg-[#E50914]/15 text-[#E50914] flex items-center justify-center">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-display font-bold text-white">
            {activeOrders.length}
          </p>
          <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            En route in Gauteng
          </p>
        </div>

        {/* Total Rentals */}
        <div className="bg-[#181818] p-5 rounded-2xl border border-[#262626] shadow-md hover:border-[#E50914]/40 transition-colors">
          <div className="flex items-center justify-between text-xs text-[#888888] mb-3">
            <span className="font-semibold uppercase tracking-wider">Total Orders</span>
            <div className="w-8 h-8 rounded-lg bg-[#262626] text-[#B3B3B3] flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-display font-bold text-white">
            {orders.length}
          </p>
          <p className="text-xs text-[#888888] mt-1">
            Lifetime bookings
          </p>
        </div>

        {/* SoundCoins Loyalty Credits */}
        <div className="bg-[#181818] p-5 rounded-2xl border border-[#262626] shadow-md hover:border-[#E50914]/40 transition-colors">
          <div className="flex items-center justify-between text-xs text-[#888888] mb-3">
            <span className="font-semibold uppercase tracking-wider">Reward Credits</span>
            <div className="w-8 h-8 rounded-lg bg-amber-950/60 text-amber-400 flex items-center justify-center">
              <Coins className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <p className="text-3xl font-display font-bold text-amber-400">
              R {(currentUser?.rewardCredits || 0).toFixed(0)}
            </p>
          </div>
          <p className="text-xs text-[#888888] mt-1">
            Redeemable on next booking
          </p>
        </div>

        {/* Wishlist Items */}
        <div className="bg-[#181818] p-5 rounded-2xl border border-[#262626] shadow-md hover:border-[#E50914]/40 transition-colors">
          <div className="flex items-center justify-between text-xs text-[#888888] mb-3">
            <span className="font-semibold uppercase tracking-wider">Saved in Cart</span>
            <div className="w-8 h-8 rounded-lg bg-[#262626] text-pink-400 flex items-center justify-center">
              <Heart className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-display font-bold text-white">
            {wishlistCount}
          </p>
          <p className="text-xs text-[#888888] mt-1">
            Bookmarked equipment
          </p>
        </div>

      </div>

      {/* Active Rentals Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#E50914]" />
            <span>Active Gauteng Rentals</span>
          </h2>
          <span className="text-xs text-[#888888]">
            Real-time GPS updates from Midrand & Sandton hubs
          </span>
        </div>

        {activeOrders.length > 0 ? (
          <div className="space-y-4">
            {activeOrders.map((order) => (
              <div 
                key={order.id} 
                className="bg-[#181818] p-5 sm:p-6 rounded-2xl border border-[#262626] hover:border-[#E50914]/40 transition-all shadow-xl space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#262626] pb-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-display font-bold text-lg text-white">
                        {order.orderNumber}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#E50914] text-white">
                        {order.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <p className="text-xs text-[#888888] mt-1">
                      Booked on {new Date(order.createdAt).toLocaleDateString()} • {order.items.length} items
                    </p>
                  </div>

                  <button
                    onClick={() => onTrackOrder(order.id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#222222] hover:bg-[#E50914] text-white text-xs font-bold transition-all border border-[#333333] hover:border-[#E50914] cursor-pointer"
                  >
                    <span>View Live GPS & Driver</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Items in this order */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="p-3 bg-[#141414] rounded-xl border border-[#222222] flex items-center gap-3 text-xs">
                      <img
                        src={item.equipment.imageUrl}
                        alt={item.equipment.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="min-w-0">
                        <p className="font-bold text-white truncate">{item.equipment.name}</p>
                        <p className="text-[11px] text-[#888888]">{item.equipment.brand} • Qty: {item.quantity}</p>
                        <p className="text-[11px] text-[#E50914] font-semibold">R {item.totalPriceZar} total</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Destination & Driver bar */}
                <div className="bg-[#121212] p-3 rounded-xl border border-[#262626] flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#B3B3B3] gap-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#E50914] shrink-0" />
                    <span>Destination: <strong className="text-white">{order.deliveryAddress}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Driver: <strong className="text-white">{order.driverName} ({order.vehiclePlate})</strong></span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#181818] p-8 rounded-2xl border border-[#262626] text-center text-xs text-[#888888]">
            No active orders in transit. Browse the equipment catalog to reserve audio gear.
          </div>
        )}
      </div>

      {/* Past Rentals History */}
      <div className="space-y-4">
        <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
          <Clock className="w-5 h-5 text-[#888888]" />
          <span>Past Rental Archive</span>
        </h2>

        {pastOrders.length > 0 ? (
          <div className="bg-[#181818] rounded-2xl border border-[#262626] overflow-hidden">
            <div className="divide-y divide-[#262626]">
              {pastOrders.map((order) => (
                <div key={order.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-white text-sm">{order.orderNumber}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                        {order.status}
                      </span>
                    </div>
                    <p className="text-xs text-[#888888] mt-1">
                      {order.items.map(i => i.equipment.name).join(', ')} • R {order.totalZar}
                    </p>
                  </div>

                  <button
                    onClick={() => onTrackOrder(order.id)}
                    className="px-3 py-1.5 rounded-lg bg-[#222222] hover:bg-[#2c2c2c] text-white text-xs font-semibold border border-[#333333] cursor-pointer"
                  >
                    View Receipt & Checklist
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-[#181818] p-8 rounded-2xl border border-[#262626] text-center text-xs text-[#888888]">
            Your completed rental history will be archived here.
          </div>
        )}
      </div>

      {/* Gauteng Hub Directory */}
      <div className="bg-[#181818] p-6 rounded-2xl border border-[#262626] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#E50914]" />
              <span>Gauteng Logistics Hub Network</span>
            </h3>
            <p className="text-xs text-[#888888] mt-0.5">
              Three authorized equipment distribution, repair, and test centers across Gauteng.
            </p>
          </div>
          <button
            onClick={onOpenHubsModal}
            className="text-xs text-[#E50914] hover:underline font-semibold cursor-pointer"
          >
            Hub Details & Maps
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {GAUTENG_HUBS.map(hub => (
            <div key={hub.id} className="p-4 bg-[#141414] rounded-xl border border-[#262626] space-y-2">
              <p className="font-bold text-white text-sm">{hub.name}</p>
              <p className="text-[#888888]">{hub.address}</p>
              <p className="text-[#B3B3B3]">Hours: {hub.hours}</p>
              <p className="text-[#E50914] font-mono">{hub.phone}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
