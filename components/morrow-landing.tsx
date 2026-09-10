'use client';

/* oxlint-disable next/no-img-element -- Screenshots are pre-optimized WebP assets in a static export. */
/* oxlint-disable next/no-html-link-for-pages -- Static export destinations use native links, without client-router prefetching. */
/* oxlint-disable jsx-a11y/no-noninteractive-tabindex -- The overflow gallery must support native keyboard scrolling. */

import { useState } from 'react';
import { ArrowDown, ArrowRight, Moon, Sun } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { WeatherMark } from '@/components/weather-glyph';
import { BetaSignup } from '@/components/beta-signup';
import { ProductScreen } from '@/components/product-screen';
import type { BetaConfig } from '@/lib/beta-config';

const features = [
  {
    number: '01',
    label: 'HOUR BY HOUR',
    title: 'Find your window.',
    description:
      'The morning walk. The long way home. See how the next 24 hours unfold, in one clear view.',
    image: 'hourly-light',
    alt: 'Morrow’s hourly forecast shows the afternoon warming from 52 to 59 degrees, with sunset at 7:18 PM.',
    width: 732,
    height: 464,
  },
  {
    number: '02',
    label: 'THE DAYS AHEAD',
    title: 'A little more foresight.',
    description:
      'Five days or ten. Highs, lows, and everything in between. Open any day to get closer.',
    image: 'daily-light',
    alt: 'The app’s five-day forecast pairs each day’s weather icon with its low and high temperatures.',
    width: 732,
    height: 858,
  },
  {
    number: '03',
    label: 'YOUR PLACES',
    title: 'Keep your world close.',
    description:
      'Home, away, and somewhere you’d rather be. Save your places and take their last forecast offline.',
    image: 'places-light',
    alt: 'Morrow’s saved locations screen, showing Pittsburgh’s current conditions and high and low temperatures.',
    width: 732,
    height: 1012,
  },
];

export function MorrowLanding({ beta }: { beta: BetaConfig }) {
  const [dark, setDark] = useState(false);
  const signupReady = Boolean(beta.testFlightUrl || beta.waitlistAction);

  return (
    <div className={`morrow-site${dark ? ' dark' : ''}`}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header shell">
        <a href="#main" className="wordmark" aria-label="Morrow home">
          <img src="/favicon.svg" width="34" height="34" alt="" />
          Morrow
        </a>
        <nav className="header-nav" aria-label="Main navigation">
          <a href="#the-details">The outlook</a>
        </nav>
        <div className="header-actions">
          <div className="appearance-control">
            <Sun size={16} aria-hidden="true" />
            <Switch
              className="appearance-switch"
              checked={dark}
              onCheckedChange={setDark}
              aria-label="Dark appearance"
            />
            <Moon size={16} aria-hidden="true" />
          </div>
          <a href="#early-access" className="header-cta">
            {signupReady ? 'Get early access' : 'Beta coming soon'}
            <ArrowRight size={15} aria-hidden="true" />
          </a>
        </div>
      </header>

      <main id="main">
        <section className="hero shell" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="status-dot" /> A fresh outlook on weather
            </p>
            <h1 id="hero-title">
              Your day.
              <br />
              <span>Beautifully clear.</span>
            </h1>
            <p className="hero-description">
              Know the hour to head out. See the week taking shape. Morrow puts
              your whole forecast in perspective, with a little warmth along the
              way.
            </p>
            <div className="hero-conversion">
              <BetaSignup beta={beta} id="hero-beta" />
              <a className="text-link" href="#the-details">
                See the app <ArrowDown size={17} aria-hidden="true" />
              </a>
            </div>
            <div className="hero-footnote">
              <span>Made for your everyday.</span>
              <span>Starting with iPhone.</span>
            </div>
          </div>
          <figure className="hero-product">
            <div className="product-stage">
              <ProductScreen dark={dark} />
            </div>
            <figcaption>
              Actual Morrow app <span>·</span> Sample forecast
            </figcaption>
          </figure>
        </section>

        <section
          className="product-proof shell"
          id="the-details"
          aria-labelledby="details-title"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">The details make the day</p>
              <h2 id="details-title">
                A quick glance.
                <br />A complete picture.
              </h2>
            </div>
            <p>
              From a jacket decision to a weekend away.
              <br />
              Beautifully readable. Reassuringly useful.
            </p>
          </div>
          <p className="feature-scroll-hint">
            Swipe for the full outlook{' '}
            <ArrowRight size={14} aria-hidden="true" />
          </p>
          <section
            className="feature-grid"
            tabIndex={0}
            aria-label="Morrow features"
          >
            {features.map((feature) => (
              <article className="feature-panel" key={feature.number}>
                <div className="feature-copy">
                  <p className="feature-label">
                    <span>{feature.number}</span>
                    {feature.label}
                  </p>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
                <div className="feature-screen">
                  <img
                    src={`/screenshots/${feature.image}.webp`}
                    width={feature.width}
                    height={feature.height}
                    alt={feature.alt}
                    loading="lazy"
                  />
                </div>
              </article>
            ))}
          </section>
          <p className="proof-note">
            Screens from the actual app. Forecasts shown are examples.
          </p>
        </section>

        <section
          className="release-section shell"
          id="early-access"
          aria-labelledby="release-title"
        >
          <div className="release-art" aria-hidden="true">
            <WeatherMark kind="clear-day" />
          </div>
          <p className="eyebrow">Good things on the horizon</p>
          <h2 id="release-title">
            Meet your new
            <br />
            daily outlook.
          </h2>
          <p className="release-description">
            Morrow is almost here. iPhone beta first, then Android.
            <br />A little more clarity is coming your way.
          </p>
          <BetaSignup beta={beta} id="footer-beta" />
        </section>
      </main>

      <footer className="site-footer shell">
        <a href="#main" className="wordmark" aria-label="Morrow home">
          <img src="/favicon.svg" width="28" height="28" alt="" />
          Morrow
        </a>
        <span>© 2026 Morrow. A fresh outlook.</span>
        <div className="footer-links">
          <a href="/privacy">Privacy</a>
          <a href="/licenses/Meteocons.txt">Weather artwork</a>
          <a href="/licenses/Phosphor.txt">Icons</a>
          <a href="#main" aria-label="Back to top">
            <ArrowDown className="back-to-top" size={18} />
          </a>
        </div>
      </footer>
    </div>
  );
}
