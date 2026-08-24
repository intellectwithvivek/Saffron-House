# Contributing

Thanks for taking a look. This repository is a free, MIT-licensed website template, and
contributions that make it a better starting point for someone else's restaurant are very
welcome.

## Where things belong

| Kind of issue | Where it goes |
|---|---|
| A bug in this template — a broken layout, a wrong link, an accessibility problem | [Saffron-House issues](https://github.com/intellectwithvivek/Saffron-House/issues) |
| A bug or request in the component library | [VivekUI issues](https://github.com/intellectwithvivek/vivek_UI/issues) |
| A question about using a component | [VivekUI docs](https://ui.vivekkumarsingh.in/docs) first, then a discussion |

## Getting set up

```bash
git clone https://github.com/intellectwithvivek/Saffron-House.git
cd Saffron-House
npm install
npm run dev
```

Node.js 20.9+ is required; 22 LTS is what this is developed against.

Before opening a pull request:

```bash
npm run typecheck   # tsc --noEmit
npm run lint        # eslint
npm run build       # must pass clean
```

All three are expected to pass with no output. `npm run lint` in particular enforces the
React Compiler rules — if you find yourself reaching for an effect that calls `setState`
during commit, look at [`lib/use-client-clock.ts`](./lib/use-client-clock.ts) for the
pattern this project uses instead.

## House rules

A few conventions that are load-bearing rather than stylistic:

**Content lives in `data/`, not in components.** Someone launching this site should be
able to change the restaurant, the menu and the photographs without opening a `.tsx`
file. If you add a feature, put its copy and its numbers in `data/`.

**Alt text describes the photograph, not the caption you wanted.** If you swap an image,
look at it first and describe what is actually in the frame. Alt text that confidently
describes something absent is worse than none at all, because a screen-reader user has no
way to detect it.

**One stylesheet, zero specificity.** All CSS lives in
[`app/globals.css`](./app/globals.css) with selectors wrapped in `:where()` so a VivekUI
class always wins. There is no `!important` in this project and there should not be. The
one documented exception is `display`, where `.vk-button`'s own rule has to be beaten —
those selectors are qualified with a parent class and carry a comment explaining why.

**Server Components by default.** Reach for `'use client'` only when something genuinely
needs state, an effect or a browser API, and say why in a comment. Note the RSC gotcha
with compound components documented in the [README](./README.md#one-gotcha-worth-reading).

**Only VivekUI for UI.** No Tailwind, no shadcn, no MUI, no icon package, no charting
library. The point of this template is that the whole thing is buildable from one
zero-dependency library; a pull request that adds a UI dependency defeats it.

**Never invent a prop.** Check the component's type declarations in
`node_modules/@the_viveksingh/vivek-ui/dist/` or the
[documentation](https://ui.vivekkumarsingh.in/docs/components) before using a prop. Some
things you might expect are genuinely not there — `IconButton` has no `asChild`, for
instance.

## Accessibility

This template claims WCAG AA and the claim is tested, not assumed. If you change the
hero, the scrim, or any text over an image, re-check the contrast of the *brightest*
pixel under each run of text — an average will hide exactly the patch that fails. Keep
one `h1` per page, keep focus visible, and honour `prefers-reduced-motion`.

## Commit messages

Plain, imperative, and about the change: `fix the hero scrim on narrow viewports`, not
`updates`. Squashing is fine.

## Licence

By contributing you agree that your contribution is licensed under the
[MIT Licence](./LICENSE), the same as the rest of the project.
