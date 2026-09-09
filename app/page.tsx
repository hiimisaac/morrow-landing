'use client';

import { useState, type CSSProperties } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Moon, Sun, Signal, BatteryFull, Wifi, Check } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { WeatherMark, AnimatedWeather } from '@/components/weather-glyph';
import { demoForecasts, type DemoForecast } from '@/lib/demo-forecasts';

const places = demoForecasts.slice(0, 3).map(forecast => ({
  city: forecast.city, state: forecast.state, note: forecast.caption, temp: forecast.temperature,
  kind: forecast.kind, condition: forecast.condition, high: forecast.high, low: forecast.low,
}));

function Daylight({ forecast }: { forecast: DemoForecast }) {
  if (!forecast.isDay) return <div className="night-outlook"><Moon size={16} aria-hidden="true" /><span>Sunrise at {forecast.sunrise}</span></div>;
  const toMinutes = (clock: string) => {
    const [hour, minute] = clock.replace(/ [AP]M/, '').split(':').map(Number);
    return (hour % 12 + (clock.endsWith('PM') ? 12 : 0)) * 60 + minute;
  };
  const now = toMinutes(`${forecast.clock} ${forecast.id === 'pittsburgh' ? 'PM' : 'AM'}`);
  const progress = Math.max(0, Math.min(1, (now - toMinutes(forecast.sunrise)) / (toMinutes(forecast.sunset) - toMinutes(forecast.sunrise))));
  const x = 2 + 296 * progress;
  const y = 36 - 120 * progress + 120 * progress * progress;
  return <div className="daylight" aria-label={`Example daylight: sunrise ${forecast.sunrise}, sunset ${forecast.sunset}`}>
    <svg viewBox="0 0 300 40" aria-hidden="true">
      <path className="daylight-track" d="M2 36 Q150 -24 298 36" />
      <path className="daylight-progress" d={`M2 36 Q${2 + 148 * progress} ${36 - 60 * progress} ${x} ${y}`} />
      <circle className="daylight-halo" cx={x} cy={y} r="9" /><circle className="daylight-point" cx={x} cy={y} r="4" />
    </svg>
    <div className="daylight-labels"><span>{forecast.sunrise}</span><span>{forecast.sunset}</span></div>
  </div>;
}

function ForecastPhone({ selectedIndex }: { selectedIndex: number }) {
  return <div className="phone-position" id="forecast-demo">
    <div className="device-frame">
      <div className="device-screen">
        <div className="phone-camera" aria-hidden="true" />
        {demoForecasts.map((forecast, index) => <section key={forecast.id} className={`forecast-panel${index === selectedIndex ? ' is-active' : ''}`} aria-label={`${forecast.city} ${forecast.isDay ? 'daytime' : 'after-dark'} example forecast`} aria-hidden={index !== selectedIndex} inert={index !== selectedIndex} style={{ '--travel-direction': index < selectedIndex ? -1 : 1 } as CSSProperties}>
          <div className="phone-status" aria-hidden="true"><span>{forecast.clock}</span><span><Signal size={13} /><Wifi size={13} /><BatteryFull size={19} /></span></div>
          <div className="phone-brand"><span>morrow<span className="coral">.</span></span><span>Example · °F</span></div>
          <div className="phone-sky"><AnimatedWeather kind={forecast.kind} active={index === selectedIndex} /></div>
          <div className="city-line"><span className="low">↓ {forecast.low}°</span><h2>{forecast.city}</h2><span className="high">↑ {forecast.high}°</span></div>
          <div className="temperature">{forecast.temperature}<span>°</span></div>
          <p className="condition">{forecast.condition}</p>
          <Daylight forecast={forecast} />
          <div className="hourly-row">{forecast.hours.map(hour => <div className="hour" key={hour.time}><span>{hour.time}</span><WeatherMark kind={hour.kind} /><strong>{hour.temperature}°</strong></div>)}</div>
          <div className="phone-metrics"><span><img src="/icons/wind.svg" width="16" height="16" alt="" />{forecast.wind} mph</span><span><img src="/icons/drop.svg" width="16" height="16" alt="" />{forecast.humidity}% humidity</span></div>
        </section>)}
        <div className="phone-home" aria-hidden="true" />
      </div>
    </div>
  </div>;
}

