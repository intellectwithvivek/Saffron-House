import { hours, restaurant, toMinutes, type Service } from '@/data/restaurant'

export type OpenState = {
  open: boolean
  /** "Open until 11 pm", "Closed · opens Tue 12 pm". Ready to render. */
  label: string
  /** The service currently running, when there is one. */
  service?: Service
}

/** `1170` → `"7:30 pm"`, with the minutes dropped on the hour. Locale-free. */
export function formatClock(minutes: number): string {
  const h24 = Math.floor(minutes / 60)
  const m = minutes % 60
  const suffix = h24 < 12 ? 'am' : 'pm'
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12
  return m === 0 ? `${h12} ${suffix}` : `${h12}:${String(m).padStart(2, '0')} ${suffix}`
}

/**
 * Read the wall clock in the restaurant's own timezone, not the visitor's.
 *
 * A guest in London asking whether Saffron House is open wants Bengaluru's answer.
 * `Intl.DateTimeFormat` with an explicit `timeZone` is the only way to get that
 * without a date library, and `en-GB` is pinned so the parts are predictable.
 */
function localParts(now: Date): { weekday: number; minutes: number } {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: restaurant.timeZone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(now)

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ''
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  // `hour` can come back as "24" at midnight in some ICU builds; fold it to 0.
  const hour = Number(get('hour')) % 24

  return {
    weekday: Math.max(0, weekdays.indexOf(get('weekday'))),
    minutes: hour * 60 + Number(get('minute')),
  }
}

/** The next day (searching forward up to a week) that has any service at all. */
function nextOpening(fromDay: number): { day: string; service: Service } | null {
  for (let step = 0; step < 8; step++) {
    const entry = hours[(fromDay + step) % 7]
    const service = entry.services[0]
    if (service) return { day: step === 0 ? 'today' : entry.short, service }
  }
  return null
}

/**
 * Is the kitchen serving right now?
 *
 * Deliberately takes `now` rather than reading the clock itself, so the caller decides
 * when it is evaluated — which is what keeps this usable from a client effect without
 * a hydration mismatch.
 */
export function openState(now: Date): OpenState {
  const { weekday, minutes } = localParts(now)
  const today = hours[weekday]

  for (const service of today.services) {
    if (minutes >= toMinutes(service.opens) && minutes < toMinutes(service.closes)) {
      return { open: true, label: `Open until ${formatClock(toMinutes(service.closes))}`, service }
    }
  }

  // Still today, but between services or before the first one.
  const later = today.services.find((s) => minutes < toMinutes(s.opens))
  if (later) {
    return { open: false, label: `Closed · ${later.label.toLowerCase()} at ${formatClock(toMinutes(later.opens))}` }
  }

  const next = nextOpening(weekday + 1)
  return {
    open: false,
    label: next ? `Closed · opens ${next.day} ${formatClock(toMinutes(next.service.opens))}` : 'Closed',
  }
}

/** `"12:00 – 15:00, 19:00 – 22:30"` for one day, or "Closed". */
export function describeServices(services: Service[]): string {
  if (services.length === 0) return 'Closed'
  return services
    .map((s) => `${formatClock(toMinutes(s.opens))} – ${formatClock(toMinutes(s.closes))}`)
    .join(', ')
}
