'use client'

import { useMemo, useState } from 'react'
import {
  Alert,
  Badge,
  Button,
  Card,
  Checkbox,
  DatePicker,
  Field,
  Input,
  Modal,
  Select,
  Text,
  Textarea,
  Timeline,
  useToast,
} from '@the_viveksingh/vivek-ui'
import { restaurant } from '@/data/restaurant'
import { reservationSteps } from '@/data/content'
import { useClientToday } from '@/lib/use-client-clock'
import { SaffronThread } from './saffron-thread'

/**
 * The bookable slots.
 *
 * Two are held at `full: true` on purpose — a booking form that never says no is a
 * form nobody believes. They render as disabled options labelled "Full", which is what
 * a native `<select>` already communicates correctly to a screen reader.
 */
const SLOTS = {
  Lunch: [
    { value: '12:00', label: '12:00 pm' },
    { value: '12:30', label: '12:30 pm' },
    { value: '13:00', label: '1:00 pm', full: true },
    { value: '13:30', label: '1:30 pm' },
    { value: '14:00', label: '2:00 pm' },
  ],
  Dinner: [
    { value: '18:30', label: '6:30 pm' },
    { value: '19:00', label: '7:00 pm' },
    { value: '19:30', label: '7:30 pm', full: true },
    { value: '20:00', label: '8:00 pm' },
    { value: '20:30', label: '8:30 pm' },
    { value: '21:00', label: '9:00 pm' },
    { value: '21:30', label: '9:30 pm' },
  ],
} as const

const MAX_PARTY = 8

/** Fixed locale, so the string the guest confirms is the string we rendered. */
const longDate = (date: Date) =>
  new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)

const slotLabel = (value: string) => {
  for (const group of Object.values(SLOTS)) {
    const hit = group.find((slot) => slot.value === value)
    if (hit) return hit.label
  }
  return value
}

type Errors = Partial<Record<'date' | 'time' | 'name' | 'phone', string>>

