/* oxlint-disable next/no-html-link-for-pages -- Native links keep static export navigation independent of the client router. */

/* oxlint-disable next/no-img-element -- The locally hosted brand mark has explicit dimensions. */

import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy policy — Morrow',
  description:
    'How Morrow handles location, forecasts, optional alerts, and information shared through the website and iPhone beta.',
};

const sections = [
  ['website', 'The website'],
  ['weather', 'Location and weather'],
  ['device', 'Information on your device'],
  ['alerts', 'Optional push alerts'],
  ['beta', 'TestFlight and contacting us'],
  ['providers', 'Service providers and sharing'],
  ['retention', 'How long information stays'],
  ['choices', 'Your choices and rights'],
  ['updates', 'Changes and contact'],
] as const;

export default function PrivacyPage() {
  return (
    <div className="morrow-site privacy-page">
      <a className="skip-link" href="#privacy-policy">
        Skip to privacy policy
      </a>
      <header className="site-header shell privacy-header">
        <a href="/" className="wordmark" aria-label="Morrow home">
          <img src="/favicon.svg" width="34" height="34" alt="" />
          Morrow
        </a>
        <a href="/" className="privacy-back">
          <ArrowLeft size={16} aria-hidden="true" /> Back to Morrow
        </a>
      </header>

      <main id="privacy-policy" className="privacy-content shell">
        <div className="privacy-intro">
          <p className="eyebrow">A little clarity</p>
          <h1>Privacy policy</h1>
          <p className="privacy-date">
            Last updated <time dateTime="2026-09-09">September 9, 2026</time>
          </p>
          <p className="privacy-lead">
            Weather needs a place. It doesn’t need an advertising profile.
          </p>
          <p>
            This policy explains how Morrow (“we,” “us,” or “our”) handles
            information in the Morrow weather app, including beta builds, and at
            hellomorrow.app. Morrow is the name we use to provide these
            services. For privacy questions or requests, email{' '}
            <a href="mailto:privacy@hellomorrow.app">privacy@hellomorrow.app</a>
            . Features vary by platform and release; optional features described
            here apply when they are available and you enable them.
          </p>
          <p>
            We do not sell personal information or use it for targeted
            advertising. The app and website do not include advertising trackers
            or analytics SDKs. Weather providers, hosting services, and Apple’s
            beta tools still process information as described below.
          </p>
        </div>

        <nav className="privacy-contents" aria-label="In this policy">
          <p className="eyebrow">In this policy</p>
          <ol>
            {sections.map(([id, title]) => (
              <li key={id}>
                <a href={`#${id}`}>{title}</a>
              </li>
            ))}
          </ol>
        </nav>

        <section id="website" aria-labelledby="website-title">
          <h2 id="website-title">1. The website</h2>
          <p>
            Website previews use sample forecasts to illustrate the app. The
            website does not ask for your location or connect to the app’s
            weather or notification services. Your browser may cache the files
            needed to display the site.
          </p>
          <p>
            Cloudflare hosts and delivers the website. When you visit, it
            processes technical information such as your IP address, requested
            pages, and request and device details to deliver content, maintain
            reliability, and protect the service. The landing page does not set
            advertising or analytics cookies. Infrastructure providers may
            process security and operational data under their own policies.
          </p>
          <p>
            Website waitlist signups are not open, and the disabled email form
            does not collect or save your email address. Before enabling a
            waitlist, we will update this policy to identify the email service,
            explain retention, and describe how to unsubscribe or request
            deletion.
          </p>
        </section>

        <section id="weather" aria-labelledby="weather-title">
          <h2 id="weather-title">2. Location and weather</h2>
          <p>
            You can search for a place without granting device location access.
            Search text is sent to Open-Meteo’s place-search service, which uses
            GeoNames data. The coordinates of the place you view are sent to
            Open-Meteo to retrieve weather, air quality, and UV information.
          </p>
          <p>
            If you choose current-location weather and grant permission, Morrow
            reads your device’s location. These coordinates may be precise,
            depending on your device and permission settings. They are sent to
            Open-Meteo for the forecast and to your device’s place-name service
            to identify the locality. Morrow does not continuously track your
            movements or build a travel history.
          </p>
          <p>
            For supported U.S. locations, the app sends the displayed place’s
            coordinates to the National Weather Service to retrieve local alert
            areas and active alerts while the app is in use. These weather
            requests go directly from your device to the providers, which also
            receive ordinary connection information such as your IP address.
          </p>
        </section>

        <section id="device" aria-labelledby="device-title">
          <h2 id="device-title">3. Information on your device</h2>
          <p>
            Morrow stores saved places, their coordinates, display preferences,
            and recent forecasts on your device so they remain available between
            visits and when you are offline. This is not a Morrow cloud-synced
            profile. Your operating system’s backup and restore settings may
            include app data in device backups.
          </p>
          <p>
            Where supported, widgets receive a local copy of the place label and
            forecast values, without coordinates. Background forecast refresh
            uses coordinates already saved on the device to request updated
            weather; it does not read a new device location in the background.
            Your operating system controls when background work runs.
          </p>
        </section>

        <section id="alerts" aria-labelledby="alerts-title">
          <h2 id="alerts-title">4. Optional push alerts</h2>
          <p>
            In iPhone builds that support push alerts, enabling them creates a
            random installation identifier through Supabase. The alert service
            stores that identifier, an Apple push-notification delivery token,
            the National Weather Service zone codes for your alerts, and
            technical subscription details such as platform, delivery
            environment, status, and timestamps. It does not require your name
            or email address.
          </p>
          <p>
            The notification subscription contains alert-area codes, which
            identify geographic areas, rather than precise coordinates, place
            names, saved forecasts, or a location history. Supabase stores the
            subscription and delivery records; Apple delivers the notifications.
            Delivery records include the alert identifier, delivery status, and
            timestamps so the service can avoid duplicate alerts and investigate
            failures.
          </p>
          <p>
            Turning alerts off inside Morrow requests deletion of the
            subscription and its associated delivery records. A connection is
            needed to complete this request; check that the app confirms the
            change. The separate installation identity is not automatically
            deleted when alerts are disabled. Email us for help with deletion of
            information held by the alert service.
          </p>
        </section>

        <section id="beta" aria-labelledby="beta-title">
          <h2 id="beta-title">5. TestFlight and contacting us</h2>
          <p>
            If you join an iPhone beta through TestFlight, Apple automatically
            collects crash logs and usage information and shares them with us.
            Apple also shares feedback you submit. Depending on how you join and
            what you send, this information may include your name, email
            address, device details, and screenshots. We use beta information to
            investigate problems and improve Morrow. See{' '}
            <a href="https://www.apple.com/legal/privacy/data/en/test-flight/">
              Apple’s TestFlight privacy notice
            </a>{' '}
            for the information Apple collects and the choices it provides.
          </p>
          <p>
            If you email us, we receive your email address and anything you
            include in the message. We use this information to respond, provide
            support, and handle your request. Please only send the information
            needed for us to help.
          </p>
        </section>

        <section id="providers" aria-labelledby="providers-title">
          <h2 id="providers-title">6. Service providers and sharing</h2>
          <p>
            We use the providers described in this policy to deliver the
            website, forecasts, and optional beta and notification services.
            They may process connection information and operational or security
            logs in addition to the feature-specific information described
            above. Their own notices explain their practices:
          </p>
          <ul>
            <li>
              <a href="https://www.cloudflare.com/privacypolicy/">Cloudflare</a>{' '}
              — website delivery and security.
            </li>
            <li>
              <a href="https://open-meteo.com/en/terms">Open-Meteo</a> — place
              searches, weather, and air quality.
            </li>
            <li>
              <a href="https://www.weather.gov/privacy">
                National Weather Service
              </a>{' '}
              — U.S. alert areas and weather alerts.
            </li>
            <li>
              <a href="https://supabase.com/privacy">Supabase</a> — optional
              alert identities, subscriptions, and delivery records.
            </li>
            <li>
              <a href="https://www.apple.com/legal/privacy/">Apple</a> — iPhone
              platform services, push delivery, and TestFlight. Other device
              providers’ policies apply to their location and backup services.
            </li>
          </ul>
          <p>
            Providers may process information in countries other than the one
            where you live. We may also disclose information when required by
            law or necessary to protect the security and rights of our users and
            service. We use HTTPS for network requests, but no storage or
            transmission method is completely secure.
          </p>
        </section>

        <section id="retention" aria-labelledby="retention-title">
          <h2 id="retention-title">7. How long information stays</h2>
          <ul>
            <li>
              <strong>On your device.</strong> Preferences and saved places
              remain until you change them or remove app data. Recent forecasts
              are replaced as new ones arrive. Removing a place removes it from
              the saved list and active forecast cache; some background or
              widget data may remain until replaced or app data is removed.
              Device backups have their own retention settings.
            </li>
            <li>
              <strong>Push alerts.</strong> Subscriptions remain until removed
              through the app or service. Delivery history is scheduled for
              cleanup after 30 days. Disabling alerts removes the subscription
              and related delivery records once the request succeeds, but the
              installation identity remains until separately deleted. Disabling
              notifications in iOS or uninstalling the app does not itself send
              a subscription-deletion request.
            </li>
            <li>
              <strong>Support and beta feedback.</strong> We keep information
              needed to resolve your request, investigate issues, and maintain
              necessary records. You can ask us to delete it. Information held
              by Apple and other providers is also subject to their retention
              policies.
            </li>
            <li>
              <strong>Operational records.</strong> Hosting, weather, and alert
              providers retain technical logs according to their service
              settings and policies. Deleting app data does not delete those
              providers’ logs. Some information may need to be retained to meet
              legal obligations or resolve security issues.
            </li>
          </ul>
        </section>

        <section id="choices" aria-labelledby="choices-title">
          <h2 id="choices-title">8. Your choices and rights</h2>
          <p>
            You can revoke location permission in your device settings and
            continue using place search. You can remove saved places in Morrow,
            manage background refresh and notifications in your device settings,
            and remove local app data through your operating system. To remove
            an alert subscription, turn alerts off inside Morrow while connected
            before uninstalling. Manage backups separately with your device or
            backup provider.
          </p>
          <p>
            Depending on where you live, you may have rights to access, correct,
            delete, or receive a copy of your personal information, to object to
            or restrict certain processing, or to withdraw consent. Email{' '}
            <a href="mailto:privacy@hellomorrow.app">privacy@hellomorrow.app</a>{' '}
            to make a request. We may need limited information to verify that a
            request relates to you. Because an alert identity is not linked to
            your email address, we may need your help locating its record. You
            may also have the right to complain to your local data protection
            authority.
          </p>
          <p>
            Morrow is a general-audience weather service. If you believe a child
            has provided personal information that we should remove, please
            contact us.
          </p>
        </section>

        <section id="updates" aria-labelledby="updates-title">
          <h2 id="updates-title">9. Changes and contact</h2>
          <p>
            We will update this page when our practices change and revise the
            date above. Where required, we will provide additional notice or ask
            for consent before making a material change.
          </p>
          <p>
            For questions about this policy or your information, contact Morrow
            at{' '}
            <a href="mailto:privacy@hellomorrow.app">privacy@hellomorrow.app</a>
            .
          </p>
        </section>
      </main>

      <footer className="site-footer shell">
        <a href="/" className="wordmark">
          Morrow
        </a>
        <span>© 2026 Morrow. A fresh outlook.</span>
        <div className="footer-links">
          <a href="mailto:privacy@hellomorrow.app">Privacy questions</a>
          <a href="/">Back to Morrow</a>
        </div>
      </footer>
    </div>
  );
}
