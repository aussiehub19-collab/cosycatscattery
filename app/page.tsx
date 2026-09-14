import Link from 'next/link';
import { Crown, ShieldCheck, Plane, Award, Sparkles, Heart, CheckCircle2, ArrowRight, Star, BookOpen } from 'lucide-react';
import SmartImage from '@/components/SmartImage';
import JsonLd from '@/components/JsonLd';
import TrustpilotReviews from '@/components/TrustpilotReviews';
import HeroSlider from '@/components/HeroSlider';
import FaqAccordion from '@/components/FaqAccordion';
import { SITE, BRAND, PRODUCTS, POSTS, FAQ, CONTACT, SHOP, REVIEWS } from '@/config/site';

export default function HomePage() {
  const featuredProducts = PRODUCTS.filter(p => p.featured).slice(0, 4);
  const recentPosts = POSTS.slice(0, 3);

  // Structured Data / Schema for Homepage
  const homepageSchema = [
    {
      '@context': 'https://schema.org',
      '@type': ['Store', 'Organization'],
      name: SITE.name,
      description: BRAND.description,
      foundingDate: BRAND.foundingYear,
      foundingLocation: {
        '@type': 'Place',
        name: BRAND.foundingLocation,
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Federation Way, Yarralumla',
        addressLocality: 'Canberra',
        addressRegion: 'ACT',
        postalCode: '2600',
        addressCountry: 'AU',
      },
      url: `https://${SITE.domain}/`,
      areaServed: [
        { '@type': 'Country', name: 'Australia' },
        { '@type': 'AdministrativeArea', name: 'Australian Capital Territory' },
        { '@type': 'AdministrativeArea', name: 'New South Wales' },
        { '@type': 'AdministrativeArea', name: 'Victoria' },
        { '@type': 'AdministrativeArea', name: 'Queensland' },
        { '@type': 'AdministrativeArea', name: 'Western Australia' },
        { '@type': 'AdministrativeArea', name: 'South Australia' },
        { '@type': 'AdministrativeArea', name: 'Tasmania' },
      ],
      numberOfItems: PRODUCTS.length,
      knowsAbout: [
        'Maine Coon',
        'Pedigree Maine Coon Cats',
        'European Maine Coon XXL Bloodlines',
        'Feline DNA Health Screening',
        'Polydactyl Maine Coons',
      ],
      priceRange: '$$$$',
      telephone: CONTACT.phone,
      image: `https://${SITE.domain}/images/hero/hero-1.webp`,
      brand: {
        '@type': 'Brand',
        name: SITE.name,
      },
      makesOffer: {
        '@type': 'AggregateOffer',
        priceCurrency: SITE.currency,
        lowPrice: 185,
        highPrice: 5200,
        offerCount: PRODUCTS.length,
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.2',
        bestRating: '5',
        worstRating: '1',
        reviewCount: '48',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      url: `https://${SITE.domain}/`,
      name: SITE.name,
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `https://${SITE.domain}/search/?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ.slice(0, 5).map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
  ];

  return (
    <>
      <JsonLd schema={homepageSchema} />

      {/* Hero Section */}
      <section
        id="hero-section"
        className="relative min-h-[75vh] flex items-center justify-center overflow-hidden bg-slate-950 px-4 sm:px-6 lg:px-8 py-24 sm:py-32"
      >
        {/* Rotating real cattery photography with a scrim for text legibility */}
        <HeroSlider />

        <div className="max-w-4xl mx-auto w-full text-center relative z-10 space-y-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase shadow-sm">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span><strong className="font-extrabold text-amber-200">{SITE.name}</strong> • Canberra, Australia</span>
            </div>
            <a
              href="#trustpilot-reviews-section"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#00B67A]/10 border border-[#00B67A]/30 text-slate-200 text-xs font-medium hover:bg-[#00B67A]/20 transition-colors"
            >
              <div className="flex items-center gap-0.5">
                {[0, 1, 2, 3, 4].map(i => (
                  <div
                    key={i}
                    className="w-3.5 h-3.5 bg-slate-800 relative overflow-hidden flex items-center justify-center rounded-[1px]"
                  >
                    <div
                      className="absolute inset-y-0 left-0 bg-[#00B67A]"
                      style={{ width: `${Math.max(0, Math.min(1, 4.2 - i)) * 100}%` }}
                    />
                    <svg className="w-2.5 h-2.5 text-white fill-white relative z-10" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  </div>
                ))}
              </div>
              <span className="font-bold text-white text-[11px]">4.2</span>
              <span className="text-slate-400 text-[11px]">• 48+ Verified Reviews</span>
            </a>
          </div>

          {/* Exactly One H1 */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.12] [text-shadow:0_2px_16px_rgba(0,0,0,0.6)]">
            Australia’s Premier Breeder of Pedigree European & American <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100">Maine Coon</span> Royalty
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed [text-shadow:0_1px_12px_rgba(0,0,0,0.7)]">
            We breed magnificent, heavy-boned Maine Coon kittens with lion-like manes, dramatic lynx ear tufts, and gentle affectionate temperaments. Reared cage-free in Canberra with 100% certified DNA clearance and nationwide flight concierge delivery.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/shop/"
              id="hero-cta-shop"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-slate-950 font-bold text-base rounded-xl shadow-xl shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>View Available Kittens</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/about/"
              id="hero-cta-about"
              className="w-full sm:w-auto px-8 py-4 bg-slate-900 border border-slate-700 hover:border-amber-400/50 text-slate-200 font-semibold text-base rounded-xl hover:bg-slate-850 transition-all flex items-center justify-center gap-2"
            >
              <span>Our Heritage & DNA Standards</span>
            </Link>
          </div>

          {/* Quick Metrics */}
          <div className="pt-10 border-t border-slate-800/80 max-w-2xl mx-auto grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="font-serif text-2xl sm:text-3xl font-bold text-amber-300">100%</p>
              <p className="text-xs text-slate-400 mt-1">DNA Negative Parents</p>
            </div>
            <div>
              <p className="font-serif text-2xl sm:text-3xl font-bold text-amber-300">ANCATS</p>
              <p className="text-xs text-slate-400 mt-1">Registered Breeder</p>
            </div>
            <div>
              <p className="font-serif text-2xl sm:text-3xl font-bold text-amber-300">2-Year</p>
              <p className="text-xs text-slate-400 mt-1">Genetic Health Warranty</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar Section */}
      <section id="trust-bar-section" className="bg-slate-900/60 border-y border-amber-500/20 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <ShieldCheck className="w-8 h-8 text-amber-400 shrink-0" />
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white">100% DNA Tested</h4>
              <p className="text-[11px] text-slate-400">HCM, SMA, PKDef & PKD clear</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <Award className="w-8 h-8 text-amber-400 shrink-0" />
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white">5-Gen Pedigree</h4>
              <p className="text-[11px] text-slate-400">ANCATS & TICA registered</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <Plane className="w-8 h-8 text-amber-400 shrink-0" />
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white">VIP Flight Courier</h4>
              <p className="text-[11px] text-slate-400">Australia-wide climate cabin</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <Sparkles className="w-8 h-8 text-amber-400 shrink-0" />
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white">Cage-Free Luxury</h4>
              <p className="text-[11px] text-slate-400">Family-reared in Canberra</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collection Grid */}
      <section id="featured-kittens-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-semibold tracking-widest text-amber-400 uppercase">
            Handpicked Feline Nobility
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Available Pedigree Maine Coon Kittens & Estates
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Each kitten is accompanied by certified 5-generation pedigree lineage papers, full desexing, dual immunisations, microchip registration, and a 2-year genetic health guarantee.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <Link
              href={`/shop/${product.slug}/`}
              key={product.slug}
              aria-label={`View ${product.name}`}
              className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col group"
            >
              <div className="relative bg-slate-950 overflow-hidden">
                <SmartImage
                  src={product.images[0]}
                  alt={product.name}
                  aspectRatio="4/5"
                  objectPosition="top"
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

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs text-amber-400 font-semibold mb-1">
                    <span className="uppercase tracking-wider">
                      {product.category === 'kittens' ? 'Pedigree Kitten' : 'Luxury Royal Care'}
                    </span>
                    <span>{product.price > 0 ? `$${product.price.toLocaleString()} AUD` : 'Enquire'}</span>
                  </div>
                  <h3 className="font-serif text-base font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {product.shortDescription}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span
                    id={`view-kitten-${product.slug}`}
                    className="w-full py-2.5 bg-slate-950 group-hover:bg-gradient-to-r group-hover:from-amber-500 group-hover:to-amber-600 group-hover:text-slate-950 text-slate-200 text-xs font-bold rounded-lg border border-slate-800 group-hover:border-transparent transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>View Pedigree & Reserve</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/shop/"
            id="homepage-view-all-shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-slate-900 border border-amber-500/40 text-amber-300 font-bold rounded-xl hover:bg-slate-850 hover:border-amber-400 transition-all text-sm shadow-lg shadow-amber-500/10"
          >
            <span>Explore Full Royal Collection ({PRODUCTS.length} Items)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Trustpilot Verified Adopter Reviews */}
      <TrustpilotReviews />

      {/* Brand Authority Section */}
      <section id="authority-section" className="bg-slate-900/40 border-y border-amber-500/20 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold tracking-widest text-amber-400 uppercase">
              About <strong className="font-extrabold text-amber-300">{SITE.name}</strong>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
              Ethical Heritage Breeding Founded on Genetic Purity & Uncompromised Feline Welfare
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Founded in {BRAND.foundingYear} in {BRAND.foundingLocation}, {SITE.name} was established with a singular vision: to preserve and champion the authentic, heavyweight European and American pedigree Maine Coon lines in Australia without ever compromising feline welfare.
            </p>
            <div className="space-y-3">
              {BRAND.differentiation.map((point, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-slate-300">{point}</p>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center gap-3">
                <Award className="w-6 h-6 text-amber-400" />
                <div>
                  <p className="text-xs font-bold text-white">Dual Registered Cattery</p>
                  <p className="text-[11px] text-slate-400">ANCATS & TICA Verified</p>
                </div>
              </div>
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center gap-3">
                <Plane className="w-6 h-6 text-amber-400" />
                <div>
                  <p className="text-xs font-bold text-white">National Travel Care</p>
                  <p className="text-[11px] text-slate-400">Direct VIP Airport Escort</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-lg aspect-[4/3]">
                  <SmartImage
                    src="/images/hero/hero-3.webp"
                    alt="Maine Coon kitten at play"
                  />
                </div>
                <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                  <h4 className="font-serif text-sm font-bold text-amber-300">Sensory Early Development</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Kittens undergo neurological bio-sensor stimulation, exposure to household sounds, and gentle human holding from day 14.
                  </p>
                </div>
              </div>
              <div className="space-y-4 pt-6">
                <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                  <h4 className="font-serif text-sm font-bold text-amber-300">100% DNA Tested Clear</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Zero genetic risk for Hypertrophic Cardiomyopathy (HCM) or Spinal Muscular Atrophy (SMA) in our lines.
                  </p>
                </div>
                <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-lg aspect-[4/3]">
                  <SmartImage
                    src="/images/hero/hero-4.webp"
                    alt="Maine Coon relaxing on a cat tree"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feline Care & Breed Guides */}
      <section id="blog-preview-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-semibold tracking-widest text-amber-400 uppercase">
              Feline Knowledge & Care
            </span>
            <h2 className="font-serif text-3xl font-bold text-white mt-1">
              Maine Coon Health, Genetics & Enrichment
            </h2>
          </div>
          <Link
            href="/blog/"
            id="view-all-blog-posts"
            className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 group"
          >
            <span>Read All Articles</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recentPosts.map(post => (
            <article
              key={post.slug}
              className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 rounded-2xl overflow-hidden shadow-lg flex flex-col group transition-all"
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
                  <h3 className="font-serif text-lg font-bold text-white group-hover:text-amber-300 transition-colors mt-1.5 leading-snug line-clamp-2">
                    <Link href={`/blog/${post.slug}/`}>{post.title}</Link>
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
                <Link
                  href={`/blog/${post.slug}/`}
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 pt-2"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section id="homepage-faq-section" className="bg-slate-900/40 border-t border-amber-500/20 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-semibold tracking-widest text-amber-400 uppercase">
              Frequently Asked Questions
            </span>
            <h2 className="font-serif text-3xl font-bold text-white">
              Adoption, Flight Delivery & Health Guarantees
            </h2>
          </div>

          <FaqAccordion items={FAQ.slice(0, 5)} variant="compact" />

          <div className="text-center pt-6">
            <p className="text-xs text-slate-400 mb-3">
              Have specific questions about upcoming litter color combinations or estate viewing?
            </p>
            <Link
              href="/contact/"
              id="homepage-faq-contact-btn"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-900 border border-amber-500/30 text-amber-300 font-semibold text-xs rounded-lg hover:bg-slate-850 hover:border-amber-400 transition-all"
            >
              <span>Speak with Canberra Concierge</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
