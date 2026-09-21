/* oxlint-disable next/no-html-link-for-pages -- Static export destinations use native links, without client-router prefetching. */

import { ArrowRight, Smartphone } from 'lucide-react';
import { APP_STORE_URL } from '@/lib/app-store';

export function AppStoreLink() {
  return (
    <div className="app-store-link">
      <a className="primary-cta" href={APP_STORE_URL}>
        <Smartphone size={19} aria-hidden="true" /> Download on the App Store
        <ArrowRight size={18} aria-hidden="true" />
      </a>
      <p className="app-store-note">
        Free for iPhone and iPad. Android is coming soon and still in testing.{' '}
        <a href="/privacy">Privacy policy</a>
      </p>
    </div>
  );
}
