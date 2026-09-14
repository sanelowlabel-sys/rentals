import React from 'react';
import { AlertTriangle, MapPin, CheckCircle2, Building, ShieldCheck, Zap } from 'lucide-react';

interface RegionalBannerProps {
  onOpenHubsModal: () => void;
}

export const RegionalBanner: React.FC<RegionalBannerProps> = ({ onOpenHubsModal }) => {
  return (
    <div className="bg-gradient-to-r from-[#181818] via-[#1f1616] to-[#181818] border-b border-[#E50914]/30 px-4 py-4 sm:py-5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#E50914]/15 border border-[#E50914]/30 flex items-center justify-center shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5 text-[#E50914]" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-display font-bold text-white text-base tracking-wide">
                Gauteng Regional Operations & Delivery Policy
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#E50914] text-white uppercase tracking-wider">
                Strictly Gauteng Only
              </span>
            </div>
            <p className="text-sm text-[#B3B3B3] mt-1 max-w-3xl leading-relaxed">
              To ensure rigorous hardware testing, transit temperature safety, and 2-hour emergency tech support, equipment dispatch is strictly limited to <strong className="text-white">Johannesburg</strong>, <strong className="text-white">Pretoria</strong>, <strong className="text-white">Midrand</strong>, <strong className="text-white">Centurion</strong>, and surrounding East/West Rand areas.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto shrink-0 pt-2 md:pt-0 border-t border-[#262626] md:border-t-0">
          <button
            onClick={onOpenHubsModal}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#262626] hover:bg-[#333333] text-white text-xs font-semibold transition-all border border-[#383838] cursor-pointer"
          >
            <Building className="w-4 h-4 text-[#E50914]" />
            <span>View 3 Gauteng Hubs</span>
          </button>
          
          <div className="hidden lg:flex items-center gap-2 text-xs text-[#B3B3B3] bg-[#121212] px-3 py-2 rounded-lg border border-[#262626]">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Same-Day Studio Dispatch</span>
          </div>
        </div>

      </div>
    </div>
  );
};
