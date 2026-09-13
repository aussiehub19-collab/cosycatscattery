import { MetadataRoute } from 'next';
import { SITE, PRODUCTS, POSTS } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = `https://${SITE.domain}`;
  const now = new Date();

  // Static core routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/shop/`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/wholesale/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/search/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ];

  // Dynamic Product routes
  const productRoutes: MetadataRoute.Sitemap = PRODUCTS.map(product => ({
    url: `${baseUrl}/shop/${product.slug}/`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 0.85,
    images: product.images,
  }));

  // Dynamic Blog routes
  const blogRoutes: MetadataRoute.Sitemap = POSTS.map(post => ({
    url: `${baseUrl}/blog/${post.slug}/`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.75,
    images: [post.image],
  }));

  return [...staticRoutes, ...productRoutes, ...blogRoutes];
}
