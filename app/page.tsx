'use client';

import { useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Moon, Sun } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const hours = [
  { time: 'Now', temperature: 52, kind: 'partly-cloudy-day' },
  { time: '1 PM', temperature: 53, kind: 'partly-cloudy-day' },
  { time: '2 PM', temperature: 54, kind: 'clear-day' },
  { time: '3 PM', temperature: 56, kind: 'clear-day' },
  { time: '4 PM', temperature: 55, kind: 'overcast-day' },
];
const days = [
  { day: 'Today', kind: 'partly-cloudy-day', low: 46, high: 59, rain: '10%' },
  { day: 'Thu', kind: 'clear-day', low: 45, high: 64, rain: '5%' },
  { day: 'Fri', kind: 'rain', low: 49, high: 57, rain: '85%' },
  { day: 'Sat', kind: 'overcast-day', low: 47, high: 61, rain: '20%' },
  { day: 'Sun', kind: 'clear-day', low: 48, high: 66, rain: '5%' },
];
const places = [
  { city: 'Pittsburgh', state: 'Pennsylvania', note: 'The place you call home', temp: 52, kind: 'partly-cloudy-day', condition: 'Partly cloudy', high: 59, low: 46 },
  { city: 'Seattle', state: 'Washington', note: 'A change of scenery', temp: 48, kind: 'rain', condition: 'A little rain', high: 51, low: 43 },
  { city: 'Santa Fe', state: 'New Mexico', note: 'Somewhere on your list', temp: 67, kind: 'clear-day', condition: 'Clear skies', high: 72, low: 44 },
];

function WeatherMark({ kind, className = '', label }: { kind: string; className?: string; label?: string }) {
  return (
    <span className={`weather-mark ${className}`} role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      <img className="weather-light" src={`/weather/${kind}.svg`} width="128" height="128" alt="" />
      <img className="weather-dark" src={`/weather/${kind}-dark.svg`} width="128" height="128" alt="" />
    </span>
  );
}

function Landscape() {
  return <div className="landscape" aria-hidden="true">
    <img className="landscape-day" src="/scenes/river-day.webp" width="1536" height="1024" alt="" fetchPriority="high" />
    <img className="landscape-night" src="/scenes/river-night.webp" width="1536" height="1024" alt="" />
  </div>;
}

function Daylight() {
  return <div className="daylight" aria-label="Example daylight: sunrise at 6 AM, sunset at 6 PM">
    <svg viewBox="0 0 300 40" aria-hidden="true">
      <path className="daylight-track" d="M2 36 Q150 -24 298 36" />
      <path className="daylight-progress" d="M2 36 Q76 6 150 6" />
      <circle className="daylight-halo" cx="150" cy="6" r="9" />
      <circle className="daylight-point" cx="150" cy="6" r="4" />
    </svg>
    <div className="daylight-labels"><span>6:00 AM</span><span>6:00 PM</span></div>
  </div>;
}

