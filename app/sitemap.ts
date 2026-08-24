import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/data/site'

/**
 * Four routes, so this is written out rather than generated.
 *
 * `lastModified` is a fixed date on purpose: `new Date()` here would stamp every URL
 * with the build time, which tells a crawler the whole site changed on every deploy
 * and is exactly how a sitemap loses the crawler's trust. Bump it when content changes.
 */
const LAST_MODIFIED = new Date('2026-08-24')

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: LAST_MODIFIED, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/menu`, lastModified: LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/reserve`, lastModified: LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/built-with`, lastModified: LAST_MODIFIED, changeFrequency: 'yearly', priority: 0.5 },
  ]
}
