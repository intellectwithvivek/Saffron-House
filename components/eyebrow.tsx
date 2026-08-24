/**
 * The small saffron label that sits above a heading.
 *
 * This exists so there is exactly one of them. `Section.Header`, `Stats`, `FAQ` and
 * `Testimonials` all turn a plain-string `eyebrow` into a pill `Badge` — a sensible
 * default, but it means a page that also writes its own eyebrows ends up with two
 * unrelated treatments alternating down the screen. Passing a node instead opts out of
 * that conversion, so every eyebrow on the site is this one component.
 */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <span className="sh-eyebrow">{children}</span>
}
