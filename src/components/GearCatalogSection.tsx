import React, { useState, useMemo } from 'react';
import { 
  GearItem, 
  GearCategory, 
  CartItem 
} from '../types';
import { 
  Search, 
  SlidersHorizontal, 
  Check, 
  Plus, 
  Eye, 
  Info, 
  Sparkles, 
  ShieldAlert,
  ShoppingBag
} from 'lucide-react';

interface GearCatalogProps {
  inventory: GearItem[];
  selectedCategory: GearCategory;
  onSelectCategory: (cat: GearCategory) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  cart: CartItem[];
  onAddToCart: (gear: GearItem) => void;
  onOpenSpecsModal: (gear: GearItem) => void;
  onOpenCart: () => void;
}

export const GearCatalogSection: React.FC<GearCatalogProps> = ({
  inventory,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  cart,
  onAddToCart,
  onOpenSpecsModal,
  onOpenCart,
}) => {
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'name'>('popular');
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);

  const categories: { id: GearCategory; label: string }[] = [
    { id: 'all', label: 'All Equipment' },
    { id: 'dj', label: 'DJ Equipment' },
    { id: 'microphones', label: 'Studio Mics' },
    { id: 'monitors', label: 'Monitors & Subs' },
    { id: 'interfaces', label: 'Interfaces & Outboard' },
    { id: 'synthesizers', label: 'Synths & Drum Machines' },
    { id: 'pa_sound', label: 'PA & Live Audio' },
  ];

  // Extract unique brands
  const brands = useMemo(() => {
    const list = Array.from(new Set(inventory.map((item) => item.brand)));
    return ['all', ...list];
  }, [inventory]);

  // Filtered & Sorted items
  const filteredGear = useMemo(() => {
    return inventory
      .filter((item) => {
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
        const matchesBrand = selectedBrand === 'all' || item.brand === selectedBrand;
        const matchesStock = !onlyInStock || item.inStock;
        
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch = 
          !q ||
          item.name.toLowerCase().includes(q) ||
          item.brand.toLowerCase().includes(q) ||
          item.model.toLowerCase().includes(q) ||
          item.tagline.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.specs.some(s => s.toLowerCase().includes(q));

        return matchesCategory && matchesBrand && matchesStock && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'popular') return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
        if (sortBy === 'price-asc') return a.dailyRate - b.dailyRate;
        if (sortBy === 'price-desc') return b.dailyRate - a.dailyRate;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return 0;
      });
  }, [inventory, selectedCategory, selectedBrand, onlyInStock, searchQuery, sortBy]);

  // Check if item is in cart
  const getItemCartQuantity = (id: string) => {
    const found = cart.find(c => c.gear.id === id);
    return found ? found.quantity : 0;
  };

  return (
    <section id="catalog" className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Title */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-xs font-semibold text-zinc-300 mb-2">
            <span>Verified Inventory</span>
            <span className="text-zinc-500">•</span>
            <span className="text-zinc-200">Gauteng Warehouse Stock</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Equipment Hire Catalog
          </h2>
          <p className="text-sm text-zinc-400 mt-1 max-w-2xl">
            All gear is supplied in road flightcases with balanced cables, surge boards, and accessories. Transparent daily, weekend, and weekly ZAR rates.
          </p>
        </div>

        {/* Live Search & Count */}
        <div className="flex items-center gap-3">
          <div className="text-xs text-zinc-400 font-medium">
            Showing <span className="text-white font-bold">{filteredGear.length}</span> pieces of gear
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none mb-6">
        {categories.map((cat) => {
          const count = cat.id === 'all' 
            ? inventory.length 
            : inventory.filter(i => i.category === cat.id).length;

          const isActive = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              id={`catalog-category-tab-${cat.id}`}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-zinc-100 text-zinc-950 font-bold shadow-md shadow-white/5'
                  : 'bg-zinc-900/80 text-zinc-300 hover:text-white hover:bg-zinc-800 border border-white/5'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                isActive ? 'bg-black/15 text-black font-bold' : 'bg-white/10 text-zinc-400'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Secondary Filter & Sort Toolbar */}
      <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-4 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Brand Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider mr-1 shrink-0">
            Brand:
          </span>
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedBrand === brand
                  ? 'bg-white text-black font-bold'
                  : 'bg-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700'
              }`}
            >
              {brand === 'all' ? 'All Brands' : brand}
            </button>
          ))}
        </div>

        {/* Right side: Sort & Stock Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Stock Toggle */}
          <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={onlyInStock}
              onChange={(e) => setOnlyInStock(e.target.checked)}
              className="rounded bg-zinc-800 border-zinc-700 text-zinc-200 focus:ring-0 w-4 h-4 accent-zinc-200 cursor-pointer"
            />
            <span>Ready for Today’s Dispatch</span>
          </label>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              aria-label="Sort gear catalog"
              className="bg-zinc-800 border border-white/10 text-zinc-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-zinc-400 cursor-pointer"
            >
              <option value="popular">Sort: Most Requested</option>
              <option value="price-asc">Price: Lowest to Highest</option>
              <option value="price-desc">Price: Highest to Lowest</option>
              <option value="name">Model: A to Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {filteredGear.length === 0 && (
        <div className="text-center py-20 bg-zinc-900/40 rounded-2xl border border-white/5 p-8">
          <Info className="w-10 h-10 text-zinc-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white">No gear matched your filter</h3>
          <p className="text-xs text-zinc-400 max-w-md mx-auto mt-1 mb-4">
            Try adjusting your search terms, changing the category, or selecting "All Brands".
          </p>
          <button
            onClick={() => {
              onSelectCategory('all');
              setSelectedBrand('all');
              onSearchChange('');
              setOnlyInStock(false);
            }}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Gear Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGear.map((item) => {
          const cartQty = getItemCartQuantity(item.id);

          return (
            <div
              key={item.id}
              className="rounded-2xl bg-zinc-900/80 border border-white/10 hover:border-zinc-400/50 transition-all flex flex-col justify-between overflow-hidden group shadow-lg hover:shadow-white/5"
            >
              {/* Card Image Area */}
              <div className="relative h-56 bg-zinc-950 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

                {/* Brand / Category Top Bar */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-zinc-900/90 text-zinc-200 border border-zinc-700/60 backdrop-blur-sm">
                    {item.brand}
                  </span>
                  {item.popular && (
                    <span className="px-2 py-1 rounded-md text-[10px] font-black bg-zinc-100 text-zinc-950">
                      Hot Pick
                    </span>
                  )}
                </div>

                {/* Stock Indicator */}
                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium flex items-center gap-1 backdrop-blur-sm ${
                    item.inStock 
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${item.inStock ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                    {item.inStock ? 'Available in Wynberg' : 'Reserved'}
                  </span>
                </div>

                {/* Quick Specs overlay button */}
                <button
                  id={`specs-btn-${item.id}`}
                  onClick={() => onOpenSpecsModal(item)}
                  className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 hover:text-white text-xs font-semibold border border-white/10 flex items-center gap-1.5 backdrop-blur-md transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Full Specs</span>
                </button>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-zinc-400 font-semibold">
                    {item.categoryLabel}
                  </div>
                  <h3 className="text-lg font-bold text-white font-display mt-0.5 group-hover:text-zinc-100 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                    {item.tagline}
                  </p>

                  {/* Highlights Pill Tags */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {item.specs.slice(0, 2).map((spec, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 rounded text-[10px] bg-zinc-800 text-zinc-300 border border-white/5"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pricing & Cart Action Area */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  {/* Rates Breakdown */}
                  <div className="flex items-baseline justify-between">
                    <div>
                      <div className="text-xs text-zinc-400">Daily Hire</div>
                      <div className="text-2xl font-black text-white font-display">
                        R{item.dailyRate.toLocaleString()}
                        <span className="text-xs font-normal text-zinc-400"> /day</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-[11px] text-zinc-400">Weekend Special</div>
                      <div className="text-xs font-bold text-emerald-400">
                        R{item.weekendRate.toLocaleString()} (Fri-Mon)
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-zinc-400 bg-zinc-950/60 px-2.5 py-1.5 rounded-lg border border-white/5">
                    <span>Refundable Deposit:</span>
                    <span className="text-zinc-300 font-semibold">R{item.deposit.toLocaleString()}</span>
                  </div>

                  {/* Action Button */}
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      id={`add-to-cart-${item.id}-btn`}
                      onClick={() => onAddToCart(item)}
                      className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs tracking-wide transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer ${
                        cartQty > 0
                          ? 'bg-zinc-100 text-zinc-950 shadow-md shadow-white/5'
                          : 'bg-zinc-800 hover:bg-zinc-100 hover:text-zinc-950 text-white'
                      }`}
                    >
                      {cartQty > 0 ? (
                        <>
                          <Check className="w-4 h-4 stroke-[2.5]" />
                          <span>In Cart ({cartQty}) • Add Another</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 stroke-[2.5]" />
                          <span>Add to Booking</span>
                        </>
                      )}
                    </button>

                    {cartQty > 0 && (
                      <button
                        onClick={onOpenCart}
                        title="View Cart Drawer"
                        className="p-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl transition-colors shrink-0 cursor-pointer"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
