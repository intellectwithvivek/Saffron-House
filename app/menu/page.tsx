import type { Metadata } from 'next'
import Link from 'next/link'
import { Alert, Badge, Button, Container, Section, Text } from '@the_viveksingh/vivek-ui'

import { SaffronThread } from '@/components/saffron-thread'
import { MenuTabs } from '@/components/menu-tabs'
import { JsonLd } from '@/components/json-ld'
import { Eyebrow } from '@/components/eyebrow'
import { dietMeta, type Diet } from '@/data/menu'
import { restaurant } from '@/data/restaurant'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Menu — every dish, price and dietary note',
  description:
    'The full Saffron House menu: starters, mains, desserts and drinks, with prices, ' +
    'dietary markers and allergen information. Regional Indian cooking in Bengaluru.',
  alternates: { canonical: '/menu' },
  openGraph: {
    title: 'The Saffron House menu',
    description:
      'Forty-one dishes across four courses, with prices and dietary markers. Bengaluru.',
    url: '/menu',
  },
}

/** The markers a guest is most likely to be scanning for, in the order they appear. */
const legend: Diet[] = ['veg', 'vegan', 'spicy', 'chefs-pick', 'contains-nuts', 'contains-dairy', 'gluten-free']

export default function MenuPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Menu', path: '/menu' }])} />

      <Section size="xl" padding="lg">
        <Eyebrow>The menu</Eyebrow>
        <h1 className="sh-display sh-page__title">Everything we cook</h1>

        <Text tone="muted" className="sh-measure">
          Prices are in rupees and include all taxes. There is no service charge. The kitchen
          closes thirty minutes before the dining room, so the last order for the long cooks
          is earlier than you might expect — ask, and we will tell you what is still on.
        </Text>

        <SaffronThread />

        {/* Allergens first, before anyone has read a dish. */}
        <Alert tone="warning" title="Allergens and cross-contact" variant="soft">
          <Text size="sm">
            Our kitchen handles nuts, dairy, gluten, mustard, sesame and shellfish, and the
            same tandoor cooks every skewer. We can adapt most dishes and we take allergies
            seriously, but we cannot promise a fully allergen-free plate. Tell your server
            before you order, or ring{' '}
            <a href={`tel:${restaurant.phoneHref}`}>{restaurant.phone}</a> ahead of a visit.
          </Text>
        </Alert>

        <div className="sh-legend" role="list" aria-label="What the markers mean">
          {legend.map((diet) => (
            <span key={diet} role="listitem">
              <Badge variant="outline" tone={dietMeta[diet].tone} size="sm" pill>
                {dietMeta[diet].label}
              </Badge>
            </span>
          ))}
        </div>

        <div className="sh-menu-full">
          <MenuTabs />
        </div>
      </Section>

      <Container size="xl">
        <SaffronThread />
      </Container>

      <Section size="md" padding="lg" align="center">
        <Section.Header
          title="Found something you want?"
          description="Tables go first on Friday and Saturday evenings. Every other night, there is usually room."
          titleSize="lg"
        />
        <Button asChild size="lg">
          <Link href="/reserve">Reserve a table</Link>
        </Button>
      </Section>
    </>
  )
}
