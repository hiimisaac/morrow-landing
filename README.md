# Morrow

A landing page for Morrow, a thoughtfully designed weather app. iPhone beta first, Android to follow.

Built with React, TypeScript, Vinext, and the Sites starter. The production build exports static HTML, CSS, JavaScript, and locally hosted assets for Cloudflare Pages. No API keys or runtime services are required.

## Cloudflare Pages

Connect `hiimisaac/morrow-landing` as a **Pages** project and use these settings:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Framework preset | `None` |
| Build command | `npm run build` |
| Build output directory | `dist/client` |
| Root directory | Leave blank (repository root) |
| Node.js | `22` (also set in `.node-version`) |

Pages installs dependencies from `package-lock.json`. Use the custom settings above instead of a Next.js preset: this project uses Vinext's static export, which writes to `dist/client`.

After the first deployment, add the purchased domain under the Pages project's **Custom domains** tab and follow Cloudflare's DNS instructions. There is no hardcoded domain to replace in the site.

References: [Pages build configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/), [Node version configuration](https://developers.cloudflare.com/pages/configuration/build-image/), [Custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/).

## Local development

```sh
npm ci
npm run dev
```

Use the local URL printed by the development server.

```sh
npm run build
npx tsc --noEmit
```

Deploy only `dist/client`, which contains the prerendered page and public assets. The other directories under `dist` contain build intermediates.

## Design language

Morrow feels calm, editorial, and tactile. It uses generous whitespace, large weather numerals, quiet supporting labels, and illustration instead of dense cards or dashboard chrome.

| Token | Light | Dark |
| --- | --- | --- |
| Paper / background | `#F8F3EF` | `#211F25` |
| Ink / foreground | `#392F2D` | `#F3ECE6` |
| Muted text | `#766A66` | `#B9ADA8` |
| Coral accent | `#FF4A22` | `#FF815F` |
| Dividers | `#DCD2CC` | `#494148` |
| Rain blue | `#6B929C` | `#90B6C4` |

- **Type:** locally hosted Inter Variable. Medium-weight display type, restrained tracking, and readable body text.
- **Artwork:** Morrow's recolored Meteocons weather art and Phosphor line icons. Artwork stays tied to the forecast when appearance changes.
- **Motion:** slow weather drift and soft theme transitions. Reduced-motion preferences disable animation and smooth scrolling.
- **Layout:** a spacious editorial hero, an illustrative forecast, three concise feature stories, and a coming-soon signoff. The layout stacks on smaller screens.
- **Accessibility:** semantic landmarks, a skip link, keyboard focus, labeled appearance control, and decorative artwork hidden from assistive technology.

The Pittsburgh weather shown on the page is an explicitly labeled example, not a live forecast. The page does not collect emails or imply the app is already available. Replace the coming-soon copy with actual TestFlight or store links when those are ready.

## Files and attribution

- `app/page.tsx`: page content and appearance switch.
- `app/globals.css`: design tokens, responsive layout, motion, and typography.
- `app/layout.tsx`: page metadata.
- `public/weather`, `public/icons`, and `public/fonts`: locally hosted assets.
- `public/licenses`: Meteocons, Phosphor, and Inter license notices.

The `.openai/hosting.json` file preserves the original Sites project association. Cloudflare Pages uses the static build and does not require a Sites credential.
