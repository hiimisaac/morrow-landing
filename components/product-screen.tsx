/* oxlint-disable next/no-img-element -- The static export serves pre-optimized local WebP captures. */
import { BatteryFull, Signal, Wifi } from 'lucide-react';

export function ProductScreen({ dark }: { dark: boolean }) {
  return (
    <div className={`phone-device${dark ? ' phone-dark' : ''}`}>
      <div className="phone-screen">
        <div className="phone-status" aria-hidden="true">
          <span>9:41</span>
          <span className="phone-island" />
          <span className="phone-connectivity">
            <Signal size={14} />
            <Wifi size={14} />
            <BatteryFull size={19} />
          </span>
        </div>
        <img
          className="product-screenshot"
          src={`/screenshots/current-${dark ? 'dark' : 'light'}.webp`}
          width="780"
          height="1560"
          alt={
            dark
              ? 'Morrow in dark mode: Pittsburgh, 47 degrees and clear, with an hourly and multi-day forecast.'
              : 'Morrow on iPhone: Pittsburgh, 52 degrees and partly cloudy, with sunset, hourly temperatures, and the days ahead.'
          }
          fetchPriority="high"
        />
        <div className="phone-home" aria-hidden="true" />
      </div>
    </div>
  );
}
