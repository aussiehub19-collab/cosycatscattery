'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, ShoppingBag, BookOpen } from 'lucide-react';
import SmartImage from '@/components/SmartImage';
import { PRODUCTS, POSTS } from '@/config/site';

export default function SearchClient() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');

  const cleanQuery = query.toLowerCase().trim();

  const matchingProducts = PRODUCTS.filter(p => {
    if (!cleanQuery) return true;
    return (
      p.name.toLowerCase().includes(cleanQuery) ||
      p.description.toLowerCase().includes(cleanQuery) ||
      p.shortDescription.toLowerCase().includes(cleanQuery) ||
      p.category.toLowerCase().includes(cleanQuery)
    );
  });

  const matchingPosts = POSTS.filter(post => {
    if (!cleanQuery) return true;
    return (
      post.title.toLowerCase().includes(cleanQuery) ||
      post.excerpt.toLowerCase().includes(cleanQuery) ||
      post.category.toLowerCase().includes(cleanQuery)
    );
  });

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase">
          <Search className="w-3.5 h-3.5 text-amber-400" />
          <span>Real-Time Catalog & Knowledge Search</span>
        </div>
        {/* Exactly One H1 */}
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Search Available Kittens, Care & Breed Guides
        </h1>

        {/* Search Bar Input */}
        <div className="relative max-w-xl mx-auto pt-2">
          <input
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by color (e.g. Smoke, Silver, Red), timber castle, or health guide..."
            className="w-full pl-12 pr-4 py-3.5 bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-2xl text-sm text-white placeholder-slate-400 focus:outline-none shadow-xl"
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-6" />
        </div>
      </div>

      {/* Results Section */}
      <div className="space-y-12">
        {/* Products Results */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="font-serif text-xl font-bold text-white flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <span>Available Kittens & Royal Care ({matchingProducts.length})</span>
            </h2>
            <Link href="/shop/" className="text-xs text-amber-400 hover:text-amber-300 font-semibold">
              View All Shop &rarr;
            </Link>
          </div>

          {matchingProducts.length === 0 ? (
            <p className="text-xs text-slate-400 py-4">No kittens or products matching &quot;{query}&quot;.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {matchingProducts.map(product => (
                <div
                  key={product.slug}
                  className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 rounded-2xl overflow-hidden p-4 group transition-all"
                >
                  <div className="aspect-[4/3] rounded-xl overflow-hidden relative bg-slate-950 mb-3">
                    <SmartImage
                      src={product.images[0]}
                      alt={product.name}
                      className="group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-amber-400 font-semibold">
                      <span className="uppercase tracking-wider">{product.category}</span>
                      <span>${product.price.toLocaleString()} AUD</span>
                    </div>
                    <h3 className="font-serif text-sm font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                      <Link href={`/shop/${product.slug}/`}>{product.name}</Link>
                    </h3>
                    <p className="text-[11px] text-slate-400 line-clamp-2">{product.shortDescription}</p>
                    <Link
                      href={`/shop/${product.slug}/`}
                      className="w-full py-2 bg-slate-950 hover:bg-slate-850 text-slate-300 hover:text-white text-xs font-semibold rounded-lg border border-slate-800 text-center block transition-colors mt-2"
                    >
                      View Details &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Posts Results */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="font-serif text-xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-400" />
              <span>Feline Care & Genetics Articles ({matchingPosts.length})</span>
            </h2>
            <Link href="/blog/" className="text-xs text-amber-400 hover:text-amber-300 font-semibold">
              View All Guides &rarr;
            </Link>
          </div>

          {matchingPosts.length === 0 ? (
            <p className="text-xs text-slate-400 py-4">No articles matching &quot;{query}&quot;.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {matchingPosts.map(post => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}/`}
                  className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-4 group transition-all block space-y-3"
                >
                  <div className="aspect-[4/3] rounded-xl overflow-hidden relative bg-slate-950">
                    <SmartImage src={post.image} alt={post.title} />
                  </div>
                  <div>
                    <span className="text-[10px] text-amber-400 font-bold uppercase">{post.category}</span>
                    <h3 className="font-serif text-sm font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1 mt-1">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1">{post.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
