'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Crown, Sparkles, Filter, ArrowRight, ShieldCheck, ShoppingBag, Check } from 'lucide-react';
import SmartImage from '@/components/SmartImage';
import { PRODUCTS, CATEGORIES } from '@/config/site';
import { useCart } from '@/components/CartContext';

export default function ShopClient() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [addedSlug, setAddedSlug] = useState<string | null>(null);
  const { addItem } = useCart();

  const filtered = PRODUCTS.filter(p => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  const handleQuickAdd = (product: typeof PRODUCTS[0]) => {
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0],
      category: product.category,
    });
    setAddedSlug(product.slug);
    setTimeout(() => setAddedSlug(null), 2000);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase">
          <Crown className="w-3.5 h-3.5 text-amber-400" />
          <span>ANCATS Certified Royal Lineages</span>
        </div>
        {/* Exactly One H1 */}
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
          Available Pedigree Maine Coon Kittens & Royal Feline Care
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed">
          Select your future gentle giant from our certified DNA-clear litters or equip your home with bespoke heavy-duty Australian timber castles and raw feline nutrition.
        </p>
      </div>

      {/* Filter and Sort Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-slate-900 border border-slate-800 rounded-2xl">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {CATEGORIES.map(cat => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat.slug
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-950 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <label htmlFor="shop-sort" className="text-xs text-slate-400 font-medium whitespace-nowrap">
            Sort by:
          </label>
          <select
            id="shop-sort"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
          >
            <option value="featured">Featured First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Alphabetical</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sorted.map(product => (
          <div
            key={product.slug}
            id={`product-card-${product.slug}`}
            className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col group"
          >
            <Link href={`/shop/${product.slug}/`} className="flex flex-col flex-1" aria-label={`View ${product.name}`}>
              <div className="relative bg-slate-950 overflow-hidden">
                <SmartImage
                  src={product.images[0]}
                  alt={product.name}
                  aspectRatio={product.imageAspect || '4/3'}
                  className="group-hover:scale-105 transition-transform duration-500"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-md">
                    {product.badge}
                  </span>
                )}
                {product.specs?.gender && (
                  <span className="absolute top-3 right-3 bg-slate-950/80 border border-slate-700 text-slate-200 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full shadow-md backdrop-blur-sm">
                    {product.specs.gender === 'Male' ? '♂ Male' : '♀ Female'}
                  </span>
                )}
              </div>

              <div className="p-5 flex-1">
                <div className="flex items-center justify-between text-xs text-amber-400 font-semibold mb-1">
                  <span className="uppercase tracking-wider">
                    {product.category === 'kittens' ? 'Pedigree Kitten' : 'Royal Care Item'}
                  </span>
                  <span className="text-sm font-bold text-amber-300">
                    ${product.price.toLocaleString()} AUD
                  </span>
                </div>
                <h2 className="font-serif text-base font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                  {product.name}
                </h2>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {product.shortDescription}
                </p>
              </div>
            </Link>

            <div className="px-5 pb-5 pt-3 border-t border-slate-800/80 space-y-2">
              <button
                type="button"
                onClick={() => handleQuickAdd(product)}
                className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-xs font-bold rounded-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/10"
              >
                {addedSlug === product.slug ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Added to Reservation
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" /> Quick Reserve / Add
                  </>
                )}
              </button>
              <Link
                href={`/shop/${product.slug}/`}
                className="w-full py-2 bg-slate-950 hover:bg-slate-850 text-slate-300 hover:text-white text-xs font-semibold rounded-lg border border-slate-800 text-center block transition-colors"
              >
                View Pedigree & Genetics &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
