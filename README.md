# Morrow

A landing page for Morrow, a thoughtfully designed weather app. iPhone beta first, Android to follow.

Built with React, TypeScript, Vinext, and the Sites starter. The production build exports static HTML, CSS, JavaScript, and locally hosted assets for Cloudflare Pages. No API keys or runtime services are required.

## Cloudflare Pages

Connect `hiimisaac/morrow-landing` as a **Pages** project and use these settings:

| Setting                | Value                              |
| ---------------------- | ---------------------------------- |
| Production branch      | `main`                             |
| Framework preset       | `None`                             |
| Build command          | `npm run build`                    |
| Build output directory | `dist/client`                      |
| Root directory         | Leave blank (repository root)      |
| Node.js                | `22` (also set in `.node-version`) |

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

The landing page extends the app's quietly illustrated weather journal: one continuous paper surface, medium-weight Inter, fine dividers, and a generous view of the actual weather screen. The app's forecast is the visual center of the composition.

| Token              | Light     | Dark      |
| ------------------ | --------- | --------- |
| Paper / background | `#F8F3EF` | `#211F25` |
| Ink / foreground   | `#392F2D` | `#F3ECE6` |
| Muted text         | `#766A66` | `#B9ADA8` |
| Coral accent       | `#FF4A22` | `#FF815F` |
| Dividers           | `#DCD2CC` | `#494148` |

- **Type:** locally hosted Inter Variable. Display text and measurements use medium weight; city names and feature labels use semibold. Body text is 16px. Coral is reserved for small actions, selection marks, and weather artwork.
- **Composition:** the real app sits between a short introduction with a city photograph and a location list. The app shares the page's paper color, with fine vertical rules separating the interactive surface. It renders at the available viewport width, keeping its own responsive layout and text sizing. The footer and feature rows use the same dividers and spacing rhythm.
- **Artwork:** the app uses its actual Flame renderer and Meteocons artwork. Supporting controls use the same Phosphor icons. A single city photograph crossfades when the selected place changes; it remains an honest location photograph during the after-dark sample. Creator and license details are in `public/licenses/Photography.txt`.
- **Motion:** the app owns all forecast and scrolling animation. The surrounding paper changes appearance over 1,600 ms with a brief dawn/dusk light treatment; photographs crossfade over 800 ms. Presses briefly reduce opacity. Reduced Motion makes these changes immediate.
- **Responsive behavior:** the three-column desktop composition becomes two columns on tablets. On small screens, the introduction and a compact two-column location selector precede the app; the city photograph follows it. The app fills its available width without CSS scaling.
- **Accessibility:** semantic landmarks, a skip link, visible keyboard focus, a labeled appearance switch, and a keyboard-operable radio group. Sample forecasts are labeled beside the interactive app.

All weather readings are fictional examples. The demo includes Pittsburgh, Seattle, Santa Fe, and Pittsburgh after dark. The page does not collect emails or imply the app is already available. Replace the coming-soon copy with actual TestFlight or store links when those are ready.

## The real app demo

The interactive surface embeds a Flutter web release of [Morrow](https://github.com/hiimisaac/morrow), using `lib/main_demo.dart`. It instantiates the same `MorrowApp`, pages, controller, themes, and Flame renderer as the native entry point. There is no React recreation of the phone UI.

Only the data and startup services differ: four frozen forecasts replace the weather provider, storage lives in memory, and native location, widget publishing, background refresh, and push services are not initialized. Scroll, open settings, change units, and try saved places inside the app. City and appearance controls communicate without reloading the app. The host and child validate message origins and source windows; revisions prevent stale selections from winning.

The compiled app is checked into this landing repository so the existing Pages settings stay the same. To update it after committing changes in the app repository:

```sh
FLUTTER_BIN=/path/to/flutter/bin/flutter ./scripts/update-app-demo.sh /path/to/morrow
npm run build
npx tsc --noEmit
```

Use the Flutter version recorded in `public/app-demo/flutter-version.json`. The script records the exact app commit and asset hashes, omits debug symbols, and checks the Pages per-file size limit. Commit the resulting `public/app-demo` changes with the page changes. The release uses local CanvasKit assets and does not register a service worker.

## Files and attribution

- `app/page.tsx`: page content, appearance switch, and controlled city selector.
- `lib/demo-forecasts.ts`: location-selector labels and sample temperatures. The app’s demo repository owns the forecasts inside the app.
- `components/flutter-demo.tsx`: embeds the real app and connects city/appearance controls with a same-origin message bridge.
- `components/weather-glyph.tsx`: static weather artwork for the surrounding marketing page.
- `public/app-demo`: the compiled Flutter release, with source commit and file hashes in `provenance.json`.
- `scripts/update-app-demo.sh`: rebuilds that release from the app repository.
- `app/globals.css`: design tokens, responsive layout, motion, and typography.
- `app/layout.tsx`: page metadata.
- `public/cities`, `public/weather`, `public/icons`, and `public/fonts`: locally hosted assets.
- `public/weather/animated`: retained assets from the previous web imitation; the phone now loads its artwork directly from the Flutter bundle.
- `public/scenes`: retained landscape assets from the earlier page design; currently unused.
- `public/licenses`: Meteocons, Phosphor, Inter, and city photography notices.

Select a city with a pointer, touch, or the radio group’s keyboard controls. The radio group exposes the selected forecast to assistive technology. City selection never requests location or calls a weather API. Appearance changes preserve the chosen city and forecast day/night flag.

The `.openai/hosting.json` file preserves the original Sites project association. Cloudflare Pages uses the static build and does not require a Sites credential.
