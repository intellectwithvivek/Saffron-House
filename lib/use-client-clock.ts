'use client'

import { useMemo, useSyncExternalStore } from 'react'

/**
 * "What time is it, in the browser?" — as an external store rather than an effect.
 *
 * Three components on this site need the real current time: the open/closed badge, the
 * hours list highlighting today, and the reservation form blocking past dates. All four
 * pages are statically rendered, so a time read during the server pass would be frozen
 * at build time and wrong by the next morning. The clock has to be read on the client.
 *
 * The obvious way to do that is `useState(null)` plus an effect that sets it on mount,
 * and it works — but it is a setState during commit, so React renders twice for every
 * consumer and the react-hooks lint rule flags it, correctly. The clock is an external
 * system that changes on its own, which is exactly what `useSyncExternalStore` is for:
 * one subscription, one snapshot, no cascading render.
 *
 * `getServerSnapshot` returns `null`, and so does `getSnapshot` until the first
 * subscription runs. That is deliberate: server and client agree on `null` for the
 * hydration render, so there is no mismatch, and every consumer has to handle a
 * "not known yet" state explicitly instead of rendering a build-time lie.
 */

/** How often the shared clock advances. Enough to flip a badge within half a minute. */
const TICK_MS = 30_000

const listeners = new Set<() => void>()
let snapshot: number | null = null
let timer: ReturnType<typeof setInterval> | undefined

function tick() {
  snapshot = Date.now()
  for (const listener of listeners) listener()
}

function subscribe(listener: () => void) {
  listeners.add(listener)

  if (timer === undefined) {
    /* Seed the snapshot but do NOT notify from inside subscribe — React re-reads
       getSnapshot straight after subscribing precisely to catch a change made here,
       and calling listeners mid-commit would be a render during a render. */
    snapshot = Date.now()
    timer = setInterval(tick, TICK_MS)
  }

  return () => {
    listeners.delete(listener)
    if (listeners.size === 0) {
      clearInterval(timer)
      timer = undefined
    }
  }
}

const getSnapshot = () => snapshot
const getServerSnapshot = (): number | null => null

/** The current time as a timestamp, or `null` before the client has read it. */
export function useClientNow(): number | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

/**
 * Midnight this morning, or `null` before the client has read the clock.
 *
 * Keyed on the calendar date rather than the timestamp, so the returned `Date` is
 * referentially stable across the thirty-second ticks and only becomes a new object
 * when the day actually changes. That matters because it is passed to `DatePicker` as
 * `min`, and a fresh object every half minute would be a prop change for nothing.
 */
export function useClientToday(timeZone?: string): Date | null {
  const now = useClientNow()

  const key =
    now === null
      ? null
      : new Intl.DateTimeFormat('en-CA', {
          timeZone,
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }).format(now) // en-CA gives YYYY-MM-DD

  return useMemo(() => (key === null ? null : new Date(`${key}T00:00:00`)), [key])
}
