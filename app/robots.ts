import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/data/site'

/**
 * Answer-engine crawlers are named explicitly, and allowed.
 *
 * A bare `User-agent: *` already permits them, so this block changes nothing
 * technically — but several of these agents are default-denied by hosting platforms,
 * CDN bot rules and boilerplate robots files, and an explicit `Allow` is what survives
 * those. This site wants to be quoted by assistants: it is a template whose whole
 * purpose is discovery, and `public/llms.txt` exists for the same reason.
 *
 * `/_next/` is excluded because build assets in an index add nothing.
 */
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'meta-externalagent',
  'Amazonbot',
  'DuckAssistBot',
  'MistralAI-User',
  'cohere-ai',
  'CCBot',
  'Bytespider',
  'YouBot',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/_next/'] },
      { userAgent: AI_CRAWLERS, allow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
