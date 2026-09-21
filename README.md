# Morrow

A landing page for Morrow, a thoughtfully designed weather app for iPhone and iPad.

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

## Landing page

The hero uses an optimized screenshot of the actual bundled Morrow app inside lightweight device chrome. Three product panels show the hourly forecast, five-day forecast, and saved places. The page flows directly from product screenshots to App Store download links. It has no embedded simulator, location picker, or browser-play prompts. The appearance switch changes the page theme and hero screenshot.

On mobile, the hero copy, conversion controls, and phone come first. Feature panels form a swipeable, keyboard-scrollable gallery on narrow screens to keep the page compact. Screens have descriptive alternatives, form fields have labels, the appearance switch is keyboard-operable, and page motion respects Reduced Motion.

### App Store link

Both download links lead directly to Morrow’s live App Store listing. The canonical destination is defined in `lib/app-store.ts`, so no runtime configuration, email collection, API key, or database is required.

The privacy policy is available at `/privacy`, linked in the footer and both download areas. It covers the website, App Store distribution, native weather/location requests, local storage, and optional alerts. See [privacy review notes](docs/privacy-review.md) for the source audit and operator/native-app launch follow-ups.

Preview `/privacy` with `npm run dev`. For a plain Python file-server preview of `dist/client`, open `/privacy.html` directly; [Cloudflare Pages serves that exported file at `/privacy`](https://developers.cloudflare.com/pages/configuration/serving-pages/). Policy links use standard page navigation, so they also work without JavaScript.

### Preview and checks

```sh
npm ci
npm run dev
# Open the local URL printed by Vinext.
```

```sh
npm test
npm run lint
npx tsc --noEmit
npm run build
# Optional: serve the production export without a Worker.
python3 -m http.server 4173 --directory dist/client
```

Check both App Store download links, the **See the app** link to the screenshot panels, and that no iframe or Flutter assets load while browsing the landing page. Check narrow mobile, tablet, desktop, keyboard focus, and light/dark appearance.

### Visual assets

`public/screenshots` contains WebP captures of the real app release, not a React recreation. Source revision and capture details live in `public/screenshots/README.md`. Refresh these when the app's appearance changes. App artwork, fonts, local weather icons, and existing attribution files are retained. All weather readings shown are fictional examples.

## Screenshot capture source

The existing compiled Flutter sample release in `public/app-demo` and its update script are retained as the source for product screenshots. The landing page does not link to, embed, or load it. Its React wrapper and location-selector data have been removed.

To refresh the capture source after committing changes in the app repository:

```sh
FLUTTER_BIN=/path/to/flutter/bin/flutter ./scripts/update-app-demo.sh /path/to/morrow
```

Use the Flutter version recorded in `public/app-demo/flutter-version.json`. The script records the exact app commit and asset hashes, omits debug symbols, and checks the Pages per-file size limit. Follow `public/screenshots/README.md` to capture updated images. The sample release remains directly accessible as a static asset, but is not part of the landing-page experience.

## Files and attribution

- `app/page.tsx`: renders the landing page.
- `components/morrow-landing.tsx`: responsive page, screenshot gallery, and appearance state.
- `components/app-store-link.tsx`: shared hero/footer App Store download link.
- `lib/app-store.ts`: Morrow’s canonical App Store destination; covered by `tests/app-store.test.mjs`.
- `components/product-screen.tsx`: device chrome around the real app capture.
- `public/screenshots`: product captures; `public/app-demo`: compiled Flutter release and provenance.
- `scripts/update-app-demo.sh`: rebuilds the demo from the app repository.
- `app/globals.css`: themes, typography, device frame, responsive layout, and reduced motion.
- `app/layout.tsx`: page metadata.
- `public/licenses`: existing artwork, font, icon, and photography notices.

The `.openai/hosting.json` file preserves the original Sites project association. Cloudflare Pages uses the static build and does not require a Sites credential. The build settings, production branch, static output directory, and custom domain setup are unchanged.
