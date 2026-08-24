import { ImageResponse } from 'next/og'

/**
 * The favicon: the saffron thread on a dark ground.
 *
 * Generated rather than committed, so the one motif on the site is defined in code in
 * both places it appears and cannot drift apart. At 32px only the three strokes survive,
 * which is the right amount of detail for a tab.
 */

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#17100f',
          borderRadius: 6,
        }}
      >
        <div style={{ display: 'flex', position: 'relative', width: 20, height: 22 }}>
          <div style={{ position: 'absolute', left: 0, top: 5, width: 4, height: 15, borderRadius: 2, background: '#e8871e' }} />
          <div style={{ position: 'absolute', left: 8, top: 0, width: 4, height: 20, borderRadius: 2, background: '#f0b357' }} />
          <div style={{ position: 'absolute', left: 16, top: 5, width: 4, height: 15, borderRadius: 2, background: '#e8871e' }} />
        </div>
      </div>
    ),
    size,
  )
}
