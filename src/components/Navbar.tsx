import React from 'react';
import { 
  Sliders, 
  Heart, 
  Truck, 
  LayoutDashboard, 
  MapPin, 
  Coins, 
  LogOut, 
  User as UserIcon,
  ShieldCheck,
  Disc3,
  Building2
} from 'lucide-react';
import { User } from '../types.ts';

interface NavbarProps {
  activeTab: 'storefront' | 'wishlist' | 'tracking' | 'dashboard';
  setActiveTab: (tab: 'storefront' | 'wishlist' | 'tracking' | 'dashboard') => void;
  wishlistCount: number;
  activeOrdersCount: number;
  currentUser: User | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  onOpenHubsModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  wishlistCount,
  activeOrdersCount,
  currentUser,
  onOpenAuth,
  onLogout,
  onOpenHubsModal
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#121212]/95 backdrop-blur-md border-b border-[#262626]">
      {/* Regional Operation Badge Bar */}
      <div className="bg-[#181818] border-b border-[#262626] px-4 py-1.5 text-xs text-[#B3B3B3]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#E50914]/20 text-[#E50914] border border-[#E50914]/30">
              GAUTENG ONLY
            </span>
            <span className="flex items-center gap-1 text-white font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#E50914]" />
              Strictly servicing Gauteng, South Africa:
            </span>
            <span className="hidden sm:inline text-[#999999]">
              Johannesburg • Pretoria • Midrand • Centurion • Ekurhuleni
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <button 
              onClick={onOpenHubsModal}
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
            >
              <Building2 className="w-3 h-3 text-[#E50914]" />
              <span>3 Gauteng Depot Hubs</span>
            </button>
            <span className="text-[#404040]">|</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3 h-3" />
              <span>Calibrated & Road-Insured</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('storefront')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#E50914] to-[#990008] flex items-center justify-center shadow-lg shadow-[#E50914]/20 group-hover:scale-105 transition-transform">
              <Disc3 className="w-6 h-6 text-white animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-xl sm:text-2xl tracking-tight text-white">
                  GAUTENG<span className="text-[#E50914]">GEAR</span>
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#262626] text-[#B3B3B3] uppercase">
                  Studio Rig
                </span>
              </div>
              <p className="text-[11px] text-[#B3B3B3] tracking-wide">
                Pro Music & DJ Equipment Rentals • GP Hub
              </p>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-[#181818] p-1.5 rounded-xl border border-[#262626]">
            <button
              onClick={() => setActiveTab('storefront')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'storefront'
                  ? 'bg-[#E50914] text-white shadow-md shadow-[#E50914]/25'
                  : 'text-[#B3B3B3] hover:text-white hover:bg-[#222222]'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>Equipment Catalog</span>
            </button>

            <button
              onClick={() => setActiveTab('wishlist')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all relative ${
                activeTab === 'wishlist'
                  ? 'bg-[#E50914] text-white shadow-md shadow-[#E50914]/25'
                  : 'text-[#B3B3B3] hover:text-white hover:bg-[#222222]'
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>Gear Cart</span>
              {wishlistCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full text-xs font-bold bg-white text-black">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('tracking')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all relative ${
                activeTab === 'tracking'
                  ? 'bg-[#E50914] text-white shadow-md shadow-[#E50914]/25'
                  : 'text-[#B3B3B3] hover:text-white hover:bg-[#222222]'
              }`}
            >
              <Truck className="w-4 h-4" />
              <span>Live Tracking</span>
              {activeOrdersCount > 0 && (
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E50914]"></span>
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-[#E50914] text-white shadow-md shadow-[#E50914]/25'
                  : 'text-[#B3B3B3] hover:text-white hover:bg-[#222222]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>
          </nav>

          {/* User Profile / Reward Coins / Auth */}
          <div className="flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-3">
                {/* Reward Credits Badge */}
                <div 
                  onClick={() => setActiveTab('dashboard')} 
                  title="Your Gauteng SoundCoins Reward Balance"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#181818] border border-[#262626] text-xs cursor-pointer hover:border-[#E50914]/50 transition-colors"
                >
                  <Coins className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[#B3B3B3]">Credits:</span>
                  <span className="font-bold text-amber-400">R {currentUser.rewardCredits.toFixed(0)}</span>
                </div>

                {/* User Name & Logout */}
                <div className="flex items-center gap-2 bg-[#181818] pl-3 pr-2 py-1.5 rounded-lg border border-[#262626]">
                  <div className="w-6 h-6 rounded-full bg-[#E50914] flex items-center justify-center text-xs font-bold text-white uppercase">
                    {currentUser.fullName ? currentUser.fullName.charAt(0) : 'U'}
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className="text-xs font-semibold text-white leading-tight truncate max-w-[120px]">
                      {currentUser.fullName}
                    </p>
                    <p className="text-[10px] text-[#B3B3B3] truncate max-w-[120px]">
                      {currentUser.email}
                    </p>
                  </div>
                  <button
                    onClick={onLogout}
                    title="Sign Out"
                    className="p-1 rounded text-[#B3B3B3] hover:text-white hover:bg-[#262626] transition-colors cursor-pointer ml-1"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-[#E50914] hover:bg-[#FF3333] text-white transition-all shadow-md shadow-[#E50914]/20"
              >
                <UserIcon className="w-4 h-4" />
                <span>Sign In / Register</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation Tabs */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-[#222222] text-xs">
          <button
            onClick={() => setActiveTab('storefront')}
            className={`flex flex-col items-center gap-1 py-1 px-2 ${
              activeTab === 'storefront' ? 'text-[#E50914] font-bold' : 'text-[#B3B3B3]'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Catalog</span>
          </button>
          <button
            onClick={() => setActiveTab('wishlist')}
            className={`flex flex-col items-center gap-1 py-1 px-2 relative ${
              activeTab === 'wishlist' ? 'text-[#E50914] font-bold' : 'text-[#B3B3B3]'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Cart ({wishlistCount})</span>
          </button>
          <button
            onClick={() => setActiveTab('tracking')}
            className={`flex flex-col items-center gap-1 py-1 px-2 relative ${
              activeTab === 'tracking' ? 'text-[#E50914] font-bold' : 'text-[#B3B3B3]'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Tracking</span>
            {activeOrdersCount > 0 && (
              <span className="absolute top-1 right-2 w-1.5 h-1.5 rounded-full bg-[#E50914]"></span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center gap-1 py-1 px-2 ${
              activeTab === 'dashboard' ? 'text-[#E50914] font-bold' : 'text-[#B3B3B3]'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Account</span>
          </button>
        </div>
      </div>
    </header>
  );
};
