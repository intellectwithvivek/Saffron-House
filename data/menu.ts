/**
 * The menu.
 *
 * `/menu` renders every item; the homepage preview takes the first four of each
 * course, so the order here is the order a guest sees first — put the dishes you
 * actually want to sell at the top.
 */

export type Diet =
  | 'veg'
  | 'vegan'
  | 'spicy'
  | 'chefs-pick'
  | 'contains-nuts'
  | 'contains-dairy'
  | 'gluten-free'

export type MenuItem = {
  id: string
  name: string
  description: string
  /** Rupees. Formatted at the edge, never stored pre-formatted. */
  price: number
  diet: Diet[]
}

export type Course = {
  id: string
  /** Tab label. */
  label: string
  /** One line under the tab, so a course is more than a word. */
  blurb: string
  items: MenuItem[]
}

export const courses: readonly Course[] = [
  {
    id: 'starters',
    label: 'Starters',
    blurb: 'Small plates from the tandoor and the fryer, meant to be shared and argued over.',
    items: [
      {
        id: 'kalonji-paneer',
        name: 'Kalonji Paneer Tikka',
        description:
          'Hand-pressed paneer marinated overnight in hung curd and nigella seed, charred hard on the outside and still trembling within. Served with a burnt-tomato chutney.',
        price: 480,
        diet: ['veg', 'chefs-pick', 'contains-dairy'],
      },
      {
        id: 'lamb-galouti',
        name: 'Galouti Kebab',
        description:
          'Minced lamb worked with raw papaya and twenty-one spices until it collapses at the touch of a spoon. Four to a plate, on warm ulte tawe ka paratha.',
        price: 620,
        diet: ['chefs-pick'],
      },
      {
        id: 'gunpowder-okra',
        name: 'Gunpowder Bhindi',
        description:
          'Okra sliced fine and fried until it rattles, tossed in molagapodi and dried curry leaf. The most addictive thing we make, and the fastest to disappear.',
        price: 380,
        diet: ['veg', 'vegan', 'spicy'],
      },
      {
        id: 'chettinad-prawn',
        name: 'Chettinad Pepper Prawns',
        description:
          'Tiger prawns in a dry masala of black pepper, star anise and toasted coconut. Hot in the Tamil way — aromatic first, then the heat arrives.',
        price: 690,
        diet: ['spicy', 'gluten-free'],
      },
      {
        id: 'beetroot-tikki',
        name: 'Beetroot & Walnut Tikki',
        description:
          'Roasted beetroot bound with crushed walnut and green chilli, crisped in ghee and set on a smear of dill yoghurt.',
        price: 360,
        diet: ['veg', 'contains-nuts', 'contains-dairy'],
      },
      {
        id: 'amritsari-sole',
        name: 'Amritsari Sole',
        description:
          'Sole fillets in a gram-flour batter sharpened with ajwain and lime, fried to order. Nothing else on the plate but a wedge of lemon and chaat masala.',
        price: 640,
        diet: [],
      },
    ],
  },
  {
    id: 'mains',
    label: 'Mains',
    blurb: 'The long cooks. Most of these were started before the doors opened.',
    items: [
      {
        id: 'saffron-house-dal',
        name: 'Saffron House Dal',
        description:
          'Black urad simmered thirty-six hours over a low flame, finished with tomato, butter and a bruise of ginger. The dish the restaurant is named around.',
        price: 540,
        diet: ['veg', 'chefs-pick', 'contains-dairy'],
      },
      {
        id: 'laal-maas',
        name: 'Laal Maas',
        description:
          'Mutton on the bone in a Mathania chilli gravy, cooked down until the fat and the spice stop being separate things. Properly, unapologetically hot.',
        price: 890,
        diet: ['spicy', 'chefs-pick'],
      },
      {
        id: 'kashmiri-morel',
        name: 'Gucchi Yakhni',
        description:
          'Kashmiri morels in a pale fennel-and-yoghurt gravy, scented with green cardamom. Delicate, and the only white curry on the menu.',
        price: 980,
        diet: ['veg', 'contains-dairy'],
      },
      {
        id: 'malabar-fish-curry',
        name: 'Malabar Fish Curry',
        description:
          'Seer fish in coconut milk soured with kudampuli, tempered with mustard and shallot. Ask for extra appam; everyone does.',
        price: 820,
        diet: ['gluten-free'],
      },
      {
        id: 'butter-chicken',
        name: 'Old Delhi Butter Chicken',
        description:
          'Tandoori thigh meat in a gravy of slow-roasted tomato, cashew and a great deal of butter. Sweet only by accident, never by design.',
        price: 760,
        diet: ['contains-nuts', 'contains-dairy'],
      },
      {
        id: 'baingan',
        name: 'Bharwan Baingan',
        description:
          'Baby aubergines stuffed with peanut, sesame and jaggery, braised in a dark tamarind masala until the skins give way.',
        price: 520,
        diet: ['veg', 'vegan', 'contains-nuts'],
      },
      {
        id: 'biryani',
        name: 'Kacchi Gosht Biryani',
        description:
          'Raw marinated mutton and aged sella rice sealed under dough and cooked once, together. Served with burani raita and mirchi ka salan. Forty minutes; worth the wait.',
        price: 940,
        diet: ['chefs-pick', 'contains-dairy'],
      },
    ],
  },
  {
    id: 'desserts',
    label: 'Desserts',
    blurb: 'Restrained, mostly. The pastry section shares its kitchen with the tandoor.',
    items: [
      {
        id: 'saffron-kheer',
        name: 'Saffron & Pistachio Kheer',
        description:
          'Short-grain rice cooked slowly in milk until it thickens on its own, steeped with Kashmiri saffron and cold-set. Pistachio, and nothing else.',
        price: 320,
        diet: ['veg', 'chefs-pick', 'contains-nuts', 'contains-dairy'],
      },
      {
        id: 'gajar-halwa',
        name: 'Gajar ka Halwa',
        description:
          'Red winter carrots grated by hand and reduced in whole milk for three hours. Served hot, with a scoop of cardamom kulfi melting into it.',
        price: 300,
        diet: ['veg', 'contains-nuts', 'contains-dairy'],
      },
      {
        id: 'jaggery-tart',
        name: 'Palm Jaggery Tart',
        description:
          'A dark, almost salty caramel of Kolhapuri jaggery in a thin ghee shortcrust, with crème fraîche to cut it.',
        price: 340,
        diet: ['veg', 'contains-dairy'],
      },
      {
        id: 'coconut-sorbet',
        name: 'Tender Coconut Sorbet',
        description:
          'Nothing but young coconut water, its flesh, and a little lime. The dessert for the table that has already eaten too much.',
        price: 260,
        diet: ['veg', 'vegan', 'gluten-free'],
      },
      {
        id: 'shahi-tukda',
        name: 'Shahi Tukda',
        description:
          'Brioche fried in ghee, soaked in saffron rabri and finished with rose petal and silver leaf. As excessive as it sounds.',
        price: 360,
        diet: ['veg', 'contains-nuts', 'contains-dairy'],
      },
    ],
  },
  {
    id: 'drinks',
    label: 'Drinks',
    blurb: 'A short list. Everything here is made in-house or poured from something we can vouch for.',
    items: [
      {
        id: 'kokum-cooler',
        name: 'Kokum & Curry Leaf Cooler',
        description:
          'Kokum syrup, lime, soda, and a curry-leaf oil floated on top. Sour, savoury, and the best thing to drink alongside chilli.',
        price: 280,
        diet: ['veg', 'vegan'],
      },
      {
        id: 'nimbu-masala',
        name: 'Masala Nimbu Soda',
        description:
          'Fresh lime, black salt and roasted cumin, over crushed ice. Sweet or salty — the kitchen will ask which.',
        price: 220,
        diet: ['veg', 'vegan'],
      },
      {
        id: 'lassi',
        name: 'Rose & Cardamom Lassi',
        description:
          'Thick set curd whipped with rose water and green cardamom. Cold enough to hurt, which is the point.',
        price: 260,
        diet: ['veg', 'contains-dairy'],
      },
      {
        id: 'gin-thali',
        name: 'Bagh-e-Bahar',
        description:
          'Indian dry gin, house tonic, black cardamom and a strip of grapefruit peel. The bar answer to a G&T that has to sit beside a laal maas.',
        price: 640,
        diet: ['veg', 'vegan'],
      },
      {
        id: 'filter-coffee',
        name: 'Mysore Filter Coffee',
        description:
          'A 70:30 blend decocted overnight, pulled long with hot milk. Served in a steel tumbler the traditional way, whether or not you asked.',
        price: 180,
        diet: ['veg', 'contains-dairy'],
      },
      {
        id: 'chai',
        name: 'Kadak Adrak Chai',
        description:
          'Assam leaf boiled hard with ginger and a single clove. Strong enough to stand a spoon in.',
        price: 160,
        diet: ['veg', 'contains-dairy'],
      },
    ],
  },
]

/** Label and badge tone for each dietary marker, so the two never drift apart. */
export const dietMeta: Record<
  Diet,
  { label: string; tone: 'primary' | 'neutral' | 'success' | 'warning' | 'danger' }
> = {
  veg: { label: 'Veg', tone: 'success' },
  vegan: { label: 'Vegan', tone: 'success' },
  spicy: { label: 'Spicy', tone: 'danger' },
  'chefs-pick': { label: 'Chef’s pick', tone: 'primary' },
  'contains-nuts': { label: 'Nuts', tone: 'warning' },
  'contains-dairy': { label: 'Dairy', tone: 'neutral' },
  'gluten-free': { label: 'Gluten-free', tone: 'neutral' },
}

/** Indian digit grouping, fixed locale so the server and the client agree. */
export const formatPrice = (rupees: number) => `₹${rupees.toLocaleString('en-IN')}`
