/* oxlint-disable next/no-html-link-for-pages -- Native links also work in the static export. */
/* oxlint-disable next/no-img-element -- The local brand mark has explicit dimensions. */

import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Support — Morrow',
  description: 'Get help with Morrow, including location, forecasts, settings, and Home Screen widgets.',
};

export default function SupportPage() {
  return (
    <div className="morrow-site privacy-page">
      <a className="skip-link" href="#support">Skip to support</a>
      <header className="site-header shell privacy-header">
        <a href="/" className="wordmark" aria-label="Morrow home">
          <img src="/favicon.svg" width="34" height="34" alt="" />
          Morrow
        </a>
        <a href="/" className="privacy-back">
          <ArrowLeft size={16} aria-hidden="true" /> Back to Morrow
        </a>
      </header>

      <main id="support" className="privacy-content shell">
        <div className="privacy-intro">
          <p className="eyebrow">Here to help</p>
          <h1>Morrow support</h1>
          <p className="privacy-lead">Something not looking right?</p>
          <p>
            Email <a href="mailto:support@hellomorrow.app">support@hellomorrow.app</a>{' '}
            for help or to share feedback. Include your Morrow version, device
            model, iOS version, and what happened. A screenshot and the steps
            that led to the problem help us investigate. Please leave out any
            personal information we do not need.
          </p>
        </div>

        <section aria-labelledby="location-help">
          <h2 id="location-help">Using a different location</h2>
          <p>
            Open the location menu to choose a saved place or Add city. City
            search works without access to your device location. For current
            location, check Morrow’s location permission in your iPhone or iPad
            settings and make sure Location Services is on.
          </p>
        </section>
        <section aria-labelledby="forecast-help">
          <h2 id="forecast-help">An older or unavailable forecast</h2>
          <p>
            Morrow needs an internet connection to get new weather. When you are
            offline, it can show the last saved forecast with its saved date.
            Check the selected city and the forecast’s date, reconnect, then
            reopen Morrow to try again.
          </p>
        </section>
        <section aria-labelledby="preferences-help">
          <h2 id="preferences-help">Temperature and appearance</h2>
          <p>
            Open Settings in Morrow to choose System, Fahrenheit, or Celsius.
            System follows your device’s temperature preference. You can also
            choose an appearance; All settings includes the Sunset option.
          </p>
        </section>
        <section aria-labelledby="widget-help">
          <h2 id="widget-help">Home Screen widgets</h2>
          <p>
            Small and medium widgets use the saved forecast. Open Morrow with an
            internet connection to load fresh weather. iOS decides when widgets
            can refresh in the background, so updates do not follow an exact
            schedule. Check the update time before relying on a widget’s data.
          </p>
        </section>
        <section aria-labelledby="alerts-help">
          <h2 id="alerts-help">Weather alerts</h2>
          <p>
            Morrow checks National Weather Service alerts for supported U.S.
            locations while the app is open. Push notification delivery is not
            enabled in the current iOS builds. Follow official local weather and
            emergency instructions.
          </p>
        </section>
        <section aria-labelledby="privacy-help">
          <h2 id="privacy-help">Privacy questions</h2>
          <p>
            Read the <a href="/privacy">privacy policy</a> for how Morrow handles
            location and weather data. Send privacy questions or requests to{' '}
            <a href="mailto:privacy@hellomorrow.app">privacy@hellomorrow.app</a>.
          </p>
        </section>
      </main>

      <footer className="site-footer shell">
        <a href="/" className="wordmark">Morrow</a>
        <span>© 2026 Morrow. A fresh outlook.</span>
        <div className="footer-links">
          <a href="/privacy">Privacy</a>
          <a href="/">Back to Morrow</a>
        </div>
      </footer>
    </div>
  );
}
