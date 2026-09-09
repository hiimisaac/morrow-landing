'use client';

import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { WeatherMark } from '@/components/weather-glyph';
import { FlutterDemo } from '@/components/flutter-demo';
import { demoForecasts } from '@/lib/demo-forecasts';

function Icon({ name, className = '' }: { name: string; className?: string }) {
  return (
    <span
      className={`line-icon ${className}`}
      style={{ maskImage: `url('/icons/${name}.svg')` }}
      aria-hidden="true"
    />
  );
}

export default function Home() {
  const [dark, setDark] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightPass, setLightPass] = useState<{
    name: 'dawn' | 'dusk';
    id: number;
  } | null>(null);
  const forecast = demoForecasts[selectedIndex];

  function changeAppearance(value: boolean) {
    if (value === dark) return;
    setDark(value);
    setLightPass({ name: value ? 'dusk' : 'dawn', id: Date.now() });
  }

  return (
    <div className={`morrow-site${dark ? ' dark' : ''}`}>
      {lightPass && (
        <div
          key={lightPass.id}
          className={`light-passage ${lightPass.name}`}
          aria-hidden="true"
        />
      )}
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header shell">
        <a href="#" className="wordmark" aria-label="Morrow home">
          Morrow
        </a>
        <div className="header-note">Coming soon</div>
        <div className="appearance-control">
          <span className={!dark ? 'appearance-active' : ''}>Light</span>
          <Switch
            className="appearance-switch"
            checked={dark}
            onCheckedChange={changeAppearance}
            aria-label="Dark appearance"
          />
          <span className={dark ? 'appearance-active' : ''}>Dark</span>
        </div>
      </header>

      <main id="main">
        <section
          className="forecast-introduction shell"
          aria-labelledby="hero-title"
        >
          <div className="introduction-copy">
            <p className="section-label">A weather app for your everyday</p>
            <h1 id="hero-title">
              Your day,
              <br /> at a glance.
            </h1>
            <p className="introduction-description">
              The weather now. The hours ahead.
              <br />
              The places you keep close.
            </p>
            <a className="quiet-link" href="#the-details">
              Get to know Morrow <Icon name="arrow-down" />
            </a>
          </div>

          <figure className="place-portrait">
            <div className="place-photographs">
              {demoForecasts.slice(0, 3).map((item) => (
                <img
                  key={item.id}
                  className={item.photo === forecast.photo ? 'is-visible' : ''}
                  src={`/cities/${item.photo}.webp`}
                  width="440"
                  height="300"
                  alt=""
                  style={{
                    objectPosition:
                      item.id === 'seattle' ? '35% center' : 'center',
                  }}
                />
              ))}
            </div>
            <figcaption>
              <Icon name="map-pin" />
              <span>
                {forecast.city}, {forecast.state}
              </span>
            </figcaption>
          </figure>

          <FlutterDemo
            scenario={forecast.id}
            dark={dark}
            onChange={(state) => {
              const index = demoForecasts.findIndex(
                (item) => item.id === state.scenario,
              );
              if (index >= 0) setSelectedIndex(index);
              changeAppearance(state.dark);
            }}
          />

          <aside className="forecast-picker" aria-labelledby="picker-title">
            <div className="picker-heading">
              <h2 id="picker-title">Somewhere else</h2>
              <span>°F</span>
            </div>
            <RadioGroup
              className="place-list"
              value={forecast.id}
              onValueChange={(value) => {
                const index = demoForecasts.findIndex(
                  (item) => item.id === value,
                );
                if (index >= 0) setSelectedIndex(index);
              }}
              aria-label="Choose a sample forecast"
            >
              {demoForecasts.map((item, index) => (
                <label
                  className={`place-option${selectedIndex === index ? ' is-selected' : ''}`}
                  key={item.id}
                >
                  <RadioGroupItem
                    className="place-radio"
                    value={item.id}
                    aria-label={`${item.city}${item.isDay ? '' : ' after dark'}, ${item.temperature} degrees Fahrenheit, ${item.condition}`}
                    aria-controls="forecast-demo"
                  />
                  <span className="place-identity">
                    <span className="place-name">{item.city}</span>
                    <span className="place-condition">
                      {item.isDay ? item.condition : 'After dark'}
                    </span>
                  </span>
                  <WeatherMark kind={item.kind} />
                  <span className="place-temperature">{item.temperature}°</span>
                  <Icon name="check" className="place-selected-mark" />
                </label>
              ))}
            </RadioGroup>
            <p className="picker-help">
              Choose a place.
              <br />
              Take a look through its day.
            </p>
            <p className="sample-note">Sample forecasts · Interactive app</p>
          </aside>
        </section>

        <section
          className="details-section shell"
          id="the-details"
          aria-labelledby="details-title"
        >
          <div className="details-introduction">
            <p className="section-label">In the forecast</p>
            <h2 id="details-title">
              A clear view.
              <br /> A closer look.
            </h2>
            <p>
              Start with the sky. Scroll for the details.
              <br />
              Keep what matters in view.
            </p>
          </div>
          <div className="feature-list">
            <article className="feature-row">
              <Icon name="thermometer" />
              <h3>Hour by hour</h3>
              <p>
                Follow temperature, rain, and wind through the next 24 hours.
              </p>
            </article>
            <article className="feature-row">
              <Icon name="sun-horizon" />
              <h3>The days ahead</h3>
              <p>
                See five or ten days at a glance. Open any day for a closer
                look.
              </p>
            </article>
            <article className="feature-row">
              <Icon name="map-pin" />
              <h3>Your places</h3>
              <p>
                Save a city. Check in from anywhere. Keep its last forecast when
                you’re offline.
              </p>
            </article>
          </div>
        </section>

        <section
          className="release-section shell"
          aria-labelledby="release-title"
        >
          <div>
            <p className="section-label">On the horizon</p>
            <h2 id="release-title">Morrow is coming soon.</h2>
          </div>
          <p>
            iPhone beta first.
            <br />
            <span>Android to follow.</span>
          </p>
        </section>
      </main>

      <footer className="site-footer shell">
        <span className="footer-name">© 2026 Morrow</span>
        <p>
          Artwork <a href="/licenses/Meteocons.txt">Meteocons</a>
          <span aria-hidden="true"> · </span>
          <a href="/licenses/Phosphor.txt">Phosphor</a>
          <span aria-hidden="true"> · </span>
          <a href="/licenses/Inter.txt">Inter</a>
          <span aria-hidden="true"> · </span>
          <a href="/licenses/Photography.txt">Photography</a>
        </p>
      </footer>
    </div>
  );
}
