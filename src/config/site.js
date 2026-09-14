// src/config/site.js - Single Source of Truth
export const SITE = {
  name: 'Cosy Cats Cattery',
  tagline: "Australia's Premier Breeder of Pedigree European & American Maine Coon Royalty",
  domain: 'cosycatscattery.com.au', // Rule 2 & 9: ONE place. Change here -> rebuild -> redeploy.
  abn: '82 418 711 846',
  locale: 'en-AU',               // BCP-47
  currency: 'AUD',
  target: 'vercel',              // 'vercel' | 'static'
  primaryColor: '#0F172A',       // Royal Onyx Slate
  accentGold: '#D4AF37',         // Champagne Royal Gold
  gscVerification: 'pending',
  indexNowKey: 'cosy-cats-indexnow-key',
  cartKey: 'mm-cart',            // localStorage key for cart
};

export const CONTACT = {
  email: 'concierge&#64;cosycatscattery.com.au',
  rawEmail: 'concierge@cosycatscattery.com.au',
  phone: '+61 2 6100 0000',
  whatsapp: '+61400000000',
  address: 'Federation Way, Yarralumla, Canberra ACT 2600',
  hq: 'Canberra, Australian Capital Territory, Australia',
  country: 'Australia',
  hours: 'Mon - Sat: 9:00 AM – 6:00 PM AEST (By Appointment Only)',
};

export const SHOP = {
  minOrder: 0,
  freeShippingThreshold: 0,
  shippingFee: 0,
  cryptoDiscount: 0,
  taxIncluded: true,
  taxRate: 0.10, // 10% GST included
  paymentMethods: ['bank-transfer', 'pay-id'],
  paymentLabels: {
    'bank-transfer': 'Direct Bank Transfer (EFT / BSB & Account)',
    'pay-id': 'Instant Australian PayID (Mobile / Email)',
  },
};

export const FORMS = {
  provider: 'web3forms',          // 'web3forms' (default) | 'resend'
  // Set NEXT_PUBLIC_WEB3FORMS_KEY in Vercel Project Settings -> Environment
  // Variables, then redeploy. Web3Forms keys are public-by-design (see
  // .env.example) so NEXT_PUBLIC_ exposure to the client bundle is expected.
  // Forms fall back to a key-pending redirect (no key = no error) until set.
  web3formsKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || '',
  resendFrom: process.env.RESEND_FROM || '',
  turnstileSiteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '',
};

export const CHAT = {
  channels: [
    { type: 'whatsapp', value: '+61400000000', label: 'VIP WhatsApp Concierge' },
    { type: 'email', value: 'concierge@cosycatscattery.com.au', label: 'Email Cattery Office' },
    { type: 'phone', value: '+61 2 6100 0000', label: 'Call Canberra Estate' },
  ],
};

export const BRAND = {
  foundingYear: '2018',
  foundingLocation: 'Canberra, Australia',
  description: 'Cosy Cats Cattery is a boutique ethical cattery in Canberra breeding champion European & American line Maine Coon cats with comprehensive DNA health testing and pedigree certifications.',
  milestones: [
    { year: '2018', event: 'Established Canberra estate cattery with dual registration (ANCATS & TICA registered lineage).' },
    { year: '2020', event: 'Achieved 100% DNA Clear Colony milestone for HCM, SMA, PKDef, and PKD feline markers.' },
    { year: '2022', event: 'Expanded dedicated climate-controlled sensory nursery and private flight courier network across all Australian states.' },
    { year: '2024', event: 'Awarded Best in Show European Giant Lineage bloodline showcase.' },
  ],
  differentiation: [
    '100% Comprehensive DNA Health Tested & Certified Clear (HCM, SMA, PKDef, PKD)',
    'Champion European & American XXL Pedigree Lines with Verified 5-Generation Pedigree Papers',
    'Reared cage-free in luxury indoor sensory habitats with early neural stimulation and socialization',
    'VIP Australia-Wide Climate-Controlled Flight Delivery with Door-to-Door Health Guarantee',
  ],
  sameAs: [],
  awards: [
    'ANCATS Registered Ethical Breeder Certification',
    'TICA International Pedigree Lineage Excellence',
  ],
};

export const CATEGORIES = [
  { slug: 'all', name: 'All Collection', description: 'Explore all available Maine Coon kittens, upcoming pedigree litters, and luxury feline care items.' },
  { slug: 'kittens', name: 'Available Kittens', description: 'Pedigree European & American giant Maine Coon kittens with full DNA certification.' },
  { slug: 'royalty-care', name: 'Luxury Care & Castles', description: 'Architectural solid timber cat castles, sensory scratchers, and royal grooming tools.' },
  { slug: 'nutrition', name: 'Raw & Holistic Nutrition', description: 'Veterinary-formulated high-protein nutritional complexes for giant breed development.' },
];

