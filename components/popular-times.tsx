'use client'

import { Badge, Card, Field, Select, Text } from '@the_viveksingh/vivek-ui'
import { BarChart } from '@the_viveksingh/vivek-ui/charts'
import { Eyebrow } from './eyebrow'
import {
  HOURS,
  busyByDay,
  busyFor,
  calmestSlot,
  hourLabel,
  loadLabel,
  type DayKey,
} from '@/data/busy'

/**
 * Popular times, Google-style: how full the room usually is, hour by hour.
 *
 * This is the panel the reservation form sits beside, and its job is narrow — help a
 * guest pick a slot they will enjoy rather than one they will queue for. So the axis is
 * "share of the room", the closed hours are drawn as real zeroes rather than omitted,
 * and the busiest and quietest hours are named in text underneath. A guest should not
 * have to read a bar chart to get the answer; the chart is there to back it up.
 *
 * Controlled from the parent so choosing a date in the form moves the chart with it.
 */
export function PopularTimes({
  day,
  onDayChange,
}: {
  day: DayKey
  onDayChange: (day: DayKey) => void
}) {
  const selected = busyFor(day)

  const data = HOURS.map((hour, index) => ({
    x: hourLabel(hour),
    y: selected.load[index],
  }))

  /* Named hours, computed from the same array the chart plots. "Quietest" ignores the
     closed hours, because "the restaurant is emptiest at 5 pm" is not a useful answer
     when the kitchen is shut. */
  const open = data.filter((point) => point.y > 0)
  const busiest = open.reduce((a, b) => (b.y > a.y ? b : a), open[0])
  const quietest = open.reduce((a, b) => (b.y < a.y ? b : a), open[0])

  return (
    <Card variant="outline" padding="lg" className="sh-popular">
      <Card.Header className="sh-popular__head">
        <Eyebrow>Popular times</Eyebrow>
        <Text size="sm" tone="muted">
          Typical share of the room, by hour. Pick a quiet slot before you book.
        </Text>
      </Card.Header>

      <Card.Body>
        <Field label="Show a different day" size="sm">
          <Select
            value={day}
            onChange={(event) => onDayChange(event.target.value as DayKey)}
            options={busyByDay.map((entry) => ({ value: entry.key, label: entry.label }))}
          />
        </Field>

        {/* The chart is wider than a phone, so this scrolls. A scrollable region must
            be operable by keyboard, and needs a name once it can hold focus. The
            visually hidden data table inside the chart covers screen readers; this
            covers the sighted keyboard user who simply cannot reach the later hours. */}
        <div
          className="sh-popular__chart"
          tabIndex={0}
          role="region"
          aria-label={`Popular times for ${selected.label}, by hour — scrollable`}
        >
          <BarChart
            data={data}
            height={220}
            showGrid
            showAxes
            barRadius={3}
            categoryPadding={0.32}
            tooltip
            title={`How busy ${selected.label} usually is at Saffron House`}
            description={
              `Share of the dining room in use between 11 am and 11 pm on a typical ` +
              `${selected.label}. Hours showing zero are outside service.`
            }
            xLabel="Hour"
            yLabel="Share of the room"
            formatValue={(value) => `${value}%`}
          />
        </div>

        {open.length > 0 && (
          <div className="sh-popular__facts">
            <Badge variant="soft" tone="danger" pill size="sm">
              Busiest {busiest.x} · {loadLabel(busiest.y)}
            </Badge>
            <Badge variant="soft" tone="success" pill size="sm">
              Quietest {quietest.x} · {loadLabel(quietest.y)}
            </Badge>
          </div>
        )}
      </Card.Body>

      <Card.Footer>
        <Text size="sm" tone="muted" className="sh-caption">
          <strong>Tip:</strong> {calmestSlot.label} are calmest. Weekday lunch after 2 pm is the
          other reliably quiet window.
        </Text>
      </Card.Footer>
    </Card>
  )
}
