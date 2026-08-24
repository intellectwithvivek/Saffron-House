/**
 * Every fact about the restaurant that more than one page needs, in one place.
 *
 * The JSON-LD, the footer, the open/closed badge and the reservation form all read
 * from here, so an address or an opening hour is only ever edited once.
 */

export const restaurant = {
  name: 'Saffron House',
  tagline: 'Slow-cooked Indian cooking, served under warm light.',
  description:
    'A modern Indian kitchen in Bengaluru. Whole spices ground each morning, ' +
    'a tandoor lit at four, and a dining room built for lingering.',
  cuisine: 'Indian',
  priceRange: '₹₹₹',
  established: 2009,
  phone: '+91 80 4123 8890',
  phoneHref: '+918041238890',
  email: 'table@saffronhouse.example',
  address: {
    street: '14 Lavelle Road, Ashok Nagar',
    locality: 'Bengaluru',
    region: 'Karnataka',
    postalCode: '560001',
    country: 'IN',
  },
  geo: { lat: 12.9716, lon: 77.5993 },
  timeZone: 'Asia/Kolkata',
  mapQuery: 'Lavelle Road, Bengaluru, Karnataka, India',
} as const

/** A single service window, in minutes-from-midnight for cheap comparison. */
export type Service = { label: string; opens: string; closes: string }

/**
 * Opening hours by weekday index, matching `Date.prototype.getDay()` — 0 is Sunday.
 *
 * Two services a day rather than one long stretch, because that is how the kitchen
 * actually runs, and because the open/closed badge would otherwise lie all afternoon.
 */
export const hours: readonly { day: string; short: string; services: Service[] }[] = [
  { day: 'Sunday', short: 'Sun', services: [{ label: 'Lunch', opens: '12:00', closes: '15:30' }, { label: 'Dinner', opens: '18:30', closes: '23:00' }] },
  { day: 'Monday', short: 'Mon', services: [{ label: 'Dinner', opens: '19:00', closes: '22:30' }] },
  { day: 'Tuesday', short: 'Tue', services: [{ label: 'Lunch', opens: '12:00', closes: '15:00' }, { label: 'Dinner', opens: '19:00', closes: '22:30' }] },
  { day: 'Wednesday', short: 'Wed', services: [{ label: 'Lunch', opens: '12:00', closes: '15:00' }, { label: 'Dinner', opens: '19:00', closes: '22:30' }] },
  { day: 'Thursday', short: 'Thu', services: [{ label: 'Lunch', opens: '12:00', closes: '15:00' }, { label: 'Dinner', opens: '19:00', closes: '23:00' }] },
  { day: 'Friday', short: 'Fri', services: [{ label: 'Lunch', opens: '12:00', closes: '15:00' }, { label: 'Dinner', opens: '18:30', closes: '23:30' }] },
  { day: 'Saturday', short: 'Sat', services: [{ label: 'Lunch', opens: '12:00', closes: '16:00' }, { label: 'Dinner', opens: '18:30', closes: '23:30' }] },
]

/** `"19:30"` → `1170`. Used for both the badge and the schema.org output. */
export function toMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}
