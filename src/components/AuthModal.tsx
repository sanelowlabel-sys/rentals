import React, { useState } from 'react';
import { X, Lock, Mail, User as UserIcon, MapPin, CheckCircle2, ShieldCheck, Disc3 } from 'lucide-react';
import { User } from '../types.ts';
import { GAUTENG_SUBURBS } from '../data/equipmentData.ts';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('+27 82 555 1842');
  const [suburb, setSuburb] = useState('Rosebank');
  const [postalCode, setPostalCode] = useState('2196');
  const [streetAddress, setStreetAddress] = useState('42 Oxford Road, Rosebank Studio Complex');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const endpoint = tab === 'login' ? '/api/auth/login' : '/api/auth/register';
      const body = tab === 'login' 
        ? { email, password }
        : { email, password, fullName, phoneNumber, suburb, postalCode, streetAddress, city: 'Johannesburg' };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await res.json();
      if (data.user) {
        onLoginSuccess(data.user);
        onClose();
      } else {
        setErrorMsg(data.error || 'Authentication failed');
      }
    } catch (err) {
      console.error('Auth error:', err);
      setErrorMsg('Server connection failed. Please check network.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoLogin = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('demo1234');
    // Trigger login
    setLoading(true);
    fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: demoEmail, password: 'demo' })
    })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          onLoginSuccess(data.user);
          onClose();
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-[#181818] border border-[#333333] w-full max-w-md rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#262626] flex items-center justify-between bg-[#141414]">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-white text-lg">
              Gauteng Gear <span className="text-[#E50914]">Access</span>
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#888888] hover:text-white hover:bg-[#262626] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-[#262626] bg-[#121212]">
          <button
            onClick={() => setTab('login')}
            className={`flex-1 py-3 text-xs font-bold transition-all cursor-pointer ${
              tab === 'login'
                ? 'text-white border-b-2 border-[#E50914] bg-[#181818]'
                : 'text-[#888888] hover:text-white'
            }`}
          >
            Sign In to Studio Account
          </button>
          <button
            onClick={() => setTab('register')}
            className={`flex-1 py-3 text-xs font-bold transition-all cursor-pointer ${
              tab === 'register'
                ? 'text-white border-b-2 border-[#E50914] bg-[#181818]'
                : 'text-[#888888] hover:text-white'
            }`}
          >
            Register (Gauteng Only)
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          
          {/* Quick Demo Selector */}
          <div className="p-3 bg-[#121212] rounded-xl border border-[#2a2a2a] text-xs">
            <p className="text-[11px] font-bold text-[#E50914] uppercase mb-1.5">Quick Demo Login</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('SanelowLabel@gmail.com')}
                className="p-2 rounded-lg bg-[#1a1a1a] hover:bg-[#242424] text-left border border-[#333333] transition-colors text-[11px] text-white"
              >
                <span className="font-bold block">Sanelo Mhlongo</span>
                <span className="text-[#888888] text-[10px]">Rosebank (R350 SoundCoins)</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('producer@gautengsound.co.za')}
                className="p-2 rounded-lg bg-[#1a1a1a] hover:bg-[#242424] text-left border border-[#333333] transition-colors text-[11px] text-white"
              >
                <span className="font-bold block">Kagiso Lekota</span>
                <span className="text-[#888888] text-[10px]">Centurion Studio</span>
              </button>
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-950/40 border border-red-800 text-xs text-red-300">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {tab === 'register' && (
              <>
                <div>
                  <label className="block text-xs text-[#B3B3B3] mb-1 font-semibold">Full Name / Label Name</label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-[#666666] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Sanelo Mhlongo"
                      className="w-full pl-9 pr-3 py-2 bg-[#121212] rounded-xl border border-[#2c2c2c] text-xs text-white focus:outline-none focus:border-[#E50914]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-[#B3B3B3] mb-1 font-semibold">South African Mobile Number</label>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+27 82 555 1842"
                    className="w-full px-3 py-2 bg-[#121212] rounded-xl border border-[#2c2c2c] text-xs text-white focus:outline-none focus:border-[#E50914]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-[#B3B3B3] mb-1 font-semibold">Gauteng Suburb</label>
                    <select
                      value={suburb}
                      onChange={(e) => {
                        setSuburb(e.target.value);
                        const match = GAUTENG_SUBURBS.find(s => s.name === e.target.value);
                        if (match) setPostalCode(match.postalCode);
                      }}
                      className="w-full px-2.5 py-2 bg-[#121212] rounded-xl border border-[#2c2c2c] text-xs text-white focus:outline-none focus:border-[#E50914]"
                    >
                      {GAUTENG_SUBURBS.map(s => (
                        <option key={s.name} value={s.name}>{s.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-[#B3B3B3] mb-1 font-semibold">Postal Code</label>
                    <input
                      type="text"
                      required
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="2196"
                      className="w-full px-3 py-2 bg-[#121212] rounded-xl border border-[#2c2c2c] text-xs text-white focus:outline-none focus:border-[#E50914]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-[#B3B3B3] mb-1 font-semibold">Street & Studio Address</label>
                  <input
                    type="text"
                    required
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    placeholder="42 Oxford Road, Rosebank Studio Complex"
                    className="w-full px-3 py-2 bg-[#121212] rounded-xl border border-[#2c2c2c] text-xs text-white focus:outline-none focus:border-[#E50914]"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-xs text-[#B3B3B3] mb-1 font-semibold">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#666666] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. producer@gautengsound.co.za"
                  className="w-full pl-9 pr-3 py-2 bg-[#121212] rounded-xl border border-[#2c2c2c] text-xs text-white focus:outline-none focus:border-[#E50914]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-[#B3B3B3] mb-1 font-semibold">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#666666] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 bg-[#121212] rounded-xl border border-[#2c2c2c] text-xs text-white focus:outline-none focus:border-[#E50914]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#E50914] hover:bg-[#FF3333] text-white text-xs font-bold shadow-lg shadow-[#E50914]/25 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {loading ? (
                <Disc3 className="w-4 h-4 animate-spin" />
              ) : (
                <span>{tab === 'login' ? 'Sign In to Account' : 'Create Gauteng Account & Claim R150 Bonus'}</span>
              )}
            </button>
          </form>

          <div className="pt-2 text-[11px] text-[#777777] text-center flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>ID verification required on first equipment handover</span>
          </div>

        </div>
      </div>
    </div>
  );
};
