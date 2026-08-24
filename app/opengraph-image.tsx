import { ImageResponse } from 'next/og'
import { restaurant } from '@/data/restaurant'

/**
 * The social card, generated at build time rather than checked in as a PNG.
 *
 * Drawn with the same three ingredients as the site — the saffron thread, the rose
 * accent and a dark room — so a link preview looks like the page it opens.
 *
 * No webfont is loaded. `ImageResponse` cannot reach the system font stack the site
 * uses — it renders with its own bundled sans — and loading Fraunces here would mean a
 * network fetch during the build. At this size the difference is not worth that, so the
 * card is deliberately set in the default face rather than the site's display font.
 */

export const alt = `${restaurant.name} — a free Next.js restaurant template with online reservations`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/** One stroke of the saffron thread motif, as a positioned div. */
function Thread({ left, height, top }: { left: number; height: number; top: number }) {
  return (
    <div
      style={{
        position: 'absolute',
        left,
        top,
        width: 6,
        height,
        borderRadius: 3,
        background: 'linear-gradient(to bottom, #f0b357, #e8871e)',
      }}
    />
  )
}

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: 'linear-gradient(135deg, #17100f 0%, #221417 55%, #2b1119 100%)',
          color: '#fff',
        }}
      >
        {/* The motif, enlarged, standing in for a logo. */}
        <div style={{ display: 'flex', position: 'relative', width: 96, height: 48 }}>
          <Thread left={0} top={10} height={34} />
          <Thread left={20} top={0} height={44} />
          <Thread left={40} top={10} height={34} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 26,
              letterSpacing: 6,
              textTransform: 'uppercase',
              color: '#e8871e',
              display: 'flex',
            }}
          >
            Lavelle Road · Bengaluru
          </div>

          <div style={{ fontSize: 116, lineHeight: 1.05, marginTop: 18, display: 'flex' }}>
            {restaurant.name}
          </div>

          <div
            style={{
              fontSize: 34,
              marginTop: 20,
              color: 'rgba(255,255,255,0.78)',
              display: 'flex',
              maxWidth: 900,
            }}
          >
            A free Next.js 16 restaurant template with online reservations
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            fontSize: 26,
            fontFamily: 'sans-serif',
            color: 'rgba(255,255,255,0.62)',
          }}
        >
          <span
            style={{
              padding: '10px 22px',
              borderRadius: 999,
              background: '#be123c',
              color: '#fff',
            }}
          >
            ⚡ Built with VivekUI
          </span>
          <span>91 components · 6 SVG charts · zero runtime dependencies</span>
        </div>
      </div>
    ),
    size,
  )
}
