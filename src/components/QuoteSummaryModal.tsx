import React from 'react';
import { 
  X, 
  Printer, 
  Download, 
  Building2, 
  Check, 
  ShieldCheck, 
  Clock, 
  Share2 
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface QuoteSummaryModalProps {
  quote: any | null;
  onClose: () => void;
}

export const QuoteSummaryModal: React.FC<QuoteSummaryModalProps> = ({ quote, onClose }) => {
  if (!quote) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto print:p-0 print:m-0">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity print:hidden" 
        onClick={onClose} 
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-white text-zinc-900 rounded-2xl shadow-2xl overflow-hidden z-10 my-8 print:my-0 print:border-none print:shadow-none print:w-full print:max-w-none">
        {/* Top Control Bar (Hidden on print) */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-zinc-900 text-white print:hidden border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-zinc-200">Official Rental Quotation</span>
            <span className="text-xs text-zinc-400">• Ref: {quote.quoteNumber}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Quotation Content */}
        <div className="p-8 sm:p-12 space-y-8 bg-white font-sans text-xs sm:text-sm">
          {/* Header & Logo */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b border-zinc-200 pb-8">
            <div>
              <div className="mb-2">
                <BrandLogo size="md" />
              </div>
              <p className="text-xs text-zinc-500 font-medium">Gauteng Studio Gear Rentals (Pty) Ltd</p>
              <p className="text-xs text-zinc-500">Wynberg Audio Logistics Hub, 5th Street, Wynberg, Sandton, 2090</p>
              <p className="text-xs text-zinc-500">Tel: +27 11 887 4920 | Email: bookings@gautenggear.co.za</p>
              <p className="text-xs text-zinc-400 mt-1">VAT Reg: 4890214812 | Company Reg: 2021/849302/07</p>
            </div>

            <div className="text-left sm:text-right space-y-1">
              <div className="text-2xl font-extrabold text-zinc-900 uppercase tracking-wide font-display">
                PRO-FORMA QUOTE
              </div>
              <div className="text-xs text-zinc-600">
                <span className="font-semibold text-zinc-800">Quote Number: </span>
                {quote.quoteNumber}
              </div>
              <div className="text-xs text-zinc-600">
                <span className="font-semibold text-zinc-800">Date Issued: </span>
                {new Date().toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
              <div className="text-xs text-zinc-600">
                <span className="font-semibold text-zinc-800">Valid Until: </span>
                7 Days from issuance
              </div>
            </div>
          </div>

          {/* Client & Rental Schedule Manifest */}
          <div className="grid sm:grid-cols-2 gap-8 bg-zinc-50 p-5 rounded-xl border border-zinc-200">
            <div>
              <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2">
                Renter & Delivery Destination
              </div>
              <div className="font-bold text-sm text-zinc-900">{quote.customerName}</div>
              <div className="text-xs text-zinc-600 mt-0.5">Cell / WhatsApp: {quote.customerPhone}</div>
              <div className="text-xs text-zinc-600">Email: {quote.customerEmail}</div>
              <div className="text-xs text-zinc-600">SA ID / Passport: {quote.idNumber}</div>
              <div className="text-xs text-zinc-700 font-medium mt-1">
                Destination: {quote.venueAddress}
              </div>
            </div>

            <div>
              <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2">
                Rental Period & Logistics
              </div>
              <div className="text-xs text-zinc-700">
                <span className="font-semibold">Start / Handover: </span>
                {quote.startDate} (from 10:00 SAST)
              </div>
              <div className="text-xs text-zinc-700 mt-0.5">
                <span className="font-semibold">Return / Collection: </span>
                {quote.returnDate} (before 11:00 SAST)
              </div>
              <div className="text-xs text-zinc-700 mt-0.5">
                <span className="font-semibold">Duration: </span>
                {quote.totalDays} Days {quote.isWeekendSpecial ? '(Weekend Special Applied)' : ''}
              </div>
              <div className="text-xs text-zinc-700 mt-0.5">
                <span className="font-semibold">Dispatch Type: </span>
                {quote.deliveryOption === 'pickup' ? 'Wynberg Depot Self-Collection' : 'Direct Gauteng Courier Dispatch'}
              </div>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-zinc-900 text-[11px] font-bold uppercase tracking-wider text-zinc-600">
                  <th className="py-2.5 px-3">Item Description</th>
                  <th className="py-2.5 px-3 text-center">Qty</th>
                  <th className="py-2.5 px-3 text-right">Daily Rate</th>
                  <th className="py-2.5 px-3 text-right">Rental Days</th>
                  <th className="py-2.5 px-3 text-right">Line Total (ZAR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 text-xs">
                {quote.items.map((item: any) => {
                  const lineTotal = item.gear.dailyRate * item.quantity * quote.totalDays;
                  return (
                    <tr key={item.gear.id}>
                      <td className="py-3 px-3">
                        <div className="font-bold text-zinc-900">{item.gear.name}</div>
                        <div className="text-[11px] text-zinc-500">
                          {item.gear.brand} • Supplied in flightcase with audio & power cables
                        </div>
                      </td>
                      <td className="py-3 px-3 text-center font-medium">{item.quantity}</td>
                      <td className="py-3 px-3 text-right text-zinc-600">
                        R{item.gear.dailyRate.toLocaleString()}.00
                      </td>
                      <td className="py-3 px-3 text-right text-zinc-600">{quote.totalDays}</td>
                      <td className="py-3 px-3 text-right font-bold text-zinc-900">
                        R{lineTotal.toLocaleString()}.00
                      </td>
                    </tr>
                  );
                })}

                {/* Delivery Fee Line */}
                <tr>
                  <td colSpan={4} className="py-2.5 px-3 font-medium text-zinc-700">
                    Gauteng Logistics & On-Site Sound Check ({quote.zone?.name || 'Gauteng'})
                  </td>
                  <td className="py-2.5 px-3 text-right font-bold text-zinc-900">
                    {quote.deliveryFee === 0 ? 'FREE' : `R${quote.deliveryFee.toLocaleString()}.00`}
                  </td>
                </tr>

                {/* Load Shedding Pack */}
                {quote.includeLoadSheddingPack && (
                  <tr>
                    <td colSpan={4} className="py-2.5 px-3 font-medium text-zinc-700">
                      Surge-Protected Distribution Board & Pure Sine-Wave Battery Pack
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-zinc-900">
                      R{quote.loadSheddingFee}.00
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Totals Calculation Box */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pt-4 border-t-2 border-zinc-900">
            {/* South African Banking Details for EFT */}
            <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200 text-xs space-y-1 w-full sm:max-w-sm">
              <div className="font-bold text-zinc-900 uppercase tracking-wider text-[11px]">
                EFT Banking Details (South Africa)
              </div>
              <div><span className="text-zinc-500">Bank:</span> First National Bank (FNB)</div>
              <div><span className="text-zinc-500">Account Name:</span> Gauteng Studio Gear Rentals</div>
              <div><span className="text-zinc-500">Account Number:</span> 6289 4012 994</div>
              <div><span className="text-zinc-500">Branch Code:</span> 250655 (Sandton Commercial)</div>
              <div><span className="text-zinc-500">Payment Reference:</span> <strong className="text-zinc-900">{quote.quoteNumber}</strong></div>
            </div>

            <div className="space-y-2 text-right w-full sm:w-auto">
              <div className="flex justify-between sm:justify-end gap-8 text-xs text-zinc-600">
                <span>Subtotal:</span>
                <span className="font-semibold text-zinc-900">R{quote.gearSubtotal.toLocaleString()}.00</span>
              </div>
              <div className="flex justify-between sm:justify-end gap-8 text-xs text-zinc-600">
                <span>VAT (15% Included):</span>
                <span className="font-semibold text-zinc-900">
                  R{Math.round((quote.grandTotal * 0.15) / 1.15).toLocaleString()}.00
                </span>
              </div>
              <div className="flex justify-between sm:justify-end gap-8 text-base font-extrabold text-zinc-900 pt-2 border-t border-zinc-300 font-display">
                <span>Total Hire Payable:</span>
                <span className="text-xl text-black">R{quote.grandTotal.toLocaleString()}.00</span>
              </div>

              <div className="flex justify-between sm:justify-end gap-8 text-xs text-zinc-800 bg-zinc-100 p-2.5 rounded-lg border border-zinc-300">
                <span className="font-medium">Refundable Deposit:</span>
                <span className="font-bold text-zinc-950">R{quote.totalDeposit.toLocaleString()}.00</span>
              </div>
              <p className="text-[10px] text-zinc-500 max-w-xs ml-auto">
                *Security deposit is returned within 24 hours via EFT upon safe gear return and inspection.
              </p>
            </div>
          </div>

          {/* Terms Footer */}
          <div className="pt-6 border-t border-zinc-200 text-[10px] text-zinc-500 space-y-1">
            <p className="font-bold text-zinc-700">Rental Terms & Conditions Summary:</p>
            <p>1. Equipment must be operated exclusively within the borders of Gauteng province.</p>
            <p>2. Renter is responsible for safe keeping, strictly avoiding water exposure and unapproved power generators.</p>
            <p>3. First-time hirers must present their physical SA Green Barcoded ID, Smart Card, or Passport at time of handover.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