export const PRODUCTS = [
  {
    slug: 'bob-male-maine-coon-kitten',
    name: 'Bob',
    price: 1870,
    category: 'kittens',
    badge: 'Available Now',
    featured: true,
    shortDescription: 'Playful tortoiseshell-patterned Maine Coon male with tufted ears, currently available for reservation.',
    description: 'Bob is a Maine Coon kitten currently in our care and available for reservation. Contact our concierge for up-to-date age, health check, and pedigree documentation.',
    specs: {
      gender: 'Male',
      color: 'Tortoiseshell / black-and-orange with tufted ears',
    },
    images: ['/images/kittens/bob.webp'],
    imageAspect: '872/1080',
  },
  {
    slug: 'frayer-female-maine-coon-kitten',
    name: 'Frayer',
    price: 1970,
    category: 'kittens',
    badge: 'Available Now',
    featured: true,
    shortDescription: 'Fluffy silver tabby Maine Coon female, currently available for reservation.',
    description: 'Frayer is a Maine Coon kitten currently in our care and available for reservation. Contact our concierge for up-to-date age, health check, and pedigree documentation.',
    specs: {
      gender: 'Female',
      color: 'Silver tabby',
    },
    images: ['/images/kittens/frayer.webp'],
    imageAspect: '876/1080',
  },
  {
    slug: 'luffy-male-maine-coon-kitten',
    name: 'Luffy',
    price: 2000,
    category: 'kittens',
    badge: 'Available Now',
    featured: true,
    shortDescription: 'Striking red tabby Maine Coon male with dramatic lynx ear tufts, currently available for reservation.',
    description: 'Luffy is a Maine Coon kitten currently in our care and available for reservation. Contact our concierge for up-to-date age, health check, and pedigree documentation.',
    specs: {
      gender: 'Male',
      color: 'Red / orange tabby',
    },
    images: ['/images/kittens/luffy.webp'],
    imageAspect: '714/1080',
  },
  {
    slug: 'maya-female-maine-coon-kitten',
    name: 'Maya',
    price: 1980,
    category: 'kittens',
    badge: 'Available Now',
    featured: true,
    shortDescription: 'Bright-eyed red tabby Maine Coon female with a cream chest, currently available for reservation.',
    description: 'Maya is a Maine Coon kitten currently in our care and available for reservation. Contact our concierge for up-to-date age, health check, and pedigree documentation.',
    specs: {
      gender: 'Female',
      color: 'Red / orange tabby with cream chest',
    },
    images: ['/images/kittens/maya.webp'],
    imageAspect: '712/1080',
  },
  {
    slug: 'smokey-male-maine-coon-kitten-1',
    name: 'Smokey',
    price: 1960,
    category: 'kittens',
    badge: 'Available Now',
    featured: false,
    shortDescription: 'Fluffy brown tabby Maine Coon male, currently available for reservation.',
    description: 'Smokey is a Maine Coon kitten currently in our care and available for reservation. Contact our concierge for up-to-date age, health check, and pedigree documentation.',
    specs: {
      gender: 'Male',
      color: 'Brown tabby',
    },
    images: ['/images/kittens/smokey-1.webp'],
    imageAspect: '862/1080',
  },
  {
    slug: 'smokey-male-maine-coon-kitten-2',
    name: 'Smokey II',
    price: 2020,
    category: 'kittens',
    badge: 'Available Now',
    featured: false,
    shortDescription: 'Pale silver Maine Coon male, currently available for reservation.',
    description: 'Smokey II is a Maine Coon kitten currently in our care and available for reservation. Contact our concierge for up-to-date age, health check, and pedigree documentation.',
    specs: {
      gender: 'Male',
      color: 'Silver',
    },
    images: ['/images/kittens/smokey-2.webp'],
    imageAspect: '842/1080',
  },
  {
    slug: 'snowball-female-maine-coon-kitten',
    name: 'Snowball',
    price: 2060,
    category: 'kittens',
    badge: 'Available Now',
    featured: true,
    shortDescription: 'Solid white Maine Coon female, currently available for reservation.',
    description: 'Snowball is a Maine Coon kitten currently in our care and available for reservation. Contact our concierge for up-to-date age, health check, and pedigree documentation.',
    specs: {
      gender: 'Female',
      color: 'Solid white',
    },
    images: ['/images/kittens/snowball.webp'],
    imageAspect: '876/1080',
  },
  {
    slug: 'wolverine-male-maine-coon-kitten',
    name: 'Wolverine',
    price: 1980,
    category: 'kittens',
    badge: 'Available Now',
    featured: false,
    shortDescription: 'Charcoal tabby Maine Coon male with white paws, currently available for reservation.',
    description: 'Wolverine is a Maine Coon kitten currently in our care and available for reservation. Contact our concierge for up-to-date age, health check, and pedigree documentation.',
    specs: {
      gender: 'Male',
      color: 'Charcoal / dark grey tabby with white paws',
    },
    images: ['/images/kittens/wolverine.webp'],
    imageAspect: '972/1080',
  },
  {
    slug: 'ziggy-male-maine-coon-kitten',
    name: 'Ziggy',
    price: 1950,
    category: 'kittens',
    badge: 'Available Now',
    featured: false,
    shortDescription: 'Striking black-and-white tuxedo Maine Coon male, currently available for reservation.',
    description: 'Ziggy is a Maine Coon kitten currently in our care and available for reservation. Contact our concierge for up-to-date age, health check, and pedigree documentation.',
    specs: {
      gender: 'Male',
      color: 'Black-and-white tuxedo',
    },
    images: ['/images/kittens/ziggy.webp'],
    imageAspect: '828/1080',
  },
  {
    slug: 'zo-male-maine-coon-kitten',
    name: 'Zo',
    price: 1900,
    category: 'kittens',
    badge: 'Available Now',
    featured: false,
    shortDescription: 'Silver tabby Maine Coon male, currently available for reservation.',
    description: 'Zo is a Maine Coon kitten currently in our care and available for reservation. Contact our concierge for up-to-date age, health check, and pedigree documentation.',
    specs: {
      gender: 'Male',
      color: 'Silver tabby',
    },
    images: ['/images/kittens/zo.webp'],
    imageAspect: '852/1080',
  },
  {
    slug: 'monarch-grand-chateau-cat-castle',
    name: 'The Monarch Grand Chateau — 2.2m Solid Timber Cat Castle',
    price: 1290,
    category: 'royalty-care',
    badge: 'Handcrafted in Australia',
    featured: true,
    shortDescription: 'Architectural heavy-duty solid Tasmanian Oak & sisal cat tree engineered specifically for heavyweight 12kg+ Maine Coons.',
    description: 'Standard pet store cat trees wobble or snap under the sheer weight and leaping velocity of adult Maine Coons. The Monarch Grand Chateau is custom handcrafted in Australia from 35mm solid kiln-dried Tasmanian Oak, featuring extra-wide 65cm cushioned observation platforms, 18cm diameter thick natural Brazilian sisal scratching pillars, and a reinforced weighted base that guarantees zero sway.',
    specs: {
      material: 'Solid Tasmanian Oak, 100% Natural 12mm Sisal Rope, Removable Washable Boucle Plush Pads',
      height: '220 cm (2.2 metres)',
      baseDimensions: '80 cm x 70 cm (Weight: 38 kg)',
      capacity: 'Tested up to 35 kg combined feline weight (3-4 adult Maine Coons)',
      shipping: 'Flat-packed with stainless steel hardware, free nationwide courier delivery',
    },
    images: [
      'https://images.unsplash.com/photo-1545249390-6bdfa286032f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?q=80&w=1200&auto=format&fit=crop',
    ],
  },
  {
    slug: 'royal-velvet-maine-coon-grooming-suite',
    name: 'Royal Grooming Suite & Dematting Master Kit',
    price: 240,
    category: 'royalty-care',
    badge: 'Essential Care',
    featured: false,
    shortDescription: 'Professional 6-piece salon grooming arsenal crafted for long, dense Maine Coon double coats and ruffs.',
    description: 'Designed in collaboration with professional feline show groomers, this master kit includes an ergonomic self-cleaning rotating slicker, stainless steel butter comb, undercoat rake with safety rounded pins, silk finishing brush, organic Australian botanicals leave-in detangling spray, and claw care trimmer.',
    specs: {
      includes: 'Undercoat Rake, Dual-length Steel Comb, Slicker, 250ml Organic Silk Conditioning Spray, Trimmer, Luxury Leather Travel Case',
      coatType: 'Double-coat longhair & semi-longhair feline breeds',
      origin: 'Designed in Canberra, Australia',
    },
    images: [
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1200&auto=format&fit=crop',
    ],
  },
  {
    slug: 'holistic-giant-breed-vitality-pack',
    name: 'Holistic Giant Breed Raw & Bone Nutrition Formula (4kg)',
    price: 185,
    category: 'nutrition',
    badge: 'Breeder Formulated',
    featured: false,
    shortDescription: 'Freeze-dried raw kangaroo, free-range chicken, green-lipped mussel, and taurine blend for supreme joint and coat health.',
    description: 'Maine Coons take up to 4 to 5 full years to reach their mature skeletal and muscular size. This veterinary-backed nutrition complex combines premium Australian lean kangaroo protein, ground calcium bone meal, New Zealand green-lipped mussel for cartilage resilience, and cold-pressed salmon oil for lustrous coat density.',
    specs: {
      ingredients: '80% Human Grade Australian Kangaroo & Free-Range Poultry, 10% Organ & Bone, 10% Superfoods & Marine Collagen',
      proteinLevel: '52% Crude Protein, 22% Healthy Fats',
      volume: '4kg Freeze-Dried Raw (reconstitutes to 16kg fresh food)',
    },
    images: [
      'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1548767797-d8c844163c4c?q=80&w=1200&auto=format&fit=crop',
    ],
  },
];

