import type { Metadata } from 'next'
import {
  Alert,
  Badge,
  Button,
  Code,
  Container,
  CopyButton,
  Section,
  Table,
  Text,
} from '@the_viveksingh/vivek-ui'

import { SaffronThread } from '@/components/saffron-thread'
import { JsonLd } from '@/components/json-ld'
import { CloneCommand } from '@/components/clone-command'
import { GithubMark } from '@/components/github-mark'
import { Eyebrow } from '@/components/eyebrow'
import { buildRows, usedComponentNames } from '@/data/built-with'
import { REPO, componentDocs, repo, utm, vivekui } from '@/data/site'
import { authorSchema, breadcrumbSchema, templateSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Built with VivekUI — every component on this site',
  description:
    'Every section of this free Next.js restaurant template maps to a VivekUI component. ' +
    '91 React components, 6 SVG charts, zero runtime dependencies, one CSS import.',
  alternates: { canonical: '/built-with' },
  openGraph: {
    title: 'Built with VivekUI',
    description:
      'The component-by-component breakdown of a free Next.js 16 restaurant template.',
    url: '/built-with',
  },
}

/** The docs URL for one component, campaign-tagged for this page. */
function docsHref(component: { slug: string; docs?: string }) {
  return component.docs
    ? utm(`https://ui.vivekkumarsingh.in/docs/${component.docs}`, 'builtwith')
    : componentDocs(component.slug)
}

export default function BuiltWithPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Built with VivekUI', path: '/built-with' }])} />
      <JsonLd data={templateSchema()} />
      <JsonLd data={authorSchema()} />

      <Section size="lg" padding="lg">
        <Eyebrow>⚡ Attribution</Eyebrow>
        <h1 className="sh-display sh-page__title">Built with VivekUI</h1>

        <Text size="lg" className="sh-measure sh-lede">
          This entire website is built with VivekUI, a free React component library with zero
          runtime dependencies.
        </Text>

        <Text tone="muted" className="sh-measure">
          No Tailwind, no shadcn, no MUI, no Emotion, and no charting library. One install, one
          CSS import, no config file. Everything below is a link straight to the documentation
          for the component doing the work.
        </Text>

        <div className="sh-install">
          <Code block>{vivekui.install}</Code>
          <CopyButton value={vivekui.install} label="Copy install command" copiedLabel="Copied" />
        </div>

        <CloneCommand
          label="Clone this template"
          hint="MIT licensed. Node 20.9+ (22 LTS recommended), then npm install and npm run dev."
        />

        <div className="sh-badges">
          <Badge variant="soft" tone="primary" pill>
            91 components
          </Badge>
          <Badge variant="soft" tone="primary" pill>
            6 SVG charts
          </Badge>
          <Badge variant="soft" tone="success" pill>
            0 runtime dependencies
          </Badge>
          <Badge variant="outline" tone="neutral" pill>
            MIT
          </Badge>
        </div>

        <SaffronThread />

        {/* ------------------------------------------------------- the table ---- */}

        <Table
          striped
          hoverable
          size="md"
          /* A scrollable region has to be operable by keyboard, and it needs a name
             to be worth landing on. This is the W3C's recommended pattern for a wide
             table: focusable wrapper, role=region, accessible name. */
          containerProps={{
            className: 'sh-table',
            tabIndex: 0,
            role: 'region',
            'aria-label': 'Components used, by section — scrollable',
          }}
        >
          <Table.Caption>
            Every section of Saffron House and the VivekUI components it is made from.
          </Table.Caption>

          <Table.Head>
            <Table.Row>
              <Table.HeaderCell scope="col">Section</Table.HeaderCell>
              <Table.HeaderCell scope="col">Components</Table.HeaderCell>
              <Table.HeaderCell scope="col">What it gives us</Table.HeaderCell>
            </Table.Row>
          </Table.Head>

          <Table.Body>
            {buildRows.map((row) => (
              <Table.Row key={row.where}>
                <Table.HeaderCell scope="row">{row.where}</Table.HeaderCell>

                <Table.Cell label="Components">
                  <span className="sh-table__components">
                    {row.components.map((component) => (
                      <a
                        key={component.name}
                        href={docsHref(component)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Code>{component.name}</Code>
                      </a>
                    ))}
                  </span>
                </Table.Cell>

                <Table.Cell label="What it gives us">
                  <Text size="sm" tone="muted">
                    {row.note}
                  </Text>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>

        <p className="sh-table-hint">Scroll the table sideways to read the last column.</p>

        <Alert tone="success" title="The chart needed no chart library" variant="soft">
          <Text size="sm">
            The popular-times panel on{' '}
            <a href={utm(`${vivekui.docs}/charts`, 'builtwith')} target="_blank" rel="noopener noreferrer">
              /reserve
            </a>{' '}
            is a VivekUI <Code>BarChart</Code> — pure SVG, server-rendered, with a visually
            hidden data table of the real numbers for screen readers. Recharts, Chart.js and
            D3 are all absent from <Code>package.json</Code>. The whole chart module is under
            12 kB.
          </Text>
        </Alert>

        <SaffronThread />

        <Text tone="muted" className="sh-measure">
          {`${usedComponentNames.length} distinct VivekUI exports are used across the four pages of this template — plus the flat TabsList / TabsTab / TabsPanels / TabsPanel aliases, which a Server Component needs in place of the dotted form: `}
          {usedComponentNames.join(', ')}.
        </Text>
      </Section>

      <Container size="lg">
        <SaffronThread />
      </Container>

      {/* --------------------------------------------------------------- CTAs ---- */}

      <Section size="lg" padding="lg" background="muted" align="center">
        <Section.Header
          title="Use this for your own restaurant"
          description="MIT licensed. Clone it, change the words and the photographs, and ship it. The footer credit is removable — a star is appreciated."
          titleSize="xl"
        />

        <div className="sh-cta-row">
          <Button asChild size="lg">
            <a href={utm(vivekui.docs, 'builtwith')} target="_blank" rel="noopener noreferrer">
              Read the docs
            </a>
          </Button>

          <Button asChild size="lg" variant="outline">
            <a href={repo.url} target="_blank" rel="noopener noreferrer">
              <GithubMark />
              Star on GitHub
            </a>
          </Button>

          <Button asChild size="lg" variant="ghost">
            <a href={repo.useTemplate} target="_blank" rel="noopener noreferrer">
              Use this template
            </a>
          </Button>

          <Button asChild size="lg" variant="ghost">
            <a href={repo.deploy} target="_blank" rel="noopener noreferrer">
              Deploy to Vercel
            </a>
          </Button>
        </div>

        <Text size="sm" tone="muted">
          Template repository:{' '}
          <a href={repo.url} target="_blank" rel="noopener noreferrer">
            <Code>{REPO}</Code>
          </a>{' '}
          · Built by{' '}
          <a href={utm(vivekui.author, 'builtwith')} target="_blank" rel="noopener noreferrer">
            Vivek Kumar Singh
          </a>
        </Text>
      </Section>
    </>
  )
}
