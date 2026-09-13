'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Lock, Plane, ShieldCheck } from 'lucide-react';
import SmartImage from '@/components/SmartImage';
import { useCart } from '@/components/CartContext';

export default function CheckoutClient() {
  const router = useRouter();
  const { items, clearCart } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: 'Sydney (SYD Airport / Door-to-Door)',
    address: '',
    paymentMethod: 'bank-transfer',
    notes: '',
  });

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const gstAmount = Math.round((subtotal / 11) * 100) / 100;

  if (items.length === 0) {
    return (
      <div className="py-24 px-4 text-center space-y-4 max-w-md mx-auto">
        <div className="w-16 h-16 mx-auto rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
          <ShieldCheck className="w-8 h-8 text-amber-500/50" />
        </div>
        <h1 className="font-serif text-2xl font-bold text-white">Your Cart is Empty</h1>
        <p className="text-sm text-slate-400">
          Add a kitten or royal care item to your reservation cart before checking out.
        </p>
        <Link
          href="/shop/"
          className="inline-block mt-4 px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold rounded-lg hover:brightness-110 transition-all text-sm"
        >
          Browse Available Kittens
        </Link>
      </div>
    );
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          items: items.map(i => ({ name: i.name, quantity: i.quantity, price: i.price })),
          subtotal,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Submission failed.');
      }

      if (typeof window !== 'undefined') {
        sessionStorage.setItem('lastOrder', JSON.stringify({
          ...formData,
          items,
          subtotal,
          orderId: json.orderId,
        }));
      }

      clearCart();
      router.push('/thank-you-order/');
    } catch (err: any) {
      console.error('Order submission error:', err);
      setErrorMsg(err.message || 'An error occurred. Please try again or contact us via WhatsApp.');
      setSubmitting(false);
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8">
      <Link
        href="/shop/"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-amber-300 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Available Kittens & Shop</span>
      </Link>

      {/* Exactly One H1 */}
      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
        Reservation & Adoption Details
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Form */}
        <div className="lg:col-span-7">
          {errorMsg && (
            <div className="mb-4 p-4 rounded-xl bg-red-950/80 border border-red-800 text-red-200 text-xs">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-xs text-amber-200 space-y-1">
              <p className="font-semibold">👑 VIP Reservation & Delivery Guarantee</p>
              <p>
                All kittens are backed by a 2-Year Genetic Health Warranty and ANCATS pedigree papers. Free VIP flight delivery included.
              </p>
            </div>

            <div>
              <label htmlFor="order-name" className="block text-xs font-semibold text-slate-300 mb-1">
                Full Legal Name *
              </label>
              <input
                id="order-name"
                name="name"
                required
                type="text"
                value={formData.name}
                onChange={handleFormChange}
                placeholder="e.g. Eleanor Vance"
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="order-email" className="block text-xs font-semibold text-slate-300 mb-1">
                  Email Address *
                </label>
                <input
                  id="order-email"
                  name="email"
                  required
                  type="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="name@domain.com.au"
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label htmlFor="order-phone" className="block text-xs font-semibold text-slate-300 mb-1">
                  Mobile / WhatsApp *
                </label>
                <input
                  id="order-phone"
                  name="phone"
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={handleFormChange}
                  placeholder="0400 000 000"
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="order-city" className="block text-xs font-semibold text-slate-300 mb-1">
                  Flight / Delivery City *
                </label>
                <select
                  id="order-city"
                  name="city"
                  value={formData.city}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="Sydney (SYD Airport / Door-to-Door)">Sydney (NSW)</option>
                  <option value="Melbourne (MEL / Door-to-Door)">Melbourne (VIC)</option>
                  <option value="Brisbane (BNE / Door-to-Door)">Brisbane (QLD)</option>
                  <option value="Perth (PER / Door-to-Door)">Perth (WA)</option>
                  <option value="Adelaide (ADL / Door-to-Door)">Adelaide (SA)</option>
                  <option value="Canberra (Direct Estate Pick-up / ACT)">Canberra Estate Pick-up</option>
                  <option value="Hobart (HBA / Door-to-Door)">Hobart (TAS)</option>
                  <option value="Darwin (DRW / Door-to-Door)">Darwin (NT)</option>
                  <option value="Regional Airport Delivery">Regional Australian Hub</option>
                </select>
              </div>

              <div>
                <label htmlFor="order-payment" className="block text-xs font-semibold text-slate-300 mb-1">
                  Payment Preference *
                </label>
                <select
                  id="order-payment"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="bank-transfer">Direct Bank Transfer (EFT)</option>
                  <option value="pay-id">Instant PayID</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="order-address" className="block text-xs font-semibold text-slate-300 mb-1">
                Street Address / Suburb
              </label>
              <input
                id="order-address"
                name="address"
                type="text"
                value={formData.address}
                onChange={handleFormChange}
                placeholder="e.g. 12 Royal Crescent, Paddington NSW"
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label htmlFor="order-notes" className="block text-xs font-semibold text-slate-300 mb-1">
                Adoption Notes / Experience with Giant Breeds
              </label>
              <textarea
                id="order-notes"
                name="notes"
                rows={3}
                value={formData.notes}
                onChange={handleFormChange}
                placeholder="Tell us about your home environment or any kitten color preference..."
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold rounded-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              {submitting ? 'Submitting Reservation...' : 'Confirm & Complete Order'}
              <Lock className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-5">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 sticky top-24">
            <h2 className="font-serif text-lg font-bold text-white">Order Summary</h2>

            <div className="space-y-4 divide-y divide-slate-800/60">
              {items.map(item => (
                <div key={item.slug} className="pt-4 first:pt-0 flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-slate-950 shrink-0 border border-slate-800">
                    <SmartImage src={item.image} alt={item.name} fill objectPosition="top" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-white truncate">{item.name}</h4>
                    <p className="text-xs text-slate-400">Qty {item.quantity}</p>
                  </div>
                  <p className="text-xs text-amber-400 font-medium shrink-0">
                    ${(item.price * item.quantity).toLocaleString()} AUD
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-1.5 text-sm text-slate-400 pt-2 border-t border-slate-800">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white font-medium">${subtotal.toLocaleString()} AUD</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>GST (10% Included)</span>
                <span>${gstAmount.toLocaleString()} AUD</span>
              </div>
              <div className="flex justify-between text-xs text-amber-400 font-medium">
                <span className="flex items-center gap-1">
                  <Plane className="w-3.5 h-3.5" /> Nationwide Flight Delivery
                </span>
                <span>FREE</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between text-base font-bold text-white">
                <span>Total Amount</span>
                <span className="text-amber-300">${subtotal.toLocaleString()} AUD</span>
              </div>
            </div>

            <p className="text-[11px] text-center text-slate-500 flex items-center justify-center gap-1">
              <Lock className="w-3 h-3 text-amber-400" />
              Verified Bank Transfer & PayID references generated upon submission
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
