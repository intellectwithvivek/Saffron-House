import { hours, restaurant } from '@/data/restaurant'
import { RATING, faqs } from '@/data/content'
import { SITE_URL, author, repo } from '@/data/site'
import { courses } from '@/data/menu'

/**
 * Structured data, built from the same objects the pages render.
 *
 * Nothing here restates a fact that already lives in `/data` — a JSON-LD block that
 * disagrees with the visible page is worse than none at all, and the only reliable way
 * to prevent that is to give both one source.
 */

const schemaWeekday: Record<string, string> = {
  Sunday: 'Sunday',
  Monday: 'Monday',
  Tuesday: 'Tuesday',
  Wednesday: 'Wednesday',
  Thursday: 'Thursday',
  Friday: 'Friday',
  Saturday: 'Saturday',
}

/** One `OpeningHoursSpecification` per service, which is how two sittings a day is expressed. */
function openingHoursSpecification() {
  return hours.flatMap((entry) =>
    entry.services.map((service) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: `https://schema.org/${schemaWeekday[entry.day]}`,
      opens: service.opens,
      closes: service.closes,
    })),
  )
}

export function restaurantSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${SITE_URL}/#restaurant`,
    name: restaurant.name,
    description: restaurant.description,
    url: SITE_URL,
    telephone: restaurant.phone,
    email: restaurant.email,
    servesCuisine: 'Indian',
    priceRange: restaurant.priceRange,
    currenciesAccepted: 'INR',
    acceptsReservations: true,
    image: [`${SITE_URL}/opengraph-image`],
    address: {
      '@type': 'PostalAddress',
      streetAddress: restaurant.address.street,
      addressLocality: restaurant.address.locality,
      addressRegion: restaurant.address.region,
      postalCode: restaurant.address.postalCode,
      addressCountry: restaurant.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: restaurant.geo.lat,
      longitude: restaurant.geo.lon,
    },
    openingHoursSpecification: openingHoursSpecification(),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: RATING.value,
      reviewCount: RATING.count,
      bestRating: 5,
    },
    hasMenu: {
      '@type': 'Menu',
      url: `${SITE_URL}/menu`,
      hasMenuSection: courses.map((course) => ({
        '@type': 'MenuSection',
        name: course.label,
        description: course.blurb,
        hasMenuItem: course.items.map((item) => ({
          '@type': 'MenuItem',
          name: item.name,
          description: item.description,
          offers: { '@type': 'Offer', price: item.price, priceCurrency: 'INR' },
          suitableForDiet: item.diet.includes('vegan')
            ? 'https://schema.org/VeganDiet'
            : item.diet.includes('veg')
              ? 'https://schema.org/VegetarianDiet'
              : undefined,
        })),
      })),
    },
    potentialAction: {
      '@type': 'ReserveAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/reserve`,
        inLanguage: 'en',
        actionPlatform: 'https://schema.org/DesktopWebPlatform',
      },
      result: { '@type': 'FoodEstablishmentReservation', name: 'Table reservation' },
    },
  }
}

export function faqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}

/** `[{ name: 'Menu', path: '/menu' }]` → a two-crumb trail rooted at the homepage. */
export function breadcrumbSchema(trail: readonly { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...trail].map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path === '/' ? '' : crumb.path}`,
    })),
  }
}

/**
 * The site itself.
 *
 * Carries the `SearchAction` shape only when a site actually has search — this one does
 * not, so it is omitted rather than declared and broken. `inLanguage` and `publisher`
 * are what let an answer engine attribute a quotation correctly.
 */
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: restaurant.name,
    description:
      'A free, open-source Next.js 16 restaurant website template with online table ' +
      'reservations, built with VivekUI.',
    inLanguage: 'en',
    publisher: { '@id': `${SITE_URL}/#author` },
    about: { '@id': `${SITE_URL}/#restaurant` },
  }
}

/** The author, referenced by both the website and the source-code entries. */
export function authorSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#author`,
    name: author.name,
    url: author.url,
    sameAs: [author.github, author.linkedin],
    jobTitle: 'Software engineer',
    knowsAbout: ['React', 'Next.js', 'TypeScript', 'Design systems', 'Web accessibility'],
  }
}

/**
 * The template as a piece of open-source software.
 *
 * This is the entry that matters for the site's second audience. A developer asking an
 * assistant for "a free Next.js restaurant template with reservations" is asking about
 * software, not about a restaurant, and `Restaurant` schema cannot answer that question.
 * `SoftwareSourceCode` names the repository, the licence and the stack so it can.
 */
export function templateSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    '@id': `${SITE_URL}/#template`,
    name: 'Saffron House — Next.js restaurant template',
    description:
      'A free, open-source restaurant website template for Next.js 16 with online table ' +
      'reservations, a full menu, and a popular-times bar chart. Built entirely with ' +
      'VivekUI: 91 React components and 6 SVG charts with zero runtime dependencies.',
    url: `${SITE_URL}/built-with`,
    codeRepository: repo.url,
    programmingLanguage: ['TypeScript', 'CSS'],
    runtimePlatform: 'Next.js 16',
    license: 'https://opensource.org/licenses/MIT',
    author: { '@id': `${SITE_URL}/#author` },
    isAccessibleForFree: true,
    keywords: [
      'nextjs template',
      'restaurant website template',
      'react component library',
      'open source',
      'VivekUI',
    ],
  }
}
