'use client'

import { Badge, Clock } from '@the_viveksingh/vivek-ui'
import { restaurant } from '@/data/restaurant'
import { openState } from '@/lib/hours'
import { useClientNow } from '@/lib/use-client-clock'

/**
 * "Open until 11 pm" beside a live clock in Bengaluru time.
 *
 * The page is statically rendered, so the answer cannot be computed on the server — it
 * would be frozen at build time and wrong within the hour. `useClientNow` supplies the
 * browser's clock and returns `null` for the hydration render, so the first paint shows
 * a placeholder of the same shape rather than a stale claim about being open.
 */
export function OpenStatus({ compact = false }: { compact?: boolean }) {
  const now = useClientNow()
  const state = now === null ? null : openState(new Date(now))

  return (
    <span className="sh-status">
      <Badge
        variant="soft"
        tone={state ? (state.open ? 'success' : 'neutral') : 'neutral'}
        pill
        size="sm"
      >
        {/* A dot as well as the colour, so the state never rests on hue alone. */}
        <span className="sh-status__dot" data-open={state?.open ?? false} aria-hidden="true" />
        {state ? state.label : 'Checking hours…'}
      </Badge>

      {!compact && (
        <Clock
          className="sh-status__clock"
          timeZone={restaurant.timeZone}
          showSeconds={false}
          hour12
          locale="en-IN"
          placeholder="--:--"
          aria-label="Current time in Bengaluru"
        />
      )}
    </span>
  )
}
