import { Code, CopyButton, Text } from '@the_viveksingh/vivek-ui'
import { repo } from '@/data/site'

/**
 * The `git clone` line, with a copy button.
 *
 * This site exists to be taken, so the command that takes it is treated as content: it
 * appears in the header, in the footer and on `/built-with`, always from this one
 * component so the three can never drift.
 *
 * The command is also written out as visible text rather than hidden behind a button,
 * because a reader who does not trust a copy button — or who is reading on a machine
 * that is not the one they will build on — needs to be able to see and retype it.
 */
export function CloneCommand({
  label = 'Clone this template',
  hint,
  size = 'md',
}: {
  /** Heading above the command. Pass `null` to render the command alone. */
  label?: string | null
  hint?: string
  /** `sm` is the footer's denser treatment. */
  size?: 'sm' | 'md'
}) {
  return (
    <div className="sh-clone" data-size={size}>
      {label && (
        <Text size="sm" weight="semibold" className="sh-clone__label">
          {label}
        </Text>
      )}

      <div className="sh-clone__row">
        <Code block={size === 'md'}>{repo.clone}</Code>
        <CopyButton
          value={repo.clone}
          size="sm"
          variant="outline"
          label="Copy"
          copiedLabel="Copied"
          copiedAnnouncement="Clone command copied to the clipboard"
        />
      </div>

      {hint && (
        <Text size="sm" tone="muted">
          {hint}
        </Text>
      )}
    </div>
  )
}
