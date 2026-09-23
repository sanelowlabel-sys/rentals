import React from 'react';
import { Phone, Mail, MapPin, Clock, ShieldCheck, Zap } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection }) => {
  return (
    <footer className="bg-[#0b0c10] border-t border-white/10 pt-16 pb-12 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <button 
              onClick={() => onNavigateSection('hero')}
              className="text-left focus:outline-none cursor-pointer group"
            >
              <BrandLogo size="md" />
            </button>

            <p className="text-zinc-400 leading-relaxed max-w-sm">
              The premier professional audio equipment, Pioneer DJ rig, and boutique studio microphone rental service strictly serving the Gauteng province in South Africa.
            </p>

            <div className="flex items-center gap-4 text-zinc-300 pt-1">
              <span className="inline-flex items-center gap-1 text-zinc-200 font-semibold">
                <Zap className="w-3.5 h-3.5 text-zinc-400" />
                <span>Load-Shedding Protected</span>
              </span>
              <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% Flightcased & Insured</span>
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider font-display">
              Gear Departments
            </div>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigateSection('catalog')} className="hover:text-white transition-colors cursor-pointer">
                  Pioneer DJ Rigs & CDJs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('catalog')} className="hover:text-white transition-colors cursor-pointer">
                  Neumann Studio Microphones
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('catalog')} className="hover:text-white transition-colors cursor-pointer">
                  Genelec & Yamaha Monitors
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('catalog')} className="hover:text-white transition-colors cursor-pointer">
                  Universal Audio Interfaces
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('catalog')} className="hover:text-white transition-colors cursor-pointer">
                  Moog & Nord Synthesizers
                </button>
              </li>
            </ul>
          </div>

          {/* Gauteng Regions */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider font-display">
              Gauteng Delivery
            </div>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigateSection('logistics')} className="hover:text-white transition-colors cursor-pointer">
                  Sandton & Rosebank (30m)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('logistics')} className="hover:text-white transition-colors cursor-pointer">
                  Johannesburg CBD & Maboneng
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('logistics')} className="hover:text-white transition-colors cursor-pointer">
                  Pretoria East & Menlyn
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('logistics')} className="hover:text-white transition-colors cursor-pointer">
                  Midrand & Waterfall City
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('logistics')} className="hover:text-white transition-colors cursor-pointer">
                  Soweto & Randburg
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Depot */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider font-display">
              Studio Depot & Support
            </div>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                <span>5th Street, Wynberg, Sandton, Gauteng 2090</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-zinc-400 shrink-0" />
                <a href="tel:0118874920" className="hover:text-white transition-colors">011 887 4920</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-zinc-400 shrink-0" />
                <span>bookings@gearrent.co.za</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-zinc-400 shrink-0" />
                <span>07:00 – 22:00 (Daily Service)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div>
            © {new Date().getFullYear()} Gear Rent Gauteng (Pty) Ltd. Strictly serving Gauteng, South Africa.
          </div>
          <div className="flex items-center gap-4">
            <span>Registration: 2021/849302/07</span>
            <span>•</span>
            <span>VAT: 4890214812</span>
            <span>•</span>
            <span className="text-zinc-400">Card & EFT Accepted</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
