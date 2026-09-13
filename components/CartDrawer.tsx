'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { X, Trash2, Plus, Minus, ShieldCheck, Plane, CheckCircle, ArrowRight, Lock } from 'lucide-react';
import { SITE, SHOP, CONTACT, FORMS } from '@/config/site';

export interface CartItem {
  slug: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (slug: string, delta: number) => void;
  onRemoveItem: (slug: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const router = useRouter();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: 'Sydney (SYD)',
    address: '',
    paymentMethod: 'bank-transfer',
    notes: '',
  });

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const gstAmount = Math.round((subtotal / 11) * 100) / 100;

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const orderPayload = {
      ...formData,
      items: items.map(i => `${i.name} (x${i.quantity}) - $${i.price * i.quantity} AUD`).join(', '),
      total: `$${subtotal.toLocaleString()} AUD`,
      subject: `👑 New Kitten Reservation / Order: ${formData.name} ($${subtotal.toLocaleString()} AUD)`,
    };

    try {
      if (FORMS.web3formsKey && !FORMS.web3formsKey.startsWith('YOUR-')) {
        const bodyData = new FormData();
        bodyData.append('access_key', FORMS.web3formsKey);
        bodyData.append('subject', orderPayload.subject);
        bodyData.append('name', formData.name);
        bodyData.append('email', formData.email);
        bodyData.append('phone', formData.phone);
        bodyData.append('message', `Destination: ${formData.city}\nAddress: ${formData.address}\nPayment: ${formData.paymentMethod}\n\nItems:\n${orderPayload.items}\n\nTotal: ${orderPayload.total}\n\nNotes: ${formData.notes}`);

        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: bodyData,
        });
      } else {
        // Fallback to local contact API
        await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            subject: orderPayload.subject,
            message: `Destination: ${formData.city}\nAddress: ${formData.address}\nPayment: ${formData.paymentMethod}\n\nItems: ${orderPayload.items}\nTotal: ${orderPayload.total}`,
          }),
        });
      }

      // Store last order in sessionStorage for thank-you display
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('lastOrder', JSON.stringify({
          ...formData,
          items,
          subtotal,
          orderId: `MC-${Math.floor(100000 + Math.random() * 900000)}`,
        }));
      }

      onClearCart();
      onClose();
      router.push('/thank-you-order/');
    } catch (err) {
      console.error('Order submission error:', err);
      // Even if network fails, redirect to thank you with instructions
      onClearCart();
      onClose();
      router.push('/thank-you-order/');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      id="cart-drawer-overlay"
      className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      aria-modal="true"
      role="dialog"
    >
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md sm:max-w-lg bg-slate-950 border-l border-amber-500/20 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-xl font-bold text-white tracking-wide">
                {isCheckingOut ? 'Adoption & Order Details' : 'Reservation Cart'}
              </h2>
              <span className="text-xs px-2.5 py-0.5 bg-amber-500/20 text-amber-300 font-semibold rounded-full">
                {items.reduce((sum, item) => sum + item.quantity, 0)} items
              </span>
            </div>
            <button
              id="cart-drawer-close"
              type="button"
              onClick={onClose}
              aria-label="Close cart drawer"
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 transition-colors"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
                  <ShieldCheck className="w-8 h-8 text-amber-500/50" />
                </div>
                <h3 className="font-serif text-lg text-white font-semibold">Your Cart is Empty</h3>
                <p className="text-sm text-slate-400 max-w-xs mx-auto">
                  Explore our available champion-line Maine Coon kittens and royal feline care items.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    router.push('/shop/');
                  }}
                  className="mt-4 px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold rounded-lg hover:brightness-110 transition-all text-sm"
                >
                  Browse Available Kittens
                </button>
              </div>
            ) : isCheckingOut ? (
              /* Checkout Form */
              <form id="order-checkout-form" onSubmit={handleSubmitOrder} className="space-y-4">
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
                    className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400"
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
                      className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400"
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
                      className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400"
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
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400"
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
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400"
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
                    className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label htmlFor="order-notes" className="block text-xs font-semibold text-slate-300 mb-1">
                    Adoption Notes / Experience with Giant Breeds
                  </label>
                  <textarea
                    id="order-notes"
                    name="notes"
                    rows={2}
                    value={formData.notes}
                    onChange={handleFormChange}
                    placeholder="Tell us about your home environment or any kitten color preference..."
                    className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400 resize-none"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="w-1/3 py-2.5 bg-slate-900 border border-slate-700 text-slate-300 text-sm font-semibold rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    Back to Items
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-2/3 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-sm font-bold rounded-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
                  >
                    {submitting ? 'Submitting Reservation...' : 'Confirm & Complete Order'}
                    <Lock className="w-4 h-4" />
                  </button>
                </div>
              </form>
            ) : (
              /* Items List */
              <div className="space-y-4 divide-y divide-slate-800/60">
                {items.map(item => (
                  <div key={item.slug} className="pt-4 first:pt-0 flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-slate-900 shrink-0 border border-slate-800">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-white truncate">{item.name}</h4>
                      <p className="text-xs text-amber-400 font-medium">
                        ${item.price.toLocaleString()} AUD
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center border border-slate-700 rounded-md bg-slate-900">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.slug, -1)}
                            aria-label={`Decrease quantity of ${item.name}`}
                            className="p-1 hover:text-amber-400 transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5 text-slate-400" />
                          </button>
                          <span className="px-2 text-xs font-bold text-slate-200">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.slug, 1)}
                            aria-label={`Increase quantity of ${item.name}`}
                            className="p-1 hover:text-amber-400 transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5 text-slate-400" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.slug)}
                          aria-label={`Remove ${item.name} from cart`}
                          className="text-slate-500 hover:text-rose-400 text-xs transition-colors flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer / Summary */}
          {items.length > 0 && !isCheckingOut && (
            <div className="p-6 border-t border-slate-800 bg-slate-950/80 space-y-4">
              <div className="space-y-1.5 text-sm text-slate-400">
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

              <button
                type="button"
                id="cart-checkout-proceed-btn"
                onClick={() => setIsCheckingOut(true)}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold rounded-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
              >
                Proceed to Reservation & Details
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-slate-500 flex items-center justify-center gap-1">
                <Lock className="w-3 h-3 text-amber-400" />
                Verified Bank Transfer & PayID references generated upon submission
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