export const POSTS = [
  {
    slug: 'how-much-does-a-maine-coon-kitten-cost-in-australia',
    title: 'How Much Does a Maine Coon Kitten Cost in Australia? (2026 Price Guide)',
    excerpt: 'What actually determines a Maine Coon kitten\'s price in Australia, typical price ranges, what should be included, and the red flags that mean a "bargain" price is too good to be true.',
    category: 'Pricing & Buying',
    date: '2026-09-13',
    readTime: '6 min read',
    image: '/images/hero/hero-1.webp',
    author: 'Cosy Cats Cattery Concierge',
    content: `
If you've started researching Maine Coon kittens in Australia, you've probably noticed prices swing wildly — anywhere from a few hundred dollars for an unregistered "Maine Coon mix" to $5,000+ for a fully health-tested, pedigreed kitten. Here's what actually drives that range.

### 1. What Determines a Maine Coon's Price in Australia
Four things set the price: pedigree documentation (5-generation papers vs none), DNA health testing status for HCM, SMA and PKDef, whether the kitten is desexed and vaccinated before sale, and the breeder's own reputation and waitlist demand. A registered ANCATS or TICA cattery investing in all of the above will always cost more than an unregistered backyard litter — because the underlying cost of producing that kitten responsibly is genuinely higher.

### 2. Typical Price Range by Tier
As a rough guide: pet-quality desexed kittens from a registered Australian cattery typically run $1,800–$3,000. Show-quality or rare-colour kittens (solid white, genuine silver, striking tortoiseshell patterns) often sit higher, $3,000–$5,000+. Breeding-rights kittens sold intact with full papers for another registered breeding program command the highest prices, reflecting their pedigree value.

### 3. Price by Colour & Pattern
Colour genetics don't change temperament or health, but rarer patterns (solid white, certain silver variants) can carry a premium simply due to demand. See our full [colour and coat pattern guide](/blog/maine-coon-colours-and-coat-patterns/) for what's actually rare versus common.

### 4. What Should Be Included at That Price
At minimum, expect: desexing, microchip registration, two rounds of vaccination, a vet health check, and some form of DNA clearance documentation for the parent cats. Anything less at a "premium" price is a red flag.

### 5. Ongoing Costs After Adoption
The purchase price is only the start. Budget for ongoing large-breed nutrition (Maine Coons take 3–5 years to reach full size and need appropriate protein levels throughout), regular grooming tools, and annual vet checks. See our [grooming guide](/blog/maine-coon-grooming-guide/) for what that routine actually costs in time and tools.

### 6. Red Flags — Prices That Are Too Good to Be True
Be cautious of: no willingness to show DNA test certificates, no ANCATS/TICA registration at all, kittens available younger than 8 weeks, or a seller who won't do a video call before you pay a deposit. A genuinely low price usually means one or more of the real costs above simply weren't paid — often at the expense of the parent cats' health testing.

### FAQ
**How much is a Maine Coon kitten?** Typically $1,800–$5,000+ in Australia depending on tier, as above.
**Why are Maine Coons so expensive?** The price reflects genetic health testing, vet care for breeding parents, and years of investment in the bloodline — not markup for its own sake.
**Is a Maine Coon a good investment?** As a companion animal, yes for the right household — but never buy one purely speculating on future breeding value without doing the pedigree research first.

Ready to see current pricing on real, available kittens? Browse our [current litter](/shop/).
    `,
  },
  {
    slug: 'how-to-choose-a-maine-coon-breeder-australia',
    title: 'How to Choose a Reputable Maine Coon Breeder in Australia',
    excerpt: 'The breeder matters more than the kitten in front of you. Here\'s exactly what to ask, what registration actually means, and the red flags of an unregistered or backyard operation.',
    category: 'Pricing & Buying',
    date: '2026-09-06',
    readTime: '7 min read',
    image: '/images/hero/hero-2.webp',
    author: 'Cosy Cats Cattery Concierge',
    content: `
Choosing a Maine Coon breeder is a bigger decision than choosing an individual kitten — the breeder's practices determine the health and temperament of every kitten they've ever produced, not just the one you're looking at today.

### 1. Why the Breeder Matters More Than the Kitten
A responsible breeder screens both parents for hereditary conditions, socialises kittens from birth, and stands behind their kittens with a genuine health guarantee. An irresponsible one can produce a kitten that looks identical in photos but carries undisclosed genetic risk. You're not just buying a kitten — you're buying into that breeder's entire program.

### 2. Questions to Ask Before You Reserve
Ask to see the DNA clearance certificates for both parents (not just a verbal assurance). Ask how old the kitten will be at pickup — reputable breeders never release kittens before 8 weeks, most wait until 10–12. Ask what's included in the price, and ask for a video call to see the kitten and its living environment before you commit a deposit.

### 3. Red Flags of an Unregistered or Backyard Breeder
Watch for: no willingness to provide registration paperwork, kittens always "ready now" with no waitlist (suggesting overbreeding), refusal to let you see the mother cat, and pressure to pay a deposit immediately without documentation. A genuine breeder will never be offended by these questions — if they are, that's itself a red flag.

### 4. What ANCATS/TICA Registration Actually Means
ANCATS (Australian National Cats) and TICA (The International Cat Association) are pedigree registries — a breeder registered with either has agreed to a code of ethics covering breeding age limits, health testing, and record-keeping. Registration doesn't guarantee perfection, but it means there's a body the breeder is accountable to and a paper trail for every cat in the pedigree.

### 5. Regional Availability — Buying From Interstate
Many of Australia's most established Maine Coon catteries are concentrated in a handful of states, which means many buyers reserve a kitten interstate and arrange flight delivery rather than limiting themselves to local breeders only. See our guides on delivery to [Sydney](/blog/flying-a-maine-coon-kitten-to-sydney/) and [Melbourne](/blog/maine-coon-kittens-for-sale-in-melbourne/) for what that process actually looks like.

### 6. Why Cosy Cats Cattery
We're a Canberra-based cattery breeding registered pedigree Maine Coons with full DNA health testing on our breeding lines. We're happy to answer every question above directly — [get in touch](/contact/) with anything you'd ask any breeder before reserving.

### FAQ
**Is ANCATS or TICA registration required to sell kittens legally in Australia?** No, registration is voluntary — which is exactly why it matters as a trust signal when you're choosing between breeders.
**Can I visit the cattery in person?** Reputable breeders generally welcome this, though biosecurity protocols around unvaccinated kittens may mean visits are scheduled after the first vaccination milestone.

Have more questions? [Contact our concierge](/contact/) directly.
    `,
  },
  {
    slug: 'maine-coon-grooming-guide',
    title: 'Maine Coon Grooming 101: How Often & How to Do It Right',
    excerpt: 'Why Maine Coons need a real grooming routine, how often to brush and bathe, and the tools that actually make a difference on their long double coat.',
    category: 'Care & Welfare',
    date: '2026-08-30',
    readTime: '5 min read',
    image: '/images/kittens/zo.webp',
    author: 'Cosy Cats Feline Specialists',
    content: `
Maine Coons carry one of the most impressive coats in the cat world — a long, semi-water-resistant double coat built for New England winters. That coat needs real maintenance, but far less than most people assume.

### 1. Why Maine Coons Need Regular Grooming
The undercoat sheds year-round and heavily during seasonal changes. Left unbrushed, loose undercoat mats against the guard hairs, which is uncomfortable for the cat and can eventually require a vet to shave out severe mats. Regular brushing prevents this entirely.

### 2. The Weekly Routine
A slicker brush for the outer coat plus an undercoat rake once or twice a week is enough for most Maine Coons outside of shedding season. Focus on the ruff, britches (the fluffy back-leg fur), and the tail — the three areas that mat first. During spring and autumn coat blow, daily brushing for a week or two keeps things manageable.

### 3. Bathing Frequency
Despite the coat's water-resistant nature, most Maine Coons tolerate — and some genuinely enjoy — the occasional bath. Monthly to quarterly is typical, more often if a cat gets into something it shouldn't. Always fully dry the undercoat afterward; a damp undercoat left to air-dry is a fast track to matting.

### 4. Recommended Tools
A quality slicker brush, a rounded-pin undercoat rake, a stainless steel comb for finishing, and a good nail trimmer cover the essentials. We've put together everything needed in our [Royal Grooming Suite](/shop/royal-velvet-maine-coon-grooming-suite/), designed specifically for a Maine Coon's coat density.

### FAQ
**How often should I groom a Maine Coon?** Weekly at minimum, daily during seasonal coat blow.
**Do Maine Coons need professional grooming?** Not usually if brushed regularly at home — professional grooming becomes relevant mainly if matting has already set in.
**Do I have to bathe my Maine Coon?** Not strictly, but an occasional bath during heavy shedding periods makes brushing noticeably easier.

Shop the grooming kit built for this coat: [Royal Grooming Suite](/shop/royal-velvet-maine-coon-grooming-suite/).
    `,
  },
  {
    slug: 'maine-coon-colours-and-coat-patterns',
    title: 'Maine Coon Colours & Coat Patterns Explained (Black, Ginger, Silver Tabby & More)',
    excerpt: 'From solid black to silver tabby to tuxedo bicolour — what determines a Maine Coon\'s colour, which patterns are common versus rare, and how to tell them apart.',
    category: 'Colours & Appearance',
    date: '2026-08-23',
    readTime: '6 min read',
    image: '/images/kittens/luffy.webp',
    author: 'Cosy Cats Breed Historian',
    content: `
Maine Coons come in nearly every colour and pattern the domestic cat gene pool allows — colour is purely coat genetics and has zero bearing on size, temperament, or health.

### 1. Solid Black
A true solid black Maine Coon has no visible tabby markings and often develops a slight "ghost tabby" sheen in bright sunlight — this is normal, not a fault. Black is one of the most classic, striking colours in the breed.

### 2. Red / Ginger Tabby
Warm orange-to-mahogany tones with bold tabby striping are among the most popular Maine Coon colours, often paired with dramatic lynx-tip ear furnishings. Ginger males are statistically more common than ginger females due to the sex-linked nature of the orange gene.

### 3. Silver & Brown Tabby
Silver tabbies show the classic tabby pattern over a cool, smoky-grey base coat, while brown tabbies show the same pattern over warm brown tones. Both are common, highly sought-after patterns.

### 4. Solid White
Genuinely solid white Maine Coons are less common than tabby patterns and often carry striking blue, green, or odd-coloured eyes. White cats with blue eyes can carry a higher incidence of deafness — a responsible breeder tests for this and discloses it upfront.

### 5. Tuxedo & Bicolour
Black-and-white "tuxedo" patterning, or any colour combined with white patches, is a distinct genetic category from solid or tabby colours and produces some of the most visually striking Maine Coons.

### FAQ
**Does colour affect a Maine Coon's temperament?** No — colour is purely coat genetics with no link to personality.
**Are certain colours rarer or more expensive?** Solid white and certain silver variants are less commonly bred and often carry a modest premium due to demand, not because they're a different quality of cat.

See our [currently available kittens by colour](/shop/) — every colour above is represented in real, available litters.
    `,
  },
  {
    slug: 'complete-maine-coon-breed-guide',
    title: 'The Complete Maine Coon Breed Guide: History, Traits & What Makes Them Different',
    excerpt: 'What is a Maine Coon, where did they come from, and what actually separates European from American lines? A full breed primer in one place.',
    category: 'Breed Heritage',
    date: '2026-08-16',
    readTime: '8 min read',
    image: '/images/hero/hero-3.webp',
    author: 'Cosy Cats Breed Historian',
    content: `
The Maine Coon is one of the oldest natural cat breeds in North America and the largest domesticated cat breed by average size. Here's the full picture, from origin to what makes a genuine Maine Coon.

### 1. What Is a Maine Coon?
A Maine Coon is a large, long-haired domestic cat breed native to the US state of Maine, recognised by a squared muzzle, tufted lynx-like ears, a long ruff, and a body that continues growing for 3–5 years — far longer than most cat breeds, which mature by 12 months.

### 2. Origin & History
The most credible theory is that long-haired cats brought to New England by early sailors and settlers interbred with local domestic cats, with natural selection over generations favouring a thick, weatherproof double coat suited to harsh Maine winters. Popular folk tales about raccoon or bobcat ancestry are genetically impossible — the name likely comes simply from their bushy, raccoon-like tails, not actual raccoon heritage.

One distinctive historical trait worth knowing: polydactyly (extra toes) was historically common in early Maine Coon populations, giving natural "snowshoe" paws for grip on snow and ship decks. It's a harmless genetic variation still occasionally seen today, adding extra charm and dexterity where it appears.

### 3. European vs American Lines
"European" and "American" Maine Coon lines refer to which established bloodlines a breeding program descends from, not a different breed. European lines are sometimes bred for a more dramatic, extreme "wild" look with heavier boning, while American lines often emphasise the original, more moderate breed standard — both are equally genuine Maine Coons. Read our dedicated [European vs American comparison](/blog/european-vs-american-maine-coon/) for the specifics.

### 4. Physical Traits
Adult males typically reach 8–13kg with a body length up to 120cm nose to tail; females average 5.5–8kg. The coat is longer around the ruff, stomach, and britches than along the back, an adaptation that sheds snow efficiently. See our [size guide](/blog/how-big-do-maine-coons-get/) for the full growth timeline.

### 5. Personality Snapshot
Maine Coons are known as "gentle giants" — affectionate, sociable, and unusually dog-like in their willingness to follow their owners around and even walk on a leash. Full detail in our [temperament guide](/blog/are-maine-coons-good-family-pets/).

### 6. How to Tell If Your Cat Is Part Maine Coon
Physical traits (squared muzzle, ear tufts, plumed tail, continued growth past a year) are a starting point, but appearance alone can be misleading — a genetic breed test is the only certain confirmation. See our dedicated guide: [Is My Cat Part Maine Coon?](/blog/is-my-cat-part-maine-coon/)

### FAQ
**What is a Maine Coon?** A large, long-haired, naturally-occurring domestic cat breed originating in Maine, USA.
**How did the Maine Coon originate?** Most likely from long-haired cats brought by early settlers/sailors, naturally adapting a thick coat over generations.
**Are Maine Coons a wildcat hybrid?** No — despite their size and ear tufts, they have no wildcat ancestry; it's a fully domestic breed.

Browse our current pedigree Maine Coon kittens: [Shop](/shop/).
    `,
  },
  {
    slug: 'how-big-do-maine-coons-get',
    title: 'How Big Do Maine Coons Get? Size, Weight & Growth Timeline',
    excerpt: 'Average adult weight and length by gender, how long it takes a Maine Coon to reach full size, and what actually affects how big yours will grow.',
    category: 'Breed Heritage',
    date: '2026-08-09',
    readTime: '5 min read',
    image: '/images/kittens/wolverine.webp',
    author: 'Cosy Cats Breed Historian',
    content: `
Maine Coons are famous for their size, but exactly how big is "big," and how long does it take to get there?

### 1. Average Weight and Length by Gender
Adult males typically weigh 8–13kg with a body length (nose to tail) up to 120cm. Adult females are noticeably smaller, averaging 5.5–8kg. Some exceptionally large males exceed these ranges, but anything advertised as guaranteed "20kg+" should be treated with scepticism — that's well outside normal, healthy range for the breed.

### 2. The 3–5 Year Growth Timeline
Unlike most cat breeds that reach full adult size by 12 months, Maine Coons keep growing — in stages — for 3 to 5 years. Kittens often go through visibly gawky, long-legged phases before their body proportions catch up, similar to large dog breeds.

### 3. What Affects Final Size
Genetics from both parents set the ceiling, but nutrition during the growth years matters enormously — a diet with adequate protein and the right calcium-to-phosphorus ratio supports healthy skeletal development, while poor nutrition during those years can permanently limit growth. Neutering timing can also have a modest effect on final frame size.

### 4. Space Considerations for a Growing Giant
A full-size Maine Coon needs sturdier furniture than a standard cat — a flimsy scratching post will topple under an adult male's weight and leaping force. Factor this into your setup well before they reach full size.

### FAQ
**How heavy do Maine Coons get?** 8–13kg for males, 5.5–8kg for females, on average.
**How long until a Maine Coon is fully grown?** 3–5 years, much longer than most cat breeds.
**Are Maine Coons the biggest cat breed?** They're widely regarded as the largest commonly-kept domestic cat breed by average size.

See our current available kittens from proven large-bodied lines: [Shop](/shop/).
    `,
  },
  {
    slug: 'are-maine-coons-good-family-pets',
    title: 'Are Maine Coons Good Family Pets? Temperament, Kids & Other Animals',
    excerpt: 'A full look at Maine Coon temperament — how they do with children, dogs, other cats, first-time owners, and whether they\'re suited to indoor or outdoor life in Australia.',
    category: 'Temperament & Behaviour',
    date: '2026-08-02',
    readTime: '7 min read',
    image: '/images/kittens/maya.webp',
    author: 'Cosy Cats Feline Specialists',
    content: `
"Gentle giant" is the phrase you'll see attached to Maine Coons everywhere, and it holds up — but here's what that actually looks like day to day.

### 1. Maine Coon Temperament at a Glance
Maine Coons are affectionate, sociable, and famously patient — a combination that makes them one of the most family-friendly large cat breeds. They're vocal in a soft, chirping way rather than the loud yowl of some breeds, and many actively seek out human company rather than being independent.

### 2. Are They Good With Kids?
Yes, generally — their size means they're less easily startled or hurt by boisterous play than a small, delicate breed, and their patient temperament tends to tolerate handling well. As with any cat, supervise young children and teach gentle handling regardless of breed.

### 3. Are They Good With Dogs and Other Cats?
Most Maine Coons integrate well with dogs and other cats, especially when introduced gradually. Their easygoing nature extends further toward other animals than many cat breeds — it's common to hear Maine Coon owners describe their cat and dog as genuine friends.

### 4. First-Time Owner Suitability
Yes — they're low-drama, tolerant of handling, and highly trainable (many walk on a leash and learn tricks), making them a forgiving, rewarding choice for someone new to cat ownership.

### 5. Indoor vs Outdoor Life in Australia
We recommend indoor (or secure outdoor enclosure) living for Maine Coons in Australia — their high value makes them a theft target, and Australian wildlife laws and native fauna protection are additional reasons to avoid free-roaming outdoor access. A large indoor space with vertical climbing options suits their size well; see our [cat tower](/shop/monarch-grand-chateau-cat-castle/) built specifically for large-breed cats.

### 6. Common Behaviour Myths, Debunked
Despite their size, Maine Coons are not aggressive or dangerous — see our full [myth-busting guide](/blog/maine-coon-myths-debunked/) for specifics on where these misconceptions come from.

### FAQ
**Are Maine Coons good pets?** Yes — widely regarded as one of the most family-friendly large cat breeds.
**Do Maine Coons get along with dogs?** Generally yes, especially with a gradual introduction.
**Are Maine Coons good for first-time owners?** Yes — their tolerant, trainable nature suits new cat owners well.

Ready to meet your future Maine Coon? [Reserve a kitten](/shop/).
    `,
  },
  {
    slug: 'is-my-cat-part-maine-coon',
    title: 'Is My Cat Part Maine Coon? How to Tell',
    excerpt: 'A practical checklist of physical and temperament traits — plus why appearance alone can be misleading and what actually confirms Maine Coon ancestry.',
    category: 'Breed Heritage',
    date: '2026-07-26',
    readTime: '5 min read',
    image: '/images/kittens/frayer.webp',
    author: 'Cosy Cats Breed Historian',
    content: `
It's one of the most common questions in cat-owner forums: "does my fluffy, oversized cat have Maine Coon in it?" Here's how to actually assess that.

### 1. Physical Checklist
Look for a squared-off muzzle rather than a rounded one, tufted lynx-like ear tips, a long plumed tail, a ruff of longer fur around the neck and chest, and — most tellingly — a body that kept growing well past 12 months old rather than settling into adult size early.

### 2. Temperament Checklist
Maine Coon-influenced cats often show the breed's characteristic sociability: following owners room to room, a soft chirping vocalisation rather than a typical meow, and an unusually tolerant, patient response to handling.

### 3. Why Looks Alone Aren't Proof
Many domestic long-haired cats share individual traits with Maine Coons without any actual ancestry — large size, tufted ears, or a fluffy tail can appear in mixed-breed cats coincidentally. Physical resemblance is a starting point for curiosity, not a confirmation.

### 4. What Actually Confirms It
A cat DNA breed test is the only way to get a real answer, and even then, "part Maine Coon" in a mixed-breed cat is different from a documented pedigree Maine Coon with a paper trail. If breed certainty matters to you — for a registered pet or future breeding — start with a pedigreed kitten from a registered cattery rather than trying to retroactively confirm a mixed-breed cat's ancestry.

### FAQ
**How do I know if my cat is part Maine Coon?** Check the physical and temperament traits above, then confirm with a DNA breed test if you want certainty.
**Can a DNA test confirm Maine Coon ancestry?** Yes — commercial cat DNA tests can identify Maine Coon ancestry with reasonable confidence, though pedigree documentation remains the gold standard for purebred confirmation.

Looking for a documented pedigree Maine Coon instead? [See our available kittens](/shop/), each with full pedigree papers.
    `,
  },
  {
    slug: 'maine-coon-myths-debunked',
    title: 'Maine Coon Myths: Can They Really Hurt You? (Behaviour Facts vs Fiction)',
    excerpt: 'Addressing the internet\'s favourite Maine Coon myths head-on — are they dangerous, aggressive, or secretly part wildcat? Here are the facts.',
    category: 'Temperament & Behaviour',
    date: '2026-07-19',
    readTime: '4 min read',
    image: '/images/kittens/smokey-1.webp',
    author: 'Cosy Cats Feline Specialists',
    content: `
A quick search for "Maine Coon" turns up some oddly dramatic questions — here's the honest answer to each.

### Myth 1: "Can a Maine Coon hurt a dog or a person?"
No. Despite their impressive size, Maine Coons are consistently ranked among the gentlest, least aggressive cat breeds. Their strength is real, but their temperament is famously mild — there is no credible basis for treating them as a safety risk.

### Myth 2: "Are Maine Coons aggressive?"
No more so than any other cat breed — arguably less so. Aggression in any cat is far more strongly linked to socialisation, health, and individual personality than breed.

### Myth 3: "Are Maine Coons part wildcat?"
No. Despite tufted ears and an impressive size that invite comparisons to bobcats or lynxes, Maine Coons have no wildcat ancestry. It's a fully domestic breed that developed its rugged appearance through natural adaptation to cold climates, not crossbreeding with wild species.

### Myth 4: "Are Maine Coons dangerous to own around children?"
No — see our full [temperament and family guide](/blog/are-maine-coons-good-family-pets/) for why the opposite is generally true.

### The Real Takeaway
"Gentle giant" isn't marketing spin — it's the single most consistent trait reported across Maine Coon owners, breed clubs, and veterinary behaviourists alike. Size is the only "intimidating" thing about this breed.

Curious what a real Maine Coon temperament looks like? [Browse our available kittens](/shop/) — every listing includes honest, specific temperament notes.
    `,
  },
  {
    slug: 'flying-a-maine-coon-kitten-to-sydney',
    title: 'Flying a Maine Coon Kitten to Sydney: What to Expect',
    excerpt: 'A straightforward look at how VIP flight delivery from our Canberra cattery to Sydney actually works, from booking to touchdown.',
    category: 'Delivery & Logistics',
    date: '2026-07-12',
    readTime: '4 min read',
    image: '/images/hero/hero-1.webp',
    author: 'Cosy Cats Cattery Concierge',
    content: `
Canberra to Sydney is one of our most common delivery routes, and it's a short enough trip that the process is refreshingly simple.

### 1. Booking the Flight
Once your reservation and final payment are confirmed, we book a climate-controlled cabin space with a pet-specialist airline courier, timed to your kitten's readiness (never before 8–12 weeks old and a full veterinary health check).

### 2. What Happens on Delivery Day
Your kitten travels in an approved airline pet carrier, accompanied through check-in and handover by our team on the Canberra side. Depending on the service level arranged, delivery can be door-to-door in Sydney or a Sydney airport pickup — we'll confirm which suits you during booking.

### 3. What You'll Receive on Arrival
Alongside your kitten: pedigree papers, vaccination and microchip records, DNA clearance certificates, and the adoption hamper. We recommend having a quiet, kitten-proofed room ready so they can decompress after travel before meeting the whole household at once.

### 4. Cost and Timing
Nationwide flight delivery is included at no extra charge for reservations from our current litters — see current listings and pricing on [Shop](/shop/). Timing depends on flight availability and your kitten's age readiness; our concierge will give you a realistic window during booking.

### FAQ
**Do you deliver Maine Coon kittens to Sydney?** Yes, regularly — it's one of our most common delivery destinations.
**Is flying safe for a young kitten?** Yes, when done at the right age with a pet-specialist courier and climate-controlled cabin conditions, which is exactly how we arrange every delivery.

Ready to arrange Sydney delivery? [Contact our concierge](/contact/) with your preferred timing.
    `,
  },
  {
    slug: 'maine-coon-kittens-for-sale-in-melbourne',
    title: 'Maine Coon Kittens for Sale in Melbourne: Delivery, Pricing & What to Know',
    excerpt: 'Everything a Melbourne-based buyer needs to know about reserving a Maine Coon kitten from an interstate cattery, including honest delivery logistics.',
    category: 'Delivery & Logistics',
    date: '2026-07-05',
    readTime: '5 min read',
    image: '/images/hero/hero-2.webp',
    author: 'Cosy Cats Cattery Concierge',
    content: `
A large share of our reservations come from Melbourne — here's exactly what the process looks like when you're buying from an interstate cattery rather than a local one.

### 1. We're Based in Canberra, Not Melbourne — Here's Why That's Fine
We don't have a Melbourne premises, and we won't pretend otherwise. What we do have is a well-established VIP flight delivery process that gets kittens from our Canberra cattery to Melbourne routinely and safely, with the same health guarantees as a local pickup.

### 2. Why Buy Interstate at All?
Registered, health-tested Maine Coon catteries are relatively concentrated across Australia, which means limiting your search to "breeders within driving distance" often means a longer waitlist or a compromise on health testing standards. Most serious buyers now expect to arrange interstate delivery as standard.

### 3. Pricing for Melbourne Buyers
Pricing is identical whether you're in Melbourne or Canberra — flight delivery is included, not an add-on surcharge. See current kittens and prices on [Shop](/shop/).

### 4. What Delivery Day Looks Like
Your kitten flies via a pet-specialist airline courier in a climate-controlled cabin, with either Melbourne airport pickup or door-to-door delivery depending on the service level you choose. We coordinate timing around your schedule and the kitten's age readiness.

### FAQ
**Do you deliver Maine Coon kittens to Melbourne?** Yes — it's one of our most frequent delivery destinations.
**Is there an extra cost for Melbourne delivery?** No, nationwide flight delivery is included in our listed prices.

See current kittens available for Melbourne delivery: [Shop](/shop/), or [contact us](/contact/) with any questions before you reserve.
    `,
  },
  {
    slug: 'maine-coon-delivery-brisbane-perth-adelaide',
    title: 'Maine Coon Kitten Delivery: Brisbane, Perth, Adelaide, Hobart & Darwin',
    excerpt: 'How nationwide VIP flight delivery works for buyers outside the major east-coast corridor, honestly explained city by city.',
    category: 'Delivery & Logistics',
    date: '2026-06-28',
    readTime: '5 min read',
    image: '/images/hero/hero-4.webp',
    author: 'Cosy Cats Cattery Concierge',
    content: `
Sydney and Melbourne get most of the attention in delivery questions, but we ship Maine Coon kittens to every major Australian city — here's what that looks like further afield.

### 1. Brisbane & Queensland
A well-serviced route with regular flight availability — timing is generally straightforward to arrange around your kitten's readiness age.

### 2. Perth & Western Australia
The longest domestic route we service. We plan Perth deliveries slightly further in advance to lock in optimal flight timing and minimise total travel time for the kitten.

### 3. Adelaide & South Australia
A reliable, well-established route with flexible scheduling.

### 4. Hobart & Tasmania
Tasmania deliveries require slightly more lead time due to more limited direct flight frequency, but are routine and well within our standard process.

### 5. Darwin & the Northern Territory
Our least frequent but still fully supported route — climate considerations for the Top End are factored into scheduling to avoid extreme heat during transit.

### 6. What Stays the Same Everywhere
Regardless of destination: climate-controlled cabin transport via a pet-specialist courier, full pedigree and health documentation on arrival, and no delivery surcharge built into the listed kitten price.

### FAQ
**Do you deliver Maine Coon kittens Australia-wide?** Yes, to all major capital cities and most regional hubs.
**Does delivery cost extra for further destinations?** No — nationwide flight delivery is included in our listed prices regardless of distance.

Wherever you are in Australia, [browse available kittens](/shop/) or [contact our concierge](/contact/) to confirm delivery timing to your city.
    `,
  },
  {
    slug: 'maine-coon-vs-other-large-cat-breeds',
    title: 'Maine Coon vs Other Large Cat Breeds: How They Actually Compare',
    excerpt: 'Maine Coon, Ragdoll, Norwegian Forest Cat, Siberian — how these popular large breeds actually differ in size, coat, and temperament.',
    category: 'Breed Heritage',
    date: '2026-06-21',
    readTime: '6 min read',
    image: '/images/kittens/snowball.webp',
    author: 'Cosy Cats Breed Historian',
    content: `
Maine Coons are often mentioned in the same breath as a handful of other large, long-haired breeds. Here's how they actually differ.

### 1. Maine Coon vs Ragdoll
Ragdolls are known for going fully limp when held ("flopping"), a semi-longhair coat that's lower-maintenance than a Maine Coon's, and a slightly smaller average size (typically 4.5–9kg vs a Maine Coon's up to 13kg). Maine Coons are generally more active and dog-like in personality; Ragdolls lean calmer and more purely lap-oriented.

### 2. Maine Coon vs Norwegian Forest Cat
These two are often confused in photos — both are large, cold-climate-adapted, long-haired breeds with similar ear tufting. Norwegian Forest Cats tend to have a straighter, more water-resistant coat and a slightly more triangular head shape versus the Maine Coon's squared muzzle. Size ranges overlap significantly.

### 3. Maine Coon vs Siberian
Siberians are prized for producing comparatively less of the Fel d 1 allergen, making them a common choice for allergy-sensitive households, though no cat breed is truly hypoallergenic. They're similar in size to a Maine Coon but with a denser, triple-layer coat.

### 4. What Sets the Maine Coon Apart
The combination of sheer size (the largest of this group on average), the specific squared muzzle and lynx-tip ears, and a temperament frequently described as the most dog-like of any cat breed — following owners room to room, learning tricks, and often enjoying water more than typical cats.

### FAQ
**What's the biggest domestic cat breed?** The Maine Coon is widely regarded as the largest commonly-kept domestic breed by average size.
**Which large breed is most affectionate?** All four breeds above are known for above-average affection; Maine Coons and Ragdolls are the two most frequently described as "always following me around."

See our current pedigree Maine Coon kittens: [Shop](/shop/).
    `,
  },
  {
    slug: 'maine-coon-kitten-checklist-before-you-bring-them-home',
    title: 'Maine Coon Kitten Checklist: What to Prepare Before Your Kitten Arrives',
    excerpt: 'From XXL litter trays to sturdy scratching posts — the practical setup checklist for bringing home a breed that keeps growing for years.',
    category: 'Care & Welfare',
    date: '2026-06-14',
    readTime: '5 min read',
    image: '/images/kittens/bob.webp',
    author: 'Cosy Cats Feline Specialists',
    content: `
Maine Coons outgrow standard cat gear faster than most owners expect. Here's what to have ready before pickup or delivery day.

### 1. Sturdy, Oversized Furniture
Standard scratching posts topple under an adult Maine Coon's weight and leaping force. Invest in a solid, weighted cat tree from the start — see our [Monarch Grand Chateau](/shop/monarch-grand-chateau-cat-castle/), built specifically for large-breed cats.

### 2. An XXL Litter Tray
A Maine Coon's full-grown body length (up to 120cm nose to tail) needs genuine room to turn and dig comfortably — a standard-size tray becomes uncomfortably small well before adulthood. Size up earlier than you think necessary.

### 3. Large-Breed-Appropriate Nutrition
Growth continues for 3–5 years, so nutrition needs differ from a cat that matures by 12 months. Look for food formulated for large-breed kittens with appropriate protein and calcium-to-phosphorus ratios for sustained skeletal development.

### 4. Grooming Tools From Day One
Establishing a brushing routine early — even before matting becomes an issue — makes it a normal, tolerated part of life rather than a fight later. See our [grooming guide](/blog/maine-coon-grooming-guide/) for the specific tools worth having ready.

### 5. A Quiet Settling-In Space
Especially after flight delivery, a small, kitten-proofed room lets your new arrival decompress before meeting the whole household, other pets, and the full run of the house.

### 6. Vet Registration Before Arrival
Have a vet lined up in advance for the follow-up check and to register your kitten's existing microchip and vaccination records into your local system.

### FAQ
**What size litter tray does a Maine Coon need?** Significantly larger than standard — many owners use tote-style trays rather than typical retail cat litter boxes.
**When should I start grooming a Maine Coon kitten?** From day one, even with light, short sessions — it builds tolerance well before the adult coat needs serious maintenance.

Ready to bring one home? [See available kittens](/shop/).
    `,
  },
  {
    slug: 'european-vs-american-maine-coon',
    title: 'European vs American Maine Coon: What\'s the Real Difference?',
    excerpt: 'Same breed, two bloodline traditions — how European and American Maine Coon lines actually differ in look and why neither is "more authentic."',
    category: 'Breed Heritage',
    date: '2026-06-07',
    readTime: '5 min read',
    image: '/images/kittens/smokey-2.webp',
    author: 'Cosy Cats Breed Historian',
    content: `
"European" and "American" Maine Coon are two terms you'll see constantly in breeder listings — here's what they actually mean.

### 1. It's One Breed, Not Two
Both terms describe the same breed, Maine Coon, tracing back to established bloodlines developed on different continents after the breed was exported from the US. Neither is a separate breed, and neither is "more real" than the other.

### 2. The Look — European Lines
European lines are often bred toward a more dramatic, exaggerated look — heavier boning, a more pronounced "wild" appearance, and sometimes a larger overall frame, reflecting decades of specific selective breeding within European cattery programs.

### 3. The Look — American Lines
American lines more often emphasise the original, moderate breed standard as it developed in the US — a slightly less exaggerated profile while retaining all the breed's hallmark traits (squared muzzle, ear tufts, plumed tail).

### 4. Temperament — Any Real Difference?
No meaningful temperament difference is attributable to line origin — personality varies by individual cat and breeding program, not by which continent's bloodlines a pedigree traces through.

### 5. Which Should You Choose?
Neither is objectively better — it comes down to aesthetic preference and which specific breeding program's cats you connect with. Ask any breeder directly which lines their cattery is built on and look at photos of their adult cats, not just kittens, to judge the mature look you're actually selecting for.

### FAQ
**Is a European Maine Coon a different breed from an American one?** No — same breed, different established bloodline traditions.
**Are European Maine Coons bigger?** Often bred toward a larger, heavier-boned look, but individual size still varies significantly within both traditions.

Curious about the lines behind our own cattery? [Contact us](/contact/) directly with any pedigree questions.
    `,
  },
  {
    slug: 'complete-guide-to-raising-a-maine-coon-in-australia',
    title: 'The Comprehensive Guide to Raising a Maine Coon in Australia: Climate, Nutrition & Space',
    excerpt: 'Everything you must know about caring for the gentle giant of the cat world in Australian climates, from summer grooming to dietary bone development.',
    category: 'Care & Welfare',
    date: '2025-02-15',
    readTime: '6 min read',
    image: '/images/hero/hero-2.webp',
    author: 'Cosy Cats Feline Specialists',
    content: `
Maine Coons are world-renowned as the "gentle giants" of the feline kingdom. Originally adapted for the harsh winters of North America and Europe, their thick double coats, water-resistant fur, and robust muscular frames make them distinctive. When bringing a Maine Coon into an Australian household, specific care adjustments ensure their lifelong health and happiness.

### 1. Managing Australian Summer & Indoor Climate
While Maine Coons possess a dense undercoat, their fur acts as natural insulation against both cold and moderate heat. However, during Australian summer heatwaves:
- Maintain indoor air-conditioning or provide cool tiled sanctuaries.
- Never shave a Maine Coon's coat—shaving disrupts their thermal regulation and exposes skin to sunburn. Regular dematting and line-combing to remove dead undercoat is the true solution.
- Provide stainless steel or ceramic circulating water fountains to encourage constant hydration.

### 2. The 4-Year Growth Cycle & Bone Nutrition
Unlike standard domestic cats who reach full adult size by 12 months, Maine Coons continue growing through their fourth or fifth year.
- High-protein, high-taurine diets with adequate glucosamine and chondroitin are essential for supporting their elongated spine and heavy skeletal joints.
- Controlled caloric density prevents rapid unhealthy weight gain before cartilage has fully solidified.

### 3. Space, Vertical Territory & Heavy-Duty Furniture
A full-grown male Maine Coon can measure over 1 metre from nose to tail tip and weigh between 8 to 13 kilograms.
- Standard pet scratching posts will topple; invest in solid timber cat castles with wide weighted bases.
- Ensure litter boxes are XXL jumbo storage-tote size (at least 75cm in length) to allow comfortable turning and digging.

At Cosy Cats Cattery, all our kittens are born and raised in purpose-designed family nurseries to cultivate social, brave, and deeply bonded companions.
    `,
  },
  {
    slug: 'understanding-maine-coon-dna-testing-hcm-sma-pkdef',
    title: 'Why 100% DNA Health Testing Matters: HCM, SMA and PKDef Explained',
    excerpt: 'A deep dive into genetic screening for Maine Coon heart and spinal conditions, and how ethical Australian breeding preserves breed longevity.',
    category: 'Genetics & Health',
    date: '2025-01-20',
    readTime: '5 min read',
    image: '/images/hero/hero-4.webp',
    author: 'Cosy Cats Veterinary Advisory',
    content: `
Ethical breeding is founded upon rigorous genetic transparency. Purebred Maine Coons carry known hereditary vulnerabilities that responsible registered breeders can completely eliminate through DNA profiling and echocardiogram testing.

### Key Genetic Conditions We Screen:
1. **Hypertrophic Cardiomyopathy (HCM):** A condition causing thickening of the feline heart muscle. We test for both the A31P and A74T genetic mutations and perform regular veterinary cardiologist echocardiograms on our breeding kings and queens.
2. **Spinal Muscular Atrophy (SMA):** An autosomal recessive disorder leading to loss of spinal cord motor neurons and muscle weakness in hind limbs.
3. **Pyruvate Kinase Deficiency (PKDef):** An inherited hemolytic anemia causing red blood cell breakdown.

Every kitten adopted from Cosy Cats Cattery is accompanied by written genetic clearance certificates ensuring both parents are 100% negative/clear for all known feline hereditary markers.
    `,
  },
  {
    slug: 'polydactyl-maine-coons-history-and-characteristics',
    title: 'The Legend of Polydactyl Maine Coons: Extra Toes, Superb Balance & Heritage',
    excerpt: 'Discover why historic Maine Coons possessed extra toes, and why these gentle mitten-pawed giants remain one of the most sought-after pedigrees.',
    category: 'Breed Heritage',
    date: '2024-12-10',
    readTime: '4 min read',
    image: '/images/hero/hero-3.webp',
    author: 'Cosy Cats Breed Historian',
    content: `
Polydactyly is a natural genetic variation where a cat is born with more than the standard number of digits—often giving them adorable "mitten paws" or "snowshoe feet".

Historically, up to 40% of original wild Maine Coons in the state of Maine possessed polydactyl paws. These wide paws acted as natural snowshoes during deep snowfalls and provided unrivaled grip on wet ship decks alongside merchant sailors.

Polydactyly is completely harmless and adds distinctive charm and dextrous agility. Polydactyl kittens are known for exceptional intelligence and often love using their extra-wide paws to gently hold hands and play.
    `,
  },
];

