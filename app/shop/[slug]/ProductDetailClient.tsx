'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Crown, ShieldCheck, Plane, Award, Sparkles, Check, ShoppingBag, ArrowLeft, Heart, Share2, HelpCircle } from 'lucide-react';
import SmartImage from '@/components/SmartImage';
import { SITE, CONTACT, PRODUCTS } from '@/config/site';
import { useCart } from '@/components/CartContext';

interface ProductDetailClientProps {
  product: typeof PRODUCTS[0];
  relatedProducts: typeof PRODUCTS;
}

export default function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [isCopied, setIsCopied] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0],
      category: product.category,
    });
  };

  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Back Link */}
      <div>
        <Link
          href="/shop/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-amber-300 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Available Kittens & Shop</span>
        </Link>
      </div>

      {/* Product Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl">
            <SmartImage
              src={activeImage}
              alt={product.name}
              priority={true}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-xs font-extrabold uppercase px-3 py-1.5 rounded-full shadow-lg">
                {product.badge}
              </span>
            )}
          </div>

          {/* Thumbnail Strip */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImage(img)}
                  className={`relative w-24 aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    activeImage === img ? 'border-amber-400 shadow-md' : 'border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <SmartImage src={img} alt={`${product.name} view ${idx + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details & Actions */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase mb-3">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>{product.category === 'kittens' ? 'Pedigree Champion Lineage' : 'Bespoke Feline Craft'}</span>
            </div>

            {/* Exactly One H1 */}
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              {product.name}
            </h1>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-amber-300 font-serif">
                ${product.price.toLocaleString()} AUD
              </span>
              <span className="text-xs text-slate-400">GST included • Free flight delivery Australia-wide</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 text-xs text-slate-300">
            <p className="leading-relaxed">{product.description}</p>
          </div>

          {/* Pedigree & Health Guarantee Checkpoints */}
          <div className="space-y-2.5 pt-2">
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>100% DNA Clear (HCM, SMA, PKDef, PKD)</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <Award className="w-4 h-4 text-amber-400 shrink-0" />
              <span>5-Generation ANCATS Pedigree Certificate</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <Plane className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Complimentary Nationwide Climate-Controlled Flight Escort</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>2-Year Written Genetic Health Guarantee</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              id="product-add-to-cart-btn"
              onClick={handleAddToCart}
              className="w-full py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-slate-950 font-bold text-sm rounded-xl shadow-xl shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>
                {product.category === 'kittens' ? 'Reserve This Kitten' : 'Add to Royal Order'}
              </span>
            </button>

            <div className="flex gap-3">
              <a
                href={`https://wa.me/${CONTACT.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
                  `Hello ${SITE.name}, I would like to inquire about reserving ${product.name} ($${product.price} AUD).`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 bg-slate-900 border border-slate-700 hover:border-emerald-500/50 text-slate-200 hover:text-emerald-400 font-semibold text-xs rounded-xl text-center transition-all flex items-center justify-center gap-2"
              >
                <span>Chat on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={handleShare}
                className="px-4 py-3 bg-slate-900 border border-slate-700 hover:border-amber-400 text-slate-300 hover:text-white font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5"
                title="Copy Link to Share"
              >
                <Share2 className="w-4 h-4" />
                <span>{isCopied ? 'Link Copied!' : 'Share'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications & Inclusions */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 space-y-6">
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
          Lineage, Health Protocols & Adoption Inclusions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300">
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800/80 space-y-2">
            <h3 className="font-bold text-amber-300 uppercase tracking-wider text-[11px]">
              Veterinary Protocol
            </h3>
            <p>• Desexed / Speyed prior to departure</p>
            <p>• Microchipped with national registry registration</p>
            <p>• Dual F3 vaccinations + full deworming regimen</p>
            <p>• Comprehensive 12-point veterinary health certificate</p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800/80 space-y-2">
            <h3 className="font-bold text-amber-300 uppercase tracking-wider text-[11px]">
              Pedigree & Lineage
            </h3>
            <p>• 5-Generation Official Pedigree Certificate</p>
            <p>• Certified DNA Negative Parental Lineage</p>
            <p>• Transfer of purebred ownership registration</p>
            <p>• 6-Weeks complimentary pet insurance starter</p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800/80 space-y-2">
            <h3 className="font-bold text-amber-300 uppercase tracking-wider text-[11px]">
              Royal Starter Hamper
            </h3>
            <p>• Scent blanket from queen & littermates</p>
            <p>• 2kg premium raw & holistic kitten nutrition</p>
            <p>• Heavyweight feather wand & sensory toys</p>
            <p>• Lifetime 24/7 breeder guidance concierge</p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="space-y-6">
        <h2 className="font-serif text-2xl font-bold text-white">
          Other Royalty & Royal Care In Our Collection
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {relatedProducts.map(rel => (
            <Link
              key={rel.slug}
              href={`/shop/${rel.slug}/`}
              className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 rounded-2xl overflow-hidden p-4 group transition-all"
            >
              <div className="aspect-[4/3] rounded-xl overflow-hidden relative bg-slate-950 mb-3">
                <SmartImage
                  src={rel.images[0]}
                  alt={rel.name}
                  className="group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] text-amber-400 font-bold">${rel.price.toLocaleString()} AUD</span>
                <h3 className="font-serif text-sm font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                  {rel.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
