import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, ArrowRight, ShieldCheck, Crown } from 'lucide-react';
import SmartImage from '@/components/SmartImage';
import JsonLd from '@/components/JsonLd';
import { POSTS, SITE, PRODUCTS } from '@/config/site';

export async function generateStaticParams() {
  return POSTS.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS.find(p => p.slug === slug);

  if (!post) {
    return {
      title: `Guide Not Found | ${SITE.name}`,
      robots: { index: false, follow: true },
    };
  }

  const title = `${post.title} | ${SITE.name}`;
  const description = post.excerpt;

  return {
    title,
    description,
    openGraph: {
      type: 'article',
      siteName: SITE.name,
      title,
      description,
      url: `https://${SITE.domain}/blog/${post.slug}/`,
      images: [
        {
          url: post.image,
          width: 1200,
          height: 900,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [post.image],
    },
    alternates: {
      canonical: `https://${SITE.domain}/blog/${post.slug}/`,
    },
    robots: 'index, follow',
    other: {
      'og:updated_time': new Date().toISOString(),
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = POSTS.find(p => p.slug === slug);

  if (!post) {
    notFound();
  }

  const otherPosts = POSTS.filter(p => p.slug !== post.slug).slice(0, 2);
  const featuredKittens = PRODUCTS.filter(p => p.category === 'kittens').slice(0, 2);

  const blogPostSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      image: post.image,
      datePublished: post.date,
      dateModified: new Date().toISOString(),
      author: {
        '@type': 'Organization',
        name: SITE.name,
        url: `https://${SITE.domain}/`,
      },
      publisher: {
        '@type': 'Organization',
        name: SITE.name,
        logo: {
          '@type': 'ImageObject',
          url: `https://${SITE.domain}/images/logo.png`,
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://${SITE.domain}/blog/${post.slug}/`,
      },
    },
    {
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
          name: 'Blog',
          item: `https://${SITE.domain}/blog/`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: post.title,
          item: `https://${SITE.domain}/blog/${post.slug}/`,
        },
      ],
    },
  ];

  return (
    <>
      <JsonLd schema={blogPostSchema} />

      <article className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
        {/* Back Link */}
        <div>
          <Link
            href="/blog/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-amber-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Feline Guides</span>
          </Link>
        </div>

        {/* Post Header */}
        <div className="space-y-4 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase">
            <span>{post.category}</span>
          </div>

          {/* Exactly One H1 */}
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-center sm:justify-start gap-4 text-xs text-slate-400 pt-2 border-b border-slate-800 pb-4">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              {post.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              {post.readTime}
            </span>
            <span>•</span>
            <span>By Canberra Breeding Team</span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden border border-slate-800 shadow-2xl relative aspect-[4/3] bg-slate-950">
          <SmartImage src={post.image} alt={post.title} priority={true} />
        </div>

        {/* Article Body */}
        <div className="prose prose-invert max-w-none space-y-6 text-slate-300 text-sm sm:text-base leading-relaxed">
          <p className="text-base sm:text-lg text-amber-100/90 font-medium leading-relaxed bg-slate-900/60 p-6 rounded-2xl border border-amber-500/20">
            {post.excerpt}
          </p>

          <h2 className="font-serif text-2xl font-bold text-white pt-4">
            Essential Biological Understandings
          </h2>
          <p>
            The Maine Coon is one of the oldest natural breeds in North America and has evolved robust physical adaptations to withstand harsh sub-zero winter climates. From their water-resistant triple coat to the heavy tufting between their large paws that function as natural snowshoes, understanding these biological traits is crucial for providing optimal feline husbandry.
          </p>
          <p>
            Unlike typical domestic cats that reach full skeletal maturity between 9 and 12 months, purebred Maine Coons undergo an extended 4-to-5 year growth cycle. This gradual development requires targeted nutritional support rich in animal protein, glucosamine, chondroitin, and balanced calcium-to-phosphorus ratios to support robust bone density without stressing juvenile joints.
          </p>

          <h2 className="font-serif text-2xl font-bold text-white pt-4">
            Genetic Health Screening: What Every Australian Owner Must Know
          </h2>
          <p>
            At {SITE.name}, all foundation stud and queen lines undergo international DNA assay testing to confirm negative status for feline Hypertrophic Cardiomyopathy (HCM A31P mutation), Spinal Muscular Atrophy (SMA), and Pyruvate Kinase Deficiency (PKDef). Annual echocardiograms conducted by veterinary cardiologists ensure heart health throughout each cat&apos;s lifetime.
          </p>

          <div className="my-8 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-amber-950/30 to-slate-900 border border-amber-500/30 space-y-3">
            <h3 className="font-serif text-lg font-bold text-amber-300 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              <span>Breeder Recommendation Checklist</span>
            </h3>
            <ul className="text-xs sm:text-sm text-slate-300 space-y-1.5 list-disc pl-5">
              <li>Always demand written N/N DNA certificates of both parents before placing a deposit.</li>
              <li>Ensure your kitten remains with the queen until at least 12 to 14 weeks for emotional stability.</li>
              <li>Provide heavy-duty solid timber scratchers to accommodate adult weights exceeding 9–11 kg.</li>
            </ul>
          </div>
        </div>

        {/* Related Kittens In Need of Loving Homes */}
        <div className="pt-10 border-t border-slate-800 space-y-6">
          <h2 className="font-serif text-xl font-bold text-white">
            Meet Our Available Pedigree Kittens
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {featuredKittens.map(kitten => (
              <Link
                key={kitten.slug}
                href={`/shop/${kitten.slug}/`}
                className="p-4 bg-slate-900 border border-slate-800 hover:border-amber-500/40 rounded-2xl flex items-center gap-4 group transition-all"
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden relative shrink-0 bg-slate-950">
                  <SmartImage src={kitten.images[0]} alt={kitten.name} />
                </div>
                <div>
                  <span className="text-[11px] text-amber-400 font-bold">${kitten.price.toLocaleString()} AUD</span>
                  <h3 className="font-serif text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                    {kitten.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 line-clamp-1">{kitten.shortDescription}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Related Posts */}
        {otherPosts.length > 0 && (
          <div className="pt-8 border-t border-slate-800 space-y-4">
            <h2 className="font-serif text-lg font-bold text-white">Other Educational Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {otherPosts.map(op => (
                <Link
                  key={op.slug}
                  href={`/blog/${op.slug}/`}
                  className="p-4 bg-slate-900/60 border border-slate-800 hover:border-amber-400/40 rounded-xl text-xs space-y-1 block transition-colors"
                >
                  <span className="text-amber-400 font-semibold">{op.category}</span>
                  <p className="font-bold text-white">{op.title}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </>
  );
}
