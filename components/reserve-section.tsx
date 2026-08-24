'use client'

import { useState } from 'react'
import { Card, Text } from '@the_viveksingh/vivek-ui'
import { dayKeyFromDate, type DayKey } from '@/data/busy'
import { restaurant } from '@/data/restaurant'
import { useClientNow } from '@/lib/use-client-clock'
import { PopularTimes } from './popular-times'
import { ReserveForm } from './reserve-form'

/**
 * The reservation page's two columns, and the one piece of state they share.
 *
 * Choosing a date in the form moves the popular-times chart to that weekday, which is
 * the point of putting them side by side — a guest sees how full their evening usually
 * is while they are still deciding. The chart's own day Select stays live, so they can
 * look at other days without disturbing the booking.
 *
 * `day` is null until something picks one, and the chart falls back to today. Holding
 * "no choice yet" rather than seeding the state with today's key is what keeps this
 * hydration-safe: the server has no clock, and `useClientNow` returns null there too.
 */
export function ReserveSection() {
  const [date, setDate] = useState<Date | null>(null)
  const [day, setDay] = useState<DayKey | null>(null)
  const now = useClientNow()

  const shownDay: DayKey = day ?? (now === null ? 'fri' : dayKeyFromDate(new Date(now)))

  function handleDateChange(next: Date | null) {
    setDate(next)
    if (next) setDay(dayKeyFromDate(next))
  }

  return (
    <div className="sh-reserve">
      <div>
        <ReserveForm date={date} onDateChange={handleDateChange} />
      </div>

      <aside className="sh-reserve__aside" aria-label="Popular times and contact">
        <PopularTimes day={shownDay} onDayChange={setDay} />

        {/* The chart is a good deal shorter than the form, and an empty half-column
            beside a booking form is a missed chance to answer the question the form
            cannot: what to do when the form is the wrong tool. */}
        <Card variant="ghost" padding="md" className="sh-aside-note">
          <Text size="sm" weight="semibold">
            Some things are easier by phone
          </Text>
          <Text size="sm" tone="muted">
            Parties of nine or more, the whole courtyard, a set menu, or a table for
            tonight in the next hour — ring us and we will sort it in a minute.
          </Text>
          <Text size="sm">
            <a href={`tel:${restaurant.phoneHref}`}>{restaurant.phone}</a>
            <br />
            <a href={`mailto:${restaurant.email}`}>{restaurant.email}</a>
          </Text>
        </Card>
      </aside>
    </div>
  )
}
