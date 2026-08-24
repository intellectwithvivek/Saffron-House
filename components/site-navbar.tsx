'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Badge, Button, Navbar, ThemeToggle } from '@the_viveksingh/vivek-ui'
import { restaurant } from '@/data/restaurant'
import { repo, utm, vivekui } from '@/data/site'
import { OpenStatus } from './open-status'
import { GithubMark } from './github-mark'

const links = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/reserve', label: 'Reserve' },
  { href: '/built-with', label: 'Built with VivekUI' },
]

/**
 * The site header.
 *
 * A client component only because it needs `usePathname` to mark the current page —
 * `aria-current="page"` is what `Navbar.Link`'s `active` prop sets, and getting it
 * right is worth the boundary.
 *
 * Two items appear twice in the markup and never twice on screen: the open/closed
 * badge and the repository link. Both belong in the header bar on a wide viewport and
 * inside the collapsed sheet on a narrow one, and there is no width at which a phone
 * header has room for a brand, a theme switch, a repo link, a booking button and a
 * hamburger. CSS shows exactly one copy of each; see `.sh-navbar__*` in globals.css.
 */
export function SiteNavbar() {
  const pathname = usePathname()

  return (
    <Navbar sticky size="lg" container="xl" className="sh-navbar">
      <Navbar.Brand asChild>
        <Link href="/" className="sh-brand">
          <span className="sh-brand__mark" aria-hidden="true" />
          <span className="sh-brand__name sh-display">{restaurant.name}</span>
        </Link>
      </Navbar.Brand>

      <Navbar.Links aria-label="Main">
        {links.map((link) => (
          <Navbar.Link key={link.href} asChild active={pathname === link.href}>
            <Link href={link.href}>{link.label}</Link>
          </Navbar.Link>
        ))}

        {/* Promotion kit: a real link in the nav list, so it reaches the mobile sheet
            too instead of being desktop-only decoration. */}
        <Navbar.Link asChild>
          <a
            href={utm(vivekui.docs, 'navbar')}
            target="_blank"
            rel="noopener noreferrer"
            className="sh-navbar__promo"
          >
            <Badge variant="soft" tone="primary" pill size="sm">
              ⚡ Built with VivekUI
            </Badge>
          </a>
        </Navbar.Link>

        {/* The narrow-screen copies. Hidden once the header bar has room for them. */}
        <Navbar.Link asChild className="sh-navbar__repo-mobile">
          <a href={repo.url} target="_blank" rel="noopener noreferrer">
            <span className="sh-navbar__repo-mobile-inner">
              <GithubMark />
              Get the source on GitHub
            </span>
          </a>
        </Navbar.Link>

        <li className="sh-navbar__status-mobile" role="none">
          <OpenStatus />
        </li>
      </Navbar.Links>

      <Navbar.Actions>
        <span className="sh-navbar__status">
          <OpenStatus />
        </span>

        {/* The template is meant to be taken, so the way to take it sits in the header
            rather than only at the bottom of the page.

            A `Button asChild` wrapping an anchor, not an `IconButton` — IconButton has
            no `asChild`, and a link that looks like a button has to be a real `<a>` or
            middle-click, cmd-click and "copy link address" all quietly stop working.
            The label is visible rather than an aria-label, which is clearer for
            everyone and needs no icon-only naming workaround. */}
        <Button asChild variant="ghost" size="sm" className="sh-navbar__repo">
          <a href={repo.url} target="_blank" rel="noopener noreferrer">
            <GithubMark />
            GitHub
          </a>
        </Button>

        <ThemeToggle mode="cycle" variant="ghost" />

        {/* Two labels, one shown at a time. `display: none` takes the hidden one out
            of the accessibility tree as well, so exactly one accessible name is
            announced — which is why this is two real elements and not a CSS `content`
            swap. The full label does not fit beside the brand, the theme toggle and
            the burger on a 390px screen, and dropping the primary CTA entirely is the
            worse trade. */}
        <Button asChild size="sm" className="sh-navbar__cta">
          <Link href="/reserve">
            <span className="sh-cta__long">Reserve a table</span>
            <span className="sh-cta__short">Reserve</span>
          </Link>
        </Button>

        <Navbar.Toggle />
      </Navbar.Actions>
    </Navbar>
  )
}