export function ReserveForm({
  date,
  onDateChange,
}: {
  date: Date | null
  onDateChange: (date: Date | null) => void
}) {
  const { toast } = useToast()

  const [time, setTime] = useState('')
  const [party, setParty] = useState('2')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [outdoor, setOutdoor] = useState(false)

  const [errors, setErrors] = useState<Errors>({})
  const [confirming, setConfirming] = useState(false)
  const [booked, setBooked] = useState(false)

  /**
   * "No dates in the past" has to be decided in the browser.
   *
   * The page is statically rendered, so a `min` computed during the server pass would
   * be frozen at build time and would start letting yesterday through. `useClientToday`
   * reads the browser's clock and returns a `Date` that is stable until the day rolls
   * over, so `DatePicker` does not see a new `min` prop every tick.
   */
  const minDate = useClientToday(restaurant.timeZone)

  const partyOptions = useMemo(
    () =>
      Array.from({ length: MAX_PARTY }, (_, index) => {
        const size = index + 1
        return { value: String(size), label: size === 1 ? '1 guest' : `${size} guests` }
      }),
    [],
  )

  const largeParty = Number(party) >= MAX_PARTY

  function validate(): boolean {
    const next: Errors = {}
    if (!date) next.date = 'Choose the day you would like to come.'
    if (!time) next.time = 'Pick a time slot.'
    if (name.trim().length < 2) next.name = 'We need a name for the table.'
    // Deliberately loose: 8+ digits after stripping punctuation. A stricter rule
    // rejects valid international numbers, and this field is only ever read by a human.
    if (phone.replace(/\D/g, '').length < 8) next.phone = 'A number we can send the confirmation to.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (validate()) setConfirming(true)
  }

  function confirm() {
    setConfirming(false)
    setBooked(true)
    toast({
      title: 'Table requested',
      description: `${name.trim()}, ${party} for ${slotLabel(time)}${date ? ` on ${longDate(date)}` : ''}. We will text ${phone} to confirm.`,
      tone: 'success',
      duration: 9000,
    })
  }

  function startOver() {
    setBooked(false)
    setTime('')
    setName('')
    setPhone('')
    setNotes('')
    setOutdoor(false)
    setParty('2')
    onDateChange(null)
    setErrors({})
  }

  /* ---------------------------------------------------------------- success ---- */

  if (booked) {
    return (
      <Card variant="elevated" padding="lg" className="sh-reserve__card">
        <Card.Header>
          <Badge variant="soft" tone="success" pill>
            Requested
          </Badge>
          <h2 className="sh-display sh-reserve__title">Your table is in the book</h2>
          <Text tone="muted">
            {`${party === '1' ? '1 guest' : `${party} guests`} · ${slotLabel(time)}${date ? ` · ${longDate(date)}` : ''}`}
            {outdoor ? ' · courtyard seating requested' : ''}
          </Text>
        </Card.Header>

        <SaffronThread />

        <Card.Body>
          <h3 className="sh-reserve__subtitle">What happens next</h3>
          <Timeline>
            {reservationSteps.map((step, index) => (
              <Timeline.Item
                key={step.title}
                title={step.title}
                description={step.description}
                timestamp={step.timestamp}
                status={index === 0 ? 'complete' : index === 1 ? 'current' : 'pending'}
                headingLevel={4}
              />
            ))}
          </Timeline>
        </Card.Body>

        <Card.Footer className="sh-reserve__actions">
          <Button variant="outline" onClick={startOver}>
            Book another table
          </Button>
          <Button asChild variant="ghost">
            <a href={`tel:${restaurant.phoneHref}`}>Call {restaurant.phone}</a>
          </Button>
        </Card.Footer>
      </Card>
    )
  }

  /* ------------------------------------------------------------------- form ---- */

  return (
    <>
      <Card variant="elevated" padding="lg" className="sh-reserve__card">
        <Card.Header>
          <h2 className="sh-display sh-reserve__title">Book a table</h2>
          <Text tone="muted">
            Lunch and dinner, up to eight guests. We hold every table for twenty minutes.
          </Text>
        </Card.Header>

        <SaffronThread />

        <Card.Body>
          <form onSubmit={handleSubmit} noValidate className="sh-form">
            <div className="sh-field-row">
              <Field label="Date" required error={errors.date}>
                <DatePicker
                  value={date}
                  onValueChange={onDateChange}
                  min={minDate}
                  placeholder="YYYY-MM-DD"
                  openLabel="Choose a date"
                />
              </Field>

              <Field label="Time" required error={errors.time}>
                <Select value={time} onChange={(event) => setTime(event.target.value)}>
                  <option value="" disabled>
                    Select a slot
                  </option>
                  {Object.entries(SLOTS).map(([group, slots]) => (
                    <optgroup key={group} label={group}>
                      {slots.map((slot) => (
                        <option
                          key={slot.value}
                          value={slot.value}
                          disabled={'full' in slot && slot.full}
                        >
                          {'full' in slot && slot.full ? `${slot.label} — Full` : slot.label}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </Select>
              </Field>
            </div>

            <Field
              label="Party size"
              help="Tables of nine or more are booked over the phone."
            >
              <Select
                value={party}
                onChange={(event) => setParty(event.target.value)}
                options={partyOptions}
              />
            </Field>

            {largeParty && (
              <Alert tone="info" title="For 9+ guests, call us">
                <Text size="sm">
                  Larger parties eat from a set menu, so we plan them by phone. Ring{' '}
                  <a href={`tel:${restaurant.phoneHref}`}>{restaurant.phone}</a> and ask for the
                  events desk.
                </Text>
              </Alert>
            )}

            <div className="sh-field-row">
              <Field label="Name" required error={errors.name}>
                <Input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  autoComplete="name"
                  placeholder="Priya Raghavan"
                />
              </Field>

              <Field label="Phone" required error={errors.phone} help="For the confirmation SMS.">
                <Input
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="+91 98450 00000"
                />
              </Field>
            </div>

            <Field
              label="Special requests"
              help="Allergies, a birthday, a quiet corner — anything the kitchen should know."
            >
              <Textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                rows={3}
                maxLength={400}
                resize="vertical"
                placeholder="One vegan, one nut allergy. Celebrating an anniversary."
              />
            </Field>

            <Checkbox
              checked={outdoor}
              onChange={(event) => setOutdoor(event.target.checked)}
              label="Courtyard seating, if it is free"
              description="Open-air, under the jasmine trellis. Not available when it rains."
            />

            <Button type="submit" size="lg" fullWidth>
              Review and confirm
            </Button>

            <Text size="sm" tone="muted">
              This is a template — nothing is sent anywhere. Wire the submit handler to your
              own booking system.
            </Text>
          </form>
        </Card.Body>
      </Card>

      {/* ------------------------------------------------------------ confirm ---- */}

      <Modal
        open={confirming}
        onOpenChange={setConfirming}
        title="Confirm your reservation"
        size="sm"
      >
        <Modal.Body>
          <dl className="sh-summary">
            <dt>Date</dt>
            <dd>{date ? longDate(date) : '—'}</dd>

            <dt>Time</dt>
            <dd>{slotLabel(time)}</dd>

            <dt>Guests</dt>
            <dd>{party === '1' ? '1 guest' : `${party} guests`}</dd>

            <dt>Name</dt>
            <dd>{name.trim()}</dd>

            <dt>Phone</dt>
            <dd>{phone}</dd>

            <dt>Seating</dt>
            <dd>{outdoor ? 'Courtyard, if free' : 'Dining room'}</dd>

            {notes.trim() && (
              <>
                <dt>Requests</dt>
                <dd>{notes.trim()}</dd>
              </>
            )}
          </dl>

          <Text size="sm" tone="muted" className="sh-summary__note">
            We will hold the table for twenty minutes past your time.
          </Text>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="ghost" onClick={() => setConfirming(false)}>
            Back
          </Button>
          <Button onClick={confirm}>Confirm reservation</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
