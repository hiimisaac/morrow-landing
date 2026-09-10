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

## Landing page and launch configuration

The hero uses an optimized screenshot of the actual bundled Morrow app inside lightweight device chrome. Three product panels show the hourly forecast, five-day forecast, and saved places. The real interactive Flutter release stays below the product introduction and only loads after **Start exploring**, keeping its JavaScript and CanvasKit off the initial page load. The existing appearance switch and sample-location controls remain connected to the app.

On mobile, the hero copy, conversion controls, and phone appear before all location controls. Feature panels form a swipeable, keyboard-scrollable gallery on narrow screens to keep the page compact. In the demo section, the app also appears before its place selector. Screens have descriptive alternatives, form fields have labels, radios and the appearance switch are keyboard-operable, and page motion respects Reduced Motion.

### Enable the waitlist or TestFlight

No waitlist endpoint or TestFlight URL exists yet. Until one is configured, the page shows **Signups open soon**, disables email collection, and provides a working **Try Morrow** action. It does not save email locally, claim a successful signup, or send email to an invented backend.

Copy `.env.example` to `.env.local` for local preview, or set the following public build-time variables in Cloudflare Pages (set Preview and Production separately as needed), then rebuild:

| Variable                      | Behavior                                                                                                                                                |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_TESTFLIGHT_URL`  | A real `https://testflight.apple.com/join/...` invitation. Enables **Join the iPhone beta** in both conversion areas. Takes priority over the waitlist. |
| `NEXT_PUBLIC_WAITLIST_ACTION` | A real HTTPS form-provider endpoint. Enables both email forms and **Join the waitlist**.                                                                |

The waitlist uses a native HTML `POST` with `email` and `source=morrow-landing`, navigating to the provider's own confirmation/error page. Choose a provider that accepts those fields and browser form submissions; a JSON-only API will need an adapter outside this static site. Configure confirmation, consent/privacy copy, abuse protection, and any double opt-in at that provider before collecting real addresses. No CORS integration, API key, new runtime, or database is needed in this repository. Never use private credentials in `NEXT_PUBLIC_` values.

Blank, malformed, non-HTTPS, or credential-bearing URLs fall back to the pre-launch state. TestFlight URLs must be actual invitation paths on `testflight.apple.com`. A new build is required after changing these variables; this is still a static Pages export.

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

Check the hero and lower conversion area in three configurations: no variables, a real waitlist endpoint, and a real TestFlight invitation. A configured form should use native email validation and reach the provider's real confirmation page. The demo can be opened separately from the hero and supports all four sample locations. Check narrow mobile, tablet, desktop, keyboard focus, and light/dark appearance.

### Visual assets

`public/screenshots` contains WebP captures of the real app release, not a React recreation. Source revision and capture details live in `public/screenshots/README.md`. Refresh these when the app's appearance changes. App artwork, fonts, local weather icons, and existing attribution files are retained. All weather readings shown are fictional examples.

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

- `app/page.tsx`: resolves public launch destinations at build time.
- `components/morrow-landing.tsx`: responsive page, appearance state, and sample selector.
- `components/beta-signup.tsx`: shared hero/footer conversion UI and native POST form.
- `lib/beta-config.ts`: destination validation; covered by `tests/beta-config.test.mjs`.
- `components/product-screen.tsx`: device chrome around the real app capture.
- `components/flutter-demo.tsx`: unchanged same-origin app message bridge, loading, and retry UI.
- `public/screenshots`: product captures; `public/app-demo`: compiled Flutter release and provenance.
- `scripts/update-app-demo.sh`: rebuilds the demo from the app repository.
- `app/globals.css`: themes, typography, device frame, responsive layout, and reduced motion.
- `app/layout.tsx`: page metadata.
- `public/licenses`: existing artwork, font, icon, and photography notices.

The `.openai/hosting.json` file preserves the original Sites project association. Cloudflare Pages uses the static build and does not require a Sites credential. The build settings, production branch, static output directory, and custom domain setup are unchanged.
