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
  {
    question: 'How do I adopt or reserve a Maine Coon kitten from Cosy Cats Cattery?',
    answer: 'To adopt a kitten, submit an enquiry or reservation order through our online boutique. Our Canberra concierge will review your application, discuss matching kitten temperaments, and arrange either an in-person estate visit or private video consultation before securing your reservation.',
  },
  {
    question: 'Are all your kittens DNA tested and health guaranteed?',
    answer: 'Yes. Every kitten comes from 100% DNA-tested clear parents for HCM, SMA, PKDef, and PKD. Kittens are fully vet-checked, microchipped, desexed, twice vaccinated, dewormed, and backed by our comprehensive 2-year genetic health guarantee.',
  },
  {
    question: 'How does nationwide flight and courier delivery work across Australia?',
    answer: 'We provide VIP climate-controlled flights via pet-specialist airline couriers to Sydney, Melbourne, Brisbane, Adelaide, Perth, Hobart, Darwin, and regional hubs. Kittens travel in approved airline pet suites with door-to-door concierge delivery available.',
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
    question: 'What is the average size and lifespan of a European Maine Coon?',
    answer: 'Male Maine Coons typically weigh between 8 to 13 kg with a length up to 120 cm, while females average 5.5 to 8 kg. With premium nutrition, regular grooming, and loving indoor care, Maine Coons enjoy a healthy lifespan of 12 to 16+ years.',
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

