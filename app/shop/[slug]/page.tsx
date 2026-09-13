import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PRODUCTS, SITE, BRAND } from '@/config/site';
import JsonLd from '@/components/JsonLd';
import ProductDetailClient from './ProductDetailClient';

export async function generateStaticParams() {
  return PRODUCTS.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find(p => p.slug === slug);

  if (!product) {
    return {
      title: `Kitten Not Found | ${SITE.name}`,
      robots: { index: false, follow: true },
    };
  }

  const title = `${product.name} | ${SITE.name}`;
  const description = `${product.shortDescription} DNA tested clear, ANCATS registered, nationwide flight delivery.`;

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      siteName: SITE.name,
      title,
      description,
      url: `https://${SITE.domain}/shop/${product.slug}/`,
      images: [
        {
          url: product.images[0],
          width: 1200,
          height: 900,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [product.images[0]],
    },
    alternates: {
      canonical: `https://${SITE.domain}/shop/${product.slug}/`,
    },
    robots: 'index, follow',
    other: {
      'og:updated_time': new Date().toISOString(),
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = PRODUCTS.find(p => p.slug === slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = PRODUCTS.filter(p => p.slug !== product.slug).slice(0, 3);

  const productSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.description,
      image: product.images,
      sku: product.slug,
      brand: {
        '@type': 'Brand',
        name: SITE.name,
      },
      offers: {
        '@type': 'Offer',
        url: `https://${SITE.domain}/shop/${product.slug}/`,
        priceCurrency: SITE.currency,
        price: product.price,
        availability: 'https://schema.org/InStock',
        seller: {
          '@type': 'Organization',
          name: SITE.name,
        },
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
          name: 'Shop',
          item: `https://${SITE.domain}/shop/`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: product.name,
          item: `https://${SITE.domain}/shop/${product.slug}/`,
        },
      ],
    },
  ];

  return (
    <>
      <JsonLd schema={productSchema} />
      <ProductDetailClient product={product} relatedProducts={relatedProducts} />
    </>
  );
}
