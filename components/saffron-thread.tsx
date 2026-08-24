/**
 * The signature element: a hairline that fades out at both ends with three tapered
 * strokes of saffron at its centre.
 *
 * Used between every section on every page, and nowhere else — that repetition is the
 * whole idea. It carries no information, so it is hidden from assistive tech: the
 * sections either side are already landmarks with their own headings, and announcing
 * "separator" a dozen times a page adds nothing a heading list does not already say.
 *
 * All of the drawing lives in `.sh-thread` in globals.css. No SVG, no image request.
 */
export function SaffronThread({
  tone = 'default',
  className,
}: {
  /** `muted` drops the flanking rules and leaves just the marks. */
  tone?: 'default' | 'muted'
  className?: string
}) {
  return (
    <div
      className={className ? `sh-thread ${className}` : 'sh-thread'}
      data-tone={tone}
      aria-hidden="true"
    >
      <span className="sh-thread__mark" />
    </div>
  )
}
