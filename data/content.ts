/**
 * Editorial content: the photographs, the reviews, the numbers and the questions.
 *
 * Images are hotlinked from Unsplash with explicit crop parameters so the aspect ratio
 * is decided here and not by the browser. Every one carries real alt text — the gallery
 * is not decorative, it is the reason people book.
 */

export type Photo = { src: string; alt: string }

const unsplash = (id: string, w = 1200, h = 900, crop?: 'entropy' | 'faces') =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80` +
  (crop ? `&crop=${crop}` : '')

/**
 * Every photograph below has been checked against what it actually shows, and the alt
 * text describes that and nothing more.
 *
 * This matters more than it sounds. Alt text written from the caption you wish the photo
 * had is worse than no alt text at all: a screen-reader user is told about a jasmine
 * trellis that is not in the frame, and has no way to know. Where a stock photograph did
 * not match the dish it was standing in for, the photograph was changed — not the words
 * bent to fit it.
 *
 * The hero is deliberately one of the darker frames available. The scrim over it is
 * doing real work for the white type, and a bright interior shot makes AA contrast
 * impossible without washing the photograph out to grey.
 */
export const heroImage: Photo = {
  src: unsplash('1517248135467-4c7edcad34c4', 2000, 1200),
  alt: 'The dining room after dark — banquettes and bare tables under low light',
}

export const chefImage: Photo = {
  // A tall crop of a landscape frame loses the plate; entropy keeps both hands in it.
  src: unsplash('1577106263724-2c8e03bfe9cf', 1000, 1200, 'entropy'),
  alt: 'A cook’s hands finishing a plate, tattooed forearms against a dark apron',
}

/** The signature-dish carousel. Each one maps to a real item on the menu. */
export const signatureDishes: readonly (Photo & { menuId: string })[] = [
  {
    menuId: 'laal-maas',
    src: unsplash('1596797038530-2c107229654b', 900, 900),
    alt: 'A dark red curry in a black pan, scattered with fresh coriander',
  },
  {
    menuId: 'biryani',
    src: unsplash('1589302168068-964664d93dc0', 900, 900),
    alt: 'Biryani on a plate, mint leaves and a wedge of lime laid over the rice',
  },
  {
    menuId: 'kalonji-paneer',
    src: unsplash('1604908176997-125f25cc6f3d', 900, 900),
    alt: 'Cubes of paneer and blistered tomato in a cast-iron pan',
  },
  {
    menuId: 'butter-chicken',
    src: unsplash('1565557623262-b51c2513a641', 900, 900),
    alt: 'Butter chicken beside two rounds of naan on a white plate',
  },
  {
    menuId: 'saffron-house-dal',
    src: unsplash('1567337710282-00832b415979', 900, 900),
    alt: 'A steel thali of dal and curry with a stack of warm flatbread',
  },
  {
    menuId: 'malabar-fish-curry',
    src: unsplash('1574484284002-952d92456975', 900, 900),
    alt: 'Fish fillets in a pale coconut curry, finished with lemon and herbs',
  },
]

/** The bento wall. `colSpan`/`rowSpan` is how much of the grid each photograph earns. */
export const gallery: readonly (Photo & { colSpan?: number; rowSpan?: number })[] = [
  {
    src: unsplash('1552566626-52f8b828add9', 1200, 900),
    alt: 'The main dining room by day, tables set beneath copper pendant lamps',
    colSpan: 2,
    rowSpan: 2,
  },
  {
    src: unsplash('1626777552726-4a6b54c97e46', 800, 600),
    alt: 'An overhead thali — steel bowls of dal, curry and chutney around a mound of rice',
  },
  {
    src: unsplash('1590846406792-0adc7f938f1d', 800, 600),
    alt: 'The upstairs room, pendant lights over the counter and the stair to the mezzanine',
  },
  {
    src: unsplash('1599487488170-d11ec9c172f0', 800, 600),
    alt: 'Skewers turning over open coals, smoke rising off the grill',
    colSpan: 2,
  },
  {
    src: unsplash('1532336414038-cf19250c5757', 800, 600),
    alt: 'Bowls of whole spices and pulses laid out across the prep bench',
  },
  {
    src: unsplash('1414235077428-338989a2e8c0', 800, 600),
    alt: 'A plate set down at a laid table, wine poured and glasses catching the light',
  },
  {
    src: unsplash('1470337458703-46ad1756a187', 1200, 600),
    alt: 'A cocktail being poured over a single block of ice at the bar',
    colSpan: 2,
  },
]

export const stats = [
  { id: 'years', value: '16', label: 'Years on Lavelle Road', description: 'Open since 2009, same room, same kitchen.' },
  { id: 'dishes', value: '41', label: 'Dishes on the menu', description: 'Nine of them have never come off it.' },
  { id: 'rating', value: '4.8', label: 'Average guest rating', description: 'Across 2,140 reviews.' },
  { id: 'slow', value: '36 h', label: 'Longest cook', description: 'The house dal, every single day.' },
]

export const RATING = { value: 4.8, count: 2140 }

export const testimonials = [
  {
    id: 't1',
    quote:
      'The black dal is worth the trip on its own. We arrived at nine on a Tuesday, walked straight in, and stayed until they turned the lights up.',
    author: 'Rhea Kulkarni',
    role: 'Bengaluru',
    avatar: 'https://i.pravatar.cc/96?img=45',
  },
  {
    id: 't2',
    quote:
      'I have eaten laal maas across Rajasthan and this one is not a compromise for city palates. They asked me twice whether I really wanted it hot. I did.',
    author: 'Vikram Rathore',
    role: 'Food writer',
    avatar: 'https://i.pravatar.cc/96?img=12',
  },
  {
    id: 't3',
    quote:
      'Booked the terrace for eleven people with two days notice and they handled every dietary note without a single reminder. The kheer arrived with candles in it.',
    author: 'Sandra Dias',
    role: 'Regular since 2016',
    avatar: 'https://i.pravatar.cc/96?img=32',
  },
]

/**
 * The FAQ, and the source of the FAQPage JSON-LD — one array, so the visible answer
 * and the structured-data answer can never disagree.
 */
export const faqs = [
  {
    id: 'walk-ins',
    question: 'Do you take walk-ins?',
    answer:
      'Yes. We hold about a quarter of the room back for walk-ins every service, and the bar counter is never bookable. Weekend evenings after 8 pm are the one time you should expect to wait — 30 to 45 minutes is typical. Any other night, walking in usually works.',
  },
  {
    id: 'parking',
    question: 'Is parking available?',
    answer:
      'There is valet parking at the entrance from 7 pm, ₹150 per car. During the day, the public lot behind Lavelle Road is a two-minute walk and free for the first hour. We are also 600 m from Cubbon Park metro station, which is the easiest way to reach us on a Friday.',
  },
  {
    id: 'vegan',
    question: 'Do you have vegan options?',
    answer:
      'Fourteen dishes are vegan as written, including the gunpowder bhindi, the bharwan baingan and the tender coconut sorbet. Most of the rest can be made vegan by dropping the dairy — tell us when you book and the kitchen will mark your table. We cook with groundnut oil and ghee separately, never in the same pan.',
  },
  {
    id: 'least-busy',
    question: 'When is the restaurant least busy?',
    answer:
      'Tuesday and Wednesday evenings between 6 and 7 pm, and any weekday lunch after 2 pm. The popular-times chart on our reservations page shows the typical load hour by hour for whichever day you pick, so you can find a quiet slot before you book rather than after you arrive.',
  },
]

/** The reservation success state. Also the "what happens next" Timeline. */
export const reservationSteps = [
  {
    title: 'Request received',
    description: 'It is in the book. Nothing else is needed from you right now.',
    timestamp: 'Just now',
  },
  {
    title: 'We confirm by SMS',
    description:
      'Within 30 minutes during service hours, or first thing the next morning if you booked overnight.',
    timestamp: 'Within 30 min',
  },
  {
    title: 'A reminder the day before',
    description: 'One message, with a link to change the time or cancel. No calls.',
    timestamp: '24 hours before',
  },
  {
    title: 'Your table is held 20 minutes',
    description:
      'Running late? Reply to the reminder and we will hold it longer. Just tell us.',
    timestamp: 'On the night',
  },
]
