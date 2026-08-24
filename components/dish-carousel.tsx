import Image from 'next/image'
import { Badge, Card, Carousel, Text } from '@the_viveksingh/vivek-ui'
import { courses, dietMeta, formatPrice } from '@/data/menu'
import { signatureDishes } from '@/data/content'

/** Every menu item, flattened once so a dish photo can find its copy by id. */
const byId = new Map(courses.flatMap((course) => course.items).map((item) => [item.id, item]))

/**
 * The signature-dish carousel.
 *
 * The photographs carry a menu id rather than their own name and price, so a dish
 * renamed or repriced in `data/menu.ts` updates here too — there is exactly one
 * description of each dish in this project.
 *
 * `Carousel` itself is server-rendered: the track is a scroll-snap container, so the
 * slides work before any JavaScript arrives and only the arrows and dots are hydrated.
 */
export function DishCarousel() {
  return (
    <Carousel
      slidesPerView={{ base: 1, sm: 2, lg: 3 }}
      gap={6}
      showArrows
      showDots
      label="Signature dishes"
      slideLabel={(index, total) => `Dish ${index + 1} of ${total}`}
    >
      {signatureDishes.map((photo, index) => {
        const dish = byId.get(photo.menuId)
        if (!dish) return null

        return (
          <Card key={photo.menuId} variant="outline" padding="md" className="sh-dish">
            <div className="sh-dish__media">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 31vw"
                /* The first two slides are on screen at every width, so they are
                   worth fetching eagerly; the rest can wait for the scroll. */
                priority={index < 2}
              />
            </div>

            <Card.Body>
              <p className="sh-item__head">
                <span className="sh-item__name">{dish.name}</span>
                <span className="sh-item__leader" aria-hidden="true" />
                <span className="sh-dish__price">{formatPrice(dish.price)}</span>
              </p>

              <Text size="sm" tone="muted" lineClamp={3} className="sh-dish__copy">
                {dish.description}
              </Text>
            </Card.Body>

            {dish.diet.length > 0 && (
              <Card.Footer className="sh-dish__diet">
                {dish.diet.map((diet) => (
                  <Badge key={diet} variant="soft" tone={dietMeta[diet].tone} size="sm" pill>
                    {dietMeta[diet].label}
                  </Badge>
                ))}
              </Card.Footer>
            )}
          </Card>
        )
      })}
    </Carousel>
  )
}
