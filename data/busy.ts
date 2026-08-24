/**
 * Typical busyness by hour, per weekday — the numbers behind the "Popular times"
 * chart on /reserve.
 *
 * The scale is 0–100 as a share of the room, not a headcount, because that is what a
 * guest is actually asking: "will it be full when I get there?" Hours the kitchen is
 * closed are `0`, which is honest — a gap in the bars is the clearest possible way to
 * show that lunch service ends at three.
 */

/** 11:00 through 23:00 inclusive, which is the window the chart plots. */
export const HOURS: readonly number[] = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]

export type DayKey = 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat'

export type BusyDay = {
  key: DayKey
  label: string
  /** One entry per hour in `HOURS`, same order. */
  load: number[]
}

/**
 * Ordered Monday-first, which is how a guest thinks about a week when booking, even
 * though `Date.getDay()` starts on Sunday. `dayKeyFromDate` bridges the two.
 */
export const busyByDay: readonly BusyDay[] = [
  //          11  12  13  14  15  16  17  18  19  20  21  22  23
  { key: 'mon', label: 'Monday',    load: [ 0,  0,  0,  0,  0,  0,  0,  0, 22, 41, 46, 30,  0] },
  { key: 'tue', label: 'Tuesday',   load: [ 8, 34, 46, 29,  6,  0,  0,  0, 18, 33, 40, 26,  0] },
  { key: 'wed', label: 'Wednesday', load: [10, 39, 52, 33,  8,  0,  0,  0, 26, 47, 53, 34,  0] },
  { key: 'thu', label: 'Thursday',  load: [12, 44, 58, 37, 10,  0,  0,  0, 35, 61, 68, 47, 21] },
  { key: 'fri', label: 'Friday',    load: [16, 57, 74, 49, 14,  0,  0, 31, 58, 84, 92, 71, 38] },
  { key: 'sat', label: 'Saturday',  load: [21, 66, 88, 72, 38, 12,  0, 40, 71, 96, 100, 79, 44] },
  { key: 'sun', label: 'Sunday',    load: [18, 62, 81, 68, 34,  0,  0, 33, 55, 72, 66, 41,  0] },
]

/** The quiet slot the copy points guests at. Kept here so the caption cannot go stale. */
export const calmestSlot = { day: 'tue' as DayKey, label: 'Tuesdays 6–7 pm' }

export const dayKeys: readonly DayKey[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

/** `Date.getDay()` (0 = Sunday) → the key used in `busyByDay`. */
export function dayKeyFromDate(date: Date): DayKey {
  return dayKeys[date.getDay()]
}

export function busyFor(key: DayKey): BusyDay {
  return busyByDay.find((d) => d.key === key) ?? busyByDay[0]
}

/** `13` → `"1 pm"`. Locale-free on purpose: the chart labels must be hydration-stable. */
export function hourLabel(hour: number): string {
  const suffix = hour < 12 ? 'am' : 'pm'
  const twelve = hour % 12 === 0 ? 12 : hour % 12
  return `${twelve} ${suffix}`
}

/**
 * How the room reads at a given load, used for the bar tooltip and the busiest-hour
 * callout. Four buckets rather than a number, because "68% full" is precision a guest
 * has no use for.
 */
export function loadLabel(load: number): string {
  if (load === 0) return 'Kitchen closed'
  if (load < 30) return 'Quiet'
  if (load < 60) return 'Steady'
  if (load < 85) return 'Busy'
  return 'Usually full'
}
