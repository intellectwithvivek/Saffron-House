import type { Metadata, Viewport } from 'next'
import { Fraunces } from 'next/font/google'
import { ThemeProvider, ToastProvider, themeScript } from '@the_viveksingh/vivek-ui'

import '@the_viveksingh/vivek-ui/styles.css'
import '@the_viveksingh/vivek-ui/charts.css'
import './globals.css'

import { SiteNavbar } from '@/components/site-navbar'
import { SiteFooter } from '@/components/site-footer'
import { restaurant } from '@/data/restaurant'
import { SITE_URL } from '@/data/site'

/**
 * One webfont, for the display face only.
 *
 * Body copy stays on the system stack VivekUI ships with: it costs nothing to load,
 * it is the one font guaranteed to already be rendered, and a restaurant's identity
 * lives in its headings anyway. Fraunces carries all of it — the wordmark, the hero,
 * the dish names — which is why it is worth the single request.
 */
const display = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  axes: ['SOFT', 'WONK'],
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      'Free Restaurant Website Template (Next.js) with Reservations — Saffron House | VivekUI',
    template: `%s — ${restaurant.name}`,
  },
  description:
    'A free, open-source Next.js 16 restaurant website template with online table ' +
    'reservations, a full menu and a popular-times chart. Built entirely with VivekUI — ' +
    '91 React components, zero runtime dependencies.',
  applicationName: restaurant.name,
  authors: [{ name: 'Vivek Kumar Singh', url: 'https://vivekkumarsingh.in/' }],
  creator: 'Vivek Kumar Singh',
  keywords: [
    'free restaurant website template nextjs',
    'nextjs restaurant template',
    'restaurant reservation template',
    'react component library',
    'VivekUI',
    'open source nextjs template',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: restaurant.name,
    url: SITE_URL,
    locale: 'en_IN',
    title: 'Saffron House — a free Next.js restaurant template with reservations',
    description:
      'Modern Indian cooking, online reservations and a Google-style popular-times chart. ' +
      'A free open-source Next.js 16 template built with VivekUI.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saffron House — free Next.js restaurant template',
    description:
      'Reservations, a full menu and a popular-times chart. Open source, built with VivekUI.',
  },
  robots: { index: true, follow: true },
  category: 'restaurant',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fffcfa' },
    { media: '(prefers-color-scheme: dark)', color: '#100c0e' },
  ],
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={display.variable} suppressHydrationWarning>
      <head>
        {/*
          The anti-flash snippet, synchronous and before first paint. Without it a
          visitor who chose dark gets a white page for one frame, because the server
          has no way to know what they picked.
        */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeProvider>
          <ToastProvider position="bottom-end" duration={6000}>
            <a href="#main" className="sh-skip">
              Skip to content
            </a>

            <SiteNavbar />

            <main id="main">{children}</main>

            <SiteFooter />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
