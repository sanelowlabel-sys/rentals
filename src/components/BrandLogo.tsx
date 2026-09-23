import React, { useState } from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
}) => {
  const [imgError, setImgError] = useState(false);

  // Size mapping for the square logo mark
  const sizeClasses = {
    sm: 'w-9 h-9 text-xs',
    md: 'w-11 h-11 text-sm',
    lg: 'w-14 h-14 text-base',
    xl: 'w-20 h-20 text-xl',
  };

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Logo Square Mark */}
      <div
        className={`${sizeClasses[size]} relative shrink-0 rounded-xl overflow-hidden shadow-md border border-zinc-700/60 bg-[#d1d1d6] flex flex-col items-center justify-center select-none transition-transform group-hover:scale-105`}
        title="Gear Rent"
      >
        {!imgError ? (
          <img
            src="/logo.png"
            alt="Gear Rent Logo"
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          /* SVG vector fallback rendering the exact GEAR RENT slab-serif aesthetic */
          <div className="w-full h-full bg-[#d1d1d6] flex flex-col items-center justify-center p-1 font-serif font-black tracking-tighter leading-none">
            <span className="text-[#f5f5f7] text-[40%] font-black tracking-widest drop-shadow-[0_1px_1px_rgba(0,0,0,0.1)]">
              GEAR
            </span>
            <span className="text-[#3e3e42] text-[40%] font-black tracking-widest -mt-0.5">
              ЯEИT
            </span>
          </div>
        )}
      </div>

      {/* Brand Typography */}
      {showSubtitle && (
        <div className="leading-tight">
          <div className="flex items-center gap-1.5">
            <span className="text-lg font-black tracking-tight text-white font-display">
              GEAR RENT
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-200 border border-zinc-700 font-bold uppercase tracking-wider">
              GAUTENG
            </span>
          </div>
          <p className="text-[11px] text-zinc-400 font-medium tracking-wide uppercase">
            Studio Sound & DJ Equipment Hire
          </p>
        </div>
      )}
    </div>
  );
};
