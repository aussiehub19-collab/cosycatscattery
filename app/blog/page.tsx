import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';
import SmartImage from '@/components/SmartImage';
import JsonLd from '@/components/JsonLd';
import { SITE, POSTS } from '@/config/site';

export const metadata: Metadata = {
  title: `Maine Coon Knowledge, Health & Genetics Guides | ${SITE.name}`,
  description: `Expert articles on Maine Coon cat care, European vs American bloodline differences, raw nutrition protocols, and genetic health testing in Australia.`,
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    title: `Maine Coon Knowledge & Guides | ${SITE.name}`,
    description: `Expert guides on Maine Coon genetics, nutrition, and breed characteristics in Australia.`,
    url: `https://${SITE.domain}/blog/`,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1200&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: `${SITE.name} Feline Knowledge Base`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Maine Coon Knowledge & Care | ${SITE.name}`,
    description: `Expert guides on Maine Coon genetics and care in Australia.`,
    images: ['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1200&auto=format&fit=crop'],
  },
  alternates: {
    canonical: `https://${SITE.domain}/blog/`,
  },
  robots: 'index, follow',
  other: {
    'og:updated_time': new Date().toISOString(),
  },
};

export default function BlogIndexPage() {
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `https://${SITE.domain}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Feline Knowledge & Blog',
        item: `https://${SITE.domain}/blog/`,
      },
    ],
  };

  return (
    <>
      <JsonLd schema={blogSchema} />

      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>Breeder Insights & Research</span>
          </div>
          {/* Exactly One H1 */}
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Maine Coon Feline Care, Genetics & Nutrition Guides
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Written by ethical Canberra breeders to guide you through giant breed nutrition, early socialization, grooming rituals, and feline genetic testing.
          </p>
        </div>

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {POSTS.map(post => (
            <article
              key={post.slug}
              className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 rounded-2xl overflow-hidden shadow-xl flex flex-col group transition-all"
            >
              <div className="relative aspect-[4/3] bg-slate-950">
                <SmartImage
                  src={post.image}
                  alt={post.title}
                  className="group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-sm text-amber-300 text-[11px] font-bold px-3 py-1 rounded-full border border-slate-700">
                  {post.category}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[11px] text-slate-500">{post.readTime} • {post.date}</span>
                  <h2 className="font-serif text-lg font-bold text-white group-hover:text-amber-300 transition-colors mt-1.5 leading-snug">
                    <Link href={`/blog/${post.slug}/`}>{post.title}</Link>
                  </h2>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
                <Link
                  href={`/blog/${post.slug}/`}
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 pt-2"
                >
                  <span>Read Full Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
