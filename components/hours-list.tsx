'use client'

import { hours, restaurant } from '@/data/restaurant'
import { describeServices } from '@/lib/hours'
import { useClientNow } from '@/lib/use-client-clock'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

/**
 * The week's opening hours, with today picked out.
 *
 * Rendered as a `<dl>`: each day is the term and its hours are the definition, which is
 * the markup that actually says "these hours belong to this day". A table would imply a
 * second dimension that is not there.
 *
 * Today's index comes from the browser's clock for the same reason the open/closed badge
 * does — these pages are static, so a build-time "today" would be stale by the next
 * morning. Until the clock is read no row is highlighted, which is a fine thing to show
 * and never a wrong one.
 */
export function HoursList() {
  const now = useClientNow()

  const today =
    now === null
      ? null
      : WEEKDAYS.indexOf(
          new Intl.DateTimeFormat('en-GB', {
            timeZone: restaurant.timeZone,
            weekday: 'short',
          }).format(now),
        )

  return (
    <dl className="sh-hours">
      {hours.map((entry, index) => (
        <div key={entry.day} className="sh-hours__row" data-today={index === today}>
          <dt className="sh-hours__day">
            {entry.short}
            {index === today && <span className="sh-hours__badge"> · today</span>}
          </dt>
          <span className="sh-hours__dots" aria-hidden="true" />
          <dd className="sh-hours__time">{describeServices([...entry.services])}</dd>
        </div>
      ))}
    </dl>
  )
}
