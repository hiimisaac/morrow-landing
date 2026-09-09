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

Morrow feels calm, editorial, and tactile: a small weather almanac for life outside. A central interactive phone is surrounded by photographic city cards, with layered forecast sheets, large weather numerals, and personal everyday copy. The app’s typography and palette carry across the site.

| Token | Light | Dark |
| --- | --- | --- |
| Paper / background | `#F8F3EF` | `#211F25` |
| Ink / foreground | `#392F2D` | `#F3ECE6` |
| Muted text | `#766A66` | `#B9ADA8` |
| Coral accent | `#FF4A22` | `#FF815F` |
| Dividers | `#DCD2CC` | `#494148` |
| Rain blue | `#6B929C` | `#90B6C4` |

- **Type:** locally hosted Inter Variable. Medium-weight display type, restrained tracking, and readable body text.
- **Artwork:** the app’s bundled Meteocons loops and static fallbacks, recolored using its light/dark palette mappings. City photography is hosted locally, with creator and license details in `public/licenses/Photography.txt`. Forecast condition and day/night remain independent of the site’s appearance.
- **Motion:** the app’s `MorrowMotion` timings: 1,600 ms appearance change, 800 ms forecast reveal, 320 ms transfer/parallax, and 480 ms card lift. Reversible CSS transitions keep rapid selections responsive. Lottie plays the app’s weather keyframes, pauses offscreen and in inactive tabs, and shows a still under Reduced Motion. Pointer parallax does not intercept scrolling.
- **Layout:** a central phone with four selectable forecast cards arranged around it on desktop. On smaller screens the phone follows the introduction and the cards scroll horizontally. The selected forecast also drives the five-day spread and supporting measurements below.
- **Accessibility:** semantic landmarks, a skip link, keyboard focus, labeled appearance control, and decorative artwork hidden from assistive technology.

All weather readings are fictional examples. The demo includes Pittsburgh, Seattle, Santa Fe, and Pittsburgh after dark. The last card reuses the Pittsburgh photo with an illustrative dark tint, not a photograph of nighttime weather. The page does not collect emails or imply the app is already available. Replace the coming-soon copy with actual TestFlight or store links when those are ready.

## Files and attribution

- `app/page.tsx`: page content, appearance switch, and controlled city selector.
- `lib/demo-forecasts.ts`: coherent sample forecasts for the phone and detail spread.
- `components/weather-glyph.tsx`: app weather playback, static fallbacks, pointer response, and reduced-motion handling.
- `app/globals.css`: design tokens, responsive layout, motion, and typography.
- `app/layout.tsx`: page metadata.
- `public/cities`, `public/weather`, `public/icons`, and `public/fonts`: locally hosted assets.
- `public/weather/animated`: the app’s Meteocons JSON keyframes, recolored with `MorrowColors.artworkColor` mappings.
- `public/scenes`: retained landscape assets from the earlier page design; currently unused.
- `public/licenses`: Meteocons, Phosphor, Inter, and city photography notices.

Select a city with a pointer, touch, or the radio group’s keyboard controls. A polite status announcement confirms the chosen forecast. City selection never requests location or calls a weather API. Appearance changes preserve the chosen city and forecast day/night flag.

The `.openai/hosting.json` file preserves the original Sites project association. Cloudflare Pages uses the static build and does not require a Sites credential.
