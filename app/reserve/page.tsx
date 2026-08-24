import type { Metadata } from 'next'
import { Container, Section, Text } from '@the_viveksingh/vivek-ui'

import { SaffronThread } from '@/components/saffron-thread'
import { ReserveSection } from '@/components/reserve-section'
import { HoursList } from '@/components/hours-list'
import { JsonLd } from '@/components/json-ld'
import { Eyebrow } from '@/components/eyebrow'
import { restaurant } from '@/data/restaurant'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Reserve a table — see how busy we are first',
  description:
    'Book a table at Saffron House in Bengaluru. Pick your date and time, and check the ' +
    'popular-times chart to find a quiet slot before you commit.',
  alternates: { canonical: '/reserve' },
  openGraph: {
    title: 'Reserve a table at Saffron House',
    description:
      'Online reservations with a popular-times chart, so you can pick a quiet slot.',
    url: '/reserve',
  },
}

export default function ReservePage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Reserve', path: '/reserve' }])} />

      <Section size="xl" padding="lg">
        <div className="sh-page__head">
          <Eyebrow>Reservations</Eyebrow>
          <h1 className="sh-display sh-page__title">Reserve a table</h1>
          <Text tone="muted" className="sh-measure">
            Lunch and dinner, up to eight guests. Confirmation comes by SMS, usually within
            half an hour. For nine or more, or to book the whole courtyard, ring{' '}
            <a href={`tel:${restaurant.phoneHref}`}>{restaurant.phone}</a>.
          </Text>
        </div>

        <SaffronThread />

        <ReserveSection />
      </Section>

      <Container size="xl">
        <SaffronThread />
      </Container>

      <Section size="md" padding="lg">
        <Section.Header
          eyebrow={<Eyebrow>Hours</Eyebrow>}
          title="When the kitchen is open"
          description="Two services a day. Monday is dinner only — the kitchen preps the week's long cooks over lunch."
          titleSize="lg"
        />
        <HoursList />
      </Section>
    </>
  )
}