export const REVIEWS = [
  {
    id: 'rev-1',
    author: 'Victoria & James Sterling',
    location: 'Mosman, Sydney NSW',
    rating: 5,
    date: '3 days ago',
    verified: true,
    title: 'The most wonderful, healthy pedigree kitten we could have ever dreamed of!',
    comment: 'Adopting our black smoke boy (Lord Winston) from Cosy Cats Cattery was a wonderful experience. The team in Canberra sent weekly HD video updates, complete DNA clearance certificates, and coordinated his VIP flight to Sydney seamlessly. He arrived confident, affectionate, and already purring up a storm.',
    kitten: 'Lord Winston — Royal Black Smoke Male',
  },
  {
    id: 'rev-2',
    author: 'Dr. Lachlan MacIntyre',
    location: 'Toorak, Melbourne VIC',
    rating: 4,
    date: '1 week ago',
    verified: true,
    title: 'Exceptional DNA health transparency — long waitlist but worth every day',
    comment: 'As a veterinary professional, genetic screening was paramount. Cosy Cats Cattery provided full N/N lab results for HCM, SMA, and PKDef. The litter reservation waitlist took nearly 8 weeks due to immense demand, but our silver shaded queen is colossal, robust, and in immaculate health.',
    kitten: 'Lady Arabella — Silver Shaded High Smoke',
  },
  {
    id: 'rev-3',
    author: 'Sophie & Mark Henderson',
    location: 'New Farm, Brisbane QLD',
    rating: 3,
    date: '2 weeks ago',
    verified: true,
    title: 'Gorgeous kitten, but Qantas airline delayed pet cargo by 2 hours',
    comment: 'Our polydactyl boy Thorin is healthy, sweet, and loves playing. However, the flight was delayed over 2 hours due to Sydney airport runway weather before arriving in Brisbane. The Cosy Cats team stayed on the phone with us until he was in our arms, but airport travel was stressful on the day.',
    kitten: 'Prince Thorin — Giant Red Tabby Polydactyl',
  },
  {
    id: 'rev-4',
    author: 'Eleanor Vance',
    location: 'Yarralumla, Canberra ACT',
    rating: 5,
    date: '3 weeks ago',
    verified: true,
    title: 'Visiting the Canberra estate was unforgettable — pure feline luxury',
    comment: 'We had the privilege of an in-person nursery appointment in Canberra. The cattery is pristine, completely cage-free, and filled with bespoke solid timber trees and sensory enrichment. The kittens are handled with immense love from birth. Our blue tortie female is the absolute jewel of our home.',
    kitten: 'Princess Freya — Blue Cream Tortie Smoke',
  },
  {
    id: 'rev-5',
    author: 'Harrison & Clara Cole',
    location: 'Cottesloe, Perth WA',
    rating: 3,
    date: '1 month ago',
    verified: true,
    title: 'Solid timber cat castle is exceptional, but freight box is extremely heavy',
    comment: 'We ordered the 2.2m Monarch Grand Chateau tree. It is built like a fortress from solid Tasmanian Oak with zero sway even when our 10kg boy leaps onto the top tier. Be prepared: the 38kg base is very heavy to assemble and took two strong people to move upstairs.',
    kitten: 'The Monarch Grand Chateau & Care Suite',
  },
  {
    id: 'rev-6',
    author: 'Claire & David Beaumont',
    location: 'North Adelaide, SA',
    rating: 4,
    date: '1 month ago',
    verified: true,
    title: 'Truly gentle giants — incredible with kids, but daily brushing is a must!',
    comment: 'The early bio-sensor neurological stimulation this cattery performs makes a noticeable difference. Our kitten settled in on day one without fear, immediately befriending our Golden Retriever. Just be prepared for dedicated daily line-brushing as the European coat ruff is lavish!',
    kitten: 'Duchess Genevieve Lineage Adoption',
  },
  {
    id: 'rev-7',
    author: 'Marcus & Liam Zhao',
    location: 'South Yarra, Melbourne VIC',
    rating: 5,
    date: '2 months ago',
    verified: true,
    title: 'Champion European bone structure and unmistakable lynx ear tufts',
    comment: 'Our boy is now 7 months old and already over 6.5 kg. The breed type, muzzle squareness, and temperament match authentic European Grand Champion standards. Solid pedigree paperwork and microchip transfer completed smoothly.',
    kitten: 'Baron Maximilian Russian Blue Bloodline',
  },
  {
    id: 'rev-8',
    author: 'Rebecca & Anthony Miller',
    location: 'Paddington, Sydney NSW',
    rating: 4,
    date: '2 months ago',
    verified: true,
    title: 'Thriving kitten transition and thorough raw diet guidance',
    comment: 'Cosy Cats provided a comprehensive adoption hamper with mother scent blanket and food transition schedule. The high-protein raw diet took about a week for his sensitive stomach to fully adjust, but he is now energetic, playful, and growing rapidly.',
    kitten: 'High Smoke Pedigree Kitten Transition',
  },
];

