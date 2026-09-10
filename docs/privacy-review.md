# Privacy policy: implementation notes

The public policy is at `/privacy` (`app/privacy/page.tsx`), linked from both
signup areas and the footer. It covers the website and native app separately.
The operator supplied **privacy@hellomorrow.app** and chose no legal operator
name yet; the page uses **Morrow** as the public-facing service name. This is a
draft for operator review in the PR, not a determination of legal compliance.

## Evidence used

Native source inspected: [`hiimisaac/morrow` at
`7bb5a266442b0c70a69cbf8d95ff99fcc05f74eb`](https://github.com/hiimisaac/morrow/tree/7bb5a266442b0c70a69cbf8d95ff99fcc05f74eb),
the same revision recorded for the retained screenshot-capture release. Source inspection does
not establish which optional services are configured in a deployed app build.

| Behavior                                                                                                                  | Source in the native repository                                                                                       |
| ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Device location, platform place-name lookup, direct Open-Meteo weather/air-quality requests, and place-search text        | `lib/weather/data/open_meteo_weather_repository.dart`                                                                 |
| Coordinates sent to NWS for zones and active alerts                                                                       | `lib/weather/data/nws_weather_alert_repository.dart`                                                                  |
| Local places, preferences, forecast coordinates and timestamps; separate background cache                                 | `lib/weather/data/weather_store.dart`, `lib/weather/presentation/weather_controller.dart`                             |
| Widgets receive a place label and forecast values, without coordinates; background refresh uses cached coordinates        | `lib/weather/data/weather_widget_publisher.dart`, `lib/weather/data/background_weather_refresh.dart`                  |
| Optional Supabase setup; anonymous authentication only on subscription; APNs token, zone codes, and subscription deletion | `lib/weather/data/morrow_backend.dart`, `lib/weather/data/supabase_weather_alert_subscription_service.dart`           |
| Delivery records cascade on subscription deletion; scheduled cleanup of records older than 30 days                        | `supabase/migrations/20260906000100_create_alert_subscriptions.sql`, `supabase/functions/poll-severe-alerts/index.ts` |
| Sample-only demo, without native location, background work, or push initialization                                        | `lib/main_demo.dart`, `lib/demo/demo_weather_repository.dart`                                                         |

The landing page now uses screenshot previews only. Its interactive demo,
React bridge, and city selector have been removed; the original compiled sample
release remains as a capture source and is not linked or loaded by the page.

The landing source has no analytics SDK, tracking pixels, advertising cookies,
or active waitlist endpoint. The current live site's HTML was also inspected for
injected analytics scripts; none were found. This is not an audit of private
Cloudflare, Supabase, mail-provider, or App Store account settings.

Provider references checked September 9, 2026:

- [Cloudflare privacy policy](https://www.cloudflare.com/privacypolicy/), particularly End Users and Customer Logs.
- [Open-Meteo terms and privacy](https://open-meteo.com/en/terms).
- [National Weather Service privacy](https://www.weather.gov/privacy).
- [Supabase privacy policy](https://supabase.com/privacy).
- [Apple TestFlight privacy](https://www.apple.com/legal/privacy/data/en/test-flight/): Apple automatically collects beta usage and crash information and shares it with the developer, even without an in-app analytics SDK.
- [Apple App Review Guidelines, 5.1.1](https://developer.apple.com/app-store/review/guidelines/#privacy): policy accessibility, disclosure, retention, and deletion requirements.

## Before public launch

- Confirm the individual or legal entity operating Morrow and add its identity
  and any contact details required for the jurisdictions where the app is
  offered. Confirm that `privacy@hellomorrow.app` receives mail. No message was
  sent as part of this change.
- Review the policy against the actual release build and operational settings,
  including provider locations, log retention, backups, support-email handling,
  and any jurisdiction-specific disclosures or lawful bases. Choose concrete
  support/beta retention periods if operationally supported. No provider region,
  email vendor, or unverified retention period has been invented here.
- Confirm the deployed alert poller runs the 30-day delivery cleanup. Establish
  retention and a usable deletion process for the separate Supabase anonymous
  Auth identity: disabling alerts currently deletes the subscription and its
  delivery records, **not** that identity. An email address alone cannot identify
  an anonymous installation. This landing PR does not change the native backend.
- Align the native in-app privacy text with this page, then link
  `https://hellomorrow.app/privacy` from the app and App Store Connect after the
  route is deployed. The existing native text says “approximate” coordinates,
  but the weather request sends the device coordinates without explicit
  rounding; the hosted policy correctly allows for precise location. Removing
  a place also leaves possible background/widget cache remnants, so the policy
  avoids promising immediate erasure of every local copy.
- Before enabling `NEXT_PUBLIC_WAITLIST_ACTION`, update the currently-closed
  waitlist section with the actual provider, purposes, retention, and
  unsubscribe/deletion process. The form's privacy link is present in every
  launch configuration. TestFlight data handling is already described, but the
  invitation URL still needs to be supplied separately.

The public policy describes optional alerts conditionally and does not claim
that the website collects location, that providers keep no logs, or that
uninstalling the app deletes a remote subscription.
