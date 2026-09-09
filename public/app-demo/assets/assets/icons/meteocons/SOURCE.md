# Meteocons
Author: Bas Milius
Source: https://github.com/basmilius/meteocons
Version: 3.0.0-next.10
Download: https://cdn.meteocons.com/3.0.0-next.10/svg-static/fill/{name}.svg
License: MIT (see LICENSE).

Selected static Fill SVGs are bundled for offline forecasts. Matching Fill
Lottie animations in `animated/` drive the hero, downloaded from:
https://cdn.meteocons.com/3.0.0-next.10/lottie/fill/{name}.json

The Fill artwork's separate highlight, body, outline, and precipitation tones
are adapted at runtime to Morrow's umber, coral, and muted precipitation blue.
This retains the source depth in both themes. Clear-night heroes add decorative
stars with staggered sparkle and glow pulses. Source geometry and animation
keyframes are unchanged. The hero fits the visible animation bounds to preserve
centering while scrolling.

## Cloud parallax

`animated/cloud-layer.json` contains the original `Cloud_2` layer from the
bundled `overcast-day.json`. Geometry, keyframes, timing, and transforms are
unchanged; the other layers are omitted. The expanded hero renders three copies
in independently moving depth planes around the central weather artwork. One is
mirrored so the silhouettes do not repeat in lockstep. Tint, scale, and
placement are applied at runtime. This derivative remains under the Meteocons
MIT license above. No new cloud geometry was drawn.