export default function Home() {
  const [dark, setDark] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const forecast = demoForecasts[selectedIndex];
  const days = forecast.days;
  const rangeMin = Math.min(...days.map(day => day.low)) - 2;
  const rangeSpan = Math.max(...days.map(day => day.high)) - rangeMin + 2;
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
        <section className="interactive-hero shell" aria-labelledby="hero-title">
          <div className="hero-message">
            <p className="eyebrow"><span className="status-dot" /> A little more atmosphere</p>
            <h1 id="hero-title">A different city.<br />A different sky.<br /><span>Still your day.</span></h1>
            <p>A weather app for the places you love.<br />And the places you’re headed next.</p>
            <a className="explore-link" href="#a-closer-look">Meet Morrow <ArrowDown size={17} aria-hidden="true" /></a>
            <p className="release-note">iPhone beta first. Android to follow.</p>
          </div>
          <aside className="hero-invitation">
            <span className="invitation-mark" aria-hidden="true">✳</span>
            <h2>Go on.<br />Change the<br /><em>scenery.</em></h2>
            <p>Pick a place below.<br />We’ll bring the weather.</p>
            <span className="demo-label">A few imaginary forecasts,<br />a little of the real Morrow.</span>
          </aside>
          <ForecastPhone selectedIndex={selectedIndex} />
          <RadioGroup className="city-rail" value={forecast.id} onValueChange={value => { const index = demoForecasts.findIndex(item => item.id === value); if (index >= 0) setSelectedIndex(index); }} aria-label="Choose an example forecast">
            {demoForecasts.map((item, index) => <label className={`city-pick city-pick-${index}${index === selectedIndex ? ' is-selected' : ''}${!item.isDay ? ' after-hours-card' : ''}`} key={item.id}>
              <RadioGroupItem className="city-radio" value={item.id} aria-label={`${item.city}${item.isDay ? '' : ' after dark'}, ${item.temperature} degrees, ${item.condition}`} aria-controls="forecast-demo" />
              <span className="city-photo"><img src={`/cities/${item.photo}.webp`} alt="" width="440" height="300" style={{ objectPosition: item.id === 'seattle' ? '35% center' : 'center' }} /><span className="city-photo-label">{item.isDay ? item.state : 'An after-dark forecast'}</span>{!item.isDay && <Moon className="after-hours-moon" size={27} aria-hidden="true" />}</span>
              <span className="city-card-content"><span className="city-card-heading"><span>{item.city}</span><strong>{item.temperature}°</strong></span><span className="city-card-condition">{item.condition}</span><span className="city-card-action"><span>{index === selectedIndex ? 'In the forecast' : 'Take a look'}</span>{index === selectedIndex ? <Check size={15} aria-hidden="true" /> : <ArrowUpRight size={15} aria-hidden="true" />}</span></span>
            </label>)}
          </RadioGroup>
          <p className="demo-caption">Your little window to the weather.<span>Choose a card to try it.</span></p>
          <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">{forecast.city}, {forecast.isDay ? 'daytime' : 'after dark'}: {forecast.temperature} degrees Fahrenheit, {forecast.condition}. Example forecast selected.</p>
        </section>

        <div className="weather-ribbon shell" aria-label="For sunny days, rainy days, and everything in between">
          <span>For the days that go to plan.</span><WeatherMark kind="clear-day" /><span>And the ones that don’t.</span><WeatherMark kind="rain" /><span className="ribbon-last">Especially those.</span><span className="ribbon-star" aria-hidden="true">✳</span>
        </div>

        <section className="details shell" id="a-closer-look" aria-labelledby="details-title">
          <div className="section-heading"><p className="eyebrow">A closer look / 01</p><p className="section-aside">Useful by nature.</p></div>
          <div className="daily-spread">
            <div className="forecast-board" key={forecast.id}>
              <div className="board-heading"><h3>{forecast.city} · The days ahead</h3><span>Example · °F</span></div>
              <div className="daily-rows">
                {days.map(day => <div className="daily-row" key={day.day}>
                  <span className="day-name">{day.day}</span><WeatherMark kind={day.kind} /><span className="rain-chance">{day.rain}</span><span className="daily-low">{day.low}°</span><span className="temp-range" aria-hidden="true"><span style={{ left: `${(day.low - rangeMin) / rangeSpan * 100}%`, width: `${(day.high - day.low) / rangeSpan * 100}%` }} /></span><strong>{day.high}°</strong>
                </div>)}
              </div>
              <div className="board-footnote"><img src="/icons/drop.svg" width="16" height="16" alt="" /><span>{forecast.outlook}</span></div>
              <div className="forecast-summary"><div><img src="/icons/wind.svg" width="24" height="24" alt="" /><span>Wind</span><strong>{forecast.wind} <small>mph</small></strong></div><div><img src="/icons/drop.svg" width="24" height="24" alt="" /><span>Humidity</span><strong>{forecast.humidity}<small>%</small></strong></div><div><img src="/icons/sun-horizon.svg" width="24" height="24" alt="" /><span>Sunset</span><strong>{forecast.sunset.split(" ")[0]} <small>PM</small></strong></div></div>
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
        <div className="footer-bottom"><span>© 2026 Morrow · A little more atmosphere.</span><p>Weather <a href="/licenses/Meteocons.txt">Meteocons</a><span aria-hidden="true"> · </span> Icons <a href="/licenses/Phosphor.txt">Phosphor</a><span aria-hidden="true"> · </span> Type <a href="/licenses/Inter.txt">Inter</a><span aria-hidden="true"> · </span><a href="/licenses/Photography.txt">Photo credits</a></p><a className="back-top" href="#">Back to the sky <ArrowUpRight size={15} aria-hidden="true" /></a></div>
      </footer>
    </div>
  );
}
