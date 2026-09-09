'use client';

import { useState } from 'react';
import { ArrowDown, ArrowUpRight, Moon, Sun } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const hours = [
  { time: 'Now', temperature: 52, kind: 'partly-cloudy-day', label: 'Partly cloudy' },
  { time: '1 PM', temperature: 53, kind: 'partly-cloudy-day', label: 'Partly cloudy' },
  { time: '2 PM', temperature: 54, kind: 'clear-day', label: 'Clear' },
  { time: '3 PM', temperature: 56, kind: 'clear-day', label: 'Clear' },
  { time: '4 PM', temperature: 55, kind: 'overcast-day', label: 'Cloudy' },
];

function WeatherMark({ kind, className = '', label }: { kind: string; className?: string; label?: string }) {
  return (
    <span className={`weather-mark ${className}`} role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      <img className="weather-light" src={`/weather/${kind}.svg`} width="128" height="128" alt="" />
      <img className="weather-dark" src={`/weather/${kind}-dark.svg`} width="128" height="128" alt="" />
    </span>
  );
}

export default function Home() {
  const [dark, setDark] = useState(false);
  return (
    <div className={`morrow-site${dark ? ' dark' : ''}`}>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="page-shell">
        <header className="site-header">
          <a href="#" className="wordmark" aria-label="Morrow home">morrow<span>.</span></a>
          <nav aria-label="Main navigation">
            <a className="nav-link" href="#a-closer-look">A closer look <ArrowUpRight size={14} aria-hidden="true" /></a>
            <div className="appearance-control">
              <Sun size={17} aria-hidden="true" />
              <Switch className="appearance-switch" checked={dark} onCheckedChange={setDark} aria-label="Dark appearance" />
              <Moon size={16} aria-hidden="true" />
            </div>
          </nav>
        </header>
        <main id="main">
          <section className="hero" aria-labelledby="hero-title">
            <div className="hero-copy">
              <p className="eyebrow"><span className="status-dot" /> A little more atmosphere</p>
              <h1 id="hero-title">Your day,<br />in a better<br /><span>light.</span></h1>
              <p className="hero-description">The weather, thoughtfully considered.<br className="desktop-break" /> Local forecasts and the places you love,<br className="desktop-break" /> with a little room to breathe.</p>
              <a className="explore-link" href="#a-closer-look">Meet Morrow <span><ArrowDown size={19} aria-hidden="true" /></span></a>
              <p className="release-note">Coming to iPhone. Android to follow.</p>
            </div>
            <figure className="forecast-preview" aria-label="Illustrative Morrow forecast for Pittsburgh, 52 degrees Fahrenheit and partly cloudy">
              <div className="preview-topline"><span>A moment in Pittsburgh</span><span className="sample-label">Example forecast</span></div>
              <div className="sky-stage"><WeatherMark kind="partly-cloudy-day" className="hero-weather" /></div>
              <div className="city-line"><span className="low"><span aria-hidden="true">↓</span> 46°</span><h2>Pittsburgh</h2><span className="high"><span aria-hidden="true">↑</span> 59°</span></div>
              <div className="temperature">52<span>°</span></div>
              <p className="condition">Partly cloudy</p>
              <div className="daylight" aria-label="Illustrative daylight from 6:00 AM to 6:00 PM">
                <svg viewBox="0 0 380 42" role="presentation" aria-hidden="true">
                  <path className="daylight-track" d="M2 38 Q190 -28 378 38" />
                  <path className="daylight-progress" d="M2 38 Q96 5 190 5" />
                  <circle className="daylight-halo" cx="190" cy="5" r="9" />
                  <circle className="daylight-point" cx="190" cy="5" r="4" />
                </svg>
                <div className="daylight-labels"><span>Sunrise 6:00 AM</span><span>Sunset 6:00 PM</span></div>
              </div>
              <div className="hourly-row">
                {hours.map(hour => <div className="hour" key={hour.time}><span>{hour.time}</span><WeatherMark kind={hour.kind} label={hour.label} /><strong>{hour.temperature}°</strong></div>)}
              </div>
              <figcaption>All the day ahead. At a glance.</figcaption>
            </figure>
          </section>
          <div className="section-divider"><span>Good days start with a little clarity.</span><span className="divider-number">01 — 03</span></div>
          <section className="closer-look" id="a-closer-look" aria-labelledby="details-title">
            <div className="section-intro"><p className="eyebrow">Made for your everyday</p><h2 id="details-title">A forecast you can<br />feel at home with.</h2><p>From the first light to the last plan.<br />The useful details, beautifully in view.</p></div>
            <div className="feature-list">
              <article className="feature"><span className="feature-number">01</span><div><h3>The hours. The days.<br />The bigger picture.</h3><p>Follow the next 24 hours, look up to ten days ahead, and get a clearer sense of when the rain might arrive.</p></div><img src="/icons/sun-horizon.svg" className="line-icon" width="30" height="30" alt="" /></article>
              <article className="feature"><span className="feature-number">02</span><div><h3>A place for your places.</h3><p>Home, a weekend away, somewhere you miss. Keep your favorite cities close, with saved forecasts for when you're offline.</p></div><img src="/icons/map-pin.svg" className="line-icon" width="30" height="30" alt="" /></article>
              <article className="feature"><span className="feature-number">03</span><div><h3>A little weather. A little wonder.</h3><p>Drifting clouds, soft sunlight, and a sky that moves with your forecast. Light and dark appearances, with stillness when you prefer it.</p></div><img src="/icons/wind.svg" className="line-icon" width="30" height="30" alt="" /></article>
            </div>
          </section>
          <section className="closing" aria-labelledby="closing-title">
            <WeatherMark kind="clear-day" className="closing-weather" />
            <p className="eyebrow">Something bright is on the horizon</p>
            <h2 id="closing-title">See you in the morning.</h2>
            <p>Morrow is on its way. iPhone beta first.<br />Android is coming, too.</p>
            <span className="coming-soon"><span className="status-dot" /> Coming soon</span>
          </section>
        </main>
        <footer className="site-footer"><div><a href="#" className="wordmark footer-wordmark" aria-label="Morrow home">morrow<span>.</span></a><span className="copyright">© 2026 Morrow</span></div><p>Weather art <a href="/licenses/Meteocons.txt">Meteocons</a><span aria-hidden="true"> · </span> Icons <a href="/licenses/Phosphor.txt">Phosphor</a><span aria-hidden="true"> · </span> Type <a href="/licenses/Inter.txt">Inter</a></p></footer>
      </div>
    </div>
  );
}
