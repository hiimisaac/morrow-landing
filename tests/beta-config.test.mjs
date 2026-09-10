import assert from 'node:assert/strict';
import test from 'node:test';
import { getBetaConfig } from '../lib/beta-config.ts';

test('no launch destinations leaves signup honestly unavailable', () => {
  assert.deepEqual(getBetaConfig({}), {
    testFlightUrl: null,
    waitlistAction: null,
  });
});

test('accepts an HTTPS waitlist provider and trims configuration whitespace', () => {
  assert.equal(
    getBetaConfig({ waitlistAction: ' https://forms.example.com/subscribe ' })
      .waitlistAction,
    'https://forms.example.com/subscribe',
  );
});

test('only genuine TestFlight invitation URLs enable the beta link', () => {
  for (const value of [
    'https://example.com/join/abc',
    'https://testflight.apple.com.evil.example/join/abc',
    'https://testflight.apple.com/',
    'javascript:alert(1)',
    'http://testflight.apple.com/join/abc',
  ]) {
    assert.equal(getBetaConfig({ testFlightUrl: value }).testFlightUrl, null);
  }
  assert.equal(
    getBetaConfig({
      testFlightUrl: 'https://testflight.apple.com/join/Ab123xyz',
    }).testFlightUrl,
    'https://testflight.apple.com/join/Ab123xyz',
  );
});

test('invalid, insecure, and credential-bearing form actions cannot collect email', () => {
  for (const value of [
    '',
    ' ',
    '/api/waitlist',
    'not a url',
    'javascript:alert(1)',
    'http://forms.example.com',
    'https://user:secret@forms.example.com',
  ]) {
    assert.equal(getBetaConfig({ waitlistAction: value }).waitlistAction, null);
  }
});

test('an invalid beta invite does not prevent a valid waitlist fallback', () => {
  assert.deepEqual(
    getBetaConfig({
      testFlightUrl: 'coming soon',
      waitlistAction: 'https://forms.example.com/subscribe',
    }),
    {
      testFlightUrl: null,
      waitlistAction: 'https://forms.example.com/subscribe',
    },
  );
});
