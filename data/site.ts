/**
 * Site-level constants: the canonical URL, this template's own repository, and the
 * VivekUI promotion kit.
 *
 * Everything that names the deployment or the repo lives here and nowhere else. The
 * metadata, the JSON-LD, the sitemap, the robots rules, the header and the footer all
 * read from these constants, so moving the site to another domain or renaming the
 * repository is a one-line change rather than a search-and-replace.
 *
 * Every outbound VivekUI link is built through `utm()` so the campaign tag cannot be
 * forgotten on one of them, and the medium is always stated at the call site.
 */

/** Production origin. No trailing slash — every consumer appends its own path. */
export const SITE_URL = 'https://saffronhouse.vivekkumarsingh.in'

const REPO_OWNER = 'intellectwithvivek'
const REPO_NAME = 'Saffron-House'

/** Kept as a named export because the copy on `/built-with` and the README cite it. */
export const REPO = REPO_NAME

/**
 * This template's own repository.
 *
 * The point of the site is that a developer can take it, so the clone command is a
 * first-class piece of content rather than something buried in the README — it appears
 * in the header, in the footer and on `/built-with`.
 */
export const repo = {
  owner: REPO_OWNER,
  name: REPO_NAME,
  url: `https://github.com/${REPO_OWNER}/${REPO_NAME}`,
  issues: `https://github.com/${REPO_OWNER}/${REPO_NAME}/issues`,
  license: `https://github.com/${REPO_OWNER}/${REPO_NAME}/blob/main/LICENSE`,
  /** What the header and footer copy buttons put on the clipboard. */
  clone: `git clone https://github.com/${REPO_OWNER}/${REPO_NAME}.git`,
  /** GitHub's "create a repo from this one" flow. */
  useTemplate: `https://github.com/${REPO_OWNER}/${REPO_NAME}/generate`,
  /** One-click Vercel import, pre-filled with this repository. */
  deploy:
    'https://vercel.com/new/clone?repository-url=' +
    encodeURIComponent(`https://github.com/${REPO_OWNER}/${REPO_NAME}`) +
    '&project-name=saffron-house&repository-name=saffron-house',
} as const

export const vivekui = {
  pkg: '@the_viveksingh/vivek-ui',
  install: 'npm i @the_viveksingh/vivek-ui',
  docs: 'https://ui.vivekkumarsingh.in/docs',
  components: 'https://ui.vivekkumarsingh.in/docs/components',
  npm: 'https://www.npmjs.com/package/@the_viveksingh/vivek-ui',
  github: 'https://github.com/intellectwithvivek/vivek_UI',
  author: 'https://vivekkumarsingh.in/',
  blurb:
    'Built with ❤️ using VivekUI — 91 React components · 6 SVG charts · zero runtime ' +
    'dependencies. One install, one CSS import, no config.',
} as const

/** The author, for the Person JSON-LD and the footer credit. */
export const author = {
  name: 'Vivek Kumar Singh',
  url: 'https://vivekkumarsingh.in/',
  github: 'https://github.com/intellectwithvivek',
  linkedin: 'https://www.linkedin.com/in/singhvvk/',
} as const

const CAMPAIGN = 'restaurant'

/** Appends the campaign tags for this template to any VivekUI URL. */
export function utm(url: string, medium: string): string {
  const target = new URL(url)
  target.searchParams.set('utm_source', 'vivekui-template')
  target.searchParams.set('utm_campaign', CAMPAIGN)
  target.searchParams.set('utm_medium', medium)
  return target.toString()
}

/** Deep link to one component's docs page, tagged for the /built-with table. */
export function componentDocs(name: string): string {
  return utm(`${vivekui.components}/${name}`, 'builtwith')
}

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/reserve', label: 'Reserve' },
  { href: '/built-with', label: 'Built with VivekUI' },
] as const
