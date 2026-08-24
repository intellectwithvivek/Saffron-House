/**
 * The component inventory behind /built-with.
 *
 * `slug` is the component's docs page and matches the directory name inside the
 * package, so a link here cannot drift from the export it describes. `docs` overrides
 * the path for the chart, which lives under /docs/charts rather than /docs/components.
 */

export type UsedComponent = {
  name: string
  slug: string
  /** Full docs path override, for exports that are not under /docs/components. */
  docs?: string
}

export type BuildRow = {
  /** Where on the site a reader can go and look at it. */
  where: string
  components: UsedComponent[]
  note: string
}

export const buildRows: readonly BuildRow[] = [
  {
    where: 'Header, on every page',
    components: [
      { name: 'Navbar', slug: 'navbar' },
      { name: 'ThemeToggle', slug: 'theme-toggle' },
      { name: 'Clock', slug: 'clock' },
      { name: 'Badge', slug: 'badge' },
      { name: 'Button', slug: 'button' },
    ],
    note:
      'Navbar.Brand / Links / Link / Actions / Toggle, with the mobile sheet and ' +
      'aria-current handled for us. The open/closed badge sits beside a live Clock.',
  },
  {
    where: 'Homepage hero and story',
    components: [
      { name: 'Container', slug: 'container' },
      { name: 'Section', slug: 'section' },
      { name: 'Prose', slug: 'prose' },
      { name: 'Text', slug: 'text' },
    ],
    note:
      'Section.Header supplies the eyebrow, title and description for every band on ' +
      'the site. The saffron-thread divider between them is our own CSS, not a component.',
  },
  {
    where: 'Signature dishes',
    components: [
      { name: 'Carousel', slug: 'carousel' },
      { name: 'Card', slug: 'card' },
      { name: 'Badge', slug: 'badge' },
    ],
    note:
      'A scroll-snap track that works before JavaScript loads; only the arrows and dots ' +
      'hydrate. Each slide is a role="group" announced as "Dish 3 of 6".',
  },
  {
    where: 'Menu preview and /menu',
    components: [
      { name: 'Tabs', slug: 'tabs' },
      { name: 'Alert', slug: 'alert' },
      { name: 'Badge', slug: 'badge' },
    ],
    note:
      'One MenuTabs component serves both pages — the homepage passes a limit of four. ' +
      'Manual activation, so arrowing across courses does not swap four panels.',
  },
  {
    where: 'Gallery and numbers',
    components: [
      { name: 'BentoGrid', slug: 'bento-grid' },
      { name: 'Stats', slug: 'stats' },
      { name: 'Rating', slug: 'rating' },
      { name: 'Testimonials', slug: 'testimonials' },
    ],
    note:
      'Stats renders as a description list so a screen reader hears "Years on Lavelle ' +
      'Road, 16" rather than a bare number. Rating is a real radio group.',
  },
  {
    where: 'Questions and location',
    components: [
      { name: 'FAQ', slug: 'faq' },
      { name: 'MapEmbed', slug: 'map-embed' },
    ],
    note:
      'FAQ is native details/summary — it opens with zero JavaScript and answers are ' +
      'findable with Ctrl+F. MapEmbed defaults to OpenStreetMap, so no cookie banner.',
  },
  {
    where: '/reserve — the form',
    components: [
      { name: 'DatePicker', slug: 'date-picker' },
      { name: 'Select', slug: 'select' },
      { name: 'Field', slug: 'field' },
      { name: 'Input', slug: 'input' },
      { name: 'Textarea', slug: 'textarea' },
      { name: 'Checkbox', slug: 'checkbox' },
    ],
    note:
      'Field owns every label, hint and error wiring. Two dinner slots are disabled and ' +
      'labelled "Full"; choosing eight guests reveals an Alert about larger parties.',
  },
  {
    where: '/reserve — confirming',
    components: [
      { name: 'Modal', slug: 'modal' },
      // The provider and the hook are what this project imports; they render `Toast`
      // for us. Naming the component we do not import would be a small lie on a page
      // whose entire job is to be checkable against the source.
      { name: 'ToastProvider', slug: 'toast' },
      { name: 'useToast', slug: 'toast' },
      { name: 'Timeline', slug: 'timeline' },
    ],
    note:
      'Modal implements the full APG dialog pattern — focus trap, restore, inert ' +
      'background. The success state is a Timeline of what happens next.',
  },
  {
    where: '/reserve — popular times',
    components: [{ name: 'BarChart', slug: 'bar-chart', docs: 'charts/bar-chart' }],
    note:
      'Pure SVG, rendered on the server, with a visually hidden data table of the real ' +
      'numbers underneath. No charting library is installed in this project.',
  },
  {
    where: 'This page and the footer',
    components: [
      { name: 'Table', slug: 'table' },
      { name: 'Footer', slug: 'footer' },
      { name: 'Code', slug: 'code' },
      { name: 'CopyButton', slug: 'copy-button' },
    ],
    note:
      'The table below is Table.Head / Body / Row / Cell with a caption. CopyButton ' +
      'falls back to execCommand outside a secure context and announces the result.',
  },
  {
    where: 'Theming, site-wide',
    components: [
      { name: 'ThemeProvider', slug: 'theme-provider' },
      { name: 'themeScript', slug: 'theme-provider' },
      { name: 'ThemeToggle', slug: 'theme-toggle' },
    ],
    note:
      'A Rose accent set by re-pointing six CSS custom properties. No theme object, no ' +
      'Tailwind config, and themeScript in <head> stops the dark-mode flash.',
  },
]

/** Distinct export names across every row, for the closing count. */
export const usedComponentNames = Array.from(
  new Set(buildRows.flatMap((row) => row.components.map((component) => component.name))),
).sort((a, b) => a.localeCompare(b))
