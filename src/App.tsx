import React, { useState, useEffect } from 'react';
import { 
  Navbar 
} from './components/Navbar.tsx';
import { 
  RegionalBanner 
} from './components/RegionalBanner.tsx';
import { 
  Storefront 
} from './components/Storefront.tsx';
import { 
  WishlistView 
} from './components/WishlistView.tsx';
import { 
  CheckoutWizard 
} from './components/CheckoutWizard.tsx';
import { 
  LiveTrackingView 
} from './components/LiveTrackingView.tsx';
import { 
  UserDashboard 
} from './components/UserDashboard.tsx';
import { 
  GearModal 
} from './components/GearModal.tsx';
import { 
  AuthModal 
} from './components/AuthModal.tsx';
import { 
  HubsModal 
} from './components/HubsModal.tsx';
import { 
  Equipment, 
  RentalOrder, 
  User 
} from './types.ts';
import { 
  INITIAL_EQUIPMENT 
} from './data/equipmentData.ts';
import { 
  ShieldCheck, 
  MapPin, 
  Disc3, 
  Phone, 
  Mail, 
  Clock, 
  Radio, 
  Truck 
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'storefront' | 'wishlist' | 'tracking' | 'dashboard'>('storefront');
  const [equipmentList, setEquipmentList] = useState<Equipment[]>(INITIAL_EQUIPMENT);
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set(['eq-korg-kaossilator', 'eq-yamaha-hs8']));
  const [orders, setOrders] = useState<RentalOrder[]>([]);
  const [selectedTrackingOrderId, setSelectedTrackingOrderId] = useState<string | undefined>(undefined);
  
  // Modals & Flows
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isHubsModalOpen, setIsHubsModalOpen] = useState(false);
  const [quickViewItem, setQuickViewItem] = useState<Equipment | null>(null);
  const [checkoutItems, setCheckoutItems] = useState<{ equipment: Equipment; quantity: number }[] | null>(null);
  
  // Feedback toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Initial load from server API
  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      // 1. Fetch user session
      const authRes = await fetch('/api/auth/me');
      const authData = await authRes.json();
      if (authData.user) {
        setCurrentUser(authData.user);
      }

      // 2. Fetch equipment inventory
      const eqRes = await fetch('/api/equipment');
      const eqData = await eqRes.json();
      if (eqData.equipment && eqData.equipment.length > 0) {
        setEquipmentList(eqData.equipment);
      }

      // 3. Fetch wishlist
      const wishRes = await fetch('/api/wishlist');
      const wishData = await wishRes.json();
      if (wishData.wishlist) {
        setWishlistIds(new Set(wishData.wishlist.map((item: Equipment) => item.id)));
      }

      // 4. Fetch user rentals
      const rentRes = await fetch('/api/rentals');
      const rentData = await rentRes.json();
      if (rentData.rentals) {
        setOrders(rentData.rentals);
        if (rentData.rentals.length > 0) {
          setSelectedTrackingOrderId(rentData.rentals[0].id);
        }
      }
    } catch (err) {
      console.warn('Backend API warming up, using local fallback state:', err);
    }
  };

  const refreshOrders = async () => {
    try {
      const res = await fetch('/api/rentals', {
        headers: {
          'Authorization': `Bearer ${currentUser?.email || 'SanelowLabel@gmail.com'}`
        }
      });
      const data = await res.json();
      if (data.rentals) {
        setOrders(data.rentals);
      }
    } catch (err) {
      console.error('Failed to reload orders:', err);
    }
  };

  // Wishlist Toggle
  const handleToggleWishlist = async (equipmentId: string) => {
    const nextSet = new Set(wishlistIds);
    let added = false;
    if (nextSet.has(equipmentId)) {
      nextSet.delete(equipmentId);
      added = false;
    } else {
      nextSet.add(equipmentId);
      added = true;
    }
    setWishlistIds(nextSet);

    const item = equipmentList.find(e => e.id === equipmentId);
    if (added) {
      showToast(`Added ${item?.name || 'Item'} to Gear Cart`);
    } else {
      showToast(`Removed from Gear Cart`);
    }

    try {
      await fetch('/api/wishlist/toggle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser?.email || 'SanelowLabel@gmail.com'}`
        },
        body: JSON.stringify({ equipmentId })
      });
    } catch (err) {
      console.error('Failed to sync wishlist with server:', err);
    }
  };

  // Trigger Checkout for single item
  const handleSelectForRental = (item: Equipment) => {
    setCheckoutItems([{ equipment: item, quantity: 1 }]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Trigger Checkout from Wishlist / Cart
  const handleProceedToCheckoutFromWishlist = (items: { equipment: Equipment; quantity: number }[]) => {
    setCheckoutItems(items);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Order completed handler
  const handleOrderCompleted = (newOrder: RentalOrder) => {
    setOrders(prev => [newOrder, ...prev]);
    setSelectedTrackingOrderId(newOrder.id);
    setCheckoutItems(null);
    setActiveTab('tracking');
    showToast(`Order ${newOrder.orderNumber} confirmed! Tracking driver in Gauteng...`);
    // Refresh equipment stock levels
    fetchInitialData();
  };

  const handleLogout = () => {
    setCurrentUser(null);
    showToast('Signed out of session');
  };

  const wishlistEquipment = equipmentList.filter(item => wishlistIds.has(item.id));
  const activeOrders = orders.filter(o => ['CONFIRMED', 'PREPARING', 'OUT_FOR_DELIVERY'].includes(o.status));

  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col selection:bg-[#E50914] selection:text-white">
      
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#181818] border border-[#E50914] text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-xs animate-slide-up">
          <Radio className="w-4 h-4 text-[#E50914] animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setCheckoutItems(null);
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        wishlistCount={wishlistIds.size}
        activeOrdersCount={activeOrders.length}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        onOpenHubsModal={() => setIsHubsModalOpen(true)}
      />

      {/* Regional Operational Notice Banner */}
      <RegionalBanner onOpenHubsModal={() => setIsHubsModalOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {checkoutItems ? (
          /* Active Checkout Wizard Flow */
          <CheckoutWizard
            selectedItems={checkoutItems}
            currentUser={currentUser}
            onOrderCompleted={handleOrderCompleted}
            onCancel={() => setCheckoutItems(null)}
          />
        ) : (
          /* Standard View Tabs */
          <>
            {activeTab === 'storefront' && (
              <Storefront
                equipmentList={equipmentList}
                wishlistIds={wishlistIds}
                onToggleWishlist={handleToggleWishlist}
                onQuickView={(item) => setQuickViewItem(item)}
                onSelectForRental={handleSelectForRental}
              />
            )}

            {activeTab === 'wishlist' && (
              <WishlistView
                wishlistItems={wishlistEquipment}
                onRemoveItem={handleToggleWishlist}
                onProceedToCheckout={handleProceedToCheckoutFromWishlist}
                onExploreCatalog={() => setActiveTab('storefront')}
              />
            )}

            {activeTab === 'tracking' && (
              <LiveTrackingView
                orders={orders}
                selectedOrderId={selectedTrackingOrderId}
                onRefreshOrders={refreshOrders}
                onSelectOrder={(id) => setSelectedTrackingOrderId(id)}
              />
            )}

            {activeTab === 'dashboard' && (
              <UserDashboard
                currentUser={currentUser}
                orders={orders}
                wishlistCount={wishlistIds.size}
                onTrackOrder={(id) => {
                  setSelectedTrackingOrderId(id);
                  setActiveTab('tracking');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onExploreCatalog={() => setActiveTab('storefront')}
                onOpenHubsModal={() => setIsHubsModalOpen(true)}
              />
            )}
          </>
        )}

      </main>

      {/* Detail Specifications Modal */}
      <GearModal
        item={quickViewItem}
        onClose={() => setQuickViewItem(null)}
        isWishlisted={quickViewItem ? wishlistIds.has(quickViewItem.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onSelectForRental={(item) => {
          setQuickViewItem(null);
          handleSelectForRental(item);
        }}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          showToast(`Welcome, ${user.fullName}`);
          fetchInitialData();
        }}
      />

      {/* Gauteng Hubs Directory Modal */}
      <HubsModal
        isOpen={isHubsModalOpen}
        onClose={() => setIsHubsModalOpen(false)}
      />

      {/* Regional Footer */}
      <footer className="bg-[#141414] border-t border-[#262626] mt-12 py-10 text-xs text-[#888888]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand column */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#E50914] flex items-center justify-center text-white">
                  <Disc3 className="w-5 h-5" />
                </div>
                <span className="font-display font-bold text-lg text-white">
                  GAUTENG<span className="text-[#E50914]">GEAR</span>
                </span>
              </div>
              <p className="text-xs text-[#999999] leading-relaxed">
                Dedicated professional music and studio production equipment rental service engineered exclusively for producers, recording studios, and live performers across Gauteng Province, South Africa.
              </p>
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-[11px]">
                <ShieldCheck className="w-4 h-4" />
                <span>Strictly Gauteng Insured Operations</span>
              </div>
            </div>

            {/* Service Hubs */}
            <div className="space-y-2.5">
              <p className="font-bold text-white text-xs uppercase tracking-wider">
                Gauteng Hub Network
              </p>
              <ul className="space-y-1.5 text-[11px] text-[#B3B3B3]">
                <li>• Midrand Logistics & Calibration Hub</li>
                <li>• Sandton West Street Gear Depot</li>
                <li>• Pretoria Menlyn Audio Center</li>
                <li>• Johannesburg CBD Rapid Dispatch</li>
              </ul>
            </div>

            {/* Gauteng Delivery Coverage */}
            <div className="space-y-2.5">
              <p className="font-bold text-white text-xs uppercase tracking-wider">
                Supported Delivery Zones
              </p>
              <ul className="space-y-1.5 text-[11px] text-[#B3B3B3]">
                <li>• Johannesburg (Rosebank, Sandton, CBD, Soweto)</li>
                <li>• Pretoria East, Hatfield & Centurion</li>
                <li>• Midrand, Waterfall & Halfway House</li>
                <li>• Ekurhuleni (Kempton Park, Boksburg, Bedfordview)</li>
              </ul>
            </div>

            {/* South African Support */}
            <div className="space-y-2.5">
              <p className="font-bold text-white text-xs uppercase tracking-wider">
                Gauteng Dispatch Hotline
              </p>
              <div className="space-y-2 text-[11px] text-[#B3B3B3]">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#E50914]" />
                  <span>+27 11 805 4490 (24/7 Studio Tech)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#E50914]" />
                  <span>dispatch@gautenggear.co.za</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#E50914]" />
                  <span>Dispatch: Mon - Sun 07:00 - 21:00</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#222222] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#666666]">
            <p>
              © 2026 Gauteng Studio Gear Rentals (Pty) Ltd. Registered in South Africa. All currency in ZAR (Rand).
            </p>
            <p className="flex items-center gap-2">
              <span>PayFast SA & Ozow Instant EFT Certified</span>
              <span>•</span>
              <span className="text-[#888888]">Operations strictly limited to Gauteng Province</span>
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
}
