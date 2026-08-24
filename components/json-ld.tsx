/**
 * One structured-data block.
 *
 * `JSON.stringify` output is escaped for `</script>` before it goes into the tag —
 * a string in the data containing that sequence would otherwise close the script
 * element early, which is the standard injection route for inline JSON-LD.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  )
}
