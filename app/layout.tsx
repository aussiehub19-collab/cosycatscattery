import type { Metadata, Viewport } from 'next';
import './globals.css';
import { SITE, BRAND } from '@/config/site';
import { CartProvider } from '@/components/CartContext';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0F172A',
};

export const metadata: Metadata = {
  title: `${SITE.name} | Pedigree European & American Maine Coon Royalty`,
  description: `${BRAND.description} DNA health certified, ANCATS registered, nationwide flight delivery across Australia.`,
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    title: `${SITE.name} | Australia's Premier Maine Coon Breeder`,
    description: `${BRAND.description} Certified DNA negative parents, 2-year genetic health guarantee.`,
    url: `https://${SITE.domain}/`,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=1200&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: `${SITE.name} Pedigree Maine Coon Kittens`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} | Luxury Pedigree Maine Coons Australia`,
    description: `${BRAND.description}`,
    images: ['https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=1200&auto=format&fit=crop'],
  },
  alternates: {
    canonical: `https://${SITE.domain}/`,
  },
  robots: 'index, follow',
  other: {
    'og:updated_time': new Date().toISOString(),
    'google-site-verification': SITE.gscVerification || 'pending',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={SITE.locale} className="bg-slate-950 text-slate-100 antialiased">
      <head>
        <script src="/js/webmcp.js" defer />
      </head>
      <body suppressHydrationWarning className="bg-slate-950 min-h-screen flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
