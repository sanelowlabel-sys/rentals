import React from 'react';
import { X, Building2, MapPin, Phone, Clock, ShieldCheck, ExternalLink, Zap } from 'lucide-react';
import { GAUTENG_HUBS } from '../data/equipmentData.ts';

interface HubsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HubsModal: React.FC<HubsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-[#181818] border border-[#333333] w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#262626] flex items-center justify-between bg-[#141414]">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#E50914]" />
            <h2 className="font-display font-bold text-white text-lg">
              Gauteng Regional Depot & Hub Network
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#888888] hover:text-white hover:bg-[#262626] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs">
          <div className="p-3.5 bg-gradient-to-r from-[#1f1616] to-[#141414] rounded-xl border border-[#E50914]/30 text-[#B3B3B3] flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#E50914] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-white text-sm">Gauteng Provincial Operational Limits</p>
              <p className="mt-0.5 leading-relaxed">
                All inventory is stored in climate-controlled lockers across these 3 authorized hubs. Gear is tested before dispatch and road-insured on the N1/M1/R21 Gauteng highway network.
              </p>
            </div>
          </div>

          <div className="space-y-4 pt-1">
            {GAUTENG_HUBS.map((hub) => (
              <div key={hub.id} className="p-4 bg-[#141414] rounded-xl border border-[#2a2a2a] space-y-2.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white font-display flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#E50914]" />
                    <span>{hub.name}</span>
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                    Operational Hub
                  </span>
                </div>

                <p className="text-[#B3B3B3]">{hub.address}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-[#888888] pt-1">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#E50914]" />
                    <span>Hours: {hub.hours}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#E50914]" />
                    <span className="text-white font-mono">{hub.phone}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-[#121212] rounded-xl border border-[#262626] text-[11px] text-[#777777] text-center">
            Free self-collection and return testing available at all 3 locations with appointment booking.
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#262626] bg-[#141414] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#222222] hover:bg-[#2c2c2c] text-white text-xs font-semibold border border-[#333333] transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
