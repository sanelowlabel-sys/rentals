import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CuratedPackagesSection } from './components/CuratedPackagesSection';
import { GearCatalogSection } from './components/GearCatalogSection';
import { GearDetailModal } from './components/GearDetailModal';
import { GautengLogisticsSection } from './components/GautengLogisticsSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { RentalCartDrawer } from './components/RentalCartDrawer';
import { QuoteSummaryModal } from './components/QuoteSummaryModal';
import { GEAR_INVENTORY, CURATED_PACKAGES } from './data/gearData';
import { GearItem, GearCategory, CartItem, PackageBundle } from './types';
import { Check, ShoppingBag, ArrowUp } from 'lucide-react';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    // Check localStorage for persisted cart if any
    try {
      const saved = localStorage.getItem('gauteng_gear_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<GearCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [specsModalGear, setSpecsModalGear] = useState<GearItem | null>(null);
  const [activeQuote, setActiveQuote] = useState<any | null>(null);
  const [showToast, setShowToast] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  // Save cart changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('gauteng_gear_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Scroll listener for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => {
      setShowToast(null);
    }, 2800);
  };

  const handleAddToCart = (gear: GearItem) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.gear.id === gear.id);
      if (existing) {
        return prev.map((item) =>
          item.gear.id === gear.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { gear, quantity: 1 }];
    });
    triggerToast(`Added ${gear.name} to booking cart`);
  };

  const handleAddPackageToCart = (pkg: PackageBundle) => {
    // Map bundle items to matching inventory gear or add corresponding gear items
    let addedCount = 0;
    pkg.includedItems.forEach((desc) => {
      // Find matching item from inventory
      const match = GEAR_INVENTORY.find((g) =>
        desc.toLowerCase().includes(g.brand.toLowerCase()) ||
        desc.toLowerCase().includes(g.model.toLowerCase())
      );

      if (match) {
        setCart((prev) => {
          const existing = prev.find((item) => item.gear.id === match.id);
          if (existing) {
            return prev.map((item) =>
              item.gear.id === match.id ? { ...item, quantity: item.quantity + 1 } : item
            );
          }
          return [...prev, { gear: match, quantity: 1 }];
        });
        addedCount++;
      }
    });

    // If no direct matches, add the top flagship for this category
    if (addedCount === 0 && GEAR_INVENTORY.length > 0) {
      handleAddToCart(GEAR_INVENTORY[0]);
    } else {
      triggerToast(`Loaded "${pkg.name}" components into your cart!`);
    }
  };

  const handleUpdateQuantity = (gearId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.gear.id === gearId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (gearId: string) => {
    setCart((prev) => prev.filter((item) => item.gear.id !== gearId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1013] text-zinc-100 flex flex-col selection:bg-zinc-200 selection:text-zinc-950">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-zinc-900 border border-zinc-600 text-white px-4 py-3 rounded-xl shadow-2xl backdrop-blur-md animate-bounce">
          <div className="w-6 h-6 rounded-full bg-zinc-100 text-zinc-950 flex items-center justify-center font-bold">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span className="text-xs font-semibold">{showToast}</span>
        </div>
      )}

      {/* Navigation */}
      <Navbar
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNavigateSection={scrollToSection}
      />

      {/* Main Page Sections */}
      <main className="flex-1">
        <Hero
          onSelectCategory={setSelectedCategory}
          onOpenCart={() => setIsCartOpen(true)}
          onScrollToCatalog={() => scrollToSection('catalog')}
        />

        <CuratedPackagesSection
          packages={CURATED_PACKAGES}
          onAddPackageToCart={handleAddPackageToCart}
          onOpenCart={() => setIsCartOpen(true)}
        />

        <GearCatalogSection
          inventory={GEAR_INVENTORY}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          cart={cart}
          onAddToCart={handleAddToCart}
          onOpenSpecsModal={setSpecsModalGear}
          onOpenCart={() => setIsCartOpen(true)}
        />

        <GautengLogisticsSection />

        <HowItWorksSection
          onBrowseCatalog={() => scrollToSection('catalog')}
        />

        <FAQSection />
      </main>

      {/* Footer */}
      <Footer onNavigateSection={scrollToSection} />

      {/* Floating Bottom Cart Bar for Mobile when items present */}
      {cart.length > 0 && !isCartOpen && (
        <div className="fixed bottom-4 left-4 right-4 sm:hidden z-30">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full py-3.5 px-5 rounded-2xl bg-zinc-100 text-zinc-950 font-black text-xs tracking-wider uppercase flex items-center justify-between shadow-2xl shadow-white/10 active:scale-95 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              <span>Review Rental Manifest ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
            </div>
            <span>View Cart →</span>
          </button>
        </div>
      )}

      {/* Back to top button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 left-6 z-30 p-2.5 rounded-full bg-zinc-900/90 text-zinc-400 hover:text-white border border-white/10 hover:border-zinc-400 shadow-lg backdrop-blur-sm transition-all cursor-pointer"
          title="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Specs Detail Modal */}
      <GearDetailModal
        gear={specsModalGear}
        onClose={() => setSpecsModalGear(null)}
        onAddToCart={handleAddToCart}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Cart & Quote Calculator Drawer */}
      <RentalCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOpenQuoteModal={(quoteDetails) => {
          setActiveQuote(quoteDetails);
          setIsCartOpen(false);
        }}
      />

      {/* Official Tax Quote Modal */}
      <QuoteSummaryModal
        quote={activeQuote}
        onClose={() => setActiveQuote(null)}
      />
    </div>
  );
}
