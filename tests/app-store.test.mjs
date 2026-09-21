import assert from 'node:assert/strict';
import test from 'node:test';
import { APP_STORE_URL } from '../lib/app-store.ts';

test('uses Morrow’s canonical App Store listing', () => {
  const listing = new URL(APP_STORE_URL);

  assert.equal(listing.protocol, 'https:');
  assert.equal(listing.hostname, 'apps.apple.com');
  assert.equal(listing.pathname, '/us/app/morrow-daily-weather/id6810489494');
});
