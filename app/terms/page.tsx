/* oxlint-disable next/no-html-link-for-pages -- Native links also work in the static export. */
/* oxlint-disable next/no-img-element -- The local brand mark has explicit dimensions. */

import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of use — Morrow',
  description: 'The terms for using Morrow and Morrow Plus.',
};

export default function TermsPage() {
  return (
    <div className="morrow-site privacy-page">
      <a className="skip-link" href="#terms">Skip to terms of use</a>
      <header className="site-header shell privacy-header">
        <a href="/" className="wordmark" aria-label="Morrow home">
          <img src="/favicon.svg" width="34" height="34" alt="" />
          Morrow
        </a>
        <a href="/" className="privacy-back">
          <ArrowLeft size={16} aria-hidden="true" /> Back to Morrow
        </a>
      </header>

      <main id="terms" className="privacy-content shell">
        <div className="privacy-intro">
          <p className="eyebrow">The fine print</p>
          <h1>Terms of use</h1>
          <p className="privacy-date">
            Last updated <time dateTime="2026-10-30">October 30, 2026</time>
          </p>
          <p>
            Morrow is provided by Isaac Barham and licensed to you under Apple’s{' '}
            <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/">
              Licensed Application End User License Agreement
            </a>{' '}
            together with the terms on this page. Where they differ, this page
            applies.
          </p>
        </div>

        <section aria-labelledby="weather-terms">
          <h2 id="weather-terms">Weather information</h2>
          <p>
            <strong>
              YOUR USE OF THIS REAL-TIME WEATHER GUIDANCE APPLICATION OR WEBSITE
              IS AT YOUR SOLE RISK. WEATHER DATA MAY NOT BE ACCURATE.
            </strong>
          </p>
          <p>
            Forecasts, alerts, radar, routines, Watches, and morning notes are
            guidance, not safety advice. Follow official local weather and
            emergency instructions. Forecasts on iPhone come from Apple Weather (
            <a href="https://weatherkit.apple.com/legal-attribution.html">
              data sources
            </a>
            ). U.S. alerts and radar come from the National Weather Service and
            NOAA.
          </p>
        </section>
        <section aria-labelledby="plus-terms">
          <h2 id="plus-terms">Morrow Plus</h2>
          <p>
            Morrow Plus is optional. It is offered through the App Store as a
            monthly or annual auto-renewing subscription, or as a one-time
            Lifetime purchase. The app shows each price before you buy.
          </p>
          <p>
            Payment is charged to your Apple Account when you confirm the
            purchase. A subscription renews automatically unless you turn off
            automatic renewal at least 24 hours before the current period ends.
            Renewal is charged within the 24 hours before it ends. Manage or
            cancel your subscription in your Apple Account settings. If a free trial is offered, any unused
            part of it ends when you buy a subscription. Apple handles refunds.
          </p>
        </section>
        <section aria-labelledby="contact-terms">
          <h2 id="contact-terms">Contact</h2>
          <p>
            Email <a href="mailto:support@hellomorrow.app">support@hellomorrow.app</a>{' '}
            with questions about these terms. The{' '}
            <a href="/privacy">privacy policy</a> explains how Morrow handles
            information.
          </p>
        </section>
      </main>

      <footer className="site-footer shell">
        <a href="/" className="wordmark">Morrow</a>
        <span>© 2026 Morrow. A fresh outlook.</span>
        <div className="footer-links">
          <a href="/privacy">Privacy</a>
          <a href="/support">Support</a>
          <a href="/">Back to Morrow</a>
        </div>
      </footer>
    </div>
  );
}
