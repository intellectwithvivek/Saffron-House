import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  BentoGrid,
  Button,
  Container,
  FAQ,
  MapEmbed,
  Prose,
  Rating,
  Section,
  Stats,
  Testimonials,
  Text,
} from '@the_viveksingh/vivek-ui'

import { SaffronThread } from '@/components/saffron-thread'
import { DishCarousel } from '@/components/dish-carousel'
import { MenuTabs } from '@/components/menu-tabs'
import { HoursList } from '@/components/hours-list'
import { JsonLd } from '@/components/json-ld'
import { Eyebrow } from '@/components/eyebrow'

import { restaurant } from '@/data/restaurant'
import { RATING, chefImage, faqs, gallery, heroImage, stats, testimonials } from '@/data/content'
import {
  authorSchema,
  breadcrumbSchema,
  faqSchema,
  restaurantSchema,
  websiteSchema,
} from '@/lib/schema'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default function HomePage() {
  return (
    <>
      <JsonLd data={restaurantSchema()} />
      <JsonLd data={websiteSchema()} />
      <JsonLd data={authorSchema()} />
      <JsonLd data={faqSchema()} />
      <JsonLd data={breadcrumbSchema([])} />

      {/* ------------------------------------------------------------- hero ---- */}

      <section className="sh-hero" aria-label="Saffron House">
        <div className="sh-hero__media">
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            priority
            sizes="100vw"
            quality={82}
          />
        </div>
        <div className="sh-hero__scrim" />

        <Container size="xl">
          <div className="sh-hero__body">
            <Eyebrow>Lavelle Road · Bengaluru · Since 2009</Eyebrow>

            {/* The page's only h1. */}
            <h1 className="sh-hero__title">{restaurant.name}</h1>

            <p className="sh-hero__lede">{restaurant.tagline}</p>

            <div className="sh-hero__meta">
              <Button asChild size="lg">
                <Link href="/reserve">Reserve a table</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/menu">See the menu</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------ story ---- */}

      <Container size="xl">
        <SaffronThread />
      </Container>

      <Section size="xl" padding="lg" aria-label="Our kitchen">
        <div className="sh-split">
          <div className="sh-portrait">
            <Image
              src={chefImage.src}
              alt={chefImage.alt}
              fill
              sizes="(max-width: 896px) 92vw, 40vw"
            />
          </div>

          <div>
            <Eyebrow>The kitchen</Eyebrow>
            <h2 className="sh-display sh-story__title">
              Sixteen years, one room, and a tandoor lit at four
            </h2>

            <Prose>
              <p>
                Aarti Menon opened Saffron House in a converted bungalow on Lavelle Road with
                eleven tables and a single clay oven. Both are still here. The oven is lit at
                four every afternoon and does not go out until the last order is called.
              </p>
              <p>
                Nothing on this menu comes out of a jar. Whole spices are dry-roasted and
                ground each morning, the paneer is pressed in-house, and the black dal —
                the dish people book a month ahead for — goes on the flame the day before
                you eat it. It takes thirty-six hours, and there is no way to make it take
                less.
              </p>
            </Prose>

            <blockquote className="sh-pull">
              &ldquo;Regional food, cooked properly, at the pace it wants to be cooked. That
              was the whole plan. We have not needed a second one.&rdquo;
            </blockquote>

            <Text size="sm" tone="muted" className="sh-pull__attrib">
              Aarti Menon, chef-owner
            </Text>
          </div>
        </div>
      </Section>

      {/* -------------------------------------------------------- signature ---- */}

      <Container size="xl">
        <SaffronThread />
      </Container>

      <Section size="xl" padding="lg">
        <Section.Header
          eyebrow={<Eyebrow>Signature dishes</Eyebrow>}
          title="The six we are known for"
          description="Every one of them has been on the menu since the year we opened, and none of them has changed."
          titleSize="xl"
        />
        <DishCarousel />
      </Section>

      {/* ------------------------------------------------------- menu preview -- */}

      <Container size="xl">
        <SaffronThread />
      </Container>

      <Section size="xl" padding="lg" background="muted">
        <Section.Header
          eyebrow={<Eyebrow>The menu</Eyebrow>}
          title="Four courses, forty-one dishes"
          description="A taste of each course below. Prices include taxes; there is no service charge."
          titleSize="xl"
        />

        <MenuTabs
          limit={4}
          footer={
            <div className="sh-menu-cta">
              <Button asChild variant="outline">
                <Link href="/menu">See the full menu</Link>
              </Button>
            </div>
          }
        />
      </Section>

      {/* ---------------------------------------------------------- gallery ---- */}

      <Container size="xl">
        <SaffronThread />
      </Container>

      <Section size="xl" padding="lg">
        <Section.Header
          eyebrow={<Eyebrow>The room</Eyebrow>}
          title="Where you will be sitting"
          titleSize="xl"
        />

        <BentoGrid cols={{ base: 1, sm: 2, lg: 4 }} gap={4} rowHeight="12rem">
          {gallery.map((photo) => (
            <BentoGrid.Item key={photo.src} colSpan={photo.colSpan} rowSpan={photo.rowSpan}>
              <div className="sh-tile">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 48vw, 32vw"
                />
              </div>
            </BentoGrid.Item>
          ))}
        </BentoGrid>
      </Section>

      {/* ------------------------------------------------------------ stats ---- */}

      <Container size="xl">
        <SaffronThread />
      </Container>

      <Stats
        size="xl"
        padding="lg"
        items={stats}
        columns={{ base: 2, lg: 4 }}
        eyebrow={<Eyebrow>By the numbers</Eyebrow>}
        title="Saffron House, counted"
      />

      <Container size="xl" className="sh-rating">
        <Rating
          value={RATING.value}
          readOnly
          allowHalf
          size="md"
          label={`${RATING.value} out of 5, from ${RATING.count.toLocaleString('en-IN')} guest reviews`}
        />
        <Text size="sm" tone="muted">
          {`${RATING.value} average across ${RATING.count.toLocaleString('en-IN')} reviews`}
        </Text>
      </Container>

      {/* ----------------------------------------------------- testimonials ---- */}

      <Container size="xl">
        <SaffronThread />
      </Container>

      <Testimonials
        size="xl"
        padding="lg"
        items={testimonials}
        columns={{ base: 1, md: 3 }}
        eyebrow={<Eyebrow>Guests</Eyebrow>}
        title="What people say afterwards"
      />

      {/* -------------------------------------------------------------- faq ---- */}

      <Container size="xl">
        <SaffronThread />
      </Container>

      <FAQ
        size="md"
        padding="lg"
        background="muted"
        items={faqs}
        name="home-faq"
        defaultOpenIndex={0}
        eyebrow={<Eyebrow>Good to know</Eyebrow>}
        title="Questions we are asked most"
      />

      {/* ------------------------------------------------------- find us ------- */}

      <Container size="xl">
        <SaffronThread />
      </Container>

      <Section size="xl" padding="lg">
        <Section.Header eyebrow={<Eyebrow>Find us</Eyebrow>} title="Lavelle Road" titleSize="xl" />

        <div className="sh-split sh-split--map">
          <MapEmbed
            query={restaurant.mapQuery}
            lat={restaurant.geo.lat}
            lon={restaurant.geo.lon}
            zoom={16}
            ratio={4 / 3}
            title={`Map showing ${restaurant.name} on Lavelle Road, Bengaluru`}
          />

          <div className="sh-stack-tight">
            <h3 className="sh-display sh-find__title">Opening hours</h3>
            <HoursList />

            <SaffronThread tone="muted" />

            <address className="sh-address">
              {restaurant.address.street}
              <br />
              {restaurant.address.locality} {restaurant.address.postalCode}
              <br />
              {restaurant.address.region}, India
            </address>

            <Text size="sm">
              <a href={`tel:${restaurant.phoneHref}`}>{restaurant.phone}</a>
              {' · '}
              <a href={`mailto:${restaurant.email}`}>{restaurant.email}</a>
            </Text>

            <Text size="sm" tone="muted">
              Valet from 7 pm. Cubbon Park metro is a 600 m walk. The courtyard is
              step-free from the main entrance.
            </Text>

            <div className="sh-find__cta">
              <Button asChild>
                <Link href="/reserve">Reserve a table</Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
