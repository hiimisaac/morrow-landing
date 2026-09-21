# Landing page previews

Captured from the static production export with both launch destinations unset.
The three feature screenshots share aligned, equally sized windows, and the hero
shows just the phone with a soft shadow, without a backdrop, decorative labels,
or summary blurb. The page matches the app’s backgrounds: `#F8F3EF` in light
appearance and `#211F25` in dark appearance. The interactive demo and city
picker have been removed; the page flows from product screenshots to App Store download.

- [Desktop — 1440px wide](desktop.webp)
- [Mobile — 390px wide](mobile.webp)
- [Privacy policy — desktop](privacy-desktop.webp)
- [Privacy policy — mobile](privacy-mobile.webp)

On mobile, the next feature panel peeks into view; swipe or focus the gallery and
use the left/right arrow keys to see the other panels. These images predate
Morrow’s App Store launch. `lib/app-store.ts` defines the App Store destination
used by both download buttons.

For an interactive preview, run `npm ci` and `npm run dev` from the repository root.
The existing Cloudflare Pages build remains `npm run build`, output `dist/client`.
