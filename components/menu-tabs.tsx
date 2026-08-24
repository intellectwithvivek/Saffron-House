import {
  Badge,
  Tabs,
  TabsList,
  TabsPanel,
  TabsPanels,
  TabsTab,
  Text,
} from '@the_viveksingh/vivek-ui'
import { courses, dietMeta, formatPrice, type MenuItem } from '@/data/menu'

/**
 * One dish, set the way a printed menu sets it: name on the left, price on the right,
 * a dotted leader carrying the eye across the gap, description underneath.
 *
 * The leader is a decorative `<span>` and not a border on the name, because the name
 * has to be able to wrap onto two lines without the dots wrapping with it.
 */
function MenuRow({ item }: { item: MenuItem }) {
  return (
    <li className="sh-item">
      <p className="sh-item__head">
        <span className="sh-item__name">{item.name}</span>
        <span className="sh-item__leader" aria-hidden="true" />
        <span className="sh-dish__price">{formatPrice(item.price)}</span>
      </p>

      <div className="sh-item__body">
        <Text as="span" size="sm" tone="muted" className="sh-measure">
          {item.description}
        </Text>

        {item.diet.length > 0 && (
          <span className="sh-item__diet">
            {item.diet.map((diet) => (
              <Badge key={diet} variant="outline" tone={dietMeta[diet].tone} size="sm" pill>
                {dietMeta[diet].label}
              </Badge>
            ))}
          </span>
        )}
      </div>
    </li>
  )
}

/**
 * The menu as tabs, shared by the homepage preview and `/menu`.
 *
 * `limit` is what makes one component serve both: the homepage passes 4 and links out,
 * `/menu` passes nothing and shows everything. Activation is manual rather than
 * automatic because arrowing across four courses should not force four panel swaps.
 *
 * Note the flat `TabsList` / `TabsTab` / `TabsPanels` / `TabsPanel` imports instead of
 * the nicer `Tabs.List`. This file is a Server Component and `Tabs` carries
 * `'use client'`, so what a Server Component holds is a client-reference proxy — it
 * exposes the module's named exports and nothing that was attached to the function
 * object afterwards. `Tabs.List` is therefore `undefined` here, which React reports as
 * "element type is invalid" at render time rather than at compile time. The flat
 * exports exist for precisely this case. Inside a `'use client'` file the dotted form
 * is a normal property access and works fine.
 */
export function MenuTabs({
  limit,
  footer,
  showBlurb = true,
}: {
  /** Items per course. Omit for the full menu. */
  limit?: number
  /** Rendered under the panels — the homepage puts its "full menu" link here. */
  footer?: React.ReactNode
  showBlurb?: boolean
}) {
  return (
    <Tabs defaultValue={courses[0].id} variant="line" size="lg" activationMode="manual">
      <TabsList aria-label="Menu courses">
        {courses.map((course) => (
          <TabsTab key={course.id} value={course.id}>
            {course.label}
          </TabsTab>
        ))}
      </TabsList>

      <TabsPanels>
        {courses.map((course) => {
          const items = limit ? course.items.slice(0, limit) : course.items
          const hidden = course.items.length - items.length

          return (
            <TabsPanel key={course.id} value={course.id}>
              {showBlurb && (
                <Text tone="muted" className="sh-measure sh-course-blurb">
                  {course.blurb}
                </Text>
              )}

              <ul className="sh-item-list" role="list">
                {items.map((item) => (
                  <MenuRow key={item.id} item={item} />
                ))}
              </ul>

              {hidden > 0 && (
                <Text size="sm" tone="muted" className="sh-course-more">
                  {`+ ${hidden} more ${course.label.toLowerCase()} on the full menu`}
                </Text>
              )}

              {footer}
            </TabsPanel>
          )
        })}
      </TabsPanels>
    </Tabs>
  )
}
