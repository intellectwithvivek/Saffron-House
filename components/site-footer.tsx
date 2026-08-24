import { Button, Code, CopyButton, Footer, Text } from '@the_viveksingh/vivek-ui'
import { restaurant } from '@/data/restaurant'
import { author, repo, utm, vivekui } from '@/data/site'
import { SaffronThread } from './saffron-thread'
import { CloneCommand } from './clone-command'
import { GithubMark } from './github-mark'

/**
 * The site footer: the restaurant's own links, the VivekUI promotion kit, and the way
 * to take the template.
 *
 * The clone command sits here as well as in the header because the footer is where a
 * reader ends up after actually looking at the thing — which is the moment they decide
 * whether they want it. Making them go hunting for a repo link at that point loses them.
 */
export function SiteFooter() {
  return (
    <Footer
      background="muted"
      size="xl"
      columns={[
        {
          title: 'Saffron House',
          links: [
            { label: 'Menu', href: '/menu' },
            { label: 'Reserve a table', href: '/reserve' },
            { label: 'Built with VivekUI', href: '/built-with' },
            { label: restaurant.phone, href: `tel:${restaurant.phoneHref}` },
          ],
        },
        {
          title: 'VivekUI',
          links: [
            { label: 'Documentation', href: utm(vivekui.docs, 'footer'), target: '_blank' },
            { label: 'Component reference', href: utm(vivekui.components, 'footer'), target: '_blank' },
            { label: 'npm package', href: vivekui.npm, target: '_blank' },
            { label: 'GitHub repository', href: vivekui.github, target: '_blank' },
          ],
        },
        {
          title: 'This template',
          links: [
            { label: 'Source on GitHub', href: repo.url, target: '_blank' },
            { label: 'Use as a template', href: repo.useTemplate, target: '_blank' },
            { label: 'Deploy to Vercel', href: repo.deploy, target: '_blank' },
            { label: 'Report an issue', href: repo.issues, target: '_blank' },
            { label: 'MIT licence', href: repo.license, target: '_blank' },
          ],
        },
      ]}
      brand={
        <div className="sh-footer__brand">
          <span className="sh-brand__name sh-display sh-footer__wordmark">{restaurant.name}</span>
          <SaffronThread tone="muted" className="sh-footer__thread" />

          {/* Take the template. */}
          <div className="sh-footer__clone">
            <CloneCommand
              size="sm"
              label="Clone this template"
              hint="Free and MIT licensed. Change the words, the photographs and the menu, and ship it."
            />

            <div className="sh-footer__repo-actions">
              <Button asChild size="sm" variant="outline">
                <a href={repo.url} target="_blank" rel="noopener noreferrer">
                  <GithubMark />
                  Star on GitHub
                </a>
              </Button>
              <Button asChild size="sm" variant="ghost">
                <a href={repo.useTemplate} target="_blank" rel="noopener noreferrer">
                  Use this template
                </a>
              </Button>
            </div>
          </div>

          <SaffronThread tone="muted" className="sh-footer__thread" />

          {/* The VivekUI promotion kit. */}
          <Text size="sm" tone="muted" className="sh-footer__blurb">
            {vivekui.blurb}
          </Text>

          <div className="sh-footer__install">
            <Code>{vivekui.install}</Code>
            <CopyButton
              value={vivekui.install}
              size="sm"
              variant="outline"
              label="Copy"
              copiedLabel="Copied"
              copiedAnnouncement="Install command copied to the clipboard"
            />
          </div>
        </div>
      }
      copyright={
        <span className="sh-footer__legal">
          {`© ${restaurant.established}–2026 ${restaurant.name} — a fictional restaurant, and a real open-source template by `}
          <a href={utm(author.url, 'footer')} target="_blank" rel="noopener noreferrer">
            {author.name}
          </a>
          {'. MIT licensed: use it commercially, change anything. The VivekUI credit above is removable — a star is appreciated, never required.'}
        </span>
      }
    />
  )
}
