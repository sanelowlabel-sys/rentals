import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Phone, 
  MapPin, 
  Search, 
  Menu, 
  X, 
  ShieldCheck 
} from 'lucide-react';
import { CartItem } from '../types';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  cart: CartItem[];
  onOpenCart: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cart,
  onOpenCart,
  searchQuery,
  onSearchChange,
  onNavigateSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { label: 'Gear Catalog', id: 'catalog' },
    { label: 'Studio Bundles', id: 'bundles' },
    { label: 'Gauteng Delivery', id: 'logistics' },
    { label: 'How It Works', id: 'how-it-works' },
    { label: 'FAQ', id: 'faq' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigateSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#0f1013]/95 border-b border-white/10">
      {/* Main Nav (Top bar removed per user request) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Brand Logo with uploaded logo graphic */}
          <button 
            id="brand-logo-btn"
            onClick={() => handleLinkClick('hero')} 
            className="flex items-center text-left focus:outline-none group cursor-pointer"
          >
            <BrandLogo size="md" />
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => handleLinkClick(link.id)}
                className="text-sm font-medium text-zinc-300 hover:text-white transition-colors relative py-1 hover:after:w-full after:w-0 after:h-0.5 after:bg-zinc-200 after:absolute after:bottom-0 after:left-0 after:transition-all cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Search & Actions */}
          <div className="flex items-center gap-3">
            {/* Search Bar Input (Desktop) */}
            <div className="relative hidden md:block w-56 lg:w-64">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="desktop-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search CDJs, Mics, Synths..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-zinc-900/90 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Mobile Search Toggle */}
            <button
              id="mobile-search-toggle-btn"
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden p-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white cursor-pointer"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Cart / Hire Drawer Trigger */}
            <button
              id="cart-drawer-trigger-btn"
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 font-bold text-sm transition-all shadow-md shadow-white/5 active:scale-95 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Booking Cart</span>
              {totalCartItems > 0 && (
                <span className="bg-zinc-900 text-zinc-100 border border-zinc-700 text-xs font-bold px-2 py-0.5 rounded-full">
                  {totalCartItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Field */}
        {searchOpen && (
          <div className="md:hidden pb-4 pt-1">
            <div className="relative">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="mobile-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search Pioneer, Neumann, Yamaha, Moog..."
                className="w-full pl-9 pr-3 py-2 text-sm bg-zinc-900 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-400"
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#12141a] px-4 py-6 space-y-4">
          <div className="grid gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                id={`mobile-nav-${link.id}`}
                onClick={() => handleLinkClick(link.id)}
                className="text-left px-3 py-2.5 rounded-lg text-base font-medium text-zinc-200 hover:bg-zinc-800 hover:text-white transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <MapPin className="w-4 h-4 text-zinc-300" />
              <span>Gauteng Hub: Wynberg, Sandton (5 mins off Grayston M1)</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>SA ID / Passport Verified & Insured Gear</span>
            </div>
            <a
              href="https://wa.me/27118874920?text=Hello%20Gear%20Rent%20Gauteng,%20I%20need%20a%20quote"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 bg-zinc-100 hover:bg-white text-zinc-950 rounded-xl font-bold text-sm transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp Us: +27 11 887 4920</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
