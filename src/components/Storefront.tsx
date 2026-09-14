import React, { useState, useMemo } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  Sparkles, 
  CheckCircle2, 
  Music, 
  Disc, 
  Speaker, 
  Layers, 
  Headphones,
  Filter
} from 'lucide-react';
import { Equipment, EquipmentCategory } from '../types.ts';
import { GearCard } from './GearCard.tsx';

interface StorefrontProps {
  equipmentList: Equipment[];
  wishlistIds: Set<string>;
  onToggleWishlist: (equipmentId: string) => void;
  onQuickView: (item: Equipment) => void;
  onSelectForRental: (item: Equipment) => void;
}

const CATEGORIES: { label: string; value: string; icon: React.ReactNode }[] = [
  { label: 'All Equipment (16)', value: 'All', icon: <SlidersHorizontal className="w-3.5 h-3.5" /> },
  { label: 'Synths & FX (5)', value: 'Synths & FX', icon: <Music className="w-3.5 h-3.5" /> },
  { label: 'Studio Monitors (3)', value: 'Studio Monitors', icon: <Speaker className="w-3.5 h-3.5" /> },
  { label: 'DJ Gear (4)', value: 'DJ Gear', icon: <Disc className="w-3.5 h-3.5" /> },
  { label: 'Audio & MIDI (3)', value: 'Audio Interfaces & MIDI', icon: <Headphones className="w-3.5 h-3.5" /> },
  { label: 'Studio Bundles & DI (2)', value: 'Studio Bundles', icon: <Layers className="w-3.5 h-3.5" /> },
];

export const Storefront: React.FC<StorefrontProps> = ({
  equipmentList,
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onSelectForRental,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [availableOnly, setAvailableOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const filteredItems = useMemo(() => {
    return equipmentList.filter((item) => {
      // Search match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.brand.toLowerCase().includes(query) ||
        item.model.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.tags.some((t) => t.toLowerCase().includes(query));

      // Category match
      const matchesCategory =
        selectedCategory === 'All' ||
        item.category === selectedCategory ||
        (selectedCategory === 'Studio Bundles' && (item.category === 'Studio Bundles' || item.category === 'Accessories & DI'));

      // Availability match
      const matchesAvailable = !availableOnly || item.availableQuantity > 0;

      return matchesSearch && matchesCategory && matchesAvailable;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.dailyPriceZar - b.dailyPriceZar;
      if (sortBy === 'price-desc') return b.dailyPriceZar - a.dailyPriceZar;
      // Default: featured first, then name
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return a.name.localeCompare(b.name);
    });
  }, [equipmentList, searchQuery, selectedCategory, availableOnly, sortBy]);

  return (
    <div className="space-y-6">
      
      {/* Search and Filters Bar */}
      <div className="bg-[#181818] p-4 sm:p-5 rounded-2xl border border-[#262626] shadow-xl space-y-4">
        
        {/* Search Input and Sort */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search gear (e.g., Korg, Yamaha HS8, Pioneer CDJ, Volca, DBBox...)"
              className="w-full pl-10 pr-4 py-2.5 bg-[#121212] rounded-xl border border-[#2c2c2c] text-sm text-white placeholder-[#777777] focus:outline-none focus:border-[#E50914] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#888888] hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
            {/* Availability Toggle */}
            <label className="flex items-center gap-2 text-xs font-semibold text-[#B3B3B3] cursor-pointer select-none bg-[#121212] px-3.5 py-2.5 rounded-xl border border-[#2c2c2c] hover:border-[#383838]">
              <input
                type="checkbox"
                checked={availableOnly}
                onChange={(e) => setAvailableOnly(e.target.checked)}
                className="accent-[#E50914] w-4 h-4 rounded cursor-pointer"
              />
              <span>Ready in Hub</span>
            </label>

            {/* Sort Select */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#121212] text-xs text-white px-3.5 py-2.5 rounded-xl border border-[#2c2c2c] focus:outline-none focus:border-[#E50914] cursor-pointer"
            >
              <option value="featured">Featured / Curated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar pt-1">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#E50914] text-white shadow-md shadow-[#E50914]/25'
                    : 'bg-[#121212] text-[#B3B3B3] hover:text-white hover:bg-[#202020] border border-[#262626]'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Grid Results Header */}
      <div className="flex items-center justify-between text-xs text-[#B3B3B3] px-1">
        <p>
          Showing <strong className="text-white">{filteredItems.length}</strong> studio production & DJ gear units in Gauteng
        </p>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Inspected for Johannesburg & Pretoria producers</span>
        </div>
      </div>

      {/* Equipment Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredItems.map((item) => (
            <GearCard
              key={item.id}
              item={item}
              isWishlisted={wishlistIds.has(item.id)}
              onToggleWishlist={onToggleWishlist}
              onQuickView={onQuickView}
              onSelectForRental={onSelectForRental}
            />
          ))}
        </div>
      ) : (
        <div className="bg-[#181818] rounded-2xl border border-[#262626] p-12 text-center max-w-lg mx-auto space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#222222] flex items-center justify-center mx-auto text-[#888888]">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white font-display">No Equipment Matched Your Criteria</h3>
          <p className="text-xs text-[#B3B3B3]">
            Try adjusting your search terms or clearing the availability filter to view all 16 Gauteng inventory items.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setAvailableOnly(false);
            }}
            className="px-4 py-2 bg-[#E50914] text-white text-xs font-bold rounded-lg hover:bg-[#FF3333] transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
};