export default function Home() {
  const [dark, setDark] = useState(false);
  return (
    <div className={`morrow-site${dark ? ' dark' : ''}`}>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="header-inner shell">
          <a href="#" className="wordmark" aria-label="Morrow home">morrow<span>.</span></a>
          <nav aria-label="Main navigation">
            <a className="nav-link" href="#a-closer-look">A closer look <ArrowUpRight size={14} aria-hidden="true" /></a>
            <div className="appearance-control">
              <span className="appearance-label">Change the light</span>
              <Sun size={17} aria-hidden="true" />
              <Switch className="appearance-switch" checked={dark} onCheckedChange={setDark} aria-label="Dark appearance" />
              <Moon size={16} aria-hidden="true" />
            </div>
          </nav>
        </div>
      </header>
      <main id="main">
        <section className="hero shell" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> Weather for the everyday wanderer</p>
            <h1 id="hero-title">Make a little<br />room for<br /><span>outside.</span></h1>
            <p className="hero-description">The first coffee on the porch. The long way home. The walk that turns into a whole afternoon.</p>
            <p className="hero-description secondary-description">Meet Morrow. A weather app for whatever you make of the day.</p>
            <a className="explore-link" href="#a-closer-look">Find your moment <ArrowDown size={18} aria-hidden="true" /></a>
            <p className="release-note">iPhone beta first. Android to follow.</p>
            <div className="margin-note"><span className="little-rule" /><span>A little curiosity.<br />A forecast in your pocket.</span></div>
          </div>
          <div className="hero-world">
            <Landscape />
            <div className="scene-caption"><span className="scene-caption-label">A small change of atmosphere</span><span className="scene-time"><span className="day-copy" aria-hidden={dark}>The afternoon is yours.</span><span className="night-copy" aria-hidden={!dark}>Leave a light on.</span></span></div>
            <figure className="forecast-preview" aria-label="Example Morrow forecast for Pittsburgh, 52 degrees Fahrenheit and partly cloudy">
              <div className="preview-topline"><span>morrow<span className="coral">.</span></span><span>Example forecast · °F</span></div>
              <div className="sky-stage"><WeatherMark kind="partly-cloudy-day" className="hero-weather" /></div>
              <div className="city-line"><span className="low">↓ 46°</span><h2>Pittsburgh</h2><span className="high">↑ 59°</span></div>
              <div className="temperature">52<span>°</span></div>
              <p className="condition">Partly cloudy</p>
              <Daylight />
              <div className="hourly-row">
                {hours.map(hour => <div className="hour" key={hour.time}><span>{hour.time}</span><WeatherMark kind={hour.kind} /><strong>{hour.temperature}°</strong></div>)}
              </div>
            </figure>
            <div className="weather-note"><Sun size={19} aria-hidden="true" /><span>Looks like a long-way-home day.</span></div>
          </div>
        </section>

        <div className="weather-ribbon shell" aria-label="For sunny days, rainy days, and everything in between">
          <span>For the days that go to plan.</span><WeatherMark kind="clear-day" /><span>And the ones that don’t.</span><WeatherMark kind="rain" /><span className="ribbon-last">Especially those.</span><span className="ribbon-star" aria-hidden="true">✳</span>
        </div>

        <section className="details shell" id="a-closer-look" aria-labelledby="details-title">
          <div className="section-heading"><p className="eyebrow">A closer look / 01</p><p className="section-aside">Useful by nature.</p></div>
          <div className="daily-spread">
            <div className="forecast-board">
              <div className="board-heading"><h3>The days ahead</h3><span>Example · °F</span></div>
              <div className="daily-rows">
                {days.map(day => <div className="daily-row" key={day.day}>
                  <span className="day-name">{day.day}</span><WeatherMark kind={day.kind} /><span className="rain-chance">{day.rain}</span><span className="daily-low">{day.low}°</span><span className="temp-range" aria-hidden="true"><span style={{ left: `${(day.low - 43) * 3}%`, width: `${(day.high - day.low) * 3}%` }} /></span><strong>{day.high}°</strong>
                </div>)}
              </div>
              <div className="board-footnote"><img src="/icons/drop.svg" width="16" height="16" alt="" /><span>Rain on Friday. A brighter weekend ahead.</span></div>
              <div className="forecast-summary"><div><img src="/icons/wind.svg" width="24" height="24" alt="" /><span>Wind</span><strong>6 <small>mph</small></strong></div><div><img src="/icons/drop.svg" width="24" height="24" alt="" /><span>Humidity</span><strong>64<small>%</small></strong></div><div><img src="/icons/sun-horizon.svg" width="24" height="24" alt="" /><span>Sunset</span><strong>6:00 <small>PM</small></strong></div></div>
            </div>
            <div className="chapter-copy">
              <span className="chapter-mark" aria-hidden="true">01</span>
              <h2 id="details-title">There’s a good<br />day in there<br /><span>somewhere.</span></h2>
              <p>A break in the rain. A warmer afternoon. Enough daylight for one more mile. Morrow puts the little details where you can find them.</p>
              <ul className="feature-facts"><li><ArrowRight size={16} aria-hidden="true" /><span>Your next 24 hours, hour by hour</span></li><li><ArrowRight size={16} aria-hidden="true" /><span>Five or ten days of possibility</span></li><li><ArrowRight size={16} aria-hidden="true" /><span>Rain, wind, and the light left in the day</span></li></ul>
            </div>
          </div>
        </section>

        <section className="places-section" aria-labelledby="places-title">
          <div className="places-inner shell">
            <div className="chapter-copy">
              <p className="eyebrow">Keep a little of everywhere / 02</p>
              <h2 id="places-title">Home.<br />Away.<br /><span>Maybe someday.</span></h2>
              <p>Some places are part of your routine. Others are just on your mind. Keep their weather close, wherever you happen to be.</p>
              <p className="quiet-detail">Save your favorite cities. Take their last saved forecasts with you, even when the signal doesn’t follow.</p>
            </div>
            <div className="places-stack">
              {places.map((place, index) => <article className={`place-card place-card-${index}`} key={place.city}>
                <div className="place-topline"><span>{place.note}</span><span>0{index + 1}</span></div>
                <div className="place-weather"><div><h3>{place.city}</h3><p>{place.state}</p><span className="place-condition">{place.condition}</span></div><WeatherMark kind={place.kind} /><div className="place-temperature">{place.temp}°<span>↑ {place.high}° &nbsp; ↓ {place.low}°</span></div></div>
              </article>)}
              <p className="examples-note">A few places to imagine. Forecasts shown are examples.</p>
            </div>
          </div>
        </section>

        <section className="closing shell" aria-labelledby="closing-title">
          <div className="closing-art" aria-hidden="true"><WeatherMark kind="rain" /><WeatherMark kind="partly-cloudy-day" /><WeatherMark kind="clear-day" /></div>
          <div className="closing-copy"><p className="eyebrow">For every kind of day</p><h2 id="closing-title">See you out there.</h2><p>We’re putting the finishing touches on Morrow.<br />iPhone beta first. Android is on the horizon.</p><span className="coming-soon"><span className="status-dot" /> Coming soon</span></div>
          <p className="closing-side-note">Pack a little optimism.<br /> Maybe an umbrella, too.</p>
        </section>
      </main>
      <footer className="site-footer shell">
        <a href="#" className="wordmark footer-wordmark" aria-label="Morrow home">morrow<span>.</span></a>
        <div className="footer-bottom"><span>© 2026 Morrow · A little more atmosphere.</span><p>Weather <a href="/licenses/Meteocons.txt">Meteocons</a><span aria-hidden="true"> · </span> Icons <a href="/licenses/Phosphor.txt">Phosphor</a><span aria-hidden="true"> · </span> Type <a href="/licenses/Inter.txt">Inter</a></p><a className="back-top" href="#">Back to the sky <ArrowUpRight size={15} aria-hidden="true" /></a></div>
      </footer>
    </div>
  );
}
