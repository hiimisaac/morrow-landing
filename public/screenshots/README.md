# Morrow product screenshots

Captured from the real Flutter web release checked into `public/app-demo`.
Source: https://github.com/hiimisaac/morrow/commit/7bb5a266442b0c70a69cbf8d95ff99fcc05f74eb
Entrypoint: `lib/main_demo.dart`. See `../app-demo/provenance.json` for the release hashes.

Captured September 9, 2026, with a 390 × 780 CSS-pixel viewport at 2× resolution,
then encoded as WebP at quality 90. These are sample forecasts, not live readings.
The surrounding phone/status chrome is rendered by the landing page.

- `current-light.webp`: initial Pittsburgh screen, 780 × 1560.
- `current-dark.webp`: after-hours Pittsburgh, dark appearance, 780 × 1560.
- `hourly-light.webp`: initial screen, crop x=12, y=299, width=366, height=232 CSS pixels.
- `daily-light.webp`: scroll down 560 CSS pixels, crop x=12, y=250, width=366, height=429.
- `places-light.webp`: open the location picker from the city name, crop x=12, y=228, width=366, height=506.

To refresh, serve `public` locally, open `/app-demo/index.html` at the viewport
above, wait for the app to finish rendering, and capture those views. Use the
same-origin `morrow-demo:set` message documented in the demo bridge to select
`after-hours` and `dark`. Keep matching width/height attributes and descriptive
alternative text in the page. Do not edit the app UI into fictional screens.

The original Meteocons, Phosphor, and Inter notices remain in `public/licenses`.