export const PAGES = {
  about: true,
  faq: true,
  blog: true,
  wholesale: true, // /wholesale/ route is live and in the sitemap — flag now matches reality
  tracking: false,
  compare: false,
  search: true, // required for SearchAction schema
};

export const FAQ = [
  // First 5 entries power the homepage FAQPage schema (FAQ.slice(0, 5)) —
  // ordered by search demand per docs/keyword-map.md and docs/faq-bank.md.
  {
    question: 'How much does a Maine Coon kitten cost in Australia?',
    answer: 'Maine Coon kittens from a registered Australian cattery typically range from $1,800–$5,000+ depending on colour, pedigree, and whether full DNA health testing and desexing are included. Our current available kittens are listed with exact pricing on our Shop page.',
  },
  {
    question: 'How do I adopt or reserve a Maine Coon kitten from Cosy Cats Cattery?',
    answer: 'To adopt a kitten, submit an enquiry or reservation order through our online boutique. Our Canberra concierge will review your application, discuss matching kitten temperaments, and arrange either an in-person estate visit or private video consultation before securing your reservation.',
  },
  {
    question: 'How does nationwide flight and courier delivery work across Australia?',
    answer: 'We provide VIP climate-controlled flights via pet-specialist airline couriers to Sydney, Melbourne, Brisbane, Adelaide, Perth, Hobart, Darwin, and regional hubs. Kittens travel in approved airline pet suites with door-to-door concierge delivery available.',
  },
  {
    question: 'Are all your kittens DNA tested and health guaranteed?',
    answer: 'Yes. Every kitten comes from 100% DNA-tested clear parents for HCM, SMA, PKDef, and PKD. Kittens are fully vet-checked, microchipped, desexed, twice vaccinated, dewormed, and backed by our comprehensive 2-year genetic health guarantee.',
  },
  {
    question: 'Are Maine Coons good family pets?',
    answer: 'Yes — Maine Coons are widely regarded as one of the most family-friendly large cat breeds, known for being affectionate, patient with children, and generally sociable with dogs and other cats when introduced properly. Their easygoing temperament is a big part of why they suit first-time cat owners too.',
  },
  {
    question: 'How big do Maine Coons get?',
    answer: 'Adult males typically reach 8–13kg with a body length up to 120cm nose to tail, while adult females average 5.5–8kg — among the largest domestic cat breeds. They take 3–5 years to reach full size, and with good nutrition and care, Maine Coons enjoy a healthy lifespan of 12–16+ years.',
  },
  {
    question: 'What is included in the Cosy Cats Cattery Adoption Package?',
    answer: 'Each kitten arrives with certified ANCATS/TICA 5-generation pedigree papers, vaccination passport, microchip registration, DNA parentage reports, 30 days complimentary pet insurance, and a luxury transition hamper including royal food, blanket with mother’s scent, and toys.',
  },
  {
    question: 'What payment methods do you accept for reservations and boutique orders?',
    answer: 'We accept Direct Australian Bank Transfer (EFT) and instant Australian PayID. Detailed payment reference instructions are provided upon order submission for complete safety and record traceability.',
  },
  {
    question: 'Why are Maine Coons so expensive compared to other cats?',
    answer: 'Their price reflects the real cost of responsible breeding: genetic health testing for HCM, SMA and PKDef, veterinary care for the parents, registration fees, and years of investment building breeding-quality lines. A cheap, untested Maine Coon-labelled kitten is a red flag, not a bargain.',
  },
  {
    question: 'Do Maine Coons get along with dogs and other pets?',
    answer: 'Generally yes — Maine Coons are known for an easygoing nature that extends to other pets more than most cat breeds, especially when raised together or introduced gradually. Many owners report their Maine Coon actively seeking out the family dog’s company.',
  },
  {
    question: 'Are Maine Coons good for first-time cat owners?',
    answer: 'Yes. They’re low-drama, tolerant of handling, and highly trainable — many Maine Coons even walk on a leash — which makes them a forgiving, interactive choice for someone new to cat ownership.',
  },
  {
    question: 'What colours do Maine Coons come in?',
    answer: 'Black, red/ginger, silver and brown tabby, solid white, and black-and-white tuxedo or bicolour are the most common patterns. All are genetically the same breed — colour is purely coat genetics and has no effect on temperament or size.',
  },
  {
    question: 'How often should I groom a Maine Coon?',
    answer: 'At least weekly with a slicker brush and undercoat rake to prevent matting in their long double coat, more often during seasonal shedding. Their semi-water-resistant coat is largely self-maintaining otherwise, so an occasional bath is usually enough rather than a routine one.',
  },
  {
    question: 'Are Maine Coons dangerous or aggressive?',
    answer: 'No. Despite their large size, Maine Coons are consistently ranked among the gentlest, least aggressive cat breeds — "gentle giant" is a genuine description of their temperament, not marketing language.',
  },
  {
    question: 'How do I know if my cat is part Maine Coon?',
    answer: 'Look for a squared muzzle, tufted lynx-like ears, a long ruff, and a body that keeps growing well past 12 months old. Appearance alone can be misleading though — a genetic breed test is the only certain way to confirm ancestry.',
  },
  {
    question: 'Where did the Maine Coon breed originate?',
    answer: 'In the US state of Maine, most likely descended from long-haired cats brought by early sailors and settlers, crossing with local domestic cats and naturally adapting a thick, weatherproof coat over generations to survive harsh New England winters.',
  },
];

export const COMPLIANCE = {
  bannedTerms: [],
  requiredFramings: [],
  prohibitedClaims: [],
  ageGate: false,
  ageMinimum: null,
  gdpr: true,
  disclaimer: 'Cosy Cats Cattery is a registered pedigree feline establishment adhering to ANCATS and TICA breeding ethical codes. ABN: 82 418 711 846. All kittens are sold as desexed luxury companions unless explicit pedigree show/breeding rights are agreed in contract.',
};

